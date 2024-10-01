"use client";

import Card from "@/app/components/Card";
import { useRouter } from "next/navigation";
import { getData } from "@/services/fetchData";
import { useEffect, useState } from "react";
import { Quiz } from "@/app/lib/definitions";

export default function Page() {
  const { push } = useRouter();
  const [quizData, setQuizData] = useState<Quiz[]>([]);

  const navigateTo = (id: string) => {
    push(`quiz/${id}`)
  }

  const getCategories = async () => {
    const data = await getData();
    setQuizData(data);
  }

  useEffect(() => {
    getCategories();
  },[])

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
  );
}
