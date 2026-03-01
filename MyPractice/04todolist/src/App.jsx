import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './Components/Todo'
import { nanoid } from 'nanoid'
import ClickSpark from './Components/ClickSpark'




function App() {
  var todoList = [
    {
      id:nanoid(),
      msg:"Finish the javacode today and everthing to the sorted array of the list",
      strike:false

    }
  ]
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(todoList);
  const [strike, setStrike ] = useState(todoList);

  const handleText= (e)=>{
    setText(e.target.value);
     
  }
  const handleTodos = (e) =>{
    e.preventDefault()
    console.log(text)
    let newTodo = {
      id:nanoid(),
      msg:text,
      strike:false
    }
     setTodos(prevTodos=>[...prevTodos,newTodo]);
     
     setText("");
    
  }
 

  //   const handleTodos = (e) =>{
  //   e.preventDefault()
  //   console.log(text)
  //   let newTodo = {
  //     id:nanoid(),
  //     msg:text
  //   }
  //   let newTodolist = todos;
  //   newTodolist.push(newTodo);
  //   console.log(newTodolist)
  //    setTodos(newTodolist);
  // }
  // Why this wont work newtodlist points to the same memory so react sees nothing changes it doesn't create new array in react 
  // it points to same mempry so nothing changes no value update leave state management ot react

  

  return (
    <>
      <ClickSpark
        sparkColor='#fff'
        sparkSize={13}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
      <div className='h-screen flex flex-col items-center justify-center gap-5 '>
        <h1 className='text-2xl font-semibold'>My Todos List</h1>
      <form  className='flex w-full justify-center gap-3 rounded-lg ' onSubmit={handleTodos}>
        <input type="text" value={text}  onChange={handleText} placeholder='what do you want to do next' id='todoList' className='border-2 border-white focus:border-sky-500 w-1/2 py-2 px-2 rounded-lg '/>
        <button className='bg-indigo-500 cursor-pointer px-3  rounded-lg' >Add</button>
      </form>
      
      <Todo className="mt-4" todos={todos} setTodos={setTodos} strike={strike} setStrike={setStrike} />
      
      </div>
      </ClickSpark>
    </>
  )
}

export default App
