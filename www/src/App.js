import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {format} from 'date-fns'
import './App.css';


function App() {
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [taskId, setTaskId] = useState(null);
  
  const fetchTasks = async () => {
    try {
      const data = await axios.get('/api/tasks');
      const {tasks} = data.data;
      setTaskList(tasks);
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleChange = (e, field) => {
    if (field === 'edit') {
      setEditContent(e.target.value)
    } else {
      setContent(e.target.value);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      const updatedList = taskList.filter(task => task.id !== id);
      setTaskList(updatedList);
    } catch (err) {
      console.error(err.message);
    }
  }

  const toggleEdit = (task) => {
    setTaskId(task.id);
    setEditContent(task.content);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (editContent){
        const data = await axios.put(`/api/tasks/${taskId}`, {content: editContent});
        const updatedTask = data.data.task;
        const updatedList = taskList.map(task => {
          if(task.id === taskId){
            return task = updatedTask
          }
          return task
        })
        setTaskList(updatedList)
      } else {
        const data = await axios.post("/api/tasks", {content});
        setTaskList([...taskList, data.data]);
      }
      setContent('');
      setEditContent('');
      setTaskId(null);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleCheck = async (task) => {
    const completed = !task.completed;
    try {
      await axios.put(`/api/tasks/${task.id}`, {completed});
      const updatedTasks = taskList.map(t => {
        if (t.id === task.id) {
          return {...t, completed};
        }
        return t;
      });
      setTaskList(updatedTasks);
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <div className="red lighten-3">
      <section>
        <h1 className="center-align white-text">ToDo Application</h1>
        <div className='row'>
          <div className='col s12 m8 offset-m2'>
            <div className='card'>
              <form onSubmit={handleSubmit}>
                <div className="card-content row valign-wrapper">
                  <div className="input-field col s10 m10">
                    <label htmlFor='content'>Content</label>
                    <input
                      onChange={(e) => handleChange(e, 'content')}
                      type="text"
                      name="content"
                      id="content"
                      value={content}
                    />
                  </div>
                  <div className="col s2 m2 right-align">
                    <button className="btn red lighten-3 waves-effect" type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> 
      </section>
      <section>
        {taskList.map(task => {
          if(taskId === task.id){
            return (
              <div className="row" key={task.id}>
                <div className="col s12 m8 offset-m2">
                  <div className="card">
                    <div className="card-content">
                      <div className='row'>
                        <div className="col s1">
                          <label>
                            <input type="checkbox" disabled='disabled' checked={task.completed} onChange={() => handleCheck(task)} />
                            <span></span>
                          </label>
                        </div>
                        <form onSubmit={handleSubmit} key={task.id}>
                          <div className="col s9" style={{marginTop: "0px"}}>
                            <input
                              onChange={(e) => handleChange(e, 'edit')}
                              type="text"
                              name="editContent"
                              id="editContent"
                              value={editContent}
                            />
                          </div>
                          <div className="col s2 right-align">
                            <button className="btn red lighten-3" type='submit'><i className="material-icons">done</i></button>
                            <button className="btn red lighten-3" onClick={() => handleDelete(task.id)}><i className="material-icons">delete</i></button>
                          </div>
                        </form>
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
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
                        <div className="col s9">
                          <label className='task-content'>
                          <span className={task.completed ? 'completed' : ''}>{task.content}</span>
                          </label>
                        </div>
                        <div className="col s2 right-align">
                          <button className="btn red lighten-3" onClick={() => toggleEdit(task)}><i className="material-icons">edit</i></button>
                          <button className="btn red lighten-3" onClick={() => handleDelete(task.id)}><i className="material-icons">delete</i></button>
                        </div>
                      </div>
                      <div className="col s12">
                        <p className="right-align grey-text">Created: {task.date_created}</p>
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </section>
    </div>
  );
}

export default App;
