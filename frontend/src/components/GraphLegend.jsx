function GraphLegend() {

    return (

        <div className="graph-legend">

            <div className="legend-item">

                <span className="legend-node query"></span>

                <span>Query Movie</span>

            </div>

            <div className="legend-item">

                <span className="legend-node similar"></span>

                <span>Similar Movies</span>

            </div>

            <div className="legend-item">

                <span className="legend-line high"></span>

                <span>High Similarity</span>

            </div>

            <div className="legend-item">

                <span className="legend-line medium"></span>

                <span>Medium Similarity</span>

            </div>

            <div className="legend-item">

                <span className="legend-line low"></span>

                <span>Low Similarity</span>

            </div>

        </div>

    );

}

export default GraphLegend;