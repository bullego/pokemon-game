import cardBackSide from '../../assets/card-back-side.jpg';
import stl from './PokemonCard.module.css';
import classnames from 'classnames';

const PokemonCard = ({name, img, id, type, values, isActiveCard, onCardClick}) => {
	return (
		<div className={stl.root}
				 onClick={() => onCardClick(id)}>

      <div className={classnames(stl.pokemonСard, {[stl.active]: isActiveCard})}>
        <div className={stl.cardFront}>
					<div className={classnames(stl.wrap, stl.front)}> 
						<div className={classnames(stl.pokemon, stl[type])}>
							<div className={stl.values}>
								<div className={classnames(stl.count, stl.top)}>{values.top}</div>
								<div className={classnames(stl.count, stl.right)}>{values.right}</div>
								<div className={classnames(stl.count, stl.bottom)}>{values.bottom}</div>
								<div className={classnames(stl.count, stl.left)}>{values.left}</div>
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