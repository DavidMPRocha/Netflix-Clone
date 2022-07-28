import React from "react";
import "./style.css";

export default function Header({black}) {
    return (
        <header className={black && "black"}>
            <div className="header-logo">
                <a  href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" />
                </a>
            </div>
            <div className="header-user">
                <a  href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="profile" />
                </a>
            </div>
        </header>
    )
}