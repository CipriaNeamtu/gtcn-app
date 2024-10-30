'use server'

import { NextResponse } from 'next/server';

const usersApi = process.env.USERS_API_URL;

export async function POST(request: Request) {
	try {
		const user = await request.json();

		if (!usersApi) {
			throw new Error('api::send-results: Users API URL is not defined');
		}

		const response = await fetch(usersApi, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user)
		})

		if (response.ok) {
			return NextResponse.json({ message: 'Thank you, your score is in our Top List!' });
		} else {
			const errorData = await response.json();
			return NextResponse.json({ error: errorData }, { status: response.status });
		}

	} catch (error) {
		console.error('api::send-results:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}