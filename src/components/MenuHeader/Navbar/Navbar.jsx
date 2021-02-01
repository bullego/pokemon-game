import stl from './Navbar.module.css';
import classnames from 'classnames';
import logo from '../../../assets/pok_logo.svg';

const Navbar = ({isOpenMenu, onToggleMenu}) => {
	const handleClick = () => {
		onToggleMenu(!isOpenMenu)
	}

	return (
		<nav id={stl.navbar}>
			<div className={stl.navWrapper}>
				<p className={stl.brand}>
					<img src={logo} alt="logo"/>
				</p>
				
				<a className={classnames(stl.menuButton, {[stl.active]: isOpenMenu})}
					 onClick={handleClick}>
					<span />
				</a>
			</div>
		</nav>
	)
}

export default Navbar;