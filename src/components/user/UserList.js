// src/components/UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./UserList.module.css";

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3003/user")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the users!", error);
			});
	}, []);

	return (
		<div>
			<h2>Lista de Usuários</h2>
			<ul>
				{users.map((user) => (
					<li key={user._id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
