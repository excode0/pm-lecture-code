import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const lecturers = await prisma.lecturer.findMany();
    return NextResponse.json(lecturers);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch lecturers' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newLecturer = await prisma.lecturer.create({
      data: {
        ...body,
        profilePicture: body.profilePicture || '', // Simpan URL foto profil
      },
    });

    return NextResponse.json(newLecturer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create lecturer' },
      { status: 500 },
    );
  }
}
