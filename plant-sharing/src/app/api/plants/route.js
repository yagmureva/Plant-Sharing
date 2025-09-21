import { prisma } from "./../../../lib/prisma";

export async function GET() {
  const plants = await prisma.plant.findMany({
    include: { owner: true },
  });
  return new Response(JSON.stringify(plants), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const body = await req.json();
  const newPlant = await prisma.plant.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      ownerId: body.ownerId,
    },
  });
  return new Response(JSON.stringify(newPlant), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
