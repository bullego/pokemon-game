import {useState} from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import stl from './PlayerBoard.module.css';
import classnames from 'classnames';


const PlayerBoard = ({cards, playerSteps, playerNumber, randomPlayerNumber, onChosenCard}) => {
	const [isSelectedBoardCard, setIsSelectedBoardCard] = useState(null);

	const handleClick = (card) => {
		//define next player step
		if(playerNumber === randomPlayerNumber && (playerSteps%2 === 0)) {
			setIsSelectedBoardCard(card.id)

			onChosenCard && onChosenCard({
				playerNumber,
				...card
			})
		}
		if(playerNumber === (randomPlayerNumber === 1 ? 2 : 1) && (playerSteps%2 !== 0)) {
			setIsSelectedBoardCard(card.id)

			onChosenCard && onChosenCard({
				playerNumber,
				...card
			})
		}
	}

	return (
		<>
			{cards.map(card => {
				return (
					<div key={card.id}
							 className={classnames(stl.board_card, {
								 										 [stl.selected]: isSelectedBoardCard === card.id})}
							 onClick={() => handleClick(card)}>
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