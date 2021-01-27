import stl from './Header.module.css';

const Header = (props) => {
	return (
		<header className={stl.root}>
			<div className={stl.forest}></div>
			<div className={stl.container}>
					<h1>This is title</h1>
					<p>This is Description!</p>
			</div>
		</header>
	)
}

export default Header;