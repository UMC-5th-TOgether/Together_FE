import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
export const SearchBar = () => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users") 
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }
    return (
    <div className = "input-wrapper">
        <input placeholder="에스파 콘서트"
            value={input}
            onChange={(e) => handleChange(e.target.value)} /><FaSearch id="search-icon"/>
    
    </div>
    
    );
};



