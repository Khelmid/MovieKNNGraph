from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from backend.recommender import obtener_modelo, embeddings

# ==========================================================
# RUTAS
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET = BASE_DIR / "dataset" / "movies_clean.csv"

df = pd.read_csv(DATASET)

# ==========================================================
# MATRIZ DE SIMILITUD
# ==========================================================

def obtener_matriz_similitud(movie: str, k: int = 5):

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

    knn = obtener_modelo(k)

    _, indices = knn.kneighbors(
        [embeddings[indice]]
    )

    # ------------------------------------------------------
    # SOLO LOS K VECINOS (NO LA PELÍCULA CONSULTADA)
    # ------------------------------------------------------

    vecinos = indices[0][1:k + 1]

    nombres = []

    vectores = []

    for i in vecinos:

        nombres.append(
            str(df.iloc[i]["movie"])
        )

        vectores.append(
            embeddings[i]
        )

    matriz = cosine_similarity(vectores)

    matriz = np.round(
        matriz,
        3
    )

    return {

        "labels": nombres,

        "matrix": matriz.tolist()

    }