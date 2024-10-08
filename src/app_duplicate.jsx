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
    let todos =JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  
  }, [])
  
  const saveToLS =()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
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
 
  const handleDelete=(e,id)=>{
    let index= todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    // newTodos[index].isCompleted= !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  const handleAdd=()=>{
 setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
 setTodo("")
 saveToLS()
 
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    let id= e.target.name;
    let index= todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted= !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }
  return (
    <>
     <Navbar/>
     <div className=" container bg-violet-100 rounded-xl mx-auto p-5 my-5 min-h-[80vh] ">
          <div className="addTodo my-5">
           <h2 className='text-lg font-bold'>Add a Todo</h2>
           <input type="text" onChange={handleChange} value={todo} className='w-1/2'/>
           <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-3 py-1 text-white rounded-md mx-6 text-sm font-bold'>Add</button>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h1 className='font-bold text-lg'>Your todos</h1>

        <div className="todos">
          {todos.length===0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item=>{
       
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=''/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
       
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'>Delete</button>
            </div>
          </div>
           })}
        </div>
      </div>
  
    </>
  )
}

export default App
