import stl from './Layout.module.css';

const Layout = ({id, title, desc, urlBg, colorBg}) => {
	const styleBg = urlBg 
		? {background: `url(${urlBg})`, backgroundSize: 'cover'}
		:	{backgroundColor: colorBg}

	return (
		<section style={styleBg}
						 className={stl.root}
						 id={id}>
			<div className={stl.wrapper}>
					<article>
							<div className={stl.title}>
									<h3>{title}</h3>
									<span className={stl.separator}></span>
							</div>
							<div className={stl.desc + ' ' + stl.full}>
									<p>{desc}</p>
							</div>
					</article>
			</div>
		</section>
	)
}

export default Layout;