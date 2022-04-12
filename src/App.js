import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import {createContext,useState, useEffect} from 'react';// to pass data through all components instead of passing props from component to component
import {boardDefault, generateWordSet} from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setcurrAttempt] = useState({attempt:0, letterPos:0});
  const [wordSet, setWordSet] = useState(new Set())

  const correctWord = "RIGHT";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
  })
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setcurrAttempt({...currAttempt, letterPos:currAttempt.letterPos+1});
  }
  const onDelete = () => {
    const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
      setBoard(newBoard);
      setcurrAttempt({...currAttempt, letterPos:currAttempt.letterPos - 1});
  }
  const onEnter = () => {
      if (currAttempt.letterPos !== 5) return;
      setcurrAttempt({attempt:currAttempt.attempt+1, letterPos:0});
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
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord
        }
      } >
        <div className='game'>
          <Board/>
          <Keyboard/>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
