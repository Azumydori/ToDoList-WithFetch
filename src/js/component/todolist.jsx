import React from "react";
import PropTypes from "prop-types";

const ToDoList = props => {
	return <li>{props.text}</li>;
};

export default ToDoList;

ToDoList.propTypes = {
	text: PropTypes.string
};
