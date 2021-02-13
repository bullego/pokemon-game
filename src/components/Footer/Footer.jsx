import stl from './Footer.module.css';
import classnames from 'classnames';

const Footer = ({isFooter}) => {
	return (
		<footer className={classnames({[stl.toggle_footer]: isFooter})}>
			<div className={stl.wrapper}>
				<h3>THANKS FOR VISITING</h3>
				<p>© 2021 #ReactMarathon.</p>
			</div>
		</footer>
	)
}

export default Footer;