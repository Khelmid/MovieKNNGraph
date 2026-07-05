function MovieInfo({ movie, k, setK }) {

    if (!movie) return null;

    return (

        <section className="movie-info">

            {/* ====================================== */}
            {/* CABECERA */}
            {/* ====================================== */}

            <div className="movie-header">

                <h1>{movie.movie}</h1>

                <div className="movie-genres">

                    {movie.genre.split("|").map((genre) => (

                        <span
                            key={genre}
                            className="genre-tag"
                        >
                            • {genre}
                        </span>

                    ))}

                </div>

            </div>

            {/* ====================================== */}
            {/* CONTENIDO */}
            {/* ====================================== */}

            <div className="movie-content">

                {/* ================================= */}
                {/* INFORMACIÓN */}
                {/* ================================= */}

                <div className="movie-details">

                    <h3>
                        Información de la película
                    </h3>

                    <div className="movie-data">

                        <div className="data-row">
                            <span>Año</span>
                            <strong>{movie.year}</strong>
                        </div>

                        <div className="data-row">
                            <span>Duración</span>
                            <strong>{movie.duration} min</strong>
                        </div>

                        <div className="data-row">
                            <span>Votos</span>
                            <strong>{movie.votes.toLocaleString()}</strong>
                        </div>

                        <div className="data-row">
                            <span>Popularidad</span>
                            <strong>
                                {Number(movie.popularity).toFixed(2)}
                            </strong>
                        </div>

                        <div className="data-row">
                            <span>Calificación</span>
                            <strong>
                                ⭐ {movie.rating}/10
                            </strong>
                        </div>

                    </div>

                    <div className="movie-synopsis">

                        <h3>Sinopsis</h3>

                        <p>

                            {movie.synopsis?.trim()

                                ? movie.synopsis

                                : "No hay sinopsis disponible para esta película."}

                        </p>

                    </div>

                </div>

                {/* ================================= */}
                {/* KNN */}
                {/* ================================= */}

                <aside className="movie-knn">

                    <h3>
                        Configuración KNN
                    </h3>

                    <p>
                        Seleccione el valor de <strong>K</strong>
                    </p>

                    <div className="k-buttons">

                        {[5, 10, 15, 20].map((value) => (

                            <button

                                key={value}

                                className={
                                    value === k
                                        ? "k-button active"
                                        : "k-button"
                                }

                                onClick={() => setK(value)}

                            >

                                K = {value}

                            </button>

                        ))}

                    </div>

                </aside>

            </div>

        </section>

    );

}

export default MovieInfo;