import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

export default function CustomSelect(props) {
    const classes = useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id={props.lblId}>Currency</InputLabel>
            <Select
                id={props.id}
                labelId={props.lblId}
                onChange={props.onChange}
                value={props.value}
                label="Currency">
                {
                    props.options &&
                    Object.keys(props.options).map((value) => {
                        return <MenuItem key={value} value={value}>{value}</MenuItem>
                    })
                }
            </Select>
        </FormControl >
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

