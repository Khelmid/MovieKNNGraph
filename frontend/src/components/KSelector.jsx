function KSelector({ selectedK, onChange }) {

    const valores = [5, 10, 15, 20];

    return (

        <section className="k-selector">

            <div className="k-header">

                <h2>Configuración del Grafo KNN</h2>

                <p>
                    Seleccione el valor de <strong>K</strong>  para construir el grafo de similitud.
                </p>

            </div>

            <div className="k-buttons">

                {valores.map((k) => (

                    <button
                        key={k}
                        className={
                            selectedK === k
                                ? "k-button active"
                                : "k-button"
                        }
                        onClick={() => onChange(k)}
                    >

                        K = {k}

                    </button>

                ))}

            </div>

        </section>

    );

}

export default KSelector;