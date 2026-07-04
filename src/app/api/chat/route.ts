import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the AI assistant for the Nagpur Graduates' Constituency Graduate Election Portal.
You help graduates understand:
- Eligibility for the Graduate Constituency electoral roll
- How graduate voter registration differs from the regular voter list
- The step-by-step registration process and required documents
- Deadlines and how to track an application using a tracking ID

Keep answers short, clear, and specific to this portal. If asked something outside this scope
(general politics, unrelated legal advice, etc.), politely redirect to the Contact page or Help Center.
Never invent specific dates, deadlines, or legal rules you are not given — instead tell the user to
check the "Election Information" page or contact the office directly.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat assistant is not configured yet. Please use the Contact page." },
      { status: 503 }
    );
  }

  const { messages } = await req.json();
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages array is required" }, { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: "user" | "assistant"; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return NextResponse.json({ reply: textBlock?.type === "text" ? textBlock.text : "" });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "The assistant is temporarily unavailable." }, { status: 500 });
  }
}
