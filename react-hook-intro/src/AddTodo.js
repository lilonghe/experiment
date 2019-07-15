import React from 'react';

function AddTodo(props) {
    const { dispatch } = props;
    return (
        <div>
            <input onKeyPress={addTodo} />
        </div>
    );

    function addTodo(e) {
        if (e.charCode === 13 && e.target.value != "") {
            dispatch({ type: 'addTodo', payload: e.target.value });
            e.target.value = "";
        } 
    }
}

export default AddTodo;
