import { useState, useEffect } from "react";
import GameHeader from "./components/Gameheader";
import GameControls from "./components/GameControls";

function App() {

  // For Gameheader
  const [playerName, setPlayerName] = useState("");
  const [timeLimit, setTimeLimit] = useState(10); // Default time limit will be 10 seconds.
  const [currentDateTime, setCurrentDateTime] = useState(currentDT());

  // For GameControls
  const [countdown, setCountdown] = useState(timeLimit);
  const [clicks, setClicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPause] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);

  useEffect(()=>{
    const dd = setInterval(() => {
      setCurrentDateTime(currentDT());
    }, 1000);

    return () => clearInterval(dd);
  }, []);

  // useEffect for setting timeLimit
  useEffect(()=>{
    if(!isRunning){
      setCountdown(timeLimit);
    }
  }, [timeLimit]);

  // useEffect for Timer interval logic
  useEffect(() => {
    let timer = null;
    if (isRunning && !isPaused && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (isRunning && countdown === 0) {
      setIsRunning(false);
      saveGameResult();
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, countdown]);  

  const handleStart = () => {
    // if(!playerName.trim()){   ************************************************
    //   alert("Enter your name first");
    //   return;
    // }
    setClicks(0);
    setPauseCount(0);
    setCountdown(timeLimit);
    setIsRunning(true);
    setIsPause(false);
  }

  const handlePause = () => {
    setIsPause(true);
    setPauseCount((prev)=>prev+1);
  }

  const handleResume = () => {
    setIsPause(false);
  }

  const handleClick = () => {
    setClicks((prev)=>prev+1);
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
        playerName = {playerName}
        setPlayerName = {setPlayerName}
        timeLimit = {timeLimit}
        setTimeLimit = {setTimeLimit}
        currentDateTime = {currentDateTime}
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
    </>
  )
}

function currentDT(){
  const dt = new Date();
  return dt;
}

export default App
