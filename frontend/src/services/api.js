const API_URL = "http://127.0.0.1:8000";

export async function buscarPelicula(nombre, k = 5) {

    try {

        const response = await fetch(
            `${API_URL}/recommend?movie=${encodeURIComponent(nombre)}&k=${k}`
        );

        if (!response.ok) {
            throw new Error("No se pudo obtener la información.");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        return null;

    }

}