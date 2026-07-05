import time
from pathlib import Path

import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

# ==========================================================
# RUTAS
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET = BASE_DIR / "dataset" / "movies_clean.csv"
SALIDA = BASE_DIR / "dataset" / "movie_embeddings.npy"

# ==========================================================
# CARGAR DATASET
# ==========================================================

print("=" * 70)
print("GENERACIÓN DE EMBEDDINGS")
print("=" * 70)

df = pd.read_csv(DATASET)

print(f"\nPelículas: {len(df)}")

# ==========================================================
# PREPARAR EL TEXTO
# ==========================================================

print("\nPreparando información...")

textos = []

for _, fila in df.iterrows():

    texto = f"""
Title: {fila['movie']}

Genres: {fila['genre'].replace('|',' ')}

Year: {fila['year']}

Synopsis:
{fila['synopsis']}
"""

    textos.append(texto.strip())

print("Información preparada.")

# ==========================================================
# CARGAR MODELO
# ==========================================================

print("\nCargando modelo...")

modelo = SentenceTransformer("all-MiniLM-L6-v2")

print("Modelo cargado.")

# ==========================================================
# GENERAR EMBEDDINGS
# ==========================================================




print("\nGenerando embeddings...")

inicio = time.perf_counter()

embeddings = modelo.encode(
    textos,
    convert_to_numpy=True,
    show_progress_bar=True
)

fin = time.perf_counter()

print("\nEmbeddings generados correctamente.")

print(f"\nForma: {embeddings.shape}")

print(f"Tiempo: {fin-inicio:.2f} segundos")

# ==========================================================
# GUARDAR
# ==========================================================

np.save(SALIDA, embeddings)

print("\nEmbeddings guardados.")

print(SALIDA)