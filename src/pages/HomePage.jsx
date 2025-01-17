import React from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';

const HomePage = () =>
{
    return(
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
                <AddTaskForm />
                <TaskList />
            </div>
            <div style={{ width: '50%' }}></div>
        </div>
    );
};

export default HomePage;