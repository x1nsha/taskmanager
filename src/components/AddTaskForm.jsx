import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const AddTaskForm = () =>
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if (!title.trim())
        {
            return;
        }

        dispatch
        (
            addTask
            ({
                id: Date.now(),
                title,
                description,
                completed: false,
            })
        );
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task name"/>

            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description"/>

            <button type="submit">Add</button>
        </form>
    );
};

export default AddTaskForm;