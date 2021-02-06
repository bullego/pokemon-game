import {Link} from 'react-router-dom';
import stl from './Navbar.module.css';
import classnames from 'classnames';
import logo from '../../../assets/pok_logo.svg';

const Navbar = ({isOpenMenu, onToggleMenu, bgActive = false}) => {
	const handleClick = () => {
		onToggleMenu(!isOpenMenu)
	}

	return (
		<nav id={stl.navbar} className={classnames({[stl.bgActive]: bgActive})}>
			<div className={stl.navWrapper}>
				<Link className={stl.brand}
							to='/'>
					<img src={logo} alt="logo"/>
				</Link>
				
				<div className={classnames(stl.menuButton, {[stl.active]: isOpenMenu})}
					 	 onClick={handleClick}>
					<span />
				</div>
			</div>
		</nav>
	)
}

export default Navbar;