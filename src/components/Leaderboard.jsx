import React, { useEffect, useState } from "react";
import { enrichWithScoresAndRanks } from "./enrichWithScoresAndRanks";

const Leaderboard = () => {
    const [game, setGame] = useState([]);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("allRank");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const raw = localStorage.getItem("clickGameResults");
        console.log("Raw clickGameResults from localStorage:", raw);
        let savedResults = [];
        try {
            savedResults = JSON.parse(raw || "[]");
        } catch (error) {
            console.error("Failed to parse clickGameResults from localStorage:", error);
            savedResults = [];
        }
        console.log("Parsed clickGameResults:", savedResults);
        const enriched = enrichWithScoresAndRanks(savedResults);
        setGame(enriched);
    }, []);


    const filteredGames = game
        .filter((g) => g.playerName?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if (sortOrder === "asc") return fieldA - fieldB;
            return fieldB - fieldA;
        });

    return (
        <div style={{ marginTop: "3rem" }}>
            <h2>🏆 Leaderboard</h2>
            <div style={{ marginBottom: "1rem" }}>
                <input
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="allRank">Overall Rank</option>
                    <option value="rank60">60s Rank</option>
                    <option value="rank30">30s Rank</option>
                    <option value="rank10">10s Rank</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">⬆ Ascending</option>
                    <option value="desc">⬇ Descending</option>
                </select>
            </div>
            <table border="1" cellPadding="6">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Player Name</th>
                        <th>Date & Time</th>
                        <th>Timer</th>
                        <th>Pauses</th>
                        <th>Clicks</th>
                        <th>Rank (All)</th>
                        <th>60s</th>
                        <th>30s</th>
                        <th>10s</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map((g, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{g.playerName}</td>
                            <td>{g.dateTime}</td>
                            <td>{g.timeLimit}s</td>
                            <td>{g.pauseCount}</td>
                            <td>{g.clicks}</td>
                            <td>{g.allRank}</td>
                            <td>{g.rank60 ?? "-"}</td>
                            <td>{g.rank30 ?? "-"}</td>
                            <td>{g.rank10 ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
