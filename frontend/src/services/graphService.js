const API = "http://127.0.0.1:8000";

// =========================================
// ESTADÍSTICAS DEL GRAFO
// =========================================

export async function getGraphStats(k = 5) {

    const response = await fetch(
        `${API}/graph/stats?k=${k}`
    );

    return await response.json();

}

// =========================================
// SUBGRAFO
// =========================================

export async function getGraph(movie, k = 5) {

    const response = await fetch(
        `${API}/graph?movie=${encodeURIComponent(movie)}&k=${k}`
    );

    return await response.json();

}

// =========================================
// RESULTADOS EXPERIMENTALES
// =========================================

export async function getExperiments() {

    const response = await fetch(
        `${API}/experiments`
    );

    return await response.json();

}