// import React, { useState } from 'react';
// import { FaSearch } from "react-icons/fa";
// import "./SearchBar.css";
// export const SearchBar = () => {
//     const [input, setInput] = useState("");

//     const fetchData = (value) => {
//         fetch("https://jsonplaceholder.typicode.com/users")
//     }

//     const handleChange = (value) => {
//         setInput(value)
//         fetchData(value)
//     }
//     return (
//         <div className="input-wrapper">
//             <input
//                 className="search-bar-input"
//                 placeholder="에스파 콘서트"
//                 value={input}
//                 onChange={(e) => handleChange(e.target.value)} /><FaSearch id="search-icon" />

//         </div>

//     );
// };

import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const mockData = [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
        ];
        setData(mockData);
        setFilteredData(mockData);
    }, []);

    const handleSearch = () => {
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
        setShowDropdown(true);
    };

    const handleChange = (value) => {
        setInput(value);
        handleSearch();
    };

    return (
        <div className="input-wrapper">
            <input
                className="search-bar-input"
                placeholder="에스파 콘서트"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={() => setShowDropdown(false)}
            />
            <FaSearch id="search-icon" />

            {/* Dropdown */}
            {showDropdown && (
                <div className="dropdown">
                    <ul>
                        {filteredData.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

