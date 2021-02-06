import {Link} from 'react-router-dom';
import stl from './Menu.module.css';
import classnames from 'classnames';

const MENU = [
	{
		title: 'HOME',
		href: '/'
	},
	{
		title: 'GAME',
		href: '/game'
	},
	{
		title: 'ABOUT',
		href: '/about'
	},
	{
		title: 'CONTACT',
		href: '/contact'
	}
]

const Menu = ({isOpenMenu, onToggleMenu}) => {
	const handleClick = () => {
		onToggleMenu(!isOpenMenu)
	}

	return (
		<div className={classnames(stl.menuContainer, {[stl.active]: isOpenMenu === true,
																									 [stl.deactive]: isOpenMenu === false})}>
			<div className={stl.overlay}/>
			<div className={stl.menuItems}>
				<ul>
				{	
					MENU.map(item => {
						return (
							<li key={item.title}
									onClick={handleClick}>
								<Link to={item.href}>
									{item.title}
								</Link>
							</li>
						)
					})
				}
				</ul>
			</div>
		</div>
	)
}

export default Menu;