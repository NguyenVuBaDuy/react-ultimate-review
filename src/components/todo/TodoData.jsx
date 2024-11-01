
const TodoData = (props) => {

    const { todoList, deleteToDo } = props

    const handleDelete = (id) => {
        deleteToDo(id)
    }

    return (
        <div className='todo-list'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.task}</div>
                        <button className="btn" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoData