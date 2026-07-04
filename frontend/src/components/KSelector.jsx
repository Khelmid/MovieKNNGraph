function KSelector({ selectedK, onChange }) {

    const valores = [5, 10, 15, 20];

    return (

        <section className="k-selector">

            <div className="k-header">

                <h2>KNN Configuration</h2>

                <p>
                    Select the value of <strong>K</strong> used to build the similarity graph.
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