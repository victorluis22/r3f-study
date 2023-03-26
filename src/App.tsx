import React from "react"
import MainWindow from "./components/MainWindow"

const App: React.FC = () => {
  return (
    <div className='App'>
      <MainWindow showStat={true} allowMoviment={true} backgroundColor="#c2c2c2" showAxis={true} />
    </div>
  )
}

export default App
