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
			<div className="text-xl text-center flex flex-wrap gap-1 justify-center p-6 w-64 sm:w-full">
				Great, you chose to take the quiz about
				<span className="font-semibold text-blue-500"> {quiz?.category}!</span>
			</div>
			
			<Link href={questionId}>
				<Button className="w-48 mt-5" color="primary" variant="bordered" size="md">Start Quiz</Button>
			</Link>
		</div>
	)
}

export default StartQuiz;