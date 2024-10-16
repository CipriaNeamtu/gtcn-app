import Loading from "../components/Loading";
import { User } from "../lib/definitions";

const Page = async () => {
	const response = await fetch('https://670fc21fa85f4164ef2bcd5d.mockapi.io/api/v1/top');
	const users = await response.json();
	
	const getUserDate = (user: User) => {
		return new Date(user.createdAt).toLocaleDateString();
	} 

	if (!users) {
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
    </div>
  );
}

export default Page;