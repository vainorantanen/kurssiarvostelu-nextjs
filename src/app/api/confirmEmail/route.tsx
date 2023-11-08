import prisma from "@/db";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')

export async function POST(req: any): Promise<NextResponse> {
    try {
        const { id, token } = await req.json()
 
        if (!id || !token) {
            return NextResponse.json(
                { message: "id tai token viallinen" },
                { status: 400 }
            );
        }
 
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.NEXTAUTH_SECRET, (err: any) => {
                if(err) {
                   resolve(NextResponse.json(
                       { message: "Error with token" },
                       { status: 500 }
                   ));
                } else {
                   prisma.user.update({ where: { id }, data: {
                       isVerified: true
                       }
                   }).then(r => resolve(NextResponse.json({ message: "Sähköposti vahvistettu" }, { status: 201 })))
                   .catch(error => 
                       resolve(NextResponse.json(
                       { message: "Tapahtui virhe sähköpostin vahvistamisessa" },
                       { status: 500 }
                     )))
                }
            })
        });
    } catch(error) {
        return NextResponse.json(
            { message: "Tapahtui virhe sähköpostin vahvistamisessa" },
            { status: 500 }
        );
    }
 }
 