import React from 'react';
import stl from './Input.module.css';
import classnames from 'classnames';


const Input = ({type = 'text', label, value, name, onChange, isRequired = true}) => {
	return (
		<div className={stl.root}>
			<input type={type}
						 name={name}
						 value={value}
						 onChange={onChange}
						 className={classnames(stl.input, {[stl.valid]: value})}
						 required={isRequired}/>

			<span className={stl.highlight}></span>
			<span className={stl.bar}></span>

			<label className={stl.label}>{label}</label>
		</div>
	);
};

export default Input;