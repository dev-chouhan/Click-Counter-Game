function GameControls({countdown, clicks, handleClick, handleStart, handlePause, handleResume, handleFinish, isRunning, isPaused}) {
    return(
        <>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>Time Left: {countdown}</h2>
                <h2>Total Clicks: {clicks}</h2>

                {/* Before starting Game check if (game is paused or haven't started)?"start game":""*/}
                {!isRunning && countdown > 0 && (
                    <button onClick={handleStart} style={{ fontSize: "20px", padding: "10px 20px", marginBottom: "20px" }}>
                        Start Game
                    </button>
                )}
                {/* While Running check if (game is started or resumed)?"Click Me!!":""*/}
                {isRunning && !isPaused && (
                    <>
                        <button onClick={handleClick} style={{fontSize: "30px",padding: "30px 60px",background: "#0d6efd",color: "white",border: "none",borderRadius: "10px",marginBottom: "20px",cursor: "pointer",}}>
                            Click Me!!
                        </button>
                        {/* Pause button if (!paused)?"show pause":""*/}
                        <div>
                            <button onClick={handlePause}>Pause</button>
                        </div>
                    </>
                )}
                {/* if (paused)?"Resume Button":"" */}
                {isRunning && isPaused && (
                    <div>
                        <button onClick={handleResume}>Resume</button>
                    </div>
                )}
                {/* Finish Game  */}
                {isRunning && (
                    <div style={{marginTop:"10px"}}>
                        <button onClick={handleFinish} style={{color:"red"}}>
                            Finish Game
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default GameControls