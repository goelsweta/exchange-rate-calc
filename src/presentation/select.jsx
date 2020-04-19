import React, { Component } from 'react';

export default function Select(props) {
    return (
        <select className="select" onChange={props.onChange} value={props.value}>
            {
                props.options &&
                Object.keys(props.options).map((value) => {
                    return <option key={value} value={value}>{value}</option>
                })
            }
        </select>
    )
}