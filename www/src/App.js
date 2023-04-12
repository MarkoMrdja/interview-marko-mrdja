import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import Tasks from './components/Tasks'


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
        setTaskList([data.data, ...taskList]);
      }
      setContent("");
      setEditContent("");
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
    <div className="App">
      <section>
        <CreateForm 
          content={content}
          editContent={editContent}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
      <section>
        {taskList.map(task => {
          if (taskId === task.id) {
            return <EditForm 
              task={task}
              editContent={editContent}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
            />
          } else {
            return <Tasks 
              task={task}
              handleCheck={handleCheck}
              toggleEdit={toggleEdit}
              handleDelete={handleDelete}
            />
          }
        })}
      </section>
    </div>
  );
}

export default App;
