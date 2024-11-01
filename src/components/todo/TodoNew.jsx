import { useState } from "react"

const TodoNew = (props) => {

    const { addNewTodo } = props

    const [valueInput, setValueInput] = useState("")

    const handleOnChange = (event) => {
        setValueInput(event.target.value)
    }

    const handleSubmitBtn = () => {
        if (valueInput) {
            addNewTodo(valueInput)
            setValueInput("")
        }
    }

    return (
        <div className="todo-new">
            <input type="text"
                value={valueInput}
                placeholder="Enter your task"
                onChange={event => { handleOnChange(event) }} />
            <button
                className="btn"
                onClick={handleSubmitBtn}>Add</button>
        </div>
    )
}

export default TodoNew