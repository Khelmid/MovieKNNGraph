import pandas as pd

# Leer dataset original
df = pd.read_csv("dataset/MOVIES-_Datase.csv")

print("===================================")
print("LIMPIEZA DEL DATASET")
print("===================================\n")

print(f"Filas originales: {len(df)}")

# 1. Eliminar películas sin nombre
df = df.dropna(subset=["movie"])

# 2. Eliminar duplicados
df = df.drop_duplicates(subset=["movie"])

# 3. Corregir error en géneros
df["genre"] = df["genre"].str.replace("Histor", "History")

# 4. Seleccionar únicamente las columnas necesarias
df = df[
    [
        "movie",
        "genre",
        "synopsis",
        "year",
        "rate",
        "duration",
        "votes",
        "popularity"
    ]
]

print(f"Filas después de limpiar: {len(df)}")

print("\nColumnas finales:")

print(df.columns)

# Guardar nuevo dataset
df.to_csv("dataset/movies_clean.csv", index=False)

print("\nArchivo creado correctamente")

print("dataset/movies_clean.csv")