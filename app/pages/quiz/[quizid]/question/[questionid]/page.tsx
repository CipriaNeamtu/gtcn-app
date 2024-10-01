'use client'

import { useEffect, useState } from "react";
import { QuizQuestion, Quiz, ParamsTypes } from "@/app/lib/definitions";
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import { getData } from "@/services/fetchData";
import Card from "@/app/components/Card";
import clsx from "clsx";
import Results from "./results";

export default function Page({ params }: ParamsTypes) {
	const questionId = params?.questionid;
	const quizId = params?.quizid;
	const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({ question: '', correctAnswer: '', points: 0, answers: [], id: '' });
	const [currentQuiz, setCurrentQuiz] = useState<Quiz>({ id: '', category: '', image: '', type: '', questions: [] });
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
	const [currentScore, setCurrentScore] = useState<number>(0);
	const [questionsResult, setQuestionResult] = useState<QuizQuestion[] | []>([]);
	const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

	const setQuestionData = async () => {
		const quizData = await getData();

		if (quizId && questionId) {
			const selectedQuiz = quizData.filter((quiz: Quiz) => quiz.id === quizId)[0];
			const selectedQuestion = selectedQuiz.questions.filter((question: QuizQuestion) => question.id === questionId)[0];
			setCurrentQuiz(selectedQuiz);
			setCurrentQuestion(selectedQuestion);
		}
	}

	const selectNextQuestion = (index: number) => {
		const question = currentQuiz.questions[index];
		setCurrentQuestion(question);
		setQuestionIndex(index);
	}

	const goToNextQuestion = () => {
		if (questionIndex === 9) {
			setIsQuizCompleted(true);
		}

		selectNextQuestion(questionIndex + 1);
		setSelectedAnswer(null);
	}

	const displayQuestionResult = (answer: string, question: QuizQuestion) => {
		setSelectedAnswer(answer);

		if (answer === question.correctAnswer) {
			setIsCorrectAnswer(true);
			setCurrentScore(currentScore + question.points);
		} else {
			setIsCorrectAnswer(false);
			setCurrentQuestion({
				...currentQuestion,
				points: 0
			})
		}
	}

	useEffect(() => {
		setQuestionData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (currentQuestion?.question !== '' && selectedAnswer) {
			setQuestionResult(prevQuestion => [
				...prevQuestion,
				currentQuestion
			]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAnswer])

	return (
		<div className="flex flex-col mt-10 items-center">
			<div className="text-xl">{currentQuiz.category}` Questions</div>
				{ !isQuizCompleted &&
					<div className="flex gap-60 mt-10">
						<div className="flex flex-col gap-3 items-center">
							<RadioGroup
								label={currentQuestion?.question}
								value={selectedAnswer}
								onValueChange={(value) => displayQuestionResult(value, currentQuestion)}
							>
								{currentQuestion?.answers?.map((answer, index) => {
									return (
										<Radio key={index} value={answer} isDisabled={selectedAnswer ? true : false} >{answer}</Radio>
									)
								})}
							</RadioGroup>

							{selectedAnswer &&
								<>
									<p className={clsx(
										{
											"text-green-500": isCorrectAnswer,
											"text-red-500": !isCorrectAnswer
										})}>
										{isCorrectAnswer ? 'Correct' : 'Wrong'} answer! {selectedAnswer}
									</p>

									{!isCorrectAnswer &&
										<p className="text-blue-500">The correct answer is: {currentQuestion.correctAnswer}</p>
									}
								</>
							}

							{selectedAnswer &&
								<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={goToNextQuestion}>{questionIndex === 9 ? 'Finish' : 'Next Question'}</Button>
							}
						</div>

						<Card smallTitle={currentQuiz.category} smallDescription="Score Status" title={`Points ${currentScore}/100`}></Card>
					</div>
				}

				{ isQuizCompleted &&
					<Results questions={questionsResult} />
				}
		</div>
	);
}