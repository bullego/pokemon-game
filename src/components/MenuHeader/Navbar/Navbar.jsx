import {Link} from 'react-router-dom';
import stl from './Navbar.module.css';
import classnames from 'classnames';
import logo from '../../../assets/pok_logo.svg';
import { ReactComponent as LoginSVG } from '../../../assets/login.svg';

const Navbar = ({isOpenMenu, onToggleMenu, bgActive = false, onClickLogin}) => {
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
				
				<div className={stl.loginAndMenu}>
					<div className={stl.login_wrap}
							 onClick={onClickLogin}>
						<LoginSVG />
					</div>

					<div className={classnames(stl.menuButton, {[stl.active]: isOpenMenu})}
							 onClick={handleClick}>
						<span />
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;