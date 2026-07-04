import time
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# ==========================================================
# CONFIGURACIÓN
# ==========================================================

K = 6                  # La primera posición es la misma película
METRICA = "cosine"

# ==========================================================
# RUTAS
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET = BASE_DIR / "dataset" / "movies_clean.csv"
EMBEDDINGS = BASE_DIR / "dataset" / "movie_embeddings.npy"

# ==========================================================
# CARGAR DATOS
# ==========================================================

print("Cargando datos...")

df = pd.read_csv(DATASET)
embeddings = np.load(EMBEDDINGS)

print("Datos cargados correctamente.\n")

# ==========================================================
# CONSTRUIR KNN
# ==========================================================

knn = NearestNeighbors(
    n_neighbors=K,
    metric=METRICA
)

knn.fit(embeddings)

# ==========================================================
# FUNCIONES
# ==========================================================

def buscar_pelicula(texto):
    return df[df["movie"].str.contains(texto, case=False, na=False)]


def seleccionar_pelicula(coincidencias):

    if len(coincidencias) == 1:
        return coincidencias.index[0]

    print("\nSe encontraron varias películas:\n")

    for i, (_, fila) in enumerate(coincidencias.iterrows(), start=1):
        print(f"{i}. {fila['movie']} ({fila['year']})")

    while True:

        try:

            opcion = int(input("\nSeleccione una opción: "))

            if 1 <= opcion <= len(coincidencias):
                return coincidencias.index[opcion - 1]

            print("Opción inválida.")

        except ValueError:
            print("Ingrese un número válido.")


def mostrar_pelicula(indice):

    pelicula = df.loc[indice]

    print("\n")
    print("=" * 70)
    print("PELÍCULA SELECCIONADA")
    print("=" * 70)

    print(f"Título      : {pelicula['movie']}")
    print(f"Año         : {pelicula['year']}")
    print(f"Género      : {pelicula['genre']}")
    print(f"Rating      : {pelicula['rate']}")
    print(f"Duración    : {pelicula['duration']} minutos")
    print(f"Votos       : {pelicula['votes']}")

    print("\nSinopsis")
    print("-" * 70)

    print(pelicula["synopsis"][:300] + "...")

    print("-" * 70)


def mostrar_recomendaciones(indice):

    inicio = time.perf_counter()

    distancias, indices = knn.kneighbors([embeddings[indice]])

    fin = time.perf_counter()

    print("\n")
    print("=" * 70)
    print("RECOMENDACIONES")
    print("=" * 70)

    for i in range(1, K):

        vecino = indices[0][i]

        pelicula = df.iloc[vecino]

        similitud = (1 - distancias[0][i]) * 100

        print(f"\n{i}. {pelicula['movie']}")

        print(f"   Año        : {pelicula['year']}")
        print(f"   Género     : {pelicula['genre']}")
        print(f"   Rating     : {pelicula['rate']}")
        print(f"   Similitud  : {similitud:.2f}%")

        print("\n   Sinopsis:")

        print("   " + pelicula["synopsis"][:180] + "...")

        print("-" * 70)

    print("\n")
    print("=" * 70)
    print("INFORMACIÓN DE LA CONSULTA")
    print("=" * 70)

    print(f"Modelo             : all-MiniLM-L6-v2")
    print(f"Métrica            : {METRICA}")
    print(f"Vecinos            : {K-1}")
    print(f"Tiempo búsqueda    : {(fin-inicio):.5f} segundos")


# ==========================================================
# PROGRAMA PRINCIPAL
# ==========================================================

print("=" * 70)
print("BUSCADOR SEMÁNTICO DE PELÍCULAS")
print("=" * 70)

texto = input("\nIngrese una película: ").strip()

coincidencias = buscar_pelicula(texto)

if coincidencias.empty:

    print("\nNo se encontró ninguna película.")
    exit()

indice = seleccionar_pelicula(coincidencias)

mostrar_pelicula(indice)

mostrar_recomendaciones(indice)