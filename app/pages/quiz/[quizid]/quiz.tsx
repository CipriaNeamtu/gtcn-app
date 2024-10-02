'use client'

import { QuizPage } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

const Quiz = ({ quiz }: QuizPage) => {
	const pathname = usePathname();
	const { replace } = useRouter();

	const startQuiz = () => {
		const questionId = quiz.questions[0].id;
		replace(`${pathname}/question/${questionId}`);
	}

	return (
		<div className="flex flex-col mt-10 items-center">
			<div className="text-xl flex gap-1 justify-center">
				Great, you chose to take the quiz about
				<span className="font-semibold text-blue-500"> {quiz?.category}</span>!
			</div>

			<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={startQuiz}>Start Quiz</Button>
		</div>
	)
}

export default Quiz;