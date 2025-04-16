import './App.scss';
import { useState, useEffect } from 'react';
import ColorCard from "./components/ColorCard";
import timeout from "./Utilities/utilities";

function App() {
  const [isOn, setIsOn] = useState(false);
    const colorList = ["green", "red", "gold", "blue"];
      const initPlay = {
        isDisplay: false,
        colors: [],
        score: 0,
        userPlay: false,
        userColors: [],
      };

  const [play, setPlay] = useState(initPlay);
  const [flashStep, setFlashStep] = useState("");

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if(isOn){setPlay({ ... initPlay, isDisplay: true});
      } else {
        setPlay(initPlay);
      }
  }, [isOn]);

  useEffect(()=>{
    if(isOn && play.isDisplay){
      let newColor = colorList[Math.floor(Math.random()*4)];
      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors})
    }
  }, [isOn, play.isDisplay])

  useEffect(()=> {
    if(isOn && play.isDisplay && play.colors.length){
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length])

  async function displayColors(){
    await timeout(1000);
    for(let i = 0; i < play.colors.length; i++){
      setFlashStep(play.colors[i]);
      await timeout(375);
      setFlashStep("");
      await timeout(500);
      if(i === play.colors.length - 1){
        const copyColors = [...play.colors];
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function stepClickHandle(color){
    if(!play.isDisplay && play.userPlay){
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashStep(color);

      if (color === lastColor){
        if (copyUserColors.length){
          setPlay({... play, userColors: copyUserColors});
        } else {
          await timeout(375);
          setPlay({
            ...play, 
            isDisplay: true,
            userPlay: false, 
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(375);
        setPlay({... initPlay, score: play.colors.length});
      }
      await timeout(375);
      setFlashStep("");
    }
  }

  function closeHandle(){
    setIsOn(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="simonDevice">
          {colorList && 
            colorList.map((v, i) => ( 
              <ColorCard 
                onClick={()=>{stepClickHandle(v);
                }} 
                flash={flashStep === v} 
                key={i} color={v}
              ></ColorCard>
            ))}
        </div>

        {isOn && !play.isDisplay && !play.userPlay && play.score && (
          <div className="lost">
            <div>Final Score: {play.score}</div>
            <button onClick={closeHandle}>Close</button>
          </div>
        )}
        {!isOn && !play.score && (
          <button onClick={startHandle} className="startButton">
            Start
          </button>
        )}
        {isOn && (play.isDisplay || play.userPlay) && (
          <div className= "score">{play.score}</div>
        )}
      </header>
    </div>
  );
}

export default App;
