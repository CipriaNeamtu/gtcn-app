'use client'

import { ParamsTypes, Quiz } from "@/app/lib/definitions";
import StartQuiz from "./startQuiz";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

const Page = ({ params }: ParamsTypes) => {
  const quizId = params?.quizid;
	const [quizData, setQuizData] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const selectedQuiz = quizData.filter((quiz: Quiz) => quiz.id === quizId)[0];

	const getQuizData = async () => {
		try {
				const response = await fetch('/api/quiz-data');
				const data = await response.json();
				setQuizData(data);
		} catch (error) {
				console.error('StartQuizPage::getQuizData:', error);
		} finally {
				setLoading(false);
		}
	};
	
	useEffect(() => {
		getQuizData();
	}, [])

	if (loading) {
		return <Loading />
	}

  return (
		<StartQuiz quiz={selectedQuiz} />
  );
}

export default Page;
 