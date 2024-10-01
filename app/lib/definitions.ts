export type QuizQuestion = {
	question: string;
	correctAnswer: string;
	points: number;
	answers: string[];
	id: string;
}

export type Quiz = {
	id: string;
	category: string;
	image: string;
	type: string;
	questions: QuizQuestion[];
}

export type ParamsTypes = {
	params?: { 
		quizid: string;
		questionid: string;
	 };
}

export type CardTypes = {
	smallTitle: string;
	smallDescription: string;
	title: string;
	imgSrc?: string;
	buttonName?: string;
	onClick?: () => void;
	children?: React.ReactNode;
}

export type ResultsPage = {
	questions: QuizQuestion[];
}

