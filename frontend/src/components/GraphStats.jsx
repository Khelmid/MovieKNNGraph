import { useEffect, useState } from "react";
import { getGraphStats } from "../services/graphService";

function GraphStats({ k, showStats, setShowStats }) {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        async function cargar() {

            const data = await getGraphStats(k);
            setStats(data);

        }

        cargar();

    }, [k]);

    if (!stats) return null;

    const N = stats.nodes;
    const E = stats.edges;

    const averageDegree = Number(stats.average_degree).toFixed(2);
    const density = Number(stats.density).toFixed(4);
    const clustering = Number(stats.average_clustering).toFixed(4);

    const metrics = [

        {
            icon: "🎬",
            title: "Número de Películas (N)",
            value: N,
            formula: "N = |V|",
            description: "Número total de vértices (películas) del grafo.",
            values: [
                `N = ${N}`,
                `|V| = ${N}`
            ]
        },

        {
            icon: "🔗",
            title: "Número de Aristas (E)",
            value: E,
            formula: "E = |E|",
            description: "Número total de conexiones entre películas.",
            values: [
                `E = ${E}`,
                `|E| = ${E}`,
                "Cada arista conecta dos películas."
            ]
        },

        {
            icon: "📈",
            title: "Grado Promedio (k̄)",
            value: averageDegree,
            formula: "k̄ = 2E / N",
            description: "Promedio de conexiones por película.",
            values: [
                `E = ${E}`,
                `N = ${N}`,
                `k̄ = (2 × ${E}) / ${N}`,
                `k̄ = ${averageDegree}`
            ]
        },

        {
            icon: "🌐",
            title: "Densidad (D)",
            value: density,
            formula: "D = 2E / N(N−1)",
            description: "Proporción de conexiones existentes respecto al total posible.",
            values: [
                `E = ${E}`,
                `N = ${N}`,
                `D = (2 × ${E}) / (${N} × ${N - 1})`,
                `D = ${density}`
            ]
        },

        {
            icon: "🧩",
            title: "Componentes Conexas",
            value: stats.connected_components,
            formula: "CC(G)",
            description: "Número de componentes conexas del grafo.",
            values: [
                `CC(G) = ${stats.connected_components}`
            ]
        },

        {
            icon: "🔺",
            title: "Coeficiente de Agrupamiento (C)",
            value: clustering,
            formula: "C = (1/N) ΣCi",
            description: "Promedio del coeficiente de clustering local.",
            values: [
                `N = ${N}`,
                `C = ${clustering}`
            ]
        }

    ];

    return (

        <section className="graph-stats">

            {showStats ? (

                <>

                    <div className="section-header">

                        <h2>
                            Estadísticas del Grafo
                        </h2>

                        <div className="stats-actions">

                            <span className="k-badge">
                                K = {k}
                            </span>

                            <button
                                className="toggle-stats-btn"
                                onClick={() => setShowStats(false)}
                                title="Ocultar estadísticas"
                            >
                                ◀
                            </button>

                        </div>

                    </div>

                    <div className="stats-grid">

                        {metrics.map((item) => (

                            <article
                                key={item.title}
                                className="stat-card"
                            >

                                <div className="stat-icon">
                                    {item.icon}
                                </div>

                                <div className="stat-content">

                                    <h4>{item.title}</h4>

                                    <div className="stat-value">
                                        {item.value}
                                    </div>

                                    <div className="formula-box">
                                        {item.formula}
                                    </div>

                                    <p className="stat-description">
                                        {item.description}
                                    </p>

                                    <div className="formula-values">

                                        <strong>
                                            Valores:
                                        </strong>

                                        {item.values.map((value, index) => (

                                            <div
                                                key={index}
                                                className="formula-line"
                                            >
                                                • {value}
                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                </>

            ) : (

                <button
                    className="toggle-stats-btn"
                    onClick={() => setShowStats(true)}
                    title="Mostrar estadísticas"
                >
                    ▶
                </button>

            )}

        </section>

    );

}

export default GraphStats;