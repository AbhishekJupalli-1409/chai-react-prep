import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState("black")

  const handleColor = (e)=>{
    console.log(e)
    setColor(e);
  }

  return (
    <>
      <div className="w-full h-screen duration-200"
        style={{ backgroundColor: color}}
      >

        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-t-lg">
            <button
              onClick={() => handleColor("#ae1515")}
              className="outline-none px-6 py-1 rounded-t-lg text-white shadow-lg"
              style={{ backgroundColor: "#ae1515" }}
            >Red</button>

          
          <button
            onClick={() => handleColor("#b22189")}
            className="outline-none px-6 py-1 rounded-t-lg text-white shadow-lg"
            style={{ backgroundColor: "#b22189" }}
          >Pink</button>
          <button
            onClick={() => handleColor("#8a25dd")}
            className="outline-none px-6 py-1 rounded-t-lg text-white shadow-lg"
            style={{ backgroundColor: "#8a25dd" }}
          >Purple</button>
          <button
            onClick={()=>handleColor("#3783e7")}// ore else it will make infinite loop
            className="outline-none px-6 py-1 rounded-t-lg text-white shadow-lg"
            style={{ backgroundColor: "#3783e7" }}
          >Blue</button>
          <button
            onClick={()=>handleColor("#0000006e")}// ore else it will make infinite loop
            className="outline-none px-6 py-1 rounded-t-lg text-white shadow-lg"
            style={{ backgroundColor: "#0000006e" }}
          >Black</button>
          

        </div>
      </div>
    </div >
    </>
  )
}

export default App
