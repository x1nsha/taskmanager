import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from '../features/tasks/tasksSlice';
import { Link } from 'react-router-dom';
import SearchTask from './SearchTask';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesFilter =
            (filter === 'completed' && task.completed) ||
            (filter === 'incomplete' && !task.completed) ||
            filter === 'all';

        const matchesSearch = task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    return (
        <div>
            <div>
                <button onClick={() => setFilter('all')}>Show all</button>
                <button onClick={() => setFilter('completed')}>Show completed</button>
                <button onClick={() => setFilter('incomplete')}>Show incomplete</button>
            </div>
            <SearchTask onSearch={handleSearch} />
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.completed} onChange={() => dispatch(toggleTaskStatus(task.id))} />
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
