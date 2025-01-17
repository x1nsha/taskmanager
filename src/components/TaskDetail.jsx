import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TaskDetail = () =>
{
    const { taskId } = useParams();
    const task = useSelector((state) => state.tasks.find((t) => t.id === parseInt(taskId)));

    if (!task) return <div>Task has not found!</div>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskDetail;