import {useHistory} from 'react-router-dom';
import stl from './ContactPage.module.css';

const ContactPage = () => {
	const history = useHistory();
	
	const handleClick = () => {
		history.push('/');
	}

	return (
		<div className={stl.contact_page}>
			<p>Hello from Contact Page</p>

			<button onClick={handleClick}>
				Back to homepage
			</button>
		</div>
	)
}

export default ContactPage;