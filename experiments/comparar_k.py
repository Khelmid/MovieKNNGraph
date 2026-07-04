import time
from pathlib import Path

import networkx as nx
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# ==========================================
# RUTAS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET = BASE_DIR / "dataset" / "movies_clean.csv"
EMBEDDINGS = BASE_DIR / "dataset" / "movie_embeddings.npy"

# ==========================================
# CARGAR DATOS
# ==========================================

df = pd.read_csv(DATASET)
embeddings = np.load(EMBEDDINGS)

print("=" * 70)
print("EXPERIMENTO 1")
print("Comparación de diferentes valores de K")
print("=" * 70)

print()

for vecinos in [3, 5, 10]:

    K = vecinos + 1

    inicio = time.perf_counter()

    knn = NearestNeighbors(
        n_neighbors=K,
        metric="cosine"
    )

    knn.fit(embeddings)

    distancias, indices = knn.kneighbors(embeddings)

    G = nx.Graph()

    for i in range(len(df)):
        G.add_node(i)

    for i in range(len(df)):
        for j in range(1, K):

            vecino = indices[i][j]

            similitud = 1 - distancias[i][j]

            G.add_edge(
                i,
                vecino,
                weight=similitud
            )

    fin = time.perf_counter()

    print(f"K = {vecinos}")
    print(f"Nodos    : {G.number_of_nodes()}")
    print(f"Aristas  : {G.number_of_edges()}")
    print(f"Tiempo   : {fin-inicio:.4f} segundos")
    print("-" * 60)