import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import { getExperiments } from "../services/graphService";

function ExperimentCharts() {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function cargar() {

            const results = await getExperiments();

            setData(results);

        }

        cargar();

    }, []);

    return (

        <section className="experiment-charts">

            <h2>Evaluación Experimental</h2>

            <div className="charts-grid">

                {/* ===================================== */}
                {/* NÚMERO DE ARISTAS */}
                {/* ===================================== */}

                <div className="chart-card">

                    <h3>Número de Aristas</h3>

                    <ResponsiveContainer width="100%" height={220}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="K" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="Aristas"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                name="Aristas"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                    <p className="chart-description">
                        Número total de conexiones generadas en el grafo para cada valor de K.
                    </p>

                </div>

                {/* ===================================== */}
                {/* CLUSTERING */}
                {/* ===================================== */}

                <div className="chart-card">

                    <h3>Coeficiente de Clustering</h3>

                    <ResponsiveContainer width="100%" height={220}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="K" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="Clustering"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                name="Clustering"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                    <p className="chart-description">
                        Evalúa el nivel de agrupamiento entre películas similares.
                    </p>

                </div>

                {/* ===================================== */}
                {/* DENSIDAD */}
                {/* ===================================== */}

                <div className="chart-card">

                    <h3>Densidad del Grafo</h3>

                    <ResponsiveContainer width="100%" height={220}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="K" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="Densidad"
                                stroke="#22c55e"
                                strokeWidth={3}
                                name="Densidad"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                    <p className="chart-description">
                        Proporción de conexiones existentes respecto al total posible.
                    </p>

                </div>

                {/* ===================================== */}
                {/* GRADO PROMEDIO */}
                {/* ===================================== */}

                <div className="chart-card">

                    <h3>Grado Promedio</h3>

                    <ResponsiveContainer width="100%" height={220}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="K" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="Grado promedio"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                name="Grado Promedio"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                    <p className="chart-description">
                        Número promedio de conexiones por película.
                    </p>

                </div>

                {/* ===================================== */}
                {/* TIEMPO DE CONSTRUCCIÓN */}
                {/* ===================================== */}

                <div className="chart-card">

                    <h3>Tiempo de Construcción</h3>

                    <ResponsiveContainer width="100%" height={220}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="K" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="Tiempo construcción (s)"
                                stroke="#ef4444"
                                strokeWidth={3}
                                name="Construcción"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                    <p className="chart-description">
                        Tiempo requerido para construir el índice KNN.
                    </p>

                </div>

                {/* ===================================== */}
                {/* TIEMPO DE BÚSQUEDA */}
                {/* ===================================== */}

                <div className="chart-card">

                    <h3>Tiempo de Búsqueda</h3>

                    <ResponsiveContainer width="100%" height={220}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="K" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="Tiempo búsqueda (s)"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                name="Búsqueda"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                    <p className="chart-description">
                        Tiempo promedio empleado para recuperar las recomendaciones.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default ExperimentCharts;