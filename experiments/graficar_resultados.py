from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

# ==========================================================
# RUTAS
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

RESULTADOS = BASE_DIR / "experiments" / "resultados.csv"

SALIDA = BASE_DIR / "experiments" / "graficos"
SALIDA.mkdir(exist_ok=True)

# ==========================================================
# CARGAR RESULTADOS
# ==========================================================

df = pd.read_csv(RESULTADOS)

# ==========================================================
# FUNCIÓN PARA CREAR GRÁFICOS
# ==========================================================

def guardar_grafico(x, y, titulo, ylabel, archivo):

    plt.figure(figsize=(8,5))

    plt.plot(
        x,
        y,
        marker="o",
        linewidth=2
    )

    plt.title(titulo)
    plt.xlabel("Valor de K")
    plt.ylabel(ylabel)

    plt.grid(True)

    plt.tight_layout()

    plt.savefig(
        SALIDA / archivo,
        dpi=300
    )

    plt.close()

# ==========================================================
# GRÁFICOS
# ==========================================================

guardar_grafico(
    df["K"],
    df["Aristas"],
    "Número de aristas",
    "Aristas",
    "aristas.png"
)

guardar_grafico(
    df["K"],
    df["Grado promedio"],
    "Grado promedio",
    "Grado",
    "grado_promedio.png"
)

guardar_grafico(
    df["K"],
    df["Densidad"],
    "Densidad del grafo",
    "Densidad",
    "densidad.png"
)

guardar_grafico(
    df["K"],
    df["Clustering"],
    "Coeficiente de clustering",
    "Clustering",
    "clustering.png"
)

guardar_grafico(
    df["K"],
    df["Tiempo construcción (s)"],
    "Tiempo de construcción del modelo",
    "Segundos",
    "tiempo_construccion.png"
)

guardar_grafico(
    df["K"],
    df["Tiempo búsqueda (s)"],
    "Tiempo promedio de búsqueda",
    "Segundos",
    "tiempo_busqueda.png"
)

print("="*60)
print("GRÁFICOS GENERADOS")
print("="*60)

print(SALIDA)