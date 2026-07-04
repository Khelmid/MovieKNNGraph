import pandas as pd
import numpy as np

from sklearn.neighbors import NearestNeighbors

print("=" * 60)
print("CONSTRUCCIÓN DEL KNN-GRAPH")
print("=" * 60)

# ==========================
# Cargar datos
# ==========================

df = pd.read_csv("dataset/movies_clean.csv")

embeddings = np.load("embeddings/movie_embeddings.npy")

print(f"\nPelículas : {len(df)}")
print(f"Embeddings: {embeddings.shape}")

# ==========================
# Construcción
# ==========================

K = 6

print(f"\nConstruyendo KNN (K={K-1} vecinos)...")

knn = NearestNeighbors(
    n_neighbors=K,
    metric="cosine"
)

knn.fit(embeddings)

distancias, indices = knn.kneighbors(embeddings)

print("\nKNN construido correctamente.")

# ==========================
# Mostrar ejemplo
# ==========================

pelicula = 0

print("\n")
print("=" * 60)
print("PELÍCULA DE EJEMPLO")
print("=" * 60)

print(df.iloc[pelicula]["movie"])

print("\nVecinos encontrados\n")

for i in range(1, K):

    vecino = indices[pelicula][i]

    print(f"{i}. {df.iloc[vecino]['movie']}")

    print(f"Género : {df.iloc[vecino]['genre']}")

    print(f"Rating : {df.iloc[vecino]['rate']}")

    print(f"Distancia : {distancias[pelicula][i]:.4f}")

    print("Sinopsis:")

    print(df.iloc[vecino]["synopsis"][:180] + "...")

    print("-" * 60)