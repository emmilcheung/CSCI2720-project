import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = ({ isLogin, username, logout }) => {
    return (
        <>
            <nav className="navbar navbar-expand-xl navbar-light bg-light">
                <Link to="/" className="navbar-brand"> HK-Events App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-2">
                        {
                            isLogin
                                ? (<>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">{username}</a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/favourite" className="dropdown-item" >Favourite</Link>
                                            <div className="dropdown-divider"></div>
                                            <span className="dropdown-item" onClick={() => logout()}>Logout</span>
                                        </div>
                                    </li>
                                </>)
                                : (< li className="nav-item">
                                    <Link
                                        to="/login"
                                        className="nav-link"
                                    >
                                        Login
                                    </Link>
                                </li>
                                )
                        }
                        <li className="nav-item">
                            <a className="nav-link">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
