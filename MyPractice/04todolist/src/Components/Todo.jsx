import React, { useEffect, useState } from 'react'
import { deleteIcon, editIcon } from '../assets';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

function Todo({todos,setTodos}) {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updatetext, setUpdatetext] = useState(null);
  const [id, setId] = useState("");
  

  const handleDelete = (id)=>{
      setTodos(todos.filter(todo=>todo.id!==id));
      // setTodos(prevTodo=> [...prevTodo,...prevTodo]);
      console.log(todos.filter(todo=>todo.id!==id));

  }
  const handleStrike=(id)=>{
    setTodos((prevTodos)=>(
      prevTodos.map(
        todo=>(todo.id === id)?{...todo,strike:!todo.strike}:todo
        
      )
    ))
  }

  const updateTextMessage=(e)=>{
    setUpdatetext(e.target.value);
    
  }
  const handleUpdate=(message,id)=>{
    setOpen(false);
    setTodos(prevTodos=>
      prevTodos.map(element=>
        element.id===id?{...element,msg:message}:element
        
      
    ))
}




  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setId(todo.id);
    setUpdatetext(todo.msg); 
    setOpen(true);
  };

    return (
      <>
          <div className='flex flex-row w-3/4  justify-items-start  overflow-auto gap-x-2 gap-y-6 flex-wrap   h-100'>
          {todos.map((todo) => (
            <div
              style={{background:"linear-gradient(45deg, #9f9ea0cc, #ffffffbd)"}}
              key={todo.id} className='flex flex-col mt-2 w-1/4 max-w-70 text-wrap justify-between min-h-48  rounded-lg h-[3rem]  items-start place-content-between p-2 truncate'>
                    <div className='w-full flex flex-col gap-3'>
                      <div className='flex w-full justify-between'>
                            <div className='text-gray-800 font-semibold flex gap-2 px-2 '>
                              <input
                                style={{ transform: "scale(1.5)",accentColor: "#2b2b2ccc" }}
                              type='checkbox' onChange={()=>handleStrike(todo.id)} className='  border-grey-200 focus:border-grey-500 bg-yellow-600 py-2 px-3 rounded-md text-gray-800 cursor-pointer'></input>
                                  {/* {console.log(todo.id)} */}
                            </div>
                            
                            <div className='flex gap-3'>
                                <button className='bg-yellow-600 p-1 rounded-full text-gray-800 cursor-pointer' onClick={()=>handleEdit(todo)}>
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
              </div>


          ))} 
                        <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                      transition
                       style={{background:" linear-gradient(45deg, #9f9ea0f7, #ffffffeb)"}}
                      className="relative transform overflow-hidden rounded-lg  text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                        <div className="sm:flex sm:items-start">
                        
                          <div className=" flex flex-col gap-2 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left  px-2">
                            <DialogTitle as="h2" className="text-lg block text-gray-800 font-bold">
                              Editing todo...
                            </DialogTitle>
                            <div className="mt-2 font-semibold flex ">
                              <textarea value={updatetext} onChange={updateTextMessage}  className="text-lg block text-gray-800 font-bold text-left outline p-1 rounded-sm" rows="5" cols='55'  />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" flex gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" >
                        <button
                          type="button"
                          onClick={()=>handleUpdate(updatetext,id)}
                        
                          className="inline-flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600 sm:ml-3 sm:w-auto"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white/20 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/30 sm:mt-0 sm:w-auto"
                        >
                          Close
                        </button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
          </div>
       
    </>
  )
}
// without memo all child components like this rerenders stop it by storing in memory
export default React.memo(Todo);
