import MovieInfo from "./MovieInfo";
import MovieGraph from "./MovieGraph";
import GraphStats from "./GraphStats";
import RecommendationList from "./RecommendationList";
import ExperimentCharts from "./ExperimentCharts";

function Dashboard({

    movie,

    recommendations,

    selectedK

}) {

    if (!movie) return null;

    return (

        <section className="dashboard">

            {/* ====================================== */}
            {/* INFORMACIÓN DE LA PELÍCULA */}
            {/* ====================================== */}

            <MovieInfo
                movie={movie}
            />

            {/* ====================================== */}
            {/* GRAFO + ESTADÍSTICAS */}
            {/* ====================================== */}

            <section className="dashboard-graph">

                <div className="graph-layout">

                    {/* ============================= */}
                    {/* GRAFO */}
                    {/* ============================= */}

                    <div className="graph-left">

                        <div className="graph-header">

                            <div>

                                <h2>
                                    KNN Graph Visualization
                                </h2>

                                <p>
                                    Semantic similarity graph using <strong>K = {selectedK}</strong>.
                                </p>

                            </div>

                        </div>

                        <MovieGraph
                            movie={movie}
                            k={selectedK}
                        />

                    </div>

                    {/* ============================= */}
                    {/* ESTADÍSTICAS */}
                    {/* ============================= */}

                    <aside className="graph-right">

                        <GraphStats
                            k={selectedK}
                        />

                    </aside>

                </div>

            </section>

            {/* ====================================== */}
            {/* RECOMENDACIONES */}
            {/* ====================================== */}

            <section className="dashboard-recommendations">

                <RecommendationList
                    recommendations={recommendations}
                />

            </section>

            {/* ====================================== */}
            {/* EVALUACIÓN EXPERIMENTAL */}
            {/* ====================================== */}

            

        </section>

    );

}

export default Dashboard;