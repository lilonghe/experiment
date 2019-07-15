import React, { useReducer } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { initialState, reducer } from './store/index';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <AddTodo dispatch={dispatch} />
      <TodoList  dispatch={dispatch} todos={state.todos} />
    </div>
  );
}

export default App;
