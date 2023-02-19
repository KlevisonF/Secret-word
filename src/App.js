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
const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);
  
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, SetScore] = useState(0)

  console.log(words)

  //pick a random category
  const pickWordAndCategory = useCallback(() => {
    //generate random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //generate random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { category, word };
  }, [words])

  //process the secret word game
  const startGame = useCallback(() => {
    clearLettersStates();

    const { category, word } = pickWordAndCategory();

    let wordLetters = word.split(""); //divide
    //
    wordLetters = wordLetters.map((l) => l.toLowerCase()); 

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory])

  //process the letter input
  const verifyLetter = (letter) =>{
   
    const normalizedLetter = letter.toLowerCase()
    //check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

  //push guessed letter or remove a letter
  if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, letter,
    normalizedLetter]);
  }else{
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters, 
      normalizedLetter]);
      setGuesses((actualGuesses)=> actualGuesses - 1)
  }
 };
 console.log(wrongLetters);
 //resetar game
 const retry = () =>{
  SetScore(0);
  setGuesses(guessesQty);
  setGameStage(stages[0].name)
}


 const clearLettersStates = () =>{
  setGuessedLetters([]);
  setWrongLetters([]);

};
//check if gueses ended
  useEffect(() =>{
    if(guesses === 0){
    //reset all states
      clearLettersStates()
      setGameStage(stages[2].name)
    }
  },[guesses]);

  //check win condition
  useEffect(()=>{
    const uniqueLetters = [... new Set(letters)];
    console.log(uniqueLetters);
    console.log(guessedLetters);

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      //Add score 
       SetScore((actualScore) => actualScore += 100)
       //resetar game with new word
       startGame();
    }

    console.log(uniqueLetters)

  },[guessedLetters, letters, startGame]);
  
  
 

 
 

  return (
    <div className="App">
     {gameStage === 'start' && <StartScream startGame={startGame}/>}
     {gameStage === 'game' &&  <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
     {gameStage === 'end' && <GameOver retry={retry} score={score}/>} 
   
    </div>
  );
}

export default App;
