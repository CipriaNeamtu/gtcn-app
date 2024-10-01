"use client";

import { ParamsTypes, Quiz } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { getData } from "@/services/fetchData";

export default function Page({ params }: ParamsTypes) {
  const quizId = params?.quizid;
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>({ id: '', category: '', image: '', type: '', questions: [] });

	const pathname = usePathname();
	const { replace } = useRouter();

  const displaySelectedQuiz = async () => {
		const quizData = await getData();
		const filteredQuizById = quizData.filter((quiz: Quiz) => quiz.id === quizId);
		setSelectedQuiz(filteredQuizById[0]);
  };

	const startQuiz = () => {
		const questionId = selectedQuiz.questions[0].id;
		replace(`${pathname}/question/${questionId}`);
	}

  useEffect(() => {
		displaySelectedQuiz();
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  return (
		<div className="flex flex-col mt-10 items-center">
			<div className="text-xl flex gap-1 justify-center">
				Great, you chose to take the quiz about
				<span className="font-semibold text-blue-500"> {selectedQuiz?.category}</span>!
			</div>

			<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={startQuiz}>Start Quiz</Button>
		</div>
  );
}
 