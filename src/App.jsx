    import React, { useReducer, useState } from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import HomePage from './pages/HomePage';
    import TaskDetailPage from './components/TaskDetail';
    import TaskEditPage from './components/TaskEditForm';
    import TaskList from "./components/TaskList";
    import TaskDetail from "./components/TaskDetail";
    import TaskEditForm from "./components/TaskEditForm";

    const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskReducer = (state, action) =>
    {
        switch (action.type)
        {
            case 'ADD_TASK':
                const newState = [...state, action.payload];
                localStorage.setItem('tasks', JSON.stringify(newState));
                return newState;

            case 'TOGGLE_TASK':
                const toggledState = state.map((task) => task.id === action.payload ? { ...task, completed: !task.completed } : task);
                localStorage.setItem('tasks', JSON.stringify(toggledState));
                return toggledState;

            case 'DELETE_TASK':
                const filteredState = state.filter((task) => task.id !== action.payload);
                localStorage.setItem('tasks', JSON.stringify(filteredState));
                return filteredState;

            case 'EDIT_TASK':
                const editedState = state.map((task) => task.id === action.payload.id ? { ...task, title: action.payload.title, description: action.payload.description } : task);
                localStorage.setItem('tasks', JSON.stringify(editedState));
                return editedState;

            default:
                return state;
        }
    };

    const App = () =>
    {
        const [tasks, dispatch] = useReducer(taskReducer, initialState);
        const [filter, setFilter] = useState('all');

        const filteredTasks = tasks.filter((task) =>
        {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
            return true;
        });

        return(
            <Router>
                <div className="container">
                    <div className="sidebar">
                        <Routes>
                            <Route path="/" element={<HomePage tasks={filteredTasks} dispatch={dispatch} setFilter={setFilter}/>}/>
                            <Route path="/*" element={<TaskList />} />
                        </Routes>
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path="/:taskId" element={<TaskDetailPage tasks={tasks}/>}/>
                            <Route path="/:taskId/edit" element={<TaskEditPage tasks={tasks} dispatch={dispatch}/>}/>
                            <Route path="/:taskId" element={<TaskDetail />} />
                            <Route path="/:taskId/edit" element={<TaskEditForm />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    };

    export default App;