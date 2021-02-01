import stl from './Header.module.css';

const Header = ({title, desc}) => {
	return (
 		<header className={stl.root}>
			<div className={stl.forest}></div>
			<div className={stl.container}>
				<h1>{title}</h1>
				<p>{desc}</p>
			</div>
		</header>
	)
}

export default Header;