import React, {useContext} from 'react';
import AppContext from './store/context';

function TodoItem(props) {
    const {dispatch} = useContext(AppContext)
    const { todo } = props;
    return (
        <div style={todo.status === 1 ? { textDecoration: 'line-through' } : {}}>
            <input onChange={()=>toggleStatus(todo.id)} type='checkbox' defaultChecked={todo.status === 1 ? true : false} /><span>{todo.text}</span>
        </div>
    );
    
    function toggleStatus(id) {
        dispatch({
            type: 'toggleStatus',
            payload: id
        })
    }
}

export default TodoItem;
