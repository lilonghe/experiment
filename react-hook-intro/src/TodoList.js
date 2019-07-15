import React, {useContext} from 'react';
import TodoItem from './TodoItem';
import AppContext from './store/context';

function TodoList() {
    const {state: { todos }} = useContext(AppContext);

    return (
        <div>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </div>
    );
}

export default TodoList;
