'use client'

import { QuizPage } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StartQuiz = ({ quiz }: QuizPage) => {
	const pathname = usePathname();
	const questionId = `${pathname}/question/${quiz.questions[0].id}`;

	return (
		<div className="flex flex-col mt-10 items-center">
			<div className="text-xl flex gap-1 justify-center">
				Great, you chose to take the quiz about
				<span className="font-semibold text-blue-500"> {quiz?.category}</span>!
			</div>

			<Button as={Link} href={questionId} className="w-48 mt-5" color="primary" variant="bordered" size="md">Start Quiz</Button>
		</div>
	)
}

export default StartQuiz;