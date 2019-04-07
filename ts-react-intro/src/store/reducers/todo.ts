import { StoreState, Todo } from '../../types/index';
import * as constants from "../constants";

let initState: StoreState = { todos: [] };

const todos = (state: StoreState = initState, action: any) => {
    switch (action.type) {
        case constants.ADD_TODO:
            let todo: Todo = action.payload;
            return {...state, todos: [...state.todos, todo] };
    }
    return { ...state };
}

export default todos;