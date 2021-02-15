import {useState} from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import stl from './PlayerBoard.module.css';
import classnames from 'classnames';

const PlayerBoard = ({cards, playerNumber, onChosenCard}) => {
	const [isSelectedBoardCard, setIsSelectedBoardCard] = useState(null);

	return (
		<>
			{cards.map(card => {
				return (
					<div key={card.id}
							 className={classnames(stl.board_card, {
								 										 [stl.selected]: isSelectedBoardCard === card.id})}
							 onClick={() => {
								 setIsSelectedBoardCard(card.id);
								 onChosenCard && onChosenCard({
									 playerNumber,
									 ...card
								 })
							 }}>
						<PokemonCard name={card.name} 
												 img={card.img}
												 id={card.id}
												 type={card.type}
												 values={card.values}
											 	 isActiveCard={true}
												 minimize={true}/>
					</div>				
				)
			})}
		</>
	)
}

export default PlayerBoard;