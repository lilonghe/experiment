import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { StoreState, Todo } from './types';
import { addTodo, TodoAction } from './store/actions/todo';
import { Dispatch } from 'redux';

export interface Props {
    todos: Array<Todo>;
    addTodo: (text: string) => void; 
}

class App extends Component<Props> {

    generateItem = () => {
        this.props.addTodo(Math.random().toFixed(5));
    }

    render() {
        const { todos } = this.props;
        return (
            <div className="App">
                <button onClick={this.generateItem}>Add Item</button>
                <ul>
                    {todos.map((item: Todo) => <li>{item.text}</li>)}
                </ul>
          </div>
        );
  }
}

export function mapDispatchToProps(dispatch: Dispatch<TodoAction>) {
    return {
        addTodo: (text: string) => dispatch(addTodo(text))
    }
}

export function mapStateToProps(store: StoreState) {
    return {
        todos: store.todos
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
