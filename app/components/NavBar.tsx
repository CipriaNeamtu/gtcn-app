'use client'

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Tooltip,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { PAGE } from "../lib/constants";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";

const navButtons = [
	{ name: "Home", pathName: PAGE.HOME, icon: <FaHome /> },
	{ name: "Categories", pathName: PAGE.CATEGORIES, icon: <BiSolidCategory /> },
	{ name: "Dashboard", pathName: PAGE.DASHBOARD, icon: <AiOutlineDashboard /> },
	{ name: "Top List", pathName: PAGE.TOP, icon: <GiPodiumWinner /> },
];

export default function NavBar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	return (
		<>
			<Navbar className="flex w-full bg-black" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent className="sm:hidden">
					<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
				</NavbarContent>

				<NavbarBrand>
					<Link href={PAGE.HOME} className="font-bold text-inherit">GTCN-APP</Link>
				</NavbarBrand>

				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					{navButtons.map(({ name, pathName, icon }, index) => {
						return (
							<NavbarItem key={index} isActive={pathname === pathName}>
								<Link className={clsx("flex items-center gap-1", { "text-blue-500": pathname === pathName })} href={pathName}>
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

				<NavbarMenu onChange={() => setIsMenuOpen(false)}>
					{navButtons.map(({ name, pathName, icon }, index) => (
						<NavbarMenuItem key={`${name}-${index}`}>
							<Link 
								className={clsx("flex items-center gap-1 w-full", { "text-blue-500": pathname === pathName })} 
								href={pathName}
							> 
								{icon}
								{name}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
		</>
	);
}
