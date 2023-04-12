import React from 'react'

function EditForm(props){
    const { task, editContent, handleChange, handleSubmit, handleDelete } = props;

    return (
      <div className="row" key={task.id}>
        <div className="col s12 m8 offset-m2">
          <div className="card">
            <div className="card-content">
              <div className='row'>
                <div className="col s1">
                  <label>
                    <input type="checkbox" disabled='disabled' checked={task.completed} />
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
                    <button className="btn orange darken-1" type='submit'><i className="material-icons">done</i></button>
                    <button className="btn orange darken-1" type='button' onClick={() => handleDelete(task.id)}><i className="material-icons">delete</i></button>
                  </div>
                </form>
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditForm;