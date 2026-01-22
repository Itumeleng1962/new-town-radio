import { mkdir, writeFile } from "fs/promises";
import path from "path";

function sanitizeFilenamePart(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function savePublicUpload(file: File, folder = "uploads") {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const original = sanitizeFilenamePart(file.name || "upload");
  const ext = path.extname(original) || "";
  const base = sanitizeFilenamePart(path.basename(original, ext));
  const filename = `${Date.now()}_${base}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", folder);
  await mkdir(uploadDir, { recursive: true });

  const targetPath = path.join(uploadDir, filename);
  await writeFile(targetPath, buffer);

  return `/${folder}/${filename}`;
}

// Alias for backward compatibility
export const saveUploadedFile = savePublicUpload;