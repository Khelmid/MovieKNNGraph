import { useState } from "react";

function SearchBar({ onSearch }) {

    const [movie, setMovie] = useState("");

    function buscar() {

        if (movie.trim() === "") return;

        onSearch(movie);

    }

    return (

        <div className="search">

            <input
                type="text"
                placeholder="Escribe nombre de la película..."
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        buscar();
                    }
                }}
            />

            <button onClick={buscar}>
                Buscar
            </button>

        </div>

    );

}

export default SearchBar;