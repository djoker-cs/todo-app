import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: todos.length + 1, text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const completeTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    setEditMode(id);
    setEditText(todos.find(todo => todo.id === id).text);
  };

  const saveTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo));
    setEditMode(null);
    setEditText('');
  };

  return (
    <div className="todo-list-container">
      <h1 className="title">Todo List</h1>
      <div className="add-todo">
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add a new todo..." 
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">Add To-do</button>
      </div>
      {todos.length === 0 && <p className="no-todos">No to-dos available. Add a to-do?</p>}
      {todos.map(todo => (
        <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
          {editMode === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <button onClick={() => saveTodo(todo.id)} className="save-btn">Save</button>
            </>
          ) : (
            <>
              <span className={`todo-text ${todo.completed ? 'strikethrough' : ''}`}>{todo.text}</span>
              <div className="buttons">
                <button 
                  className="complete-btn" 
                  onClick={() => completeTodo(todo.id)} 
                  disabled={todo.completed || editMode === todo.id}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                  className="edit-btn" 
                  onClick={() => editTodo(todo.id)} 
                  disabled={todo.completed || editMode === todo.id}
                >
                  Edit
                </button>
                <button 
                  className="remove-btn" 
                  onClick={() => removeTodo(todo.id)} 
                  disabled={editMode === todo.id}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
