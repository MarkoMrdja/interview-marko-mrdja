from datetime import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import psycopg2 
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


#MODELS
class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"Task: {self.content}"
    
    def __init__(self, content, completed=False):
        self.content = content
        self.completed = completed
    

def format_task(task):
    return {
        "id": task.id,
        "content": task.content,
        "completed": task.completed,
        "date_created": task.date_created
    }


with app.app_context():
    db.create_all()


#ROUTES
@app.route('/api/tasks', methods=['POST'])
def create_task():
    content = request.json['content']
    task = ToDo(content)
    db.session.add(task)
    db.session.commit()
    return format_task(task)


@app.route("/api/tasks", methods=['GET'])
def get_tasks():
    tasks = ToDo.query.order_by(ToDo.date_created.desc()).all()
    task_list = []

    for task in tasks:
        task_list.append(format_task(task))
    
    return {'tasks': task_list}
    

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = ToDo.query.get_or_404(task_id)
    return {'task': format_task(task)}


@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = ToDo.query.get_or_404(task_id)
    data = request.json
    content = data.get('content')
    completed = data.get('completed')
    if content:
        task.content = content
    if completed is not None:
        task.completed = completed
    db.session.commit()
    return {'task': format_task(task)}


@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = ToDo.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return {'message': 'Task deleted successfully!'}


if __name__ == '__main__':
    app.run(host="0.0.0.0")
