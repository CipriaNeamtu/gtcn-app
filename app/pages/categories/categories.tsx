'use client'

import { CategoriesPage } from "@/app/lib/definitions";
import Card from "@/app/components/Card";
import { useRouter } from "next/navigation";

const Categories = ({ quizData }: CategoriesPage) => {
	const { push } = useRouter();

	const navigateTo = (id: string) => {
		push(`quiz/${id}`)
	}
	
	return (
		<div className="flex flex-col items-center mt-7">
			<h1 className="text-3xl">Quiz Categories</h1>
			<div className="flex max-w-4xl mt-10 gap-20">
				{quizData?.map((quiz, index) => {
					return (
						<Card 
							key={index} 
							smallTitle={quiz.type} 
							smallDescription={quiz.id} 
							title={quiz.category} 
							imgSrc={quiz.image} 
							buttonName="Start Quiz"
							onClick={() => navigateTo(quiz.id)}
						/>
					);
				})}
			</div>
		</div>
	)
}

export default Categories;