import { useState, useEffect, useRef } from "react";
import GameHeader from "./components/Gameheader";
import GameControls from "./components/GameControls";
import Leaderboard from "./components/Leaderboard";

function App() {
  // For Gameheader
  const [playerName, setPlayerName] = useState("");
  const [timeLimit, setTimeLimit] = useState(10); // Default time limit will be 10 seconds.
  const [currentDateTime, setCurrentDateTime] = useState(currentDT());

  // For GameControls
  const [countdown, setCountdown] = useState(timeLimit);
  const [endTime, setEndTime] = useState(null); // For milliseconds
  const [pauseStartTime, setPauseStartTime] = useState(null); // To prevent time to run out even after pausing (to freez useEffect)
  const [clicks, setClicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPause] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);

  // Add refs to keep latest values
  const clicksRef = useRef(clicks);
  const playerNameRef = useRef(playerName);
  const timeLimitRef = useRef(timeLimit);
  const pauseCountRef = useRef(pauseCount);

  // Game styling with responsive design
  const styles = {
    container: {
      width: "100%",
      maxWidth: "70%",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#121212",
      borderRadius: "15px",
      border: "4px solid #6200ea",
      boxShadow: "0 8px 0 #0a00b6, 0 15px 20px rgba(0, 0, 0, 0.4)",
      boxSizing: "border-box",
    },
    title: {
      textAlign: "center",
      color: "#9d46ff",
      fontSize: "clamp(18px, 5vw, 24px)",
      marginBottom: "30px",
      textShadow: "3px 3px 0px #0a00b6",
      padding: "10px",
      border: "2px solid #6200ea",
      borderRadius: "8px",
      backgroundColor: "rgba(98, 0, 234, 0.1)",
      overflowWrap: "break-word",
      wordWrap: "break-word",
    },
    footer: {
      textAlign: "center",
      fontSize: "clamp(8px, 3vw, 12px)",
      color: "#9d46ff",
      marginTop: "40px",
      padding: "10px",
      borderTop: "2px solid #6200ea",
    },
    pixelCorners: {
      position: "relative",
    },
    pixelCorner: {
      position: "absolute",
      width: "12px",
      height: "12px",
      backgroundColor: "#0a00b6",
    },
    topLeft: {
      top: 0,
      left: 0,
      borderTopLeftRadius: "0",
    },
    topRight: {
      top: 0,
      right: 0,
      borderTopRightRadius: "0",
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
      borderBottomLeftRadius: "0",
    },
    bottomRight: {
      bottom: 0,
      right: 0,
      borderBottomRightRadius: "0",
    },
    divider: {
      height: "3px",
      background: "linear-gradient(to right, #121212, #6200ea, #121212)",
      margin: "20px 0",
      borderRadius: "3px",
    }
  };

  // Sync refs with state
  useEffect(() => { clicksRef.current = clicks; }, [clicks]);
  useEffect(() => { playerNameRef.current = playerName; }, [playerName]);
  useEffect(() => { timeLimitRef.current = timeLimit; }, [timeLimit]);
  useEffect(() => { pauseCountRef.current = pauseCount; }, [pauseCount]);

  useEffect(() => {
    const dd = setInterval(() => {
      setCurrentDateTime(currentDT());
    }, 1000);

    return () => clearInterval(dd);
  }, []);

  // useEffect for setting timeLimit
  useEffect(() => {
    if (!isRunning) {
      setCountdown(timeLimit);
      setEndTime(null);
    }
  }, [timeLimit]);

  // useEffect for Timer interval logic (modified to use refs on saveGameResult)
  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        const milliSecFrom1Jan1970 = Date.now();
        const timeLeft = (endTime - milliSecFrom1Jan1970) / 1000;
        if (timeLeft <= 0) {
          alert("Game Over! You scored " + clicksRef.current + " clicks!");
          setCountdown(0);
          setIsRunning(false);
          clearInterval(interval);
          // Use refs to get latest values
          saveGameResult({
            playerName: playerNameRef.current,
            timeLimit: timeLimitRef.current,
            clicks: clicksRef.current,
            pauseCount: pauseCountRef.current
          });
          window.dispatchEvent(new Event("gameResultSaved"));
          window.location.reload();
        } else {
          setCountdown(timeLeft);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, endTime]);


  const handleStart = () => {
    if (!playerName.trim()) {
      alert("Enter your name first!");
      return;
    }
    setClicks(0);
    setPauseCount(0);
    setCountdown(timeLimit);
    setIsRunning(true);
    setIsPause(false);
    const milliSecFrom1Jan1970 = currentDT().getTime();
    setEndTime(milliSecFrom1Jan1970 + timeLimit * 1000);
  }

  const handlePause = () => {
    setIsPause(true);
    setPauseStartTime(Date.now());
    setPauseCount((prev) => prev + 1);
  }

  const handleResume = () => {
    setIsPause(false);
    if (pauseStartTime) {
      const pauseDuration = Date.now() - pauseStartTime; // in milliseconds
      setEndTime(prev => prev + pauseDuration);
    }
    setPauseStartTime(null);
  }

  const handleClick = () => {
    setClicks((prev) => {
      console.log(prev + 1); // log the next clicks value
      return prev + 1;
    });
  }

  const handleFinish = () => {
    // Fully reset without saving to localstorage
    setIsRunning(false);
    setIsPause(false);
    setClicks(0);
    setPauseCount(0);
    setCountdown(timeLimit);
  }

  return (
    <>
      {/* Google Font Import in a style tag */}
      <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          body {
            background-color: #121212;
            color: #ffffff;
            font-family: 'Press Start 2P', cursive;
            margin: 0;
            padding: clamp(10px, 3vw, 20px);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
          }
          
          /* Remove default form styling on mobile */
          input, select, button {
            appearance: none;
            -webkit-appearance: none;
            border-radius: 0;
            font-family: 'Press Start 2P', cursive;
          }
          
          /* Make select elements show dropdown arrow */
          select {
            background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
            background-repeat: no-repeat;
            background-position: right 8px center;
            padding-right: 30px !important;
          }
      `}} />
      
      <div style={styles.container}>
        <div style={styles.pixelCorners}>
          <div style={{...styles.pixelCorner, ...styles.topLeft}}></div>
          <div style={{...styles.pixelCorner, ...styles.topRight}}></div>
          <div style={{...styles.pixelCorner, ...styles.bottomLeft}}></div>
          <div style={{...styles.pixelCorner, ...styles.bottomRight}}></div>
          
          <h1 style={styles.title}>SPEED CLICKER</h1>
          
          {/* Calling GameHeader, It will handle the header styling and Information for header */}
          <GameHeader
            playerName={playerName}
            setPlayerName={setPlayerName}
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
            currentDateTime={currentDateTime}
            isRunning={isRunning}
          />
          
          <div style={styles.divider}></div>

          <GameControls
            countdown={countdown}
            clicks={clicks}
            handleClick={handleClick}
            handleStart={handleStart}
            handlePause={handlePause}
            handleResume={handleResume}
            handleFinish={handleFinish}
            isRunning={isRunning}
            isPaused={isPaused}
          />
          
          <div style={styles.divider}></div>

          <Leaderboard />
          
          <div style={styles.footer}>
            DEVELOPED BY DEV CHOUHAN // 2025 EDITION
          </div>
        </div>
      </div>
    </>
  )
}

function currentDT() {
  const dt = new Date();
  return dt;
}

function saveGameResult({ playerName, timeLimit, clicks, pauseCount }) {
  const results = JSON.parse(localStorage.getItem("clickGameResults")) || [];

  const now = new Date();
  const dateTime = now.toLocaleString();

  results.push({
    playerName,
    timeLimit,
    clicks,
    pauseCount,
    dateTime,
  });

  localStorage.setItem("clickGameResults", JSON.stringify(results));
}

export default App;