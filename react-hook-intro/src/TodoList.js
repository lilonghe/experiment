import React from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
    const { todos, dispatch } = props;
    return (
        <div>
            {todos.map(todo => <TodoItem dispatch={dispatch} key={todo.id} todo={todo} />)}
        </div>
    );
}

export default TodoList;
