function MovieCard({ movie }) {

    return (

        <article className="movie-card">

            <div className="movie-card-header">

                <h3>{movie.movie}</h3>

                <span className="movie-rating">
                    ⭐ {movie.rating}
                </span>

            </div>

            <p className="movie-genre">
                {movie.genre.replaceAll("|", " • ")}
            </p>

            <div className="movie-meta">

                <span>📅 {movie.year}</span>

                <span>⏱ {movie.duration} min</span>

            </div>

            <div className="similarity-box">

                <div className="similarity-header">

                    <span>Similarity</span>

                    <strong>{movie.similarity}%</strong>

                </div>

                <div className="similarity-bar">

                    <div

                        className="similarity-fill"

                        style={{

                            width: `${movie.similarity}%`

                        }}

                    />

                </div>

            </div>

        </article>

    );

}

export default MovieCard;