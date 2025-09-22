import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all plants
export async function GET() {
  const plants = await prisma.plant.findMany();
  return new Response(JSON.stringify(plants));
}

// Add a new plant
export async function POST(req) {
  const { name, ownerMail, address, imageUrl } = await req.json();
  const plant = await prisma.plant.create({
    data: { name, ownerMail, address, imageUrl },
  });
  return new Response(JSON.stringify(plant));
}

// Update a plant (everyone can edit)
export async function PUT(req) {
  const { id, name, ownerMail, address, imageUrl } = await req.json();
  const updated = await prisma.plant.update({
    where: { id: Number(id) },
    data: { name, ownerMail, address, imageUrl },
  });
  return new Response(JSON.stringify(updated));
}

// Delete a plant (everyone can delete)
export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.plant.delete({
    where: { id: Number(id) },
  });
  return new Response(JSON.stringify({ success: true }));
}
