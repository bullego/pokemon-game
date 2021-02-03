import {useState} from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import stl from './MenuHeader.module.css';

const MenuHeader = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const onToggleMenu = (isOpen) => {
		setIsOpenMenu(isOpen)
	}

	return (
		<div className={stl.menuHeader}>
			<Menu isOpenMenu={isOpenMenu}/>
			<Navbar isOpenMenu={isOpenMenu}
							onToggleMenu={onToggleMenu}/>
		</div>
	)
}

export default MenuHeader;