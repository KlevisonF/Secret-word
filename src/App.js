//css
import './App.css';
//React
import StartScream from './component/StartScream'
import { useCallback, useEffect, useState } from 'react';
import GameOver from './component/GameOver';
import Game from './component/Game';
import { wordsList } from './data/words';

const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  //process the secret word game
  const startGame = () =>{
    setGameStage(stages[1].name);
  }

  //process the letter input
  const verifyLetter = () =>{
    setGameStage(stages[2].name)
  }
  const retry = () =>{
    setGameStage(stages[0].name)
  }

 

  return (
    <div className="App">
     {gameStage === 'start' && <StartScream startGame={startGame}/>}
     {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
     {gameStage === 'end' && <GameOver retry={retry}/>} 
   
    </div>
  );
}

export default App;
