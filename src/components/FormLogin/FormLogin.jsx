import React, { useState, useEffect } from 'react';
import Input from '../Input';
import stl from './FormLogin.module.css';


const FormLogin = ({onSubmit, isOpenModal, isSignUp, setIsSignUp}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if(isOpenModal) {
			resetFormState()
		}
	}, [isOpenModal])

	const resetFormState = () => {
		setEmail('');
		setPassword('');
	}

	const handleFormSubmit = (e) => {
		e.preventDefault();

		onSubmit && onSubmit({
			email,
			password
		})

		resetFormState();
	}

	const handleToggleButtons = () => {
		setIsSignUp(prevState => !prevState)
	}
	
	return (
		<form className={stl.form_login}
					onSubmit={handleFormSubmit}>
			<div>
				<Input label='Email'
							 type='text'
							 name='email'
							 value={email}
							 onChange={(e) => setEmail(e.target.value)}
							 isRequired/>
			</div>
			
			<div>
				<Input label='Password'
							 type='password'
							 name='password'
							 value={password}
						 	 onChange={(e) => setPassword(e.target.value)}
						 	 isRequired/>
			</div>

			<div className={stl.btn_wrap}>
				<button type='submit'
								className={stl.submit_btn}>
					{isSignUp ? 'Sign In' : 'Sign Up'}
				</button>
				<button type='button'
								className={stl.toggle_btn}
								onClick={handleToggleButtons}>
					{isSignUp ? 'Register?' : 'Log In?'}
				</button>
			</div>
		</form>
	);
};

export default FormLogin;