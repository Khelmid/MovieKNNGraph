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

        <section className="section experiment-table-section">

            <h2>Tabla de métricas experimentales para diferentes valores de K </h2>

            <table className="experiment-table">

                <thead>

                    <tr>

                        <th>K</th>
                        <th>Aristas</th>
                        <th>Densidad</th>
                        <th>Grado promedio</th>
                        <th>Coef. de clustering</th>
                        <th>Tiempo de construcción (s)</th>
                        <th>Tiempo de búsqueda (s)</th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((row) => (

                        <tr key={row.K}>

                            <td>{row.K}</td>

                            <td>{Number(row.Aristas).toLocaleString()}</td>

                            <td>{Number(row.Densidad).toFixed(4)}</td>

                            <td>{Number(row["Grado promedio"]).toFixed(2)}</td>

                            <td>{Number(row.Clustering).toFixed(4)}</td>

                            <td>{Number(row["Tiempo construcción (s)"]).toFixed(6)}</td>

                            <td>{Number(row["Tiempo búsqueda (s)"]).toFixed(6)}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </section>

    );

}

export default ExperimentTable;