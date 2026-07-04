from pathlib import Path

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
# CACHE DE MODELOS KNN
# ==========================================================

MODELOS = {}

# ==========================================================
# OBTENER MODELO KNN
# ==========================================================

def obtener_modelo(k: int):

    if k in MODELOS:
        return MODELOS[k]

    knn = NearestNeighbors(
        n_neighbors=k + 1,
        metric="cosine"
    )

    knn.fit(embeddings)

    MODELOS[k] = knn

    return knn


# ==========================================================
# RECOMENDADOR
# ==========================================================

def recomendar(nombre: str, k: int = 5):

    knn = obtener_modelo(k)

    resultado = df[
        df["movie"].str.contains(
            nombre,
            case=False,
            na=False
        )
    ]

    if resultado.empty:
        return None

    indice = int(resultado.index[0])

    distancias, indices = knn.kneighbors(
        [embeddings[indice]]
    )

    # ======================================================
    # PELÍCULA CONSULTADA
    # ======================================================

    pelicula = {

        "movie": str(df.iloc[indice]["movie"]),

        "genre": str(df.iloc[indice]["genre"]),

        "year": int(df.iloc[indice]["year"]),

        "rating": float(df.iloc[indice]["rate"]),

        "duration": int(df.iloc[indice]["duration"])
            if pd.notna(df.iloc[indice]["duration"]) else 0,

        "votes": int(df.iloc[indice]["votes"])
            if pd.notna(df.iloc[indice]["votes"]) else 0,

        "popularity": float(df.iloc[indice]["popularity"])
            if pd.notna(df.iloc[indice]["popularity"]) else 0,

        "synopsis": str(df.iloc[indice]["synopsis"])

    }

    # ======================================================
    # RECOMENDACIONES
    # ======================================================

    recomendaciones = []

    for i in range(1, k + 1):

        vecino = int(indices[0][i])

        similitud = float((1 - distancias[0][i]) * 100)

        recomendaciones.append({

            "movie": str(df.iloc[vecino]["movie"]),

            "genre": str(df.iloc[vecino]["genre"]),

            "year": int(df.iloc[vecino]["year"]),

            "rating": float(df.iloc[vecino]["rate"]),

            "duration": int(df.iloc[vecino]["duration"])
                if pd.notna(df.iloc[vecino]["duration"]) else 0,

            "votes": int(df.iloc[vecino]["votes"])
                if pd.notna(df.iloc[vecino]["votes"]) else 0,

            "popularity": float(df.iloc[vecino]["popularity"])
                if pd.notna(df.iloc[vecino]["popularity"]) else 0,

            "similarity": round(similitud, 2)

        })

    # ======================================================
    # RESPUESTA
    # ======================================================

    return {

        "query": pelicula,

        "recommendations": recomendaciones

    }