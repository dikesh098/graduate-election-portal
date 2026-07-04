import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";
import { registrationSchema } from "@/types";
import { uploadDocument } from "@/lib/cloudinary";
import crypto from "crypto";

function generateTrackingId() {
  return "GEP-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documents, ...rest } = body;
    const parsed = registrationSchema.safeParse(rest);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();

    const trackingId = generateTrackingId();

    // documents: [{ label: string, base64: string }] uploaded from the client
    const uploadedDocs = [];
    if (Array.isArray(documents)) {
      for (const doc of documents) {
        if (doc?.base64 && doc?.label) {
          const uploaded = await uploadDocument(doc.base64, trackingId, doc.label);
          uploadedDocs.push({ label: doc.label, ...uploaded });
        }
      }
    }

    const registration = await Registration.create({
      ...parsed.data,
      trackingId,
      documents: uploadedDocs,
      status: "submitted",
      statusHistory: [{ status: "submitted", note: "Application received", at: new Date() }],
    });

    return NextResponse.json(
      { trackingId: registration.trackingId, id: registration._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
