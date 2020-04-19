import React, { Component } from "react";

export default class Header extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <header>
                <div className="logo">
                    <img src={this.props.logo}></img>
                </div>
                <h1 className="">{this.props.title}</h1>
                <p>{this.props.subTitle}</p>
            </header>
        )
    }
}