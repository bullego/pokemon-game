import {useHistory} from 'react-router-dom';
import stl from './AboutPage.module.css';

const AboutPage = () => {
	const history = useHistory();
	
	const handleClick = () => {
		history.push('/');
	}

	return (
		<div className={stl.about_page}>
			<p>Hello from About Page</p>

			<button onClick={handleClick}>
				Back to homepage
			</button>
		</div>
	)
}

export default AboutPage;