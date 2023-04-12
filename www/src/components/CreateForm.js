import React from 'react';

function CreateForm(props) {
  const { content, editContent, handleChange, handleSubmit } = props;

  return (
    <div className='row'>
       <div className='col s12 m8 offset-m2'>
         <h2>ToDo Application</h2>
          <div className='card'>
          <form onSubmit={handleSubmit}>
            <div className="card-content row valign-wrapper">
              <div className="input-field col s10 m10">
                <label htmlFor='content'>Enter your task</label>
                <input
                  onChange={(e) => handleChange(e, 'content')}
                  type="text"
                  name="content"
                  id="content"
                  value={content}
                  maxLength={64}
                  required
                />
              </div>
              <div className="col s2 m2 right-align">
                <button className="btn orange darken-1 waves-effect" disabled={editContent !== ""} type="submit">Submit</button>
              </div>
            </div>
          </form>
          </div>
       </div>
    </div>
  );
}

export default CreateForm;
