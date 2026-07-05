import { useEffect, useState } from "react";
import { getSimilarityMatrix } from "../services/graphService";

function SimilarityMatrix({ movie, k }) {

    const [data, setData] = useState(null);

    useEffect(() => {

        async function cargar() {

            if (!movie) return;

            const response = await getSimilarityMatrix(
                movie.movie,
                k
            );

            setData(response);

        }

        cargar();

    }, [movie, k]);

    if (!movie || !data) return null;

    function getCellColor(value) {

        if (value >= 0.80)
            return "#22c55e";

        if (value >= 0.60)
            return "#f59e0b";

        if (value >= 0.40)
            return "#38bdf8";

        return "#64748b";

    }

    return (

        <section className="similarity-section">

            <div className="section-header">

                <h2>Matriz de Similitud Coseno</h2>

                <span className="k-badge">

                    K = {k}

                </span>

            </div>

            <p className="matrix-description">

                La matriz muestra la similitud coseno entre la película
                consultada y sus vecinos más cercanos. Valores próximos
                a <strong>1.0</strong> indican mayor similitud semántica.

            </p>

            <div className="matrix-container">

                <table className="similarity-table">

                    <thead>

                        <tr>

                            <th></th>

                            {

                                data.labels.map(label => (

                                    <th key={label}>

                                        {label}

                                    </th>

                                ))

                            }

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.matrix.map((row, i) => (

                                <tr key={i}>

                                    <th>

                                        {data.labels[i]}

                                    </th>

                                    {

                                        row.map((value, j) => (

                                            <td

                                                key={j}

                                                style={{

                                                    background: getCellColor(value)

                                                }}

                                            >

                                                {Number(value).toFixed(3)}

                                            </td>

                                        ))

                                    }

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            <div className="matrix-legend">

                <span>

                    🟢 ≥ 0.80 Alta

                </span>

                <span>

                    🟠 0.60–0.79 Media

                </span>

                <span>

                    🔵 0.40–0.59 Baja

                </span>

                <span>

                    ⚪ &lt; 0.40 Muy baja

                </span>

            </div>

        </section>

    );

}

export default SimilarityMatrix;