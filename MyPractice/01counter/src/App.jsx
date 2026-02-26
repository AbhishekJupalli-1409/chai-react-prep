import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const Increment = (e)=>{
    
    console.log(e);
     setCount(count + 1);
     setCount(count + 1);
     setCount(count + 1); 

  }
  // var count2 = 0;
  // const Increment = (e)=>{
  //   console.log(e);
  //   count2 = count2 + 1;
  //   console.log(count2);
  //   // return setCount(count + 1);

  // }

  return (
    
    <>
      <h2>my first counter</h2>
      <button style={{"borderRadius":"4px","fontSize":"1.5rem","borderBlockColor":"black"}} onClick={Increment}>Counter {count}</button>
    </>
  )
}

export default App
