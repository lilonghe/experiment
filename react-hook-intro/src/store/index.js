const initialState = {
    todos: []
};

function reducer(state, action) {
    console.info(state, action)
    switch (action.type) {
        case 'addTodo':
            let todo = {
                text: action.payload,
                status: 0,
                id: generateId()
            };
            return { todos: [...state.todos, todo]};
        case 'toggleStatus':
            let todos = state.todos;
            let index = todos.findIndex(item => item.id === action.payload);
            todos[index].status = todos[index].status === 0 ? 1:0;
            return { todos: [...todos] };
        default:
            console.warn('no match action ->', action.type);
            return state;
    }
}

function generateId() {
    return new Date().getTime() + parseInt(Math.random() * 10000)
}

export {
    initialState,
    reducer
};