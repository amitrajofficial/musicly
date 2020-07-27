import React from 'react';
import { Menu } from 'antd';
import { PlaySquareOutlined, UnorderedListOutlined } from '@ant-design/icons';
import logo from '../images/logo.png';
import 'antd/dist/antd.css';
import '../styles/HomePage.scss';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <>
            <NavLink to="/">
                <img src={logo} className="logo" alt="Logo" />
            </NavLink>
            <Menu selectedKeys={["mail"]} mode="horizontal" className="items">
                <Menu.Item key="songs" icon={<PlaySquareOutlined />} >
                    <NavLink to="/songs">All Songs</NavLink>
                </Menu.Item>
                <Menu.Item key="playlists" icon={<UnorderedListOutlined />} >
                    <NavLink to="/playlists">Playlists</NavLink>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default Header;