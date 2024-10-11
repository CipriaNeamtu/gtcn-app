'use server'

import { promises as fs } from 'fs';
import { Quiz, QuizData } from '../lib/definitions';

export const getQuizData = async () => {
	try {
		const file = await fs.readFile(process.cwd() + '/app/api/questions.json', 'utf8');
		const data = JSON.parse(file);
		return data;
	} catch (error) {
		console.error('route::getQuizData:', error);
		throw new Error('Failed to load data');
	}
}

export const updateQuizData = async (questionData: QuizData, categoryId: string) => {
	try {
		const quizData: Quiz[] = await getQuizData();
		const selectedQuiz: Quiz = quizData.filter(quiz => quiz.id === categoryId)[0];

		selectedQuiz.questions.push(questionData.newQuestion);

		const filePath = process.cwd() + '/app/api/questions.json';
		await fs.writeFile(filePath, JSON.stringify(quizData, null, 2));

		return { message: 'New question saved successfully!', quizData }
	} catch (error) {
		console.error('route::updateQuizData:', error);
		return { message: 'Failed to save data!' };
	}
};