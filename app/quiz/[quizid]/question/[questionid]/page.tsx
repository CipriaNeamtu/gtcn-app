import { QuizQuestion, Quiz, ParamsTypes } from "@/app/lib/definitions";
import Questions from "./questions";
import { getQuizData } from "@/services/fetchData";

const Page = async ({ params }: ParamsTypes) => {
	const questionId = params?.questionid;
	const quizId = params?.quizid;
	const quizData = await getQuizData();
	const selectedQuiz = quizData.filter((quiz: Quiz) => quiz.id === quizId)[0];
	const selectedQuestion = selectedQuiz.questions.filter((question: QuizQuestion) => question.id === questionId)[0];

	return (
		<div className="flex flex-col mt-10 items-center">
			<div className="text-xl">{selectedQuiz.category}` Questions</div>
				<Questions quiz={selectedQuiz} question={selectedQuestion} />
		</div>
	);
}

export default Page;