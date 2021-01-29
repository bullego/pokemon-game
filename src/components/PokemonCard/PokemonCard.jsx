import {useState} from 'react';
import stl from './PokemonCard.module.css';
import cardBackSide from '../../assets/card-back-side.jpg';

const PokemonCard = ({name, img, id, type, values}) => {
	const [isActive, setActive] = useState(false);

	const onCardClick = () => {
		isActive ? setActive(false) : setActive(true)
	}

	return (
		<div className={stl.root}
				 onClick={onCardClick}>
      <div className={`${stl.pokemonСard} ${isActive ? stl.active : ''}`}>
        <div className={stl.cardFront}>
					<div className={`${stl.wrap} ${stl.front}`}>
						<div className={`${stl.pokemon} ${stl[type]}`}>
							<div className={stl.values}>
								<div className={`${stl.count} ${stl.top}`}>{values.top}</div>
								<div className={`${stl.count} ${stl.right}`}>{values.right}</div>
								<div className={`${stl.count} ${stl.bottom}`}>{values.bottom}</div>
								<div className={`${stl.count} ${stl.left}`}>{values.left}</div>
							</div>

							<div className={stl.imgContainer}>
								<img src={img} alt={name} />
							</div>

							<div className={stl.info}>
								<span className={stl.number}>#{id}</span>
								<h3 className={stl.name}>{name}</h3>
								
								<small className={stl.type}>
									Type: <span>{type}</span>
								</small>
							</div>
						</div>
					</div>
        </div>

        <div className={stl.cardBack}>
            <div className={`${stl.wrap} ${stl.back}`}>
                <img src={cardBackSide} alt="Сard Backed" />
            </div>
        </div>
    	</div>
		</div>
	)
}

export default PokemonCard;