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
          alert("Done");
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
      alert("Enter your name first");
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
      <h1>Click Counter Game -- Developed By Dev Chouhan</h1>
      {/* Calling GameHeader, It will handle the header styling and Information for header */}
      <GameHeader
        playerName={playerName}
        setPlayerName={setPlayerName}
        timeLimit={timeLimit}
        setTimeLimit={setTimeLimit}
        currentDateTime={currentDateTime}
        isRunning={isRunning}
      />

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

      <Leaderboard />
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
