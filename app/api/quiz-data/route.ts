'use server'

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { Quiz, QuizData } from '../../lib/definitions';

export async function GET() {
  const data = await getQuizData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
	const { questionData, categoryId } = await request.json();
  const data = await updateQuizData(questionData, categoryId);
  return NextResponse.json(data);
}

const getQuizData = async () => {
	try {
		const file = await fs.readFile(process.cwd() + '/app/data/questions.json', 'utf8');
		const data = JSON.parse(file);
		return data;
	} catch (error) {
		console.error('route::getQuizData:', error);
		throw new Error('Failed to load data');
	}
}

const updateQuizData = async (questionData: QuizData, categoryId: string) => {
	try {
		const quizData: Quiz[] = await getQuizData();
		const selectedQuiz: Quiz = quizData.filter(quiz => quiz.id === categoryId)[0];

		selectedQuiz.questions.push(questionData.newQuestion);

		const filePath = process.cwd() + '/app/data/questions.json';
		await fs.writeFile(filePath, JSON.stringify(quizData, null, 2));

		return { message: 'New question saved successfully!' }
	} catch (error) {
		console.error('route::updateQuizData:', error);
		return { message: 'Failed to save data!' };
	}
};