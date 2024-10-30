'use client'

import { useEffect, useState } from "react";
import Loading from "../components/Loading";

type User = {
	name: string;
	age: number;
}

const Page = () => {
	const [users, setUsers] = useState<User[]>([]);

	const getUsers = async () => {
		try {
			const response = await fetch('/api/users');
			const { users } = await response.json();
			setUsers(users);
		} catch (error) {
			console.error('users::getUsers:', error)
		}
	}

	useEffect(() => {
		getUsers();
	}, [])

	if (!users?.length) {
		return <Loading />
	}

	return (
		<div className="flex flex-col items-center mt-7 p-6 pb-52 sm:mb-0 bg-colorBunker">
			<h1 className="text-3xl">Users List</h1>

			<div className="flex justify-center items-center mt-10 pb-52 bg-colorBunker p-3">
				<table className="table-auto border-collapse border border-gray-400 text-xs sm:text-lg">
					<thead>
						<tr>
							<th className="border border-gray-300 px-4 py-2">Nr</th>
							<th className="border border-gray-300 px-4 py-2">User Name</th>
							<th className="border border-gray-300 px-4 py-2">Age</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index: number) => (
							<tr key={index}>
								<td className="border border-gray-300 px-4 py-2">{index + 1}</td>
								<td className="border border-gray-300 px-4 py-2">{user.name}</td>
								<td className="border border-gray-300 px-4 py-2">{user.age}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Page;