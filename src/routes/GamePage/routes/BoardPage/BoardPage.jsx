import {useContext} from 'react';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import stl from './BoardPage.module.css';

const BoardPage = () => {
	const pokContext = useContext(PokemonContext);
	// console.log('pokContext BoardPage: ', pokContext);

	return (
		<div className={stl.root}>
			<div className={stl.playerOne}>
				{ pokContext.selectedPoks.map(pok => {
						return (
							<PokemonCard key={pok.id}
													 name={pok.name} 
													 img={pok.img}
													 id={pok.id}
												 	 type={pok.type}
													 values={pok.values}
													 isActiveCard={true}
													 minimize={true}
													 className={stl.card}/>
						)
					})
				}
			</div>

			<div className={stl.board}>
				<div className={stl.boardPlate}>1</div>
				<div className={stl.boardPlate}>2</div>
				<div className={stl.boardPlate}>3</div>
				<div className={stl.boardPlate}>4</div>
				<div className={stl.boardPlate}>5</div>
				<div className={stl.boardPlate}>6</div>
				<div className={stl.boardPlate}>7</div>
				<div className={stl.boardPlate}>8</div>
				<div className={stl.boardPlate}>9</div>
			</div>
		</div>
	);
};

export default BoardPage;