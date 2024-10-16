import { Button } from "@nextui-org/button";
import { PAGE } from "@/app/lib/constants";
import { ResultsPage } from "@/app/lib/definitions";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { useState } from "react";

const Results = ({ questions, category }: ResultsPage) => {
	console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ Results ~ questions:', questions)
	const correctAnswers = questions.filter(question => question.points !== 0).length;
	const wrongAnswers = questions.filter(question => question.points === 0).length;
	const [name, setName] = useState<string | null>(null);

	const addScore = async () => {
		if (!name) {
			return;
		}

		const user = {
			createdAt: Date.now(),
			name: name,
			score: correctAnswers * 10,
			category: category
		}

		try {
			await fetch('https://670fc21fa85f4164ef2bcd5d.mockapi.io/api/v1/top', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user)
			})
		} catch (error) {
				console.error('Results::addScore:', error)
		}
	}

	const validateInput = (value: string) => {
		if (value === '') {
			return 'Type your name if you want to add your score to our Top List!';
		} 
		return true;
	}

	return (
		<div className="flex flex-col items-center gap-2 pb-80 bg-colorBunker">
			<div className="text-green-500 text-xl mt-5">Great, the quiz has been completed!!!</div>

			<div className="flex flex-col gap-2 items-center mt-7 p-6 text-center">
				<span>In total you answered {questions.length} questions!</span>
				<span>From this total <span className="text-green-500">{correctAnswers}</span> questions were correct and <span className="text-red-500">{wrongAnswers}</span> were wrong!</span>
				<span>Congratulations on completing the Quiz!</span>

				<span className="mt-10">Add your score to our top list!</span>
				<Input
					className="max-w-52"
					type="text"
					color='primary'
					label='Field Name'
					placeholder='Type your name here'
					value={name ?? ''}
					size='md'
					onChange={(e) => setName(e.target.value)}
					validate={(value) => validateInput(value)}
				/>
				<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={addScore}>Add My Score</Button>
			</div>

			<div className="flex gap-4 flex-wrap justify-center">
				<Button as={Link} href={PAGE.HOME} className="w-48 mt-5" color="primary" variant="bordered" size="md">Back To Home</Button>
				<Button as={Link} href={PAGE.CATEGORIES} className="w-48 mt-5" color="primary" variant="bordered" size="md">Try Another Quiz</Button>
			</div>
		</div>
	)
}

export default Results;