import { 
	SlSocialLinkedin, 
	SlSocialInstagram, 
	SlSocialGoogle, 
	SlSocialFacebook, 
	SlSocialTwitter,
} from "react-icons/sl";
import { Tooltip } from "@nextui-org/react";

const Footer = () => {
	const socialMediaIcons = [
		{	name: <SlSocialInstagram /> },
		{	name: <SlSocialGoogle /> },
		{	name: <SlSocialFacebook /> },
		{	name: <SlSocialTwitter /> },
		{	name: <SlSocialLinkedin /> },
	];

	return (
		<div className="flex flex-col items-center justify-center bg-black fixed bottom-0 w-full h-36 z-10">
			<div>
				GTCN-APP
			</div>
			<div className="flex items-center justify-center gap-4 mt-4 text-xl">
					{ socialMediaIcons.map((icon, index) => {
						return (
							<Tooltip key={index} content="Only for design" color="primary" placement="top">
								<div className="cursor-pointer">{icon.name}</div>
							</Tooltip>
						)
					})} 
			</div>
			<div className="text-xs font-thin mt-6">© 2024 GTCN-APP. All rights reserved.</div>
		</div>
	)
}

export default Footer;