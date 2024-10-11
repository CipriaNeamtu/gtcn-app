'use client'

import { Input } from "@nextui-org/react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import { InputType, NewQuestion } from "../lib/definitions";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { generateId } from "../services/utils";
import Loading from "../components/Loading";

const inputs: InputType[] = [
	{ defaultValue: 'What is the capital of England?', label: 'Question', placeholder: 'Type the new question', key: 'question', width: 'large-input' },
	{ defaultValue: 'Paris', label: 'Answer 1', placeholder: 'Type answer 1', key: 'answer1' },
	{ defaultValue: 'London', label: 'Answer 2', placeholder: 'Type answer 2', key: 'answer2' },
	{ defaultValue: 'Berlin', label: 'Answer 3', placeholder: 'Type answer 3', key: 'answer3' },
	{ defaultValue: 'London', label: 'Correct Answer', placeholder: 'Type the corret Answer', key: 'correctAnswer', width: 'large-input' },
];

const emptyNewQuestion = { question: '', answer1: '', answer2: '', answer3: '', correctAnswer: '', quiz: '' };

const Page = () => {
	const [newQuestion, setNewQuestion] = useState<NewQuestion>(emptyNewQuestion);
	const [touchedInputs, setTouchedInputs] = useState<{ [key: string]: boolean }>({});
	const [isQuestionDataCompleted, setIsQuestionDataCompleted] = useState<boolean>(false);
	const [message, setMessage] = useState('Select a Quiz Category!');
	const [loading, setLoading] = useState<boolean>(false);


	const formatData = () => {
		const id = generateId();

		return {
			quiz: newQuestion.quiz,
			newQuestion: {
				question: newQuestion.question,
				correctAnswer: newQuestion.correctAnswer,
				points: 10,
				answers: [ newQuestion.answer1, newQuestion.answer2, newQuestion.answer3 ],
				id: id
			}
		}
	}

	const validateInput = (value: string, inputKey: string) => {
		if (touchedInputs[inputKey]) {
			if (value === '') {
				return 'This field is required!';
			}

			if (inputKey === 'question' && value.length < 10) {
				return 'Please enter at least 10 characters!';
			}
		}
		return true;
	}

	const handleTouchedInput = (inputKey: string) => {
		setTouchedInputs((prevInputs) => ({
			...prevInputs,
			[inputKey]: true
		}))
	}

	const addNewQuestion = async () => {
		const questionData = formatData();
		setLoading(true);

		try {
			const response = await fetch('/quiz-data', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ questionData, categoryId: questionData.quiz }),
			});

			const data = await response.json();
			console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ addNewQuestion ~ data:', data)

			if (response.ok) {
				setMessage(data.message);
				resetAll();
			}
		} catch (error) {
			console.error('Dashboard::addNewQuestion:', error);
			setMessage('An error occurred while adding the question.');
		} finally {
			setLoading(false);
		}
	}

	const resetAll = () => {
		setNewQuestion(emptyNewQuestion);
		setTouchedInputs({});
	}

	useEffect(() => {
		const newQuestionIsValid = !Object.values(newQuestion).some(key => key === '');
		const isCorrectAnswerWritten = [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3].includes(newQuestion.correctAnswer);

		if (newQuestionIsValid && isCorrectAnswerWritten) {
			setIsQuestionDataCompleted(true);
			return;
		}
		setIsQuestionDataCompleted(false);

	}, [newQuestion])

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col items-center mt-7">
			<h1 className="text-3xl">Add New Questions</h1>

			<form onSubmit={(e) => {
				e.preventDefault();
				addNewQuestion();
			}} className="mt-24">
				<RadioGroup
					label='Select Category'
					value={newQuestion.quiz}
					isRequired={true}
					onValueChange={(value) => {
						setMessage('*To add a new question, all fields must be filled in!');
						setNewQuestion(prevQuestion => ({
							...prevQuestion,
							quiz: value
						}))
					}}
					orientation='horizontal'
				>
					{['geography', 'history', 'general'].map((gategory, index) => {
						return (
							<Radio key={index} value={gategory}>{gategory}</Radio>
						)
					})}
				</RadioGroup>

				{newQuestion.quiz != '' &&
					<>
						<div className="flex gap-4 flex-wrap max-w-screen-lg mt-6">
							{
								inputs.map((input, index) => (
									<Input
										key={index}
										type="text"
										color='primary'
										label={input.label}
										placeholder={input.placeholder}
										value={newQuestion[input.key]}
										className={clsx(input.width ? `w-${input.width}` : 'max-w-[20.625rem]')}
										size='lg'
										isRequired={true}
										onChange={(e) => setNewQuestion(prevQuestion => ({
											...prevQuestion,
											[input.key]: e.target.value
										}))}
										onBlur={() => handleTouchedInput(input.key)}
										validate={(value) => validateInput(value, input.key)}
									/>
								))
							}
						</div>

						{isQuestionDataCompleted &&
							<Button className="mt-5" type="submit" color="primary" variant="bordered">Add the question to {newQuestion.quiz} category</Button>
						}
						<h1 className="text-md mt-4 text-blue-500">{message}</h1>
					</>
				}

				{!newQuestion.quiz && !isQuestionDataCompleted &&
					<h1 className="text-md mt-4 text-green-500">{message}</h1>
				}
			</form>
		</div>
	)
}

export default Page;