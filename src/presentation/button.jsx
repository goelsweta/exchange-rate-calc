import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export default function CustomButton(props) {
    return (
        <CustomizedButton variant="contained" color="primary" onClick={props.onClick} >
            {props.label}
        </CustomizedButton>
    )
}
const CustomizedButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#5fbaa7'),
        backgroundColor: '#5fbaa7',
        '&:hover': {
            backgroundColor: '#5fbaa7',
        },
    },
}))(Button);