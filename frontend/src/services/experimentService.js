const API = "http://127.0.0.1:8000";

export async function getExperiments() {

    const response = await fetch(`${API}/experiments`);

    return await response.json();

}