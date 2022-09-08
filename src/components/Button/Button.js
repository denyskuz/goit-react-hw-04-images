import React from 'react'
import { func, string } from 'prop-types';
import classes from './Button.module.css'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick} type='button' className={classes.root}>{text || 'Load more'}</button>
    )
}
Button.propsTypes = {
    onClick: func.isRequired,
    text: string
}
export default Button;