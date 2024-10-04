
import { ParamsTypes, Quiz } from "@/app/lib/definitions";
import { getQuizData } from "@/services/fetchData";
import StartQuiz from "./startQuiz";

const Page = async ({ params }: ParamsTypes) => {
  const quizId = params?.quizid;
	const quizData = await getQuizData();
	const selectedQuiz = quizData.filter((quiz: Quiz) => quiz.id === quizId)[0];

  return (
		<StartQuiz quiz={selectedQuiz} />
  );
}

export default Page;
 