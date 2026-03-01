import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <h3 className='text-green-500'>Hello from tailwing</h3>
          <div className=' ' id='passworddiv'>
              <input type="border-2 border-solid border-white text" /> 
              <button className='text-grey-600 cursor-pointer bg-sky-300  px-2 py-1 rounded-sm'>Copy</button>
          </div>

    </>
  )
}

export default App
