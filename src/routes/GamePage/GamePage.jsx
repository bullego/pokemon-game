import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard';
import stl from './GamePage.module.css';
import layoutBg from '../../assets/bg3.jpg';
import database from '../../service/firebase';


const getMockPokemonData = (id) => ({
	"abilities" : [ "keen-eye", "tangled-feet", "big-pecks" ],
	"base_experience" : 122,
	"height" : 11,
	id, 
	"img" : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png`,
	"name" : "pidgeotto",
	"stats" : {
		"attack" : 60,
		"defense" : 55,
		"hp" : 63,
		"special-attack" : 50,
		"special-defense" : 50,
		"speed" : 71
	},
	"type" : "flying",
	"values" : {
		"bottom" : 7,
		"left" : 5,
		"right" : 2,
		"top" : "A"
	}				
});


const GamePage = () => {
	const [pokemons, setPokemons] = useState({});

	useEffect(() => {
		database.ref('pokemons').once('value', (snapshot) => {
			setPokemons(snapshot.val())
		})
	}, []);

	const onCardClick = (id) => {
		let objID = null;

		const updatedPokemons = Object.entries(pokemons).reduce((acc, item) => {
			const pokemon = {...item[1]};
			
			if (pokemon.id === id) {
				objID =	 item[0];
				pokemon.active = !pokemon.active;
			};
			
			acc[item[0]] = pokemon;

			return acc;
		}, {});;

		setPokemons(updatedPokemons);
		
		if (objID)  {
			const updatedPokemon = updatedPokemons[objID];

			database.ref('pokemons/' + objID).set(updatedPokemon);
		}
	}

	const addNewPokemon = () => {
		const allIds = Object.values(pokemons).map(pok => pok.id);
		const setIds = new Set(allIds);
		let id = 0;
		let exists = setIds.has(id);
	
		while (exists) {
			id += 1;
			exists = setIds.has(id);
		}

		const data = getMockPokemonData(id);

		const newKey = database.ref().child('pokemons').push().key;
		database.ref('pokemons/' + newKey).set(data);

		const updatedPokemons = {...pokemons, [newKey]: data};

		setPokemons(updatedPokemons);
	}
	
	return (
			<Layout id='cards'
							title='Cards'
							colorTitle='#252934'
							urlBg={layoutBg}>

				<div className={stl.btn_wrapp}>
					<button className={stl.add_btn}
									onClick={addNewPokemon}>
						Add pokemon
					</button>
				</div>

				<div className={stl.flex}>
					{ Object.entries(pokemons).map(([key, value]) => 
						<PokemonCard key={key}
												 name={value.name} 
												 img={value.img}
												 id={value.id}
												 type={value.type}
												 values={value.values}
												 isActiveCard={value.active}
												 onCardClick={onCardClick}/>)
					}
				</div>
			</Layout>
	)
}

export default GamePage;