import stl from './Layout.module.css';

const Layout = ({id, title, urlBg, colorBg, colorTitle, children}) => {
	const styleBg = urlBg 
		? {background: `url(${urlBg})`, backgroundSize: 'cover'}
		:	{backgroundColor: colorBg || 'transparent'}
	const styleTitle = colorTitle	? {color: `${colorTitle}`} : {color: '#252934'}

	return (
		<section style={styleBg}
						 className={stl.root}
						 id={id}>
			<div className={stl.wrapper}>
				<article>
					<div className={stl.title}>
						<h3 style={styleTitle}>{title}</h3>
						<span className={stl.separator}></span>
					</div>
					<div className={stl.desc + ' ' + stl.full}>
						{children}
					</div>
				</article>
			</div>
		</section>
	)
}

export default Layout;