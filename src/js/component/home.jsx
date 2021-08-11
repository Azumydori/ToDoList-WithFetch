import React, { useEffect, useState } from "react";
import ToDoList from "./todolist.jsx";

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([]);
	const [listMap, setListMap] = useState("");

	const keepTask = newTask => {
		setTaskList([...taskList, newTask]);
	};

	useEffect(() => {
		if (taskList.length) {
			setListMap(
				taskList.map((task, index) => {
					return <ToDoList text={task} key={index} />;
				})
			);
		}
	}, [taskList]);

	return (
		<div className="container-flex">
			<form
				className="to-do-list"
				onSubmit={event => {
					event.preventDefault();
				}}>
				<h1>
					MY TASKS <i className="fas fa-pencil-alt"></i>
				</h1>
				<p className="p-3">What do you have to do today?</p>
				<input
					className="col-6 offset-3 rounded"
					type="tasks"
					onKeyPress={event => {
						if (event.key == "Enter") {
							keepTask(event.target.value);
							event.target.value = "";
						}
					}}
					placeholder="write something!"
				/>
				<ul className="offset-3">{listMap}</ul>
			</form>
		</div>
	);
};

export default Home;
