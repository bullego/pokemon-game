import stl from './Header.module.css';

const Header = ({title, desc, onClickStartGame}) => {
	const handleClick = () => {
		onClickStartGame && onClickStartGame('game');
	}

	return (
 		<header className={stl.root}>
			<div className={stl.forest}></div>
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