import React from 'react';
import "./LinkBlock.css";

const LinkBlock = (props, { authUser }) =>
	<div className="link-block-wrapper">
		<div className="drag-block" />
		<div className="content-wrap">	
			<button onClick={props.del} data-key={props.delKey} className="link-x">X</button>
			<div className="url-block">	
				<a href={props.link} className="url-wrapper">	
					<img className="img-div" src={"//logo.clearbit.com/" + props.link} alt={props.link} />
					<p className="link-div">{props.link}</p>
				</a>
			</div>
		</div>
	</div>

export default LinkBlock;