import {useHistory} from 'react-router-dom';
import stl from './Header.module.css';

const Header = ({title, desc}) => {
	const history = useHistory();
	
	const handleClick = () => {
		history.push('/game');
	}

	return (
 		<header className={stl.root}>
			<div className={stl.forest}></div>
			<div className={stl.silhouette}></div>
			<div className={stl.moon}></div>
			<div className={stl.container}>
				<h1>{title}</h1>
				<p>{desc}</p>

				<button onClick={handleClick}>
					Start Game
				</button>
			</div>
		</header>
	)
}

export default Header;