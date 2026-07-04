import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import KSelector from "./components/KSelector";
import Dashboard from "./components/Dashboard";
import ExperimentTable from "./components/ExperimentTable";

import { buscarPelicula } from "./services/api";

import "./styles/global.css";

function App() {

    // ==========================================
    // Estados
    // ==========================================

    const [movie, setMovie] = useState(null);

    const [recommendations, setRecommendations] = useState([]);

    const [selectedK, setSelectedK] = useState(5);

    const [searchMovie, setSearchMovie] = useState("");

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Buscar película
    // ==========================================

    async function buscar(nombre) {

        setLoading(true);

        setSearchMovie(nombre);

        const data = await buscarPelicula(
            nombre,
            selectedK
        );

        if (!data || data.error) {

            setLoading(false);

            alert("Movie not found.");

            return;

        }

        setMovie(data.query);

        setRecommendations(data.recommendations);

        setLoading(false);

    }

    // ==========================================
    // Actualizar recomendaciones al cambiar K
    // ==========================================

    useEffect(() => {

        if (!searchMovie) return;

        async function actualizar() {

            setLoading(true);

            const data = await buscarPelicula(
                searchMovie,
                selectedK
            );

            if (data && !data.error) {

                setMovie(data.query);

                setRecommendations(data.recommendations);

            }

            setLoading(false);

        }

        actualizar();

    }, [selectedK, searchMovie]);

    // ==========================================
    // Render
    // ==========================================

    return (

        <div className="app">

            <Header />

            <SearchBar
                onSearch={buscar}
                loading={loading}
            />

            {/* Selector de K */}

            <KSelector
                selectedK={selectedK}
                onChange={setSelectedK}
            />

            {/* Dashboard */}

            {

                movie && (

                    <>

                        <Dashboard
                            movie={movie}
                            recommendations={recommendations}
                            selectedK={selectedK}
                        />

                        <ExperimentTable />

                    </>
                    

                )

            }

        </div>

    );

}

export default App;