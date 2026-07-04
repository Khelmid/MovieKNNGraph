import MovieCard from "./MovieCard";

function RecommendationList({ recommendations }) {

    if (!recommendations?.length) return null;

    return (

        <section className="recommendations">

            <div className="recommendations-header">

                <h2>Recommended Movies</h2>

                <span>
                    {recommendations.length} movies
                </span>

            </div>

            <div className="recommendations-grid">

                {recommendations.map((movie) => (

                    <MovieCard
                        key={movie.movie}
                        movie={movie}
                    />

                ))}

            </div>

        </section>

    );

}

export default RecommendationList;