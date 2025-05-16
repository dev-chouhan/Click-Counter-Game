import React from 'react';

function GameHeader({playerName, setPlayerName, timeLimit, setTimeLimit, currentDateTime, isRunning}) {
    // Define our game styles directly in the component
    const styles = {
        gameHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#121212",
            padding: "15px 20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 4px 0 #0a00b6",
            fontFamily: "'Press Start 2P', cursive",
            color: "#ffffff",
            border: "2px solid #6200ea"
        },
        playerSection: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        timeSection: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        },
        dateSection: {
            display: "flex",
            alignItems: "center"
        },
        gameLabel: {
            fontSize: "12px",
            marginRight: "10px",
            color: "#9d46ff"
        },
        gameInput: {
            backgroundColor: "#121212",
            border: "2px solid #6200ea",
            color: "#ffffff",
            padding: "8px 12px",
            borderRadius: "4px",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "10px"
        },
        gameSelect: {
            backgroundColor: "#121212",
            border: "2px solid #6200ea",
            color: "#ffffff",
            padding: "8px 12px",
            borderRadius: "4px",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "10px"
        },
        timeNote: {
            fontSize: "8px",
            color: "#9d46ff",
            marginTop: "5px"
        },
        currentTime: {
            backgroundColor: "#6200ea",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "10px",
            boxShadow: "0 2px 0 #0a00b6"
        }
    };

    return(
        <>
            {/* Google Font Import in a style tag */}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            `}} />
            
            <div style={styles.gameHeader}>
                {/* Player Name */}
                <div style={styles.playerSection}>
                    <label style={styles.gameLabel}>Player Name: </label>
                    <input
                        style={styles.gameInput}
                        type="text"
                        value={playerName}
                        onChange={(e)=>setPlayerName(e.target.value)}
                        placeholder="Enter Your Name Player"
                    />
                </div>
                
                {/* Time Limit Section */}
                <div style={styles.timeSection}>
                    <label style={styles.gameLabel}>Time Limit: </label>
                    <select 
                        style={styles.gameSelect}
                        value={timeLimit} 
                        onChange={(e)=>setTimeLimit(Number(e.target.value))}
                    >
                        <option value={10}>10s</option>
                        <option value={30}>30s</option>
                        <option value={60}>60s</option>
                    </select>
                    {!isRunning && (
                        <p style={styles.timeNote}>(Default: 10s)</p>
                    )}
                </div>
                
                {/* Current Time Display */}
                <div style={styles.dateSection}>
                    <span style={styles.currentTime}>{currentDateTime.toLocaleString()}</span>
                </div>
            </div>
        </>
    );
}

export default GameHeader;