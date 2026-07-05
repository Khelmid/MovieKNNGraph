import { useState } from "react";

import MovieInfo from "./MovieInfo";
import MovieGraph from "./MovieGraph";
import GraphStats from "./GraphStats";
import RecommendationList from "./RecommendationList";
import ExperimentCharts from "./ExperimentCharts";
import SimilarityMatrix from "./SimilarityMatrix";

function Dashboard({

    movie,

    recommendations,

    selectedK,

    setSelectedK

}) {

    const [showStats, setShowStats] = useState(true);

    if (!movie) return null;

    return (

        <section className="dashboard">

            {/* ====================================== */}
            {/* INFORMACIÓN DE LA PELÍCULA */}
            {/* ====================================== */}

            <MovieInfo
                movie={movie}
                k={selectedK}
                setK={setSelectedK}
            />

            {/* ====================================== */}
            {/* GRAFO + ESTADÍSTICAS */}
            {/* ====================================== */}

            <section className="dashboard-graph">

                <div className={`graph-layout ${!showStats ? "collapsed" : ""}`}>

                    {/* ============================= */}
                    {/* GRAFO */}
                    {/* ============================= */}

                    <div className="graph-left">

                        <div className="graph-header">

                            <div>

                                <h2>
                                    Visualización del Grafo KNN
                                </h2>

                                <p>
                                    Grafo de similitud semántica construido utilizando
                                    los <strong>{selectedK}</strong> vecinos más cercanos
                                    para cada película.
                                </p>

                            </div>

                        </div>

                        <MovieGraph
                            movie={movie}
                            k={selectedK}
                        />

                        <SimilarityMatrix
                            movie={movie}
                            k={selectedK}
                        />

                    </div>

                    {/* ============================= */}
                    {/* ESTADÍSTICAS */}
                    {/* ============================= */}

                    <aside className={`graph-right ${!showStats ? "collapsed" : ""}`}>

                        <GraphStats
                            k={selectedK}
                            showStats={showStats}
                            setShowStats={setShowStats}
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

            <ExperimentCharts />

        </section>

    );

}

export default Dashboard;