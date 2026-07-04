import ForceGraph2D from "react-force-graph-2d";
import { useEffect, useRef, useState } from "react";

import { getGraph } from "../services/graphService";
import GraphLegend from "./GraphLegend";

function MovieGraph({ movie, k }) {

    const fgRef = useRef();
    const containerRef = useRef();

    const [size, setSize] = useState({
        width: 900,
        height: 520
    });

    const [graph, setGraph] = useState({
        nodes: [],
        links: []
    });

    const [loading, setLoading] = useState(false);

    // =====================================================
    // RESPONSIVE
    // =====================================================

    useEffect(() => {

        function resize() {

            if (!containerRef.current) return;

            setSize({

                width: containerRef.current.offsetWidth,

                height: 520

            });

        }

        resize();

        window.addEventListener("resize", resize);

        return () =>
            window.removeEventListener("resize", resize);

    }, []);

    // =====================================================
    // LOAD GRAPH
    // =====================================================

    useEffect(() => {

        async function cargar() {

            if (!movie) return;

            setLoading(true);

            const data = await getGraph(
                movie.movie,
                k
            );

            if (!data.error) {

                setGraph({

                    nodes: data.nodes,

                    links: data.edges

                });

            }

            setLoading(false);

        }

        cargar();

    }, [movie, k]);

    // =====================================================
    // GRAPH CONFIGURATION
    // =====================================================

    useEffect(() => {

        if (!fgRef.current) return;

        fgRef.current.d3Force("charge").strength(-550);

        fgRef.current.d3Force("link").distance(120);

        fgRef.current.d3Force("center").strength(0.15);

        fgRef.current.d3ReheatSimulation();

        setTimeout(() => {

            fgRef.current.zoomToFit(700, 70);

        }, 700);

    }, [graph]);

    if (!movie) return null;

    if (loading) {

        return (

            <section className="graph-section">

                <div className="graph-canvas">

                    <p
                        style={{
                            textAlign: "center",
                            color: "#94a3b8",
                            paddingTop: "230px"
                        }}
                    >
                        Loading graph...
                    </p>

                </div>

            </section>

        );

    }

    return (

        <section className="graph-section">

            <div
                ref={containerRef}
                className="graph-canvas"
            >

                <ForceGraph2D

                    ref={fgRef}

                    width={size.width}

                    height={size.height}

                    graphData={graph}

                    backgroundColor="#111827"

                    cooldownTicks={300}

                    autoPauseRedraw={false}

                    nodeLabel={(node) => `Movie: ${node.label}

Genre: ${node.genre}

Year: ${node.year}

IMDb Rating: ⭐ ${node.rating}`}

                    nodeCanvasObject={(node, ctx) => {

                        const isSelected = node.group === 1;

                        const radius = isSelected ? 22 : 12;

                        ctx.beginPath();

                        ctx.arc(
                            node.x,
                            node.y,
                            radius,
                            0,
                            Math.PI * 2
                        );

                        ctx.fillStyle = isSelected
                            ? "#ef4444"
                            : "#38bdf8";

                        ctx.fill();

                        ctx.strokeStyle = "#ffffff";
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        ctx.fillStyle = "#ffffff";
                        ctx.textAlign = "center";

                        ctx.font = isSelected
                            ? "bold 15px Arial"
                            : "11px Arial";

                        const text = isSelected
                            ? node.label
                            : node.label.length > 16
                                ? node.label.substring(0, 16) + "..."
                                : node.label;

                        ctx.fillText(
                            text,
                            node.x,
                            node.y + radius + 16
                        );

                    }}

                    linkColor={(link) => {

                        if (link.weight >= 0.60)
                            return "#22c55e";

                        if (link.weight >= 0.55)
                            return "#f59e0b";

                        return "#64748b";

                    }}

                    linkWidth={(link) =>
                        Math.max(2.5, link.weight * 6)
                    }

                    linkDirectionalParticles={1}

                    linkDirectionalParticleSpeed={0.003}

                    enableNodeDrag

                    enableZoomInteraction

                    enablePanInteraction

                />

            </div>

            <GraphLegend />

        </section>

    );

}

export default MovieGraph;