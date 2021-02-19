const baseUrl = 'https://reactmarathon-api.netlify.app/api';


export const fetchBoard = async () => {
	const response = await fetch(`${baseUrl}/board`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
	if (!response.ok) {
		throw new Error('Failed to get board');
	} else {
		return await response.json();
	}
}


export const fetchOpponentPokemons = async () => {
	const response = await fetch(`${baseUrl}/create-player`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	});
	if (!response.ok) {
		throw new Error('Failed to get opponent pokemons');
	} else {
		return await response.json();
	}	
}


export const fetchCombineBoard = async (params) => {
	const response = await fetch(`${baseUrl}/players-turn`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(params)
	});

	if (!response.ok) {
		throw new Error('Failed to combine pokemon card with board');
	} else {
		return await response.json();
	}	
}