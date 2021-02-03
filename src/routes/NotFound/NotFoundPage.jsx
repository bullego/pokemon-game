import {useHistory} from 'react-router-dom';
import stl from './NotFoundPage.module.css';

const NotFoundPage = () => {
	const history = useHistory();
	
	const handleClick = () => {
		history.push('/');
	}
	
	return (
		<div className={stl.notfound_page}>
			<p>404Error: Page Not Found</p>

			<button onClick={handleClick}>
				Back to homepage
			</button>
		</div>
	)
}

export default NotFoundPage;