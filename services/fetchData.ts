'use server'

import { promises as fs } from 'fs';

export async function getQuizData() {
	try {
		const file = await fs.readFile(process.cwd() + '/data/questions.json', 'utf8');
		const data = JSON.parse(file);
		return data;
	} catch (error) {
		console.error('fetchData::getQuizData:', error);
		throw new Error('Failed to load data');
	}
}