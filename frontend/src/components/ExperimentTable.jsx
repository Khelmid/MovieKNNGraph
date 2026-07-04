import { useEffect, useState } from "react";
import { getExperiments } from "../services/experimentService";

function ExperimentTable() {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function cargar() {

            const resultado = await getExperiments();

            setData(resultado);

        }

        cargar();

    }, []);

    return (

        <div className="section">

            <h2>Experimental Evaluation</h2>

            <table className="experiment-table">

                <thead>

                    <tr>

                        <th>K</th>
                        <th>Edges</th>
                        <th>Density</th>
                        <th>Avg Degree</th>
                        <th>Clustering</th>
                        <th>Build Time (s)</th>
                        <th>Search Time (s)</th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((row) => (

                        <tr key={row.K}>

                            <td>{row.K}</td>
                            <td>{row.Aristas}</td>
                            <td>{row.Densidad}</td>
                            <td>{row["Grado promedio"]}</td>
                            <td>{row.Clustering}</td>
                            <td>{row["Tiempo construcción (s)"]}</td>
                            <td>{row["Tiempo búsqueda (s)"]}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ExperimentTable;