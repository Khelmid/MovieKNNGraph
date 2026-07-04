from pathlib import Path

import networkx as nx
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# ==========================================================
# CONFIGURACIÓN
# ==========================================================

K = 6
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

df = pd.read_csv(DATASET)
embeddings = np.load(EMBEDDINGS)

# ==========================================================
# CONSTRUIR KNN
# ==========================================================

knn = NearestNeighbors(
    n_neighbors=K,
    metric=METRICA
)

knn.fit(embeddings)

distancias, indices = knn.kneighbors(embeddings)

# ==========================================================
# CREAR GRAFO
# ==========================================================

G = nx.Graph()

# Crear nodos

for i, fila in df.iterrows():

    G.add_node(
        i,
        movie=fila["movie"],
        genre=fila["genre"],
        year=fila["year"],
        rate=fila["rate"]
    )

# Crear aristas

for i in range(len(df)):

    for j in range(1, K):

        vecino = indices[i][j]

        similitud = 1 - distancias[i][j]

        G.add_edge(
            i,
            vecino,
            weight=similitud
        )

print("="*60)
print("GRAFO CONSTRUIDO")
print("="*60)

print(f"Nodos   : {G.number_of_nodes()}")
print(f"Aristas : {G.number_of_edges()}")

# ==========================================================
# GUARDAR
# ==========================================================

salida = BASE_DIR / "graph" / "movie_knn_graph.graphml"

nx.write_graphml(G, salida)

print("\nArchivo generado:")

print(salida)