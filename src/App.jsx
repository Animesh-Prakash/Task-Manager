import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [count, setCount] = useState(0)
  const [todo, setTodo] =useState("")
  const [todos, setTodos] =useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring =localStorage.getItem("todos")
    if(todostring){
      setTodos(JSON.parse(todostring));
    }
  
  }, [])
  
  const saveToLS =(updatestodos)=>{
    localStorage.setItem("todos", JSON.stringify(updatestodos))
  }

  const toggleFinished=(e)=>{
 setshowFinished(!showFinished)
  }

  const handleEdit=(e,id)=>{
   let t= todos.filter(i=>i.id === id)
   setTodo(t[0].todo)

   let newTodos = todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos);
  saveToLS()
  }
 
  const handleDelete=(id)=>{
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos); // Save updated todos
  }

  const handleAdd=()=>{
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTodo(""); // Clear input field
    saveToLS(updatedTodos); // Save updated todos
 
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    const id = e.target.name;
  const updatedTodos = todos.map(item => 
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );
  setTodos(updatedTodos);
  saveToLS(updatedTodos); // Save updated todos
  }
  return (
    <>
     <Navbar/>
     <div className=" container bg-violet-100 rounded-xl mx-auto p-5 my-5 min-h-[80vh] ">
          <div className="addTodo my-5">
           <h2 className='text-lg font-bold text-center sm:text-xl'>Add a Todo</h2>
           <div className='text-center'>
           <input type="text" onChange={handleChange} value={todo} className='w-1/2 sm: w-10/12 my-3 p-1'/>
           <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-1.5 text-white rounded-md mx-6 text-sm font-bold cursor-pointer '>Add</button>
           </div>
  </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='sm:text-lg' /> Show Finished
        <h1 className='font-bold text-lg'>Your todos</h1>

        <div className="todos">
          {todos.length===0 && <div className='m-5 sm:text-lg'>No todos to display</div>}
          {todos.map(item=>{
       
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
            <div className='flex  w-full'>
            <div className='flex gap-5 sm:text-lg'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=''/>
            <div className={item.isCompleted?"line-through break-words":"break-words"}>{item.todo}</div>
            </div>
       
            <div className="buttons flex h-full mx-3">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'>Delete</button>
            </div>
            </div>
            
          </div>
           })}
        </div>
      </div>
  
    </>
  )
}

export default App
