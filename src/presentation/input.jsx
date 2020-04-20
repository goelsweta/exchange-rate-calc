import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';

export default function Input(props) {
    const classes = useStyles();
    return (
        <TextField className={classes.textField}
            disabled={props.disabled}
            value={props.value}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                inputComponent: NumberFormatCustom,
            }}
            variant="outlined"></TextField>
    )
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={props.onChange}
            thousandSeparator
            isNumericString
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(1),
    }
}));