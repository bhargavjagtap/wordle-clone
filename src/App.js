import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import React,{createContext,useState, useEffect} from 'react';// to pass data through all components instead of passing props from component to component
import {boardDefault, generateWordSet} from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setcurrAttempt] = useState({attempt:0, letterPos:0});
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver:false, 
    guessedWord:false
  });
  
  // const correctWord = "RIGHT";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
  })
  }, []);

  const onEnter = () => {
      if (currAttempt.letterPos !== 5) return;

      let currWord = ""
      for (let index = 0; index < 5; index++) {
        currWord += board[currAttempt.attempt][index];
      }
      if (wordSet.has(currWord.toLowerCase())) {
       setcurrAttempt({attempt:currAttempt.attempt+1, letterPos:0});
      }else{
        alert("Wrong word");
      }

      if (currWord === correctWord) {

        setGameOver({gameOver:true, guessedWord:true})
        return;
      }

      if (currAttempt.attempt === 5) {
        setGameOver({gameOver:true, guessedWord:false})
        return;
      }
      setcurrAttempt({attempt:currAttempt.attempt+1, letterPos:0});
  }

  const onDelete = () => {
    const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
      setBoard(newBoard);
      setcurrAttempt({...currAttempt, letterPos:currAttempt.letterPos - 1});
  }

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setcurrAttempt({...currAttempt, letterPos:currAttempt.letterPos+1});
  }

   return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value = {
        {
          board,
          setBoard,
          currAttempt,
          setcurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,  
        }
      } >
        <div className='game'>
          <Board/>
          {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
