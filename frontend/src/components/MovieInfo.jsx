function MovieInfo({ movie }) {

    if (!movie) return null;

    return (

        <section className="movie-info">

            {/* ====================================== */}
            {/* CABECERA */}
            {/* ====================================== */}

            <div className="movie-header">

                <div>

                    <h1>{movie.movie}</h1>

                    <p className="movie-year">
                        {movie.year}
                    </p>

                </div>

                <div className="movie-score">

                    <span>⭐</span>

                    <strong>{movie.rating}</strong>

                    <small>/10</small>

                </div>

            </div>

            {/* ====================================== */}
            {/* GÉNEROS */}
            {/* ====================================== */}

            <div className="movie-genres">

                {movie.genre.split("|").map((genre) => (

                    <span
                        key={genre}
                        className="genre-tag"
                    >
                        {genre}
                    </span>

                ))}

            </div>

            {/* ====================================== */}
            {/* MÉTRICAS */}
            {/* ====================================== */}

            <div className="movie-metrics">

                <div className="metric">

                    <span>Duration</span>

                    <strong>{movie.duration} min</strong>

                </div>

                <div className="metric">

                    <span>Votes</span>

                    <strong>{movie.votes.toLocaleString()}</strong>

                </div>

                <div className="metric">

                    <span>Popularity</span>

                    <strong>
                        {Number(movie.popularity).toFixed(2)}
                    </strong>

                </div>

            </div>

            {/* ====================================== */}
            {/* SINOPSIS */}
            {/* ====================================== */}

            <div className="movie-synopsis">

                <h3>Synopsis</h3>

                <p>
                    {movie.synopsis?.trim()
                        ? movie.synopsis
                        : "No synopsis available for this movie."}
                </p>

            </div>

        </section>

    );

}

export default MovieInfo;