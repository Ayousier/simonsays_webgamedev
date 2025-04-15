import './App.scss';
import { useState, useEffect } from 'react';
import ColorCard from "./components/ColorCard";

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

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if(isOn){
        setPlay({ ... initPlay, isDisplay: true});
      } else {
        setPlay(initPlay);
      }
  }, [isOn]);

  useEffect(()=>{
    if(isOn && play.isDisplay){
      let newColor = colorList[Math.floor(Math.random()*4)]
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

}

  return (
    <div className="App">
      <header className="App-header">
        <div className="simonDevice">
          {colorList && 
            colorList.map((v, i) => ( <ColorCard key={i} color={v}></ColorCard>))}
        </div>
        {!isOn && (
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
