// app/ToDoList.js
"use client"
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { collection, addDoc, query, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from '../UserContext';
import '..//styles/todolist.css';
import Link from 'next/link';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const todoTextRef = useRef(null);
  const textareaRef = useRef(null);


useEffect(() => {
  if (todoTextRef.current) {
    const setInitialHeight = () => {
      const scrollHeight = todoTextRef.current.scrollHeight;
      if (scrollHeight <= 28) {
        todoTextRef.current.style.maxHeight = `${scrollHeight}px`;
      } else {
        todoTextRef.current.style.maxHeight = '4rem';
      }
    };

    // Use requestAnimationFrame to set the initial height during the next repaint cycle
    const animationFrame = requestAnimationFrame(setInitialHeight);

    // Cancel the requestAnimationFrame when the component unmounts or when the todo.text prop changes
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }
}, [todo.text]);

useEffect(() => {
  if (isEditing && textareaRef.current) {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}, [isEditing]);

  useLayoutEffect(() => {
    const handleMouseEnter = () => {
      if (todoTextRef.current) {
        const scrollHeight = todoTextRef.current.scrollHeight;
        todoTextRef.current.style.maxHeight = `${scrollHeight}px`;
      }
    };
  
    const handleMouseLeave = () => {
      if (todoTextRef.current && !isEditing) {
        todoTextRef.current.style.maxHeight = '4rem';
      }
    };
  
    if (todoTextRef.current) {
      const group = todoTextRef.current.closest('.group');
      if (group) {
        group.addEventListener('mouseenter', handleMouseEnter);
        group.addEventListener('mouseleave', handleMouseLeave);
      }
  
      return () => {
        if (group) {
          group.removeEventListener('mouseenter', handleMouseEnter);
          group.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [isEditing]);
  
  const handleSave = () => {
    onUpdate(todo.id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const noop = () => {};

  return (
    
    <li className="todo-item border-b-2 border-gray-300 py-4 flex flex-wrap md:flex-nowrap justify-between items-center group">

            {isEditing ? (
        <textarea
    ref={textareaRef}
    value={editedText}
    onChange={(e) => setEditedText(e.target.value)}
    onInput={(e) => {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }}
    className="border border-gray-400 rounded px-2 py-1 w-full mr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
      ) : (
        <>
<span
  ref={todoTextRef}
  className="text-md font-medium mr-4 w-full md:w-1/2 min-h-28 max-h-28 group-hover:w-full group-hover:max-h-full overflow-hidden"
  onClick={noop}
>
            {todo.text}
          </span>
          <span className="text-sm text-gray-500 mr-4 mt-2">
            Deadline: {todo.deadline ? todo.deadline.toLocaleString() : 'N/A'}
          </span>
        </>
      )}
      {isEditing ? (
        <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-4">
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-4">
          Edit
        </button>
      )}
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Delete
      </button>
    </li>
      
  );
}


function ToDoList({router}) {
  const { user, logout } = useUser();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [deadlineType, setDeadlineType] = useState("timeOnly");
  const [isUserPresent, setIsUserPresent] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true); // input validation only
  const [viewNewTodos, setViewNewTodos] = useState([]); 


  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
    setIsInputValid(true); // reset validation state on input change
  };
  

  useEffect(() => {
    if (user) {
        setIsUserPresent(true);
      const userTodosRef = collection(db, `users/${user.uid}/todos`);
      const userTodosQuery = query(userTodosRef);
      const unsubscribe = onSnapshot(userTodosQuery, (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
          deadline: doc.data().deadline ? doc.data().deadline.toDate() : null,
        }));
  
        // Sort todos by createdAt, with N/A values last
        todosData.sort((a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          // if you want to sort by deadline, change the following line to
          // return a.deadline - b.deadline
          // modified to show from top to bottom
          return b.createdAt - a.createdAt;
        });
  
        setTodos(todosData);
      });
  
      return () => {
        unsubscribe();
      };
    }else{
        setIsUserPresent(false);
    }
  }, [user]);

  const updateTodo = async (todoId, newText) => {
    if (newText && user && todoId) {
      const todoRef = doc(db, `users/${user.uid}/todos/${todoId}`);
      await setDoc(todoRef, { text: newText }, { merge: true });
    }
  };
  
  const viewWhichTodos = async (todoId) => {
    setViewNewTodos(!viewNewTodos);
    console.log(viewNewTodos);
  };

  useEffect(() => { }, [viewNewTodos])

  const deleteTodo = async (todoId) => {
    if (user && todoId) {
      const todoRef = doc(db, `users/${user.uid}/todos/${todoId}`);
      await deleteDoc(todoRef);
    }
  };
  
  const addTodo = async (event) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setIsInputValid(false);
      return;
    }
    if (user && isUserPresent) {
      const newTodoDoc = {
        text: newTodo.trim(),
        createdAt: new Date(),
      };
      if (deadline) {
        let deadlineDate;
        if (deadlineType === 'dateOnly') {
          deadlineDate = new Date(deadline);
          deadlineDate.setHours(23, 59, 59, 999);
        } else if (deadlineType === 'timeOnly') {
          const [hours, minutes] = deadline.split(':');
          deadlineDate = new Date();
          deadlineDate.setHours(hours, minutes, 0, 0);
        } else if (deadlineType === 'dateTime') {
          deadlineDate = new Date(deadline);
        }
        if (deadlineDate) {
          newTodoDoc.deadline = deadlineDate;
        }
      }
      try {
        const docRef = await addDoc(collection(db, `users/${user.uid}/todos`), newTodoDoc);
        const todoId = docRef.id;
        setNewTodo('');
        setDeadline('');
        setDeadlineType('timeOnly');
        setIsInputValid(true);
      } catch (error) {
        console.error('Error adding new todo:', error);
      }
    }
  };
  

  return (
    <div className="todolist container mx-auto px-4 py-12 md:px-8">
      <ul className="space-y-4">
        {todos.filter((todo) => (viewNewTodos)? ((!todo.deadline) || todo.deadline >= new Date) : 
        ((!todo.deadline) || todo.deadline < new Date)).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
      <div className="mt-8">
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder="Add new todo"
          className={`border-2 focus:border-blue-500 focus:outline-none transition-colors duration-200 rounded px-2 py-1 w-full mr-4 mb-4 ${
            isInputValid ? '' : 'border-red-500'
          }`}
        />
        {!isInputValid && (
          <p className="text-red-500 text-sm">Please enter a todo text</p>
        )}
        <div className="flex items-center mb-4">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                value="dateTime"
                checked={deadlineType === 'dateTime'}
                onChange={(e) => setDeadlineType(e.target.value)}
                className="mr-1"
              />
              <span className="text-gray-700 text-sm">Date and time</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dateOnly"
                checked={deadlineType === 'dateOnly'}
                onChange={(e) => setDeadlineType(e.target.value)}
                className="mr-1"
              />
              <span className="text-gray-700 text-sm">Date only</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="timeOnly"
                checked={deadlineType === 'timeOnly'}
                onChange={(e) => setDeadlineType(e.target.value)}
                className="mr-1"
              />
              <span className="text-gray-700 text-sm">Time only</span>
            </label>
          </div>
          {deadlineType && (
            <input
              type={deadlineType === 'timeOnly' ? 'time' : (deadlineType === 'dateTime') ? 'datetime-local': 'date'}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border-2 focus:border-blue-500 focus:outline-none transition-colors duration-200 rounded px-2 py-1 ml-4"
            />
          )}
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ml-auto "
          >
            Add
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={viewWhichTodos}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            {"View " + (viewNewTodos ? "historic tasks" : "current tasks")}
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default ToDoList;