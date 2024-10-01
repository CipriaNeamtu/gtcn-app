'use client'

import { Button } from "@nextui-org/button";
import { PAGE } from "@/app/lib/constants";
import { useRouter } from "next/navigation";
import { ResultsPage } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export default function Results({ questions }: ResultsPage) {
	const { push } = useRouter();
	const [answers, setAnswers] = useState({ correct: 0, wrong: 0 });

	const navigateTo = (path: string) => {
		push(path);
	}

	const getAnswers = () => {
		const correctAnswers = questions.filter(question => question.points !== 0);
		const wrongAnswers = questions.filter(question => question.points === 0);
		setAnswers({
			...answers,
			correct: correctAnswers.length,
			wrong: wrongAnswers.length,
		})
	}

	useEffect(() => {
		getAnswers();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="text-green-500 text-xl mt-5">Great, the quiz has been completed!!!</div>

			<div className="flex flex-col gap-2 items-center mt-7">
				<p>In total you answered {questions.length} questions!</p>
				<p>From this total {answers.correct} questions were correct and {answers.wrong} were wrong!</p>
				<p>Congratulations on completing the Quiz!</p>
			</div>

			<div className="flex gap-4">
				<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={() => navigateTo(PAGE.HOME)}>Back To Home</Button>
				<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={() => navigateTo(PAGE.CATEGORIES)}>Try Another Quiz</Button>
			</div>
		</div>
	)
}