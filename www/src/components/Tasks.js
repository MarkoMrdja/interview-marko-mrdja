import React from "react";

function Tasks(props){
    const { task, handleCheck, toggleEdit, handleDelete } = props;

    return (
        <div className="row" key={task.id}>
            <div className="col s12 m8 offset-m2">
                <div className="card">
                <div className="card-content">
                    <div className='row valign-wrapper'>
                    <div className="col s1">
                        <label>
                        <input type="checkbox" checked={task.completed} onChange={() => handleCheck(task)} />
                        <span></span>
                        </label>
                    </div>
                    <div className="col s9 cont">
                        <label className='task-content'>
                        <span className={task.completed ? 'completed' : ''}>{task.content}</span>
                        </label>
                    </div>
                    <div className="col s2 right-align">
                        <button className="btn orange darken-1" disabled={task.completed ? 'disabled' : ''} onClick={() => toggleEdit(task)}><i className="material-icons">edit</i></button>
                        <button className="btn orange darken-1" onClick={() => handleDelete(task.id)}><i className="material-icons">delete</i></button>
                    </div>
                    </div>
                    <div className="col s12">
                        <p className="right-align grey-text">Created: {task.date_created}</p>
                    </div>  
                </div>
                </div>
            </div>
            </div>
    );
}

export default Tasks;