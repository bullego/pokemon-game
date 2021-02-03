import {useState} from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import stl from './MenuHeader.module.css';

const MenuHeader = ({bgActive}) => {
	const [isOpenMenu, setIsOpenMenu] = useState(null); // !!null === false  !null === true
	
	const onToggleMenu = () => {
		setIsOpenMenu(prevState => !prevState)
	}

	return (
		<div className={stl.menuHeader}>
			<Menu isOpenMenu={isOpenMenu}
						onToggleMenu={onToggleMenu}/>

			<Navbar isOpenMenu={isOpenMenu}
							onToggleMenu={onToggleMenu}
							bgActive={bgActive}/>
		</div>
	)
}

export default MenuHeader;