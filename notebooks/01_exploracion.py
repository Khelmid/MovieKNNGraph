import pandas as pd

# Leer dataset
df = pd.read_csv("dataset/MOVIES-_Datase.csv")

print("="*60)
print("INFORMACIÓN GENERAL")
print("="*60)

print(f"\nFilas: {df.shape[0]}")
print(f"Columnas: {df.shape[1]}")

print("\nColumnas principales:")

columnas = [
    "movie",
    "genre",
    "synopsis",
    "year",
    "rate",
    "duration",
    "votes"
]

print(df[columnas].head())

print("\n" + "="*60)
print("VALORES NULOS")
print("="*60)

print(df[columnas].isnull().sum())

print("\n" + "="*60)
print("PELÍCULAS REPETIDAS")
print("="*60)

print(df["movie"].duplicated().sum())

print("\n" + "="*60)
print("TOTAL DE GÉNEROS DIFERENTES")
print("="*60)

generos = df["genre"].str.split("|").explode()

print(generos.nunique())

print("\nLista de géneros:")

print(sorted(generos.unique()))