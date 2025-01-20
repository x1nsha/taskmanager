import React, { useState } from 'react';

const SearchTask = ({ onSearch }) =>
{
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) =>
    {
        const term = e.target.value;

        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search tasks..."/>
    );
};

export default SearchTask;