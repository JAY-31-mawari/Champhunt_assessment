import React, { useEffect, useState } from "react";
import io from 'socket.io-client'


function App(){
  const socket=io.connect("http://localhost:4000")
  const [score, setScore]=useState(0)

  useEffect(()=>{
    
    socket.on('score',(data)=>{
      console.log(data.message)
      setScore(data.message)
    })
  })
  
  function handleClick(){
    console.log("clicked")
    socket.emit('send_message',{message:"hello"})
  }

  return (
    <>
      <h1>Scoring App</h1>
      <h2>Score : {score}</h2>
      <button onClick={handleClick}>Add Score by 10</button>
    </>
  )
}

export default App