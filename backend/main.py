from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.recommender import recomendar
from backend.graph import (
    obtener_estadisticas,
    obtener_subgrafo
)
from backend.similarity import (
    obtener_matriz_similitud
)
from backend.experiments import obtener_resultados

app = FastAPI(
    title="Movie KNN Graph API"
)

# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# INICIO
# ==========================================================

@app.get("/")
def home():

    return {
        "message": "Movie Recommendation API"
    }


# ==========================================================
# RECOMENDACIÓN DE PELÍCULAS
# ==========================================================

@app.get("/recommend")
def recommend(movie: str, k: int = 5):

    resultado = recomendar(movie, k)

    if resultado is None:

        return {
            "error": "Película no encontrada"
        }

    return resultado


# ==========================================================
# ESTADÍSTICAS DEL GRAFO
# ==========================================================

@app.get("/graph/stats")
def graph_stats(k: int = 5):

    return obtener_estadisticas(k)


# ==========================================================
# SUBGRAFO KNN DE UNA PELÍCULA
# ==========================================================

@app.get("/graph")
def graph(movie: str, k: int = 5):

    resultado = obtener_subgrafo(movie, k)

    if resultado is None:

        return {
            "error": "Película no encontrada"
        }

    return resultado


# ==========================================================
# MATRIZ DE SIMILITUD
# ==========================================================

@app.get("/similarity")
def similarity(movie: str, k: int = 5):

    resultado = obtener_matriz_similitud(movie, k)

    if resultado is None:

        return {
            "error": "Película no encontrada"
        }

    return resultado


# ==========================================================
# RESULTADOS EXPERIMENTALES
# ==========================================================

@app.get("/experiments")
def experiments():

    return obtener_resultados()