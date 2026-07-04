import { useEffect, useState } from "react";
import { getGraphStats } from "../services/graphService";

function GraphStats({ k }) {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        async function cargar() {

            const data = await getGraphStats(k);

            setStats(data);

        }

        cargar();

    }, [k]);

    if (!stats) return null;

    const metrics = [

        {
            icon: "🎬",
            title: "Movies",
            value: stats.nodes,
            description: "Total nodes"
        },

        {
            icon: "🔗",
            title: "Edges",
            value: stats.edges,
            description: "Graph connections"
        },

        {
            icon: "📈",
            title: "Average Degree",
            value: Number(stats.average_degree).toFixed(2),
            description: "Average neighbors"
        },

        {
            icon: "🌐",
            title: "Density",
            value: Number(stats.density).toFixed(4),
            description: "Graph density"
        },

        {
            icon: "🧩",
            title: "Components",
            value: stats.connected_components,
            description: "Connected components"
        },

        {
            icon: "🔺",
            title: "Clustering",
            value: Number(stats.average_clustering).toFixed(4),
            description: "Average clustering"
        }

    ];

    return (

        <section className="graph-stats">

            <div className="section-header">

                <h2>Graph Statistics</h2>

                <span className="k-badge">
                    K = {k}
                </span>

            </div>

            <div className="stats-grid">

                {

                    metrics.map((item) => (

                        <article
                            key={item.title}
                            className="stat-card"
                        >

                            <div className="stat-icon">

                                {item.icon}

                            </div>

                            <div className="stat-content">

                                <h4>

                                    {item.title}

                                </h4>

                                <div className="stat-value">

                                    {item.value}

                                </div>

                                <p>

                                    {item.description}

                                </p>

                            </div>

                        </article>

                    ))

                }

            </div>

        </section>

    );

}

export default GraphStats;