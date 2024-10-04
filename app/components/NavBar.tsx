'use client'

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Tooltip,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { PAGE } from "../lib/constants";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import Link from "next/link";
import clsx from "clsx";

export default function NavBar() {
	const pathname = usePathname();
	const navButtons = [
		{ name: "Home", pathName: PAGE.HOME, icon: <FaHome /> },
		{ name: "Categories", pathName: PAGE.CATEGORIES, icon: <BiSolidCategory /> },
	];

	return (
		<Navbar className="flex gap-3 w-full p-4 bg-black">
			<NavbarBrand>
				<p className="font-bold text-inherit">GTCN-APP</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{navButtons.map(({name, pathName, icon}, index) => {
					return (
						<NavbarItem  key={index} isActive={pathname === pathName}>
							<Link className={clsx("flex items-center gap-1", {"text-blue-500": pathname === pathName})} href={pathName}>
								{icon}
								{name}
							</Link>
						</NavbarItem>
					)
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Tooltip content="This button is not implemented yet!" color="primary" placement="bottom">
						<Link href="#">Login</Link>
					</Tooltip>
				</NavbarItem>
				<NavbarItem>
					<Tooltip content="This button is not implemented yet!" color="primary" placement="bottom">
						<Button as={Link} color="primary" href="#" variant="bordered">
							Sign Up
						</Button>
					</Tooltip>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
