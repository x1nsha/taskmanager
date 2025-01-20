import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editTask } from '../features/tasks/tasksSlice';

const TaskEditForm = () =>
{
    const { taskId } = useParams();
    const task = useSelector((state) => state.tasks.find((t) => t.id === parseInt(taskId)));
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if (task)
        {
            dispatch(editTask({ id: task.id, title, description }));
        }
        navigate('/');
    };

    if (!task)
    {
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task name"/>

            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description"/>

            <button type="submit">Save</button>
        </form>
    );
};

export default TaskEditForm;