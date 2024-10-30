'use client'

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Tooltip,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Input
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { PAGE } from "../lib/constants";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ModalComponent from "./Modal";

const navButtons = [
	{ name: "Home", pathName: PAGE.HOME, icon: <FaHome /> },
	{ name: "Categories", pathName: PAGE.CATEGORIES, icon: <BiSolidCategory /> },
	{ name: "Dashboard", pathName: PAGE.DASHBOARD, icon: <AiOutlineDashboard /> },
	{ name: "Top List", pathName: PAGE.TOP, icon: <GiPodiumWinner /> },
	{ name: "Users", pathName: PAGE.USERS, icon: <FaUsers /> },
];

export default function NavBar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [user, setUser] = useState({ name: null, age: null });
	const [touchedInputs, setTouchedInputs] = useState<{ [key: string]: boolean }>({});

	const createUser = async () => {
		if (user.name === '' && !user.age) {
			return;
		}

		await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		})
	}

	const userInputs = [
		{ value: user.name, key: 'name', placeholder: 'Type your name', label: 'Name' },
		{ value: user.age, key: 'age', placeholder: 'Type your age', label: 'Age' }
	];

	const validateInput = (value: string, inputKey: string) => {
		if (touchedInputs[inputKey]) {
			if (value === '') {
				return 'This field is required!';
			}
		}
		return true;
	}

	const handleTouchedInput = (inputKey: string) => {
		setTouchedInputs((prevInputs) => ({
			...prevInputs,
			[inputKey]: true
		}))
	}

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
						<ModalComponent
							title='Sign Up Form'
							buttonColor='primary'
							buttonVariant='bordered'
							buttonName='Sign Up'
							actionButtonName="Set User"
							onActionButton={createUser}
						>
							{userInputs.map((input, index) => (
								<Input
									key={index}
									type="text"
									color='primary'
									label={input.label}
									placeholder={input.placeholder}
									value={input.value ?? ''}
									size='sm'
									isRequired={true}
									onChange={(e) => setUser(prevUser => ({
										...prevUser,
										[input.key]: e.target.value
									}))}
									onBlur={() => handleTouchedInput(input.key)}
									validate={(value) => validateInput(value, input.key)}
								/>
							))}
						</ModalComponent>
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
