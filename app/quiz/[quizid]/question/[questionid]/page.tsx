'use client'

import { QuizQuestion, Quiz, ParamsTypes } from "@/app/lib/definitions";
import Questions from "./questions";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

const Page = ({ params }: ParamsTypes) => {
	const questionId = params?.questionid;
	const quizId = params?.quizid;
	const [selected, setSelected] = useState<{ quiz: Quiz | null, question: QuizQuestion | null }>({ quiz: null, question: null })
	const [loading, setLoading] = useState<boolean>(true);
	
	const getQuizData = async () => {
		try {
			const response = await fetch('/quiz-data');
			const data = await response.json();
			const quiz = data.filter((quiz: Quiz) => quiz.id === quizId)[0];
			const question = quiz.questions.filter((question: QuizQuestion) => question.id === questionId)[0];
			
			setSelected({ quiz, question })
			
		} catch (error) {
				console.error('QuestionPage::getQuizData:', error);
		} finally {
				setLoading(false);
		}
	};

	useEffect(() => {
		getQuizData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) {
		return <Loading />
	}

	return (
		<div className="flex flex-col mt-10 items-center">
			<div className="text-xl">{selected?.quiz?.category}` Questions</div>
				{ selected.quiz && selected.question &&
					<Questions quiz={selected.quiz} question={selected.question} />
				}
		</div>
	);
}

export default Page;