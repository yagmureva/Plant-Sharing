import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const name = formData.get("name");
  const ownerMail = formData.get("ownerMail");
  const address = formData.get("address");

  if (!file || !name || !ownerMail || !address) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  const plant = await prisma.plant.create({
    data: { name, ownerMail, address, imageUrl },
  });

  return new Response(JSON.stringify(plant), { status: 200 });
}
