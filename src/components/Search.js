import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchComponent(props) {
    return (
        <Search
            placeholder={props.placeholder || "search for songs..."}
            onChange={props.onChange}
            className="search-bar"
            style={{ position: "left", width: 500, padding: "5px", margin: "10px" }}
        />
    )
}

export default SearchComponent;