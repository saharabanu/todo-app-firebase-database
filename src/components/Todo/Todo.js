import { onValue, ref, remove, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { uid } from 'uid';
import { db } from '../../firebase';


const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");


    const handleChange =(e)=>{
        setTodo(e.target.value)
        
    }




      //write
  const writeTodoDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo,
      uuid,
    });
    

    setTodo("");
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);


   //update
   const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  };


  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      uuid: tempUuid,
    });

    setTodo("");
    setIsEdit(false);
  };


  const deletebtn =(todo)=>{
    remove(ref(db,`/${todo.uuid}`))
  }

   //delete
//    const handleDelete = (todo) => {
//     remove(ref(db, `/${todo.uuid}`));
//   };


  return (
    <>

        <div className="all-input">
            <input type="text" placeholder='write something' onChange={handleChange}
            style={{padding:"7px 5px", outline:"none",fontSize:"16px",marginBottom:"20px"}}
            value={todo} required={true}/>
            {isEdit ? (
        <>
          <button onClick={handleSubmitChange} style={{padding:"7px 5px", fontSize:"16px"}}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTodo("");
            }}
            style={{padding:"8px 5px" ,fontSize:"16px", backgroundColor:"red",color:"#fff"}}>
            X
          </button>
        </>
      ) : (
        <button onClick={writeTodoDatabase}style={{padding:"7px 5px" ,fontSize:"16px"}}>submit</button>
      )}

            {/* <button onClick={writeTodoDatabase}>Submit</button> */}

<div >

{/* style={{backgroundColor:"#fff",boxShadow:"10px 10px 10px 10px white"}} */}

            { todos.map(item=>(<div key={item.todo} >
               
            <div style={{display:'flex',justifyContent:"center", alignItems:"center", paddingTop:"10px", border:"1px solid orange ", marginBottom:"10px", width:"300px", margin:"auto"}}>
            <h3 style={{paddingRight:"10px"}}>{item.todo}</h3>
            <button  onClick={() => handleUpdate(item)} style={{padding:"7px 5px" ,fontSize:"16px", marginRight:"5px"}}>Edit</button>
            <button onClick={()=> deletebtn(item)} style={{padding:"7px 5px" ,fontSize:"16px"}}>Delete</button>
            </div>
            
            
            </div>
                
            )) }
            </div>
        </div>
    </>
  )
}

export default Todo