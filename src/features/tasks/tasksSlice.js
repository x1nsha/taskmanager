import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const tasksSlice = createSlice
({
    name: 'tasks', initialState,
    reducers:
    {
        addTask(state, action)
        {
            state.push(action.payload);

            localStorage.setItem('tasks', JSON.stringify(state));
        },
        toggleTaskStatus(state, action)
        {
            const task = state.find((t) => t.id === action.payload);

            if (task)
            {
                task.completed = !task.completed;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
        },
        deleteTask(state, action)
        {
            const index = state.findIndex((t) => t.id === action.payload);

            if (index !== -1)
            {
                state.splice(index, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(state));
        },
        editTask(state, action)
        {
            const task = state.find((t) => t.id === action.payload.id);

            if (task)
            {
                task.title = action.payload.title;
                task.description = action.payload.description;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
        },
    },
});

export const { addTask, toggleTaskStatus, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;