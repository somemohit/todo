import React, { useState } from 'react';
import trashIcon from './trash.svg'

function App() {
  const [taskInput, updateTaskInput] = useState("")
  const [todoList, updateTodoList] = useState([])

  function inputKeyDown(e) {
    if (e.keyCode === 13) {
      addNote()
    }
  }

  function addNote() {
    todoList.push({ description: taskInput, isComplete: false })
    updateTodoList(todoList)
    updateTaskInput("")
  }

  function deleteTask(index) {
    const newList = todoList.filter((item, i) => i !== index)
    updateTodoList(newList)
  }

  function markComplete(index) {
    const list = [...todoList]
    list[index].isComplete = !list[index].isComplete;
    updateTodoList(list)
  }

  return (
    <div className="app-background">
      <p className="heading-text">REACT TODO-LIST 📋</p>
      <div className="task-container">
        <div>
          <input className="text-input" value={taskInput} onKeyDown={inputKeyDown}
            onChange={(e) => updateTaskInput(e.target.value)} />
          <button className="add-button" onClick={addNote}>ADD</button>
        </div>
        {todoList?.length ? todoList.map((toDoObject, index) => 
        <ListItem index={index} itemData={toDoObject} 
        deleteTask={deleteTask} markComplete={markComplete} />) :
         <p className="no-item-text">🚀 No task added !</p>}
      </div>
      <p className="footer-text">© All rights reserved 2022</p>
    </div>
  );
}

function ListItem(props) {
  return (
    <div className="list-item row jc-space-between">
      <span className={props.itemData.isComplete ? "task-complete" : ""}
        onClick={() => props.markComplete(props.index)}>
        {props.itemData.description}</span>
      <img src={trashIcon} className="delete-icon" onClick={() => props.deleteTask(props.index)} />
    </div>
  )
}

export default App;
