'use client'

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	Tooltip,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { PAGE } from "../lib/constants";

export default function NavBar() {
	const pathname = usePathname();
	const navButtons = [
		{ name: "Home", pathName: PAGE.HOME },
		{ name: "Categories", pathName: PAGE.CATEGORIES },
	];

	return (
		<Navbar className="flex gap-3 w-full p-4 bg-black">
			<NavbarBrand>
				<p className="font-bold text-inherit">GTCN-APP</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{navButtons.map(({name, pathName}, index) => {
					return (
						<NavbarItem key={index} isActive={pathname === pathName}>
							<Link color={pathname === pathName ? "primary" : "foreground"} href={pathName}>
								{name}
							</Link>
						</NavbarItem>
					)
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Tooltip content="This button is not implemented yet!" color="primary" placement="left">
						<Link href="#">Login</Link>
					</Tooltip>
				</NavbarItem>
				<NavbarItem>
					<Tooltip content="This button is not implemented yet!" color="primary" placement="left">
						<Button as={Link} color="primary" href="#" variant="bordered">
							Sign Up
						</Button>
					</Tooltip>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
