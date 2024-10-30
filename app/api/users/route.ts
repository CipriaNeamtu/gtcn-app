import AppDataSource from "@/app/data-source";
import User from "@/app/entity/user";
import { NextResponse } from "next/server";


export async function GET() {
	try {
		const Users = AppDataSource.getRepository(User)
		const users = await Users.find()
		
		return NextResponse.json({ message: "Users list generated", users }, { status: 200 });
	} catch (error) {
		console.error("api::getUser::Error creating user:", error);
		return NextResponse.json({ message: 'Error getting user' }, { status: 500 });
	}
}

export async function POST(request: Request) {
  	const userRepo = AppDataSource.getRepository(User);
	
		try {
			const user = await request.json();
	    await userRepo.save(user);
			return NextResponse.json({ message: "User created", user }, { status: 200 });
		} catch (error) {
				console.error("api::setUser::Error creating user:", error);
				return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
		}
}