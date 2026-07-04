from pathlib import Path
import time

import networkx as nx
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

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

print(f"Películas : {len(df)}")
print(f"Embeddings: {embeddings.shape}")

# ==========================================================
# CONFIGURACIÓN
# ==========================================================

K_VALUES = [5, 10, 15, 20]

resultados = []

# ==========================================================
# EVALUACIÓN
# ==========================================================

for k in K_VALUES:

    print(f"\nEvaluando K = {k}")

    # ------------------------------------------------------
    # Construcción del modelo KNN
    # ------------------------------------------------------

    inicio = time.perf_counter()

    knn = NearestNeighbors(
        n_neighbors=k + 1,
        metric="cosine"
    )

    knn.fit(embeddings)

    tiempo_construccion = time.perf_counter() - inicio

    # ------------------------------------------------------
    # Búsqueda de vecinos
    # ------------------------------------------------------

    inicio = time.perf_counter()

    distancias, indices = knn.kneighbors(embeddings)

    tiempo_busqueda = (time.perf_counter() - inicio) / len(df)

    # ------------------------------------------------------
    # Construcción del grafo
    # ------------------------------------------------------

    G = nx.Graph()

    G.add_nodes_from(range(len(df)))

    for i in range(len(df)):
        for j in range(1, k + 1):

            vecino = int(indices[i][j])

            similitud = float(1 - distancias[i][j])

            G.add_edge(
                i,
                vecino,
                weight=similitud
            )

    # ------------------------------------------------------
    # Estadísticas
    # ------------------------------------------------------

    nodos = G.number_of_nodes()
    aristas = G.number_of_edges()

    grado_promedio = sum(dict(G.degree()).values()) / nodos

    densidad = nx.density(G)

    componentes = nx.number_connected_components(G)

    clustering = nx.average_clustering(G)

    resultados.append({

        "K": k,
        "Nodos": nodos,
        "Aristas": aristas,
        "Grado promedio": round(grado_promedio, 2),
        "Densidad": round(densidad, 6),
        "Componentes": componentes,
        "Clustering": round(clustering, 4),
        "Tiempo construcción (s)": round(tiempo_construccion, 6),
        "Tiempo búsqueda (s)": round(tiempo_busqueda, 8)

    })

# ==========================================================
# RESULTADOS
# ==========================================================

tabla = pd.DataFrame(resultados)

print("\n")
print("=" * 90)
print("RESULTADOS")
print("=" * 90)

print(tabla)

# ==========================================================
# GUARDAR CSV
# ==========================================================

SALIDA = BASE_DIR / "experiments"
SALIDA.mkdir(exist_ok=True)

archivo = SALIDA / "resultados.csv"

tabla.to_csv(
    archivo,
    index=False
)

print("\nResultados guardados en:")
print(archivo)