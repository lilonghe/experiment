import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { initialState, reducer } from './store/index';
import AppContext from './store/context';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({type: 'loadTodos'})
  },[1]); // 第二个参数有变化时才会再次触发，不传将会一直触发，就像 requestAnimationFrame 一样

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <AddTodo dispatch={dispatch} />
        <TodoList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
