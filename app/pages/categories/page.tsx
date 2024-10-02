
import { getQuizData } from "@/services/fetchData";
import Categories from "./categories";

const Page = async () => {
	const quizData = await getQuizData();

	return (
		<Categories quizData={quizData} />
	);
}

export default Page;
