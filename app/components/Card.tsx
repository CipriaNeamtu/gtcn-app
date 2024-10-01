import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { CardTypes } from "../lib/definitions";

export default function Cards({ 
	smallTitle, 
	smallDescription, 
	title, 
	imgSrc, 
	buttonName, 
	onClick,
	children,
 }: CardTypes ) {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	}
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

				{ buttonName && onClick &&
					<Button className="mt-5" color="primary" variant="bordered" onClick={handleClick}>{buttonName}</Button>
				}
			</CardBody>
		</Card>
	);
}