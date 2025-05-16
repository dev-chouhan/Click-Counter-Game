import React from 'react';

function GameControls({countdown, clicks, handleClick, handleStart, handlePause, handleResume, handleFinish, isRunning, isPaused}) {
    // Define our game styles directly in the component
    const styles = {
        container: {
            textAlign: "center",
            marginTop: "20px",
            fontFamily: "'Press Start 2P', cursive",
            color: "#ffffff",
            backgroundColor: "#121212",
            padding: "20px",
            borderRadius: "10px",
            border: "3px solid #6200ea",
            boxShadow: "0 6px 0 #0a00b6"
        },
        countdown: {
            color: "#9d46ff",
            fontSize: "24px",
            marginBottom: "15px",
            textShadow: "2px 2px 0px #0a00b6"
        },
        clicks: {
            color: "#ffffff",
            fontSize: "28px",
            marginBottom: "25px"
        },
        startButton: {
            fontSize: "20px",
            padding: "15px 30px",
            marginBottom: "25px",
            backgroundColor: "#6200ea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontFamily: "'Press Start 2P', cursive",
            boxShadow: "0 5px 0 #0a00b6",
            transition: "transform 0.1s",
            transform: "translateY(0)",
            ":active": {
                transform: "translateY(3px)",
                boxShadow: "0 2px 0 #0a00b6"
            }
        },
        clickButton: {
            fontSize: "30px",
            padding: "30px 60px",
            backgroundColor: "#9d46ff",
            color: "white",
            border: "none",
            borderRadius: "15px",
            marginBottom: "25px",
            cursor: "pointer",
            fontFamily: "'Press Start 2P', cursive",
            boxShadow: "0 8px 0 #6200ea",
            transition: "transform 0.1s, box-shadow 0.1s",
            transform: "translateY(0)"
        },
        controlButton: {
            fontSize: "16px",
            padding: "10px 20px",
            backgroundColor: "#121212",
            color: "#9d46ff",
            border: "2px solid #6200ea",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "'Press Start 2P', cursive",
            margin: "5px",
            boxShadow: "0 3px 0 #0a00b6"
        },
        finishButton: {
            fontSize: "14px",
            padding: "8px 15px",
            backgroundColor: "#121212",
            color: "#ffffff",
            border: "2px solid #6200ea",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "'Press Start 2P', cursive",
            marginTop: "15px",
            boxShadow: "0 3px 0 #0a00b6"
        },
        buttonContainer: {
            marginTop: "10px"
        }
    };

    // Custom click handler to add animation effect
    const handleClickWithEffect = (e) => {
        // Add a pressed effect
        e.target.style.transform = "translateY(5px)";
        e.target.style.boxShadow = "0 3px 0 #6200ea";
        
        // Reset after a brief delay
        setTimeout(() => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 0 #6200ea";
        }, 100);
        
        // Call the original handler
        handleClick();
    };

    return(
        <>
            {/* Google Font Import in a style tag */}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            `}} />
            
            <div style={styles.container}>
                <h2 style={styles.countdown}>TIME: {countdown.toFixed(3)}s</h2>
                <h2 style={styles.clicks}>SCORE: {clicks}</h2>

                {/* Before starting Game */}
                {!isRunning && countdown > 0 && (
                    <button 
                        onClick={handleStart} 
                        style={styles.startButton}
                    >
                        START GAME
                    </button>
                )}
                
                {/* While Running */}
                {isRunning && !isPaused && (
                    <>
                        <button 
                            onClick={handleClickWithEffect} 
                            style={styles.clickButton}
                        >
                            CLICK ME!!
                        </button>
                        {/* Pause button */}
                        <div>
                            <button 
                                onClick={handlePause}
                                style={styles.controlButton}
                            >
                                PAUSE
                            </button>
                        </div>
                    </>
                )}
                
                {/* Resume button */}
                {isRunning && isPaused && (
                    <div>
                        <button 
                            onClick={handleResume}
                            style={styles.controlButton}
                        >
                            RESUME
                        </button>
                    </div>
                )}
                
                {/* Finish Game */}
                {isRunning && (
                    <div style={styles.buttonContainer}>
                        <button 
                            onClick={handleFinish} 
                            style={styles.finishButton}
                        >
                            END GAME
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default GameControls;