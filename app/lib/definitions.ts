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
	href: string;
	children?: React.ReactNode;
}

export type QuizPage = {
	quiz: Quiz;
}

export type QuestionsPage = {
	quiz: Quiz;
	question: QuizQuestion;
}

export type ResultsPage = {
	questions: QuizQuestion[];
}

export type NewQuestion = {
	question: string;
	answer1: string;
	answer2: string;
	answer3: string;
	correctAnswer: string;
	quiz: string;
	[key: string]: string;
}

export type InputType = {
	label: string;
	placeholder: string;
	key: string;
	width?: string;
	defaultValue: string;
}

export type QuizData = {
	quiz: string;
	newQuestion: QuizQuestion; 
}