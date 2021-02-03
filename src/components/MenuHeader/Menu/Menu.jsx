import stl from './Menu.module.css';
import classnames from 'classnames';

const Menu = ({isOpenMenu}) => {
	return (
		<div className={classnames(stl.menuContainer, {[stl.active]: isOpenMenu,
																									 [stl.deactive]: !isOpenMenu})}>
			<div className={stl.overlay}/>
			<div className={stl.menuItems}>
				<ul>
					<li>
						<a href="#welcome">
							HOME
						</a>
					</li>
					<li>
						<a href="#game">
							GAME
						</a>
					</li>
					<li>
						<a href="#about">
							ABOUT
						</a>
					</li>
					<li>
						<a href="#contact">
							CONTACT
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Menu;