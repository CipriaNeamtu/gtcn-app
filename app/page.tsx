'use client'

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { PAGE } from "./lib/constants";

export default function Home() {
	const { push } = useRouter();

	const navigateTo = (url: string) => {
		push(url);
	}
	return (
		<div className="flex flex-col items-center mt-7">
			<h1 className="text-3xl">Welcome to CN Quiz!</h1>
			<div className="max-w-4xl mt-5">
				<p>Ready to challenge your knowledge and have fun at the same time? Choose from a variety of exciting quizzes, test your skills across different 
				topics! Learn, compete, and enjoy with our interactive quizzes, whether you`re into general knowledge, science, entertainment, or anything else.</p>
				
			</div>

			<Button className="w-48 mt-5" color="primary" variant="bordered" size="md" onClick={() => navigateTo(PAGE.CATEGORIES)}>Start Now</Button>
		</div>
	);
}
