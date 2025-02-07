import React from 'react';
import useStore from '../store/main'
import {Link} from 'react-router-dom';
import './Nav.css';

const MainNav = () => {

    const {changeLogPage, insideNav, changeMainNav, logTitle, changeLogTitle} = useStore(state => state)


    return (
        <div className='nav_con'>
            {!insideNav ? (
                <ul>
                    <Link to={"/"}>
                        <li onClick={() => changeLogPage(false, "Register")}>Registration</li>
                    </Link>
                    <Link to={"/logIn"}>
                        <li onClick={() => changeLogPage(true, "LogIn")}>LogIn</li>
                    </Link>
                </ul>
            ):
                <>
                    <ul>
                        <Link to={"/users"}>
                            <li>Users</li>
                        </Link>
                        <Link to={"/icons"}>
                            <li>Icons</li>
                        </Link>
                        <Link to={"/cards"}>
                            <li>Color Cards</li>
                        </Link>
                    </ul>
                    <div>
                        <Link to={"/logIn"}>
                            <span onClick={() => changeMainNav(false, "Register")}>Log Out</span>
                        </Link>
                    </div>
                </>
            }
        </div>
    );
};

export default MainNav;