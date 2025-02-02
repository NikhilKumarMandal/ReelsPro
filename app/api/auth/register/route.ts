import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";
import { error } from "console";

export async function POST(request:NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({
                error: "Email and Password are required!"
            }, {
                status: 400
            }
            );

            await connectToDatabase();

            const existingUser = await User.findOne({ email })
            
            if (!existingUser) {
                return NextResponse.json({
                error: "Email is already registerd!"
            }, {
                status: 400
            })
            };

            await User.create({
                email,
                password
            })
            
            return NextResponse.json({
                message: "User register successfully"
            }, {
                status: 201
            });
        };
    } catch (error) {
        return NextResponse.json({
            message: "Failed to register User"
        },{
            status: 500
        });
    }
}