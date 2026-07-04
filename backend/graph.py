from pathlib import Path

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

df = pd.read_csv(DATASET)
embeddings = np.load(EMBEDDINGS)

# ==========================================================
# CACHE DE GRAFOS
# ==========================================================

GRAFOS = {}

# ==========================================================
# CONSTRUIR GRAFO
# ==========================================================

def construir_grafo(k: int = 5):

    if k in GRAFOS:
        return GRAFOS[k]

    knn = NearestNeighbors(
        n_neighbors=k + 1,
        metric="cosine"
    )

    knn.fit(embeddings)

    distancias, indices = knn.kneighbors(embeddings)

    G = nx.Graph()

    # ------------------------------------------------------

    for i, fila in df.iterrows():

        G.add_node(

            i,

            movie=str(fila["movie"]),

            genre=str(fila["genre"]),

            year=int(fila["year"]),

            rating=float(fila["rate"])

        )

    # ------------------------------------------------------

    for i in range(len(df)):

        for j in range(1, k + 1):

            vecino = int(indices[i][j])

            similitud = float(1 - distancias[i][j])

            G.add_edge(

                i,

                vecino,

                weight=round(similitud, 4)

            )

    GRAFOS[k] = G

    return G


# ==========================================================
# ESTADÍSTICAS
# ==========================================================

def obtener_estadisticas(k: int = 5):

    G = construir_grafo(k)

    return {

        "k": k,

        "nodes": G.number_of_nodes(),

        "edges": G.number_of_edges(),

        "average_degree": round(

            sum(dict(G.degree()).values()) / G.number_of_nodes(),

            2

        ),

        "density": round(

            nx.density(G),

            6

        ),

        "connected_components":

            nx.number_connected_components(G),

        "average_clustering":

            round(nx.average_clustering(G), 4)

    }


# ==========================================================
# GRAFO COMPLETO
# ==========================================================

def obtener_grafo(k: int = 5):

    G = construir_grafo(k)

    nodes = []

    edges = []

    # ------------------------

    for _, data in G.nodes(data=True):

        nodes.append({

            "id": data["movie"],

            "label": data["movie"],

            "genre": data["genre"],

            "year": data["year"],

            "rating": data["rating"]

        })

    # ------------------------

    for origen, destino, data in G.edges(data=True):

        edges.append({

            "source": G.nodes[origen]["movie"],

            "target": G.nodes[destino]["movie"],

            "weight": data["weight"]

        })

    return {

        "k": k,

        "nodes": nodes,

        "edges": edges

    }


# ==========================================================
# SUBGRAFO
# ==========================================================

def obtener_subgrafo(movie: str, k: int = 5):

    G = construir_grafo(k)

    resultado = df[

        df["movie"].str.contains(

            movie,

            case=False,

            na=False

        )

    ]

    if resultado.empty:

        return None

    indice = int(resultado.index[0])

    vecinos = list(

        G.neighbors(indice)

    )

    SG = G.subgraph(

        [indice] + vecinos

    ).copy()

    nodes = []

    for node, data in SG.nodes(data=True):

        nodes.append({

            "id": data["movie"],

            "label": data["movie"],

            "group": 1 if node == indice else 2,

            "genre": data["genre"],

            "year": data["year"],

            "rating": data["rating"]

        })

    edges = []

    for origen, destino, data in SG.edges(data=True):

        edges.append({

            "source": G.nodes[origen]["movie"],

            "target": G.nodes[destino]["movie"],

            "weight": data["weight"]

        })

    return {

        "movie": G.nodes[indice]["movie"],

        "k": k,

        "nodes": nodes,

        "edges": edges

    }