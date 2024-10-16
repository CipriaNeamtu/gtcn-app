import { Button } from "@nextui-org/button";
import { PAGE } from "./lib/constants";
import Link from "next/link";
import Image from "next/image";
import QuizImg from "../public/quiz.jpg"

const Home = () => {
	return (
		<div className="flex flex-col items-center mt-7 overflow-y-auto pb-52 bg-colorBunker">
			<h1 className="text-3xl">Welcome to CN Quiz!</h1>
			<div className="flex flex-col items-center max-w-4xl mt-5 p-10">
				<Image className="rounded-2xl w-80 sm:max-w-3xl mb-7" src={QuizImg} alt="CN Quiz" priority  />
				<p>Ready to challenge your knowledge and have fun at the same time? Choose from a variety of exciting quizzes, test your skills across different 
				topics! Learn, compete, and enjoy with our interactive quizzes, whether you`re into general knowledge, science, entertainment, or anything else.</p>
			</div>
			<Link href={PAGE.CATEGORIES}>
				<Button className="w-48 mt-5" color="primary" variant="bordered" size="md">Start Now</Button>
			</Link>
		</div>
	);
}

export default Home;