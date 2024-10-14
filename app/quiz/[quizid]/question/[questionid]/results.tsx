import { Button } from "@nextui-org/button";
import { PAGE } from "@/app/lib/constants";
import { ResultsPage } from "@/app/lib/definitions";
import Link from "next/link";

const Results = ({ questions }: ResultsPage) => {
	const correctAnswers = questions.filter(question => question.points !== 0).length;
	const wrongAnswers = questions.filter(question => question.points === 0).length;

	return (
		<div className="flex flex-col items-center gap-2 pb-80 bg-colorBunker">
			<div className="text-green-500 text-xl mt-5">Great, the quiz has been completed!!!</div>

			<div className="flex flex-col gap-2 items-center mt-7 p-6 text-center">
				<p>In total you answered {questions.length} questions!</p>
				<p>From this total {correctAnswers} questions were correct and {wrongAnswers} were wrong!</p>
				<p>Congratulations on completing the Quiz!</p>
			</div>

			<div className="flex gap-4 flex-wrap justify-center">
				<Button as={Link} href={PAGE.HOME} className="w-48 mt-5" color="primary" variant="bordered" size="md">Back To Home</Button>
				<Button as={Link} href={PAGE.CATEGORIES} className="w-48 mt-5" color="primary" variant="bordered" size="md">Try Another Quiz</Button>
			</div>
		</div>
	)
}

export default Results;