from pathlib import Path
import pandas as pd

# ==========================================================
# RUTAS
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

RESULTADOS = BASE_DIR / "experiments" / "resultados.csv"

# ==========================================================
# FUNCIÓN
# ==========================================================

def obtener_resultados():

    df = pd.read_csv(RESULTADOS)

    return df.to_dict(orient="records")