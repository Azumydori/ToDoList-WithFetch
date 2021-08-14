import React from "react";
import PropTypes from "prop-types";

const ToDoList = props => {
	return (
		<li onClick={() => props.delete(props.id)}>
			<p>{props.text.label}</p>
		</li>
	);
};

export default ToDoList;

ToDoList.propTypes = {
	text: PropTypes.object,
	delete: PropTypes.func,
	id: PropTypes.number
};
