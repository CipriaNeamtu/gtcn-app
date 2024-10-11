'use client'

import Card from "@/app/components/Card";
import { Quiz } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Page = () => {
	const [quizData, setQuizData] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getQuizData = async () => {
		try {
				const response = await fetch('/quiz-data');
				const data = await response.json();
				setQuizData(data);
		} catch (error) {
				console.error('CategoriesPage::getQuizData:', error);
		} finally {
				setLoading(false);
		}
	};

	useEffect(() => {
		getQuizData();
	}, [])

	if (loading) {
		return <Loading />
	}

	return (
		<div className="flex flex-col items-center mt-7">
			<h1 className="text-3xl">Quiz Categories</h1>
			<div className="flex max-w-4xl mt-10 gap-20">
				{quizData?.map((quiz) => {
					return (
						<Card 
							key={quiz.id} 
							smallTitle={quiz.type} 
							smallDescription={quiz.id} 
							title={quiz.category} 
							imgSrc={quiz.image} 
							buttonName="Start Quiz"
							href={`quiz/${quiz.id}`}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Page;
