import classnames from 'classnames';
import stl from './ArrowChoice.module.css';

const ArrowChoice = ({ stop = false, side = 0}) => {
    return <div className={classnames(stl.arrow, {[stl.rightSide]: side === 2,
																									[stl.leftSide]: side === 1})}/>
};

export default ArrowChoice;
