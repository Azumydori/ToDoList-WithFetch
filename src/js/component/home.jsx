import React, { useEffect, useState } from "react";
import ToDoList from "./todolist.jsx";

//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([]);
	const [listMap, setListMap] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Azumydori", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setTaskList(data);
			})
			.catch(error => {
				console.log(error, "oops");
			});
	}, []);

	useEffect(() => {
		if (taskList.length) {
			setListMap(
				taskList.map((task, index) => {
					return (
						<ToDoList
							text={task}
							id={index}
							key={index.toString()}
							delete={deleteTask}
						/>
					);
				})
			);
		}
	}, [taskList]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Azumydori", {
			method: "PUT",
			body: JSON.stringify(taskList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [taskList]);

	const deleteTask = indexDelete => {
		setTaskList(taskList.filter((_, index) => index !== indexDelete));
	};

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
							if (event.key === "Enter") {
								setTaskList([
									...taskList,
									{ label: event.target.value, done: false }
								]);
								event.currentTarget.value = "";
							}
						}
					}}
					placeholder="write something!"
				/>
				<ul className="list">{listMap}</ul>
				<p className="remaining">{listMap.length} tasks remaining</p>
				<p>Click the tasks to delete them!</p>
			</form>
		</div>
	);
};

export default Home;
