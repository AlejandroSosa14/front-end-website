const SpecsDetail = ({ content, title, icon }) => {
	return (
		<>
			{!content ? (
				<p>
					<span>{title}: </span> Sin información disponible
				</p>
			) : (
				<>
					{icon}
					<p>
						<span>{title}: </span> {content.toLowerCase()}
					</p>
				</>
			)}
		</>
	);
};

export default SpecsDetail;
