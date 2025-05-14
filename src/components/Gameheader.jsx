function GameHeader({playerName, setPlayerName, timeLimit, setTimeLimit, currentDateTime, isRunning}) {
    return(
        <>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            {/* Player Name */}
            <div>
                <label>Player Name: </label>
                <input
                type="text"
                value={playerName}
                onChange={(e)=>setPlayerName(e.target.value)}
                placeholder="Enter Your Name Player"
                />
            </div>
            {/* Time Limit Section */}
            <div>
                <label>Time Limit: </label>
                <select value={timeLimit} onChange={(e)=>setTimeLimit(Number(e.target.value))}>
                    <option value={10}>10s</option>
                    <option value={30}>30s</option>
                    <option value={60}>60s</option>
                </select>
                {!isRunning && (
                    <p>(Default Time Limit is 10 Seconds)</p>
                )}
            </div>
            {/* Current Time Display */}
            <div>
                <strong>{currentDateTime.toLocaleString()}</strong>
            </div>
        </div>
        </>
    )
}

export default GameHeader