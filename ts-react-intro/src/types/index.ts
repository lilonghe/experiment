export interface StoreState {
    todos: Array<Todo>;
}

export interface Todo {
    id?: number;
    text: string;
    completed: boolean;
}