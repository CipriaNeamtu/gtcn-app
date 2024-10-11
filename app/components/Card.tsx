import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";
import { CardTypes } from "../lib/definitions";
import Link from "next/link";

export default function Cards({ 
	smallTitle, 
	smallDescription, 
	title, 
	imgSrc, 
	buttonName, 
	href,
	children,
 }: CardTypes ) {
	
	return (
		<Card className="py-4 bg-gray-700">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<p className="text-tiny uppercase font-bold">{smallTitle}</p>
					<small className="text-default-500">{smallDescription}</small>
					<h4 className="font-bold text-large">{title}</h4>
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					{ imgSrc && 
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src={imgSrc}
							width={270}
							height={135}
						/>
					}
					
					{children}

					{ buttonName &&
						<Link href={href}>
							<Button className="mt-5 w-full" color="primary" variant="bordered">{buttonName}</Button>
						</Link>
					}
				</CardBody>
			</Card>
	);
}