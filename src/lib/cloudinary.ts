import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a base64 data URI (e.g. from a browser file input) to Cloudinary
 * under a per-registration folder so documents stay organized and easy to audit.
 */
export async function uploadDocument(base64: string, registrationId: string, label: string) {
  const result = await cloudinary.uploader.upload(base64, {
    folder: `graduate-portal/registrations/${registrationId}`,
    public_id: label.replace(/\s+/g, "-").toLowerCase(),
    resource_type: "auto",
    overwrite: true,
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export default cloudinary;
