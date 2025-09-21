import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const plants = await prisma.plant.findMany();
  return NextResponse.json(plants);
}

export async function POST(request) {
  const body = await request.json();
  const { name, imageUrl, ownerMail, address } = body;

  if (!name || !imageUrl || !ownerMail || !address) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const plant = await prisma.plant.create({
    data: { name, imageUrl, ownerMail, address },
  });

  return NextResponse.json(plant);
}
