'use client'

import { RadioGroup, Radio, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import clsx from "clsx";
import { QuestionsPage, QuizQuestion } from "@/app/lib/definitions";
import Results from "./results";

const Questions = ({ quiz, question }: QuestionsPage) => {
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const [currentScore, setCurrentScore] = useState<number>(0);
	const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(question);
	const [questionsResult, setQuestionResult] = useState<QuizQuestion[] | []>([]);
	const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
	const quizQuestionsNumber = quiz.questions.length;
	const quizTotalPoints = quizQuestionsNumber * 10;

	const goToNextQuestion = () => {
		if (questionIndex === quizQuestionsNumber - 1) {
			setIsQuizCompleted(true);
		}

		displayNextQuestion(questionIndex + 1);
		setSelectedAnswer(null);
	}

	const displayNextQuestion = (index: number) => {
		setCurrentQuestion(quiz.questions[index]);
		setQuestionIndex(index);
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
		if (currentQuestion?.question !== '' && selectedAnswer) {
			setQuestionResult(prevQuestion => [
				...prevQuestion,
				currentQuestion
			]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAnswer])

	return (
		<>
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

						{ selectedAnswer &&
							<>
								<p className={clsx(
									{
										"text-green-500": isCorrectAnswer,
										"text-red-500": !isCorrectAnswer
									})}>
									{isCorrectAnswer ? 'Correct' : 'Wrong'} answer! {selectedAnswer}
								</p>

								{ !isCorrectAnswer &&
									<p className="text-blue-500">The correct answer is: {currentQuestion.correctAnswer}</p>
								}
							</>
						}

						{ selectedAnswer &&
							<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={goToNextQuestion}>{questionIndex === quizQuestionsNumber - 1 ? 'Finish' : 'Next Question'}</Button>
						}
					</div>

					<div className="h-20">
						<Card href="#" smallTitle={`Question ${questionIndex + 1}/${quizQuestionsNumber}`} smallDescription="Score Status" title={`Points ${currentScore}/${quizTotalPoints}`}></Card>
					</div>
				</div>
			}

			{ isQuizCompleted &&
				<Results questions={questionsResult} />
			}
		</>
	)
}

export default Questions;