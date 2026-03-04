import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { EarlyAccess } from "@/models/EarlyAccess";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, companyRole, architecture, painPoint } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { success: false, message: "Name and email are required." },
                { status: 400 }
            );
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        await connectDB();

        const submission = await EarlyAccess.create({
            name,
            email,
            companyRole,
            architecture,
            painPoint,
        });

        return NextResponse.json(
            { success: true, message: "Application submitted successfully!", id: submission._id },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Early access submission error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
