import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';
import TaskEditForm from '../components/TaskEditForm';

const TaskPage = () =>
{
    return (
        <div style={{ width: '50%' }}>
            <Routes>
                <Route path=":taskId" element={<TaskDetail />} />
                <Route path=":taskId/edit" element={<TaskEditForm />} />
            </Routes>
        </div>
    );
};

export default TaskPage;