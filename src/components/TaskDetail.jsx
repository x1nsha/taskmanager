import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TaskDetail = () =>
{
    const { taskId } = useParams();
    const task = useSelector((state) => state.tasks.find((t) => t.id === parseInt(taskId)));

    return (
        <div className="task-details">
            {task ? (
                <>
                    <h2>{task.title}</h2>

                    <p>{task.description}</p>
                </>
            ) : (
                <p>Select a task to view details.</p>
            )}
        </div>
    );
};

export default TaskDetail;