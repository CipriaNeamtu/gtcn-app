'use client'

import { PAGE } from "@/app/lib/constants";
import { QuizPage } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StartQuiz = ({ quiz }: QuizPage) => {
	const pathname = usePathname();
	const questionId = `${pathname}/question/${quiz.questions[0].id}`;

	return (
		<div className="flex flex-col mt-10 items-center p-6 pb-52">
			<div className="text-xl text-center flex flex-wrap gap-1 justify-center p-6 w-64 sm:w-full">
				Great, you chose to take the quiz about
				<span className="font-semibold text-blue-500"> {quiz?.category}!</span>
			</div>

			<Image className="rounded-lg" src={quiz.image} alt={quiz.category} width={270} height={135} />
			<span className="mt-6 text-center text-green-500">This quiz contains {quiz.questions.length} questions, good luck!</span>

			<div className="flex flex-col gap-2 sm:flex-row">
				<Link href={questionId}>
					<Button className="w-48 mt-5" color="primary" variant="bordered" size="md">Start Quiz</Button>
				</Link>
				<Link href={PAGE.CATEGORIES}>
					<Button className="w-48 mt-5" color="primary" variant="bordered" size="md">Try Another Quiz</Button>
				</Link>
			</div>
		</div>
	)
}

export default StartQuiz;