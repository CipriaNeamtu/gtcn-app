'use client'

import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { User } from "../lib/definitions";
import { Button } from "@nextui-org/button";
import { createDataBase } from '../quiz-data/route';

const usersApi = process.env.NEXT_PUBLIC_USERS_API_URL;

const Page = () => {
	const [users, setUsers] = useState<User[]>([]);
	const getUserDate = (user: User) => {
		return new Date(user.createdAt).toLocaleDateString();
	} 

	const handleDataBase = async () => {
		const request = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: { name: 'Ciprian Neamtu', age: 20  }
		}

		const dataBase = await createDataBase(request);
		console.log({ dataBase });
		
	}
	
	useEffect(() => {
		if (!usersApi) {
			throw new Error('Top::getTopListUsers: Users API URL is not defined');
		}

		const getTopListUsers = async () => {
			try {
				const response = await fetch(usersApi);
				const data = await response.json();
				setUsers(data)
			} catch (error) {
					console.error('Top::getTopListUsers:', error);
			}
		}

		getTopListUsers();
	},[])

	if (!users.length) {
		return <Loading />
	}

	return (
    <div className="flex justify-center items-center mt-10 pb-52 bg-colorBunker p-3">
      <table className="table-auto border-collapse border border-gray-400 text-xs sm:text-lg">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nr.</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Points</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
					{ users.map((user: User, index: number) => (
						<tr key={index}>
							<td className="border border-gray-300 px-4 py-2">{user.id}</td>
							<td className="border border-gray-300 px-4 py-2">{user.name}</td>
							<td className="border border-gray-300 px-4 py-2">{user.score}</td>
							<td className="border border-gray-300 px-4 py-2">{user.category}</td>
							<td className="border border-gray-300 px-4 py-2">{getUserDate(user)}</td>
						</tr>
					))}
        </tbody>
      </table>

					<Button color="primary" onClick={handleDataBase}>Create Data Base</Button>
    </div>
  );
}

export default Page;