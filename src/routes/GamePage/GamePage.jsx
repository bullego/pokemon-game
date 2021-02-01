import stl from './GamePage.module.css';

const GamePage = ({onChangePage}) => {
	const handleClick = () => {
		onChangePage && onChangePage('app')
	}

	return (
		<div className={stl.gamepage}>
			<p>Hello from Game Page</p>

			<button onClick={handleClick}>
				Back to homepage
			</button>
		</div>
	)
}

export default GamePage;