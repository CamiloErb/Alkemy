import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "../../images/logo.png"

export const NavBar = (props) => {
    const token = props?.token
    const [tokenState, setTokenState] = useState(token)

    const handleClick = () => {
        setTokenState(localStorage.setItem("token", ""))
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
            <div className="container-fluid">
                <LogoWrapper className={`btn ${tokenState ? null : "disabled"}`} to="/">
                    <img className="img-fluid" alt="logo" src={logo}></img>
                </LogoWrapper>
                {tokenState ? <button type="button" className="btn btn-outline-warning" onClick={handleClick}>Log out</button> : <span></span>}
            </div>
        </nav>

    )
}

const LogoWrapper = styled(Link)`
    width: 6em;
`