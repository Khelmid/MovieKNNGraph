function GraphLegend() {

    return (

        <section className="legend-section">

            <h3 className="legend-title">
                Leyenda del Grafo
            </h3>

            <div className="graph-legend">

                <div className="legend-item">

                    <span className="legend-dot selected"></span>

                    <span>Película consultada</span>

                </div>

                <div className="legend-item">

                    <span className="legend-dot neighbor"></span>

                    <span>Películas similares</span>

                </div>

                <div className="legend-item">

                    <span className="legend-dot high"></span>

                    <span>Similitud alta (≥ 0.80)</span>

                </div>

                <div className="legend-item">

                    <span className="legend-dot medium"></span>

                    <span>Similitud media (0.60 – 0.80)</span>

                </div>

                <div className="legend-item">

                    <span className="legend-dot low"></span>

                    <span>Similitud baja (&lt; 0.60)</span>

                </div>

            </div>

            <p className="legend-description">
                Los nodos representan películas y las aristas indican relaciones de similitud
                semántica obtenidas mediante el algoritmo KNN. El color de las conexiones
                refleja el nivel de similitud entre las películas.
            </p>

        </section>

    );

}

export default GraphLegend;