import { NextRequest, NextResponse } from "next/server";
import { eligibilitySchema } from "@/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = eligibilitySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { graduationYear, residesInMaharashtra } = parsed.data;
  const currentYear = new Date().getFullYear();

  // Graduate constituency rule: must have graduated at least 3 years before
  // the relevant electoral roll qualifying date, and be ordinarily resident
  // in Maharashtra. Adjust this rule to match the Election Commission's
  // current qualifying-date notification for each cycle.
  const yearsSinceGraduation = currentYear - graduationYear;
  const meetsGraduationRule = yearsSinceGraduation >= 3;

  const eligible = meetsGraduationRule && residesInMaharashtra;

  const reasons: string[] = [];
  if (!meetsGraduationRule) {
    reasons.push("You must have graduated at least 3 years before the qualifying date.");
  }
  if (!residesInMaharashtra) {
    reasons.push("You must be ordinarily resident in Maharashtra.");
  }

  return NextResponse.json({ eligible, reasons });
}
