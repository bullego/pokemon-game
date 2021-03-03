import {useState} from 'react';
import {NotificationManager} from 'react-notifications';
import Navbar from './Navbar';
import Menu from './Menu';
import Modal from '../Modal';
import FormLogin from '../FormLogin';
import stl from './MenuHeader.module.css';


const MenuHeader = ({bgActive}) => {
	const [isOpenMenu, setIsOpenMenu] = useState(null); // !!null === false  !null === true
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	
	const onToggleMenu = () => {
		setIsOpenMenu(prevState => !prevState)
	}

	const onClickLogin = () => {
		setIsOpenModal(prevState => !prevState)
	}

	const handleSubmitFormLogin = async (objValue) => {
		const API_KEY = 'AIzaSyDnVnyxCQ96NawAeLssmyQ8LMI4R0g53eY';
		const REGISTRATION_URL = 
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
		const AUTH_URL = 
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
		
		const response = 
			await fetch(isSignUp ? AUTH_URL : REGISTRATION_URL,
			{
				method: 'POST',
				body: JSON.stringify({
					email: objValue.email,
					password: objValue.password,
					returnSecureToken: true
				})
			}).then(res => res.json());

		console.log('response: ', response);

		if(response.hasOwnProperty('error')) {
			NotificationManager.error(response.error.message, 'Something went wrong!');
		} else {
			localStorage.setItem('idToken', response.idToken)
			NotificationManager.success('Success! Everything is good!');
		}
	}

	return (
		<div className={stl.menuHeader}>
			<Menu isOpenMenu={isOpenMenu}
						onToggleMenu={onToggleMenu}/>

			<Navbar isOpenMenu={isOpenMenu}
							onToggleMenu={onToggleMenu}
							bgActive={bgActive}
							onClickLogin={onClickLogin}/>
			
			<Modal title='Log In...'
						 onCloseModal={onClickLogin}
						 isOpenModal={isOpenModal}>
				<FormLogin onSubmit={handleSubmitFormLogin}
									 isOpenModal={isOpenModal}
									 isSignUp={isSignUp}
									 setIsSignUp={setIsSignUp}/>
			</Modal>
		</div>
	)
}

export default MenuHeader;