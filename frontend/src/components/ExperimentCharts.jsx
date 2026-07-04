import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import { getExperiments } from "../services/graphService";

function ExperimentCharts() {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function cargar() {

            const results = await getExperiments();

            setData(results);

        }

        cargar();

    }, []);

    return (

        <section className="experiment-charts">

            <h2>Experimental Evaluation</h2>

            <div className="charts-grid">

                {/* =============================== */}
                {/* CONNECTIVITY */}
                {/* =============================== */}

                <div className="chart-card">

                    <h3>Connectivity</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="k" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="average_degree"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                name="Average Degree"
                            />

                            <Line
                                type="monotone"
                                dataKey="density"
                                stroke="#22c55e"
                                strokeWidth={3}
                                name="Density"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                {/* =============================== */}
                {/* COMMUNITY */}
                {/* =============================== */}

                <div className="chart-card">

                    <h3>Community Structure</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="k" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="average_clustering"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                name="Clustering"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                {/* =============================== */}
                {/* GRAPH SIZE */}
                {/* =============================== */}

                <div className="chart-card">

                    <h3>Graph Size</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="k" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="edges"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                name="Edges"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                {/* =============================== */}
                {/* PERFORMANCE */}
                {/* =============================== */}

                <div className="chart-card">

                    <h3>Computational Performance</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="k" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="build_time"
                                stroke="#ef4444"
                                strokeWidth={3}
                                name="Build Time"
                            />

                            <Line
                                type="monotone"
                                dataKey="search_time"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                name="Search Time"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </section>

    );

}

export default ExperimentCharts;