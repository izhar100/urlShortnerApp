import { useState } from 'react'
import './App.css'
import Urlshortner from './components/Urlshortner'
import { Box, Button, Heading, Input } from '@chakra-ui/react'

function App() {

  return (
      <div className="app-container">
        <Heading textAlign={"center"} position={"absolute"} color={"#ffffff"} top={"20%"}>WELCOME TO URL SHORTNER</Heading>
        <div className="context">
          <Urlshortner/>
        </div>

        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >
      </div>
  )
}

export default App