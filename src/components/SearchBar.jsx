import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import {useNavigate} from "react-router-dom";

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const navigate = useNavigate();

    const isBlank = (query) => {
        return !query.trim()
    }

    const handleSearch = () => {
        if (isBlank(input)) {
            alert('검색어를 입력해주세요.');
        } else {
            navigate(`/search?q=${input}`);
        }
    };

    const handelKeydown = (e) => {
        if (isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setInput('');
            handleSearch();
        }
    }

    const handleChange = (value) => {
        setInput(value);
    };

    return (
        <div className="input-wrapper">
            <input
                className="search-bar-input"
                placeholder="에스파 콘서트"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => handelKeydown(e)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
            />
            <FaSearch id="search-icon" onClick={handleSearch} />
        </div>
    );
};