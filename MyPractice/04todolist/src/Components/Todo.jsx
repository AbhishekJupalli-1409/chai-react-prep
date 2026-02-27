import React from 'react'
import { deleteIcon, editIcon } from '../assets';


function Todo({todos,setTodos}) {
  
  const handleDelete = (id)=>{
      setTodos(todos.filter(todo=>todo.id!=id));
      // setTodos(prevTodo=> [...prevTodo,...prevTodo]);
      console.log(todos.filter(todo=>todo.id!=id));

  }
  const handleStrike=(id)=>{
    setTodos((prevTodos)=>(
      prevTodos.map(
        todo=>(todo.id === id)?{...todo,strike:!todo.strike}:todo
        
      )
    ))
  }
  
  const handleEdit = (id)=>{
      // todos.forEach(todo => todos.filter(todo.id!=id));
      // setTodos(todos);

  }

    return (
      <>
           
          <div className='flex flex-row w-3/4  justify-items-start  overflow-auto gap-x-2 gap-y-6 flex-wrap   h-100'>
          {todos.map((todo) => (
            <div
              style={{background:"linear-gradient(45deg, #9f9ea0cc, #ffffffbd)"}}
              key={todo.id} className='flex flex-col mt-2 w-1/4 max-w-70 text-wrap justify-between min-h-48  rounded-lg h-[3rem]  items-start place-content-between p-2'>
             <div className='w-full flex flex-col gap-3'>
              <div className='flex w-full justify-between'>
                    <div className='text-gray-800 font-semibold flex gap-2 px-2 '>
                      <input
                        style={{ transform: "scale(1.5)",accentColor: "#2b2b2ccc" }}
                       type='checkbox' onChange={()=>handleStrike(todo.id)} className='  border-grey-200 focus:border-grey-500 bg-yellow-600 py-2 px-3 rounded-md text-gray-800 cursor-pointer'></input>
                          {/* {console.log(todo.id)} */}
                    </div>
                    
                    <div className='flex gap-3'>
                        <button className='bg-yellow-600 p-1 rounded-full text-gray-800 cursor-pointer' onClick={handleEdit}>
                          <img src={editIcon} alt="" className='h-4' />
                        </button>
                        <button className=' bg-red-600 px-1  rounded-full text-gray-800 cursor-pointer' onClick={()=>handleDelete(todo.id)}>
                          <img src={deleteIcon} alt="" className='h-4' />
                        </button>
                    </div>
              </div>
              <div className="text-lg block text-gray-800 font-semibold text-left px-2" style={{
                    textDecoration: todo.strike ?"line-through":""
                    }}>{todo.msg}
              </div>

            </div>
          </div>)


          )} 
          </div>
       
    </>
  )
}
// without memo all child components like this rerenders stop it by storing in memory
export default React.memo(Todo);
