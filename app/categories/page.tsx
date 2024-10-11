
import { getQuizData } from "@/app/services/route";
import Card from "@/app/components/Card";
import { Quiz } from "@/app/lib/definitions";

const Page = async () => {
	const quizData: Quiz[] = await getQuizData();

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
