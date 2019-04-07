import * as constants from "../constants";
let todoId = 0;

export type TodoAction = AddTodoAction;

export interface AddTodoAction  {
    type: constants.ADD_TODO;
    payload: any
}

export function addTodo(text: string): AddTodoAction {
    return {
        type: constants.ADD_TODO,
        payload: {
            id: todoId++,
            text
        }
    }
}