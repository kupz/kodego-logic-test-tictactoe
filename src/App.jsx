import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {toast} from 'react-toastify'

function App() {

  // const [board, setBoard] = useState([[0,0,0], [0,0,0], [0,0,0]])
  const [board, setBoard] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(1)
  const [gameEnded, setGameEnded] = useState(false)
  const [scoreBoard, setScoreBoard] = useState([0, 0])
  const tira = (row, col) => {
    if(!gameEnded){
      if(board[row][col] === 0){
        const tempBoard = [...board]
        tempBoard[row][col] = playerTurn
        setPlayerTurn(playerTurn === 1 ? 2 : 1)
        setBoard(tempBoard)
        if(checkWin(row, col)){
          toast("Player " + (playerTurn === 1 ? "X" : "O") + " Wins!")
          setGameEnded(true)
          initializeBoard()
          const tempScoreBoard = [...scoreBoard]
          tempScoreBoard[playerTurn - 1] = tempScoreBoard[playerTurn - 1] + 1
          setScoreBoard(tempScoreBoard)
        }
        else if(checkDraw()){
          toast("Draw!")
          initializeBoard()
        }
      }
    }
  }
  const checkDraw = () => {
    for(let row = 0; row < 3; row++){
      for(let col = 0; col < 3; col++){
        if(board[row][col] === 0){
          return false
        }
      }
    }
    return true
  }
  const checkWin = (row, col) => {
    if(checkHorizontal(col) || checkVertical(row) || checkDiagonal()){
      return true
    }
    return false
  }
  const checkHorizontal = (col) => {
    for(let row = 0; row < 3; row++){
      if(board[row][col] !== playerTurn){
        return false
      }
    }
    return true
  }
  const checkVertical = (row) => {
    for(let col = 0; col < 3; col++){
      if(board[row][col] !== playerTurn){
        return false
      }
    }
    return true
  }
  const checkDiagonal = () => {
    let count = 0
    for(let c = {row: 0, col: 0}; c.row < 3 && c.col < 3; c.row++, c.col++){
      if(board[c.row][c.col] === playerTurn){
        count++
      }
    }
    if(count >= 3)
    {
      return true
    }
    
    for(let c = {row: 0, col: 2}; c.row < 3 && c.col >= 0; c.row++, c.col--){
      if(board[c.row][c.col] !== playerTurn){
        return false
      }
    }
    return true
  }

  const initializeBoard = () => {
    const tempBoard = []
    for(let row = 0; row < 3; row++){
      tempBoard[row] = []
      for(let col = 0; col < 3; col++){
        tempBoard[row][col] = 0
      }
    }
    setBoard(tempBoard)
    setGameEnded(false)
  }


  useEffect(() => {
    // initialize board
    initializeBoard()
  }, [])

  
  return (
    <>
    <h1>Tic tac toe gamers</h1>
    <div>
      <div>
        Player {playerTurn} Turn
      </div>
      <div>
        Player 1: {scoreBoard[0]}
      </div>
      <div>
        Player 2: {scoreBoard[1]}
      </div>
    </div>
      <div className='flex mb-2 justify-center mt-10'>
        <div className='flex gap-2'>
          <div onClick={() => {tira(0,0)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[0][0] === 1 ? 'X' : board[0][0] === 2 ? 'O' : '')}</div>
          <div onClick={() => {tira(0,1)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[0][1] === 1 ? 'X' : board[0][1] === 2 ? 'O' : '')}</div>
          <div onClick={() => {tira(0,2)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[0][2] === 1 ? 'X' : board[0][2] === 2 ? 'O' : '')}</div>

        </div>
        
      </div>
      <div className='flex mb-2 justify-center'>
        <div className='flex gap-2'>
          <div onClick={() => {tira(1,0)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[1][0] === 1 ? 'X' : board[1][0] === 2 ? 'O' : '')}</div>
          <div onClick={() => {tira(1,1)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[1][1] === 1 ? 'X' : board[1][1] === 2 ? 'O' : '')}</div>
          <div onClick={() => {tira(1,2)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[1][2] === 1 ? 'X' : board[1][2] === 2 ? 'O' : '')}</div>

        </div>
        
      </div>
      <div className='flex  justify-center'>
        <div className='flex gap-2'>
          <div onClick={() => {tira(2,0)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[2][0] === 1 ? 'X' : board[2][0] === 2 ? 'O' : '')}</div>
          <div onClick={() => {tira(2,1)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[2][1] === 1 ? 'X' : board[2][1] === 2 ? 'O' : '')}</div>
          <div onClick={() => {tira(2,2)}} style={{width: '100px'}} className='aspect-square flex justify-center items-center border border-black'>{board && (board[2][2] === 1 ? 'X' : board[2][2] === 2 ? 'O' : '')}</div>

        </div>
        
      </div>
    </>
  )
}

export default App
