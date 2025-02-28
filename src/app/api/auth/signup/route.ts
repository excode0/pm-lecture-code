import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Semua field harus diisi!' },
        { status: 400 },
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah digunakan!' },
        { status: 400 },
      );
    }

    // Hash password sebelum disimpan
    const hashedPassword = await hash(password, 10);

    // Simpan user baru
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role
        status: 'active',
      },
    });

    return NextResponse.json(
      { message: 'Registrasi berhasil!', user: newUser },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan, coba lagi!' },
      { status: 500 },
    );
  }
}
