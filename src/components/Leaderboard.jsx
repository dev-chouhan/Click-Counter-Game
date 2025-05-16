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

    // Define our arcade-style game interface styles
    const styles = {
        container: {
            marginTop: "3rem",
            fontFamily: "'Press Start 2P', cursive",
            color: "#ffffff",
            backgroundColor: "#121212",
            padding: "20px",
            borderRadius: "10px",
            border: "3px solid #6200ea",
            boxShadow: "0 6px 0 #0a00b6"
        },
        title: {
            color: "#9d46ff",
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "20px",
            textShadow: "2px 2px 0px #0a00b6"
        },
        controls: {
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
            justifyContent: "center"
        },
        input: {
            backgroundColor: "#121212",
            border: "2px solid #6200ea",
            color: "#ffffff",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "10px",
            margin: "5px"
        },
        select: {
            backgroundColor: "#121212",
            border: "2px solid #6200ea",
            color: "#ffffff",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "10px",
            margin: "5px"
        },
        table: {
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0",
            border: "none",
            fontSize: "10px"
        },
        thead: {
            backgroundColor: "#6200ea",
            color: "white"
        },
        th: {
            padding: "12px 6px",
            textAlign: "center",
            borderBottom: "2px solid #9d46ff"
        },
        tr: {
            transition: "background-color 0.2s"
        },
        trEven: {
            backgroundColor: "rgba(98, 0, 234, 0.1)"
        },
        trOdd: {
            backgroundColor: "rgba(10, 0, 182, 0.2)"
        },
        td: {
            padding: "10px 6px",
            textAlign: "center",
            borderBottom: "1px solid #6200ea"
        },
        highlight: {
            color: "#9d46ff",
            fontWeight: "bold"
        },
        noResults: {
            textAlign: "center",
            padding: "20px",
            color: "#9d46ff",
            fontSize: "16px"
        }
    };

    return (
        <>
            {/* Google Font Import in a style tag */}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            `}} />
            
            <div style={styles.container}>
                <h2 style={styles.title}>🏆 HIGH SCORES 🏆</h2>
                
                <div style={styles.controls}>
                    <input
                        style={styles.input}
                        placeholder="SEARCH PLAYER..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                    <select 
                        style={styles.select}
                        value={sortField} 
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="allRank">OVERALL RANK</option>
                        <option value="rank60">60s RANK</option>
                        <option value="rank30">30s RANK</option>
                        <option value="rank10">10s RANK</option>
                    </select>
                    
                    <select 
                        style={styles.select}
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">⬆ ASCENDING</option>
                        <option value="desc">⬇ DESCENDING</option>
                    </select>
                </div>
                
                {filteredGames.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                        <table style={styles.table}>
                            <thead style={styles.thead}>
                                <tr>
                                    <th style={styles.th}>RANK</th>
                                    <th style={styles.th}>PLAYER</th>
                                    <th style={styles.th}>DATE</th>
                                    <th style={styles.th}>TIME</th>
                                    <th style={styles.th}>PAUSES</th>
                                    <th style={styles.th}>CLICKS</th>
                                    <th style={styles.th}>ALL</th>
                                    <th style={styles.th}>60s</th>
                                    <th style={styles.th}>30s</th>
                                    <th style={styles.th}>10s</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGames.map((g, i) => (
                                    <tr 
                                        key={i} 
                                        style={i % 2 === 0 ? {...styles.tr, ...styles.trEven} : {...styles.tr, ...styles.trOdd}}
                                    >
                                        <td style={styles.td}>{i + 1}</td>
                                        <td style={{...styles.td, ...styles.highlight}}>{g.playerName}</td>
                                        <td style={styles.td}>{g.dateTime}</td>
                                        <td style={styles.td}>{g.timeLimit}s</td>
                                        <td style={styles.td}>{g.pauseCount}</td>
                                        <td style={{...styles.td, ...styles.highlight}}>{g.clicks}</td>
                                        <td style={styles.td}>{g.allRank}</td>
                                        <td style={styles.td}>{g.rank60 ?? "-"}</td>
                                        <td style={styles.td}>{g.rank30 ?? "-"}</td>
                                        <td style={styles.td}>{g.rank10 ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={styles.noResults}>
                        NO PLAYERS FOUND
                    </div>
                )}
            </div>
        </>
    );
};

export default Leaderboard;