import React, { Component } from "react";
import './header.css';

export default class Header extends Component {

    render() {
        return (
            <header>
                <div className="logo">
                    <img src={this.props.logo} alt=""></img>
                </div>
                <h1 className="">{this.props.title}</h1>
                <p>{this.props.subTitle}</p>
            </header>
        )
    }
}