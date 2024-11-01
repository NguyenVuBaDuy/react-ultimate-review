import { useState } from 'react'
import './TodoApp.css'
import TodoData from './TodoData'
import TodoNew from './TodoNew'
import reactLogo from '../../assets/react.svg'


const TodoApp = () => {

    const [todoList, setTodoList] = useState([])

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const addNewTodo = (task) => {
        var newToDo = {
            id: randomIntFromInterval(1, 100000),
            task
        }
        setTodoList([...todoList, newToDo])
    }

    const deleteToDo = (id) => {
        var newTodo = todoList.filter(todo => todo.id !== id)
        setTodoList(newTodo);
    }


    return (
        <div className="todo-container">
            <div className="todo-title">Todo list</div>
            <TodoNew addNewTodo={addNewTodo} />

            {todoList.length > 0 ?
                <TodoData todoList={todoList} deleteToDo={deleteToDo} />

                :
                <div>
                    <img src={reactLogo} className='todo-image logo' />
                </div>
            }

        </div>
    )
}



export default TodoApp  