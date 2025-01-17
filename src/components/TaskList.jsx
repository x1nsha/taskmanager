import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from '../features/tasks/tasksSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const [filter, setFilter] = useState('all');
    const dispatch = useDispatch();

    const filteredTasks = tasks.filter((task) =>
    {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return(
        <div>
            <div>
                <button onClick={() => setFilter('all')}>Show all</button>
                <button onClick={() => setFilter('completed')}>Show completed</button>
                <button onClick={() => setFilter('incomplete')}>Show incomplete</button>
            </div>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.completed} onChange={() => dispatch(toggleTaskStatus(task.id))}/>

                        <Link to={`/${task.id}`}>{task.title}</Link>

                        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>

                        <Link to={`/${task.id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;