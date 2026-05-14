import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface PillarScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
}

interface AnalyzeRequest {
  businessName: string;
  industry: string;
  pillarScores: PillarScore[];
  overallPercentage: number;
  answers: Record<string, { question: string; answer: string; points: number }>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessName, industry, pillarScores, overallPercentage, answers } =
    req.body as AnalyzeRequest;

  if (!businessName || !industry || !pillarScores) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const weakestPillar = [...pillarScores].sort(
    (a, b) => a.percentage - b.percentage
  )[0];
  const strongestPillar = [...pillarScores].sort(
    (a, b) => b.percentage - a.percentage
  )[0];

  const pillarSummary = pillarScores
    .map((p) => `- ${p.name}: ${p.percentage}%`)
    .join("\n");

  const answerSummary = Object.values(answers)
    .map((a) => `Q: ${a.question}\nA: ${a.answer} (${a.points}/3 pts)`)
    .join("\n\n");

  const prompt = `You are a senior digital strategist at OGENCI, Ghana's premier digital agency. Analyze this business's digital audit and produce a precise, enterprise-grade strategic report.

CLIENT: ${businessName}
INDUSTRY: ${industry}
OVERALL DIGITAL EFFICIENCY SCORE: ${overallPercentage}%

PILLAR BREAKDOWN:
${pillarSummary}

WEAKEST PILLAR: ${weakestPillar.name} (${weakestPillar.percentage}%)
STRONGEST PILLAR: ${strongestPillar.name} (${strongestPillar.percentage}%)

AUDIT ANSWERS:
${answerSummary}

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation):
{
  "verdict": "A sharp, authoritative 2-sentence executive verdict on their current digital position. Be direct, not generic.",
  "executiveSummary": "A 3-sentence strategic overview of the biggest opportunity this business is missing right now.",
  "recommendations": [
    {
      "title": "Recommendation title (5 words max)",
      "pillar": "Which pillar this addresses",
      "impact": "High|Medium",
      "timeframe": "0-30 days|30-90 days|90-180 days",
      "description": "2-sentence description of the problem and the fix.",
      "actions": ["Action step 1", "Action step 2", "Action step 3"]
    },
    {
      "title": "Recommendation title",
      "pillar": "Which pillar",
      "impact": "High|Medium",
      "timeframe": "0-30 days|30-90 days|90-180 days",
      "description": "2-sentence description.",
      "actions": ["Action step 1", "Action step 2", "Action step 3"]
    },
    {
      "title": "Recommendation title",
      "pillar": "Which pillar",
      "impact": "High|Medium",
      "timeframe": "0-30 days|30-90 days|90-180 days",
      "description": "2-sentence description.",
      "actions": ["Action step 1", "Action step 2", "Action step 3"]
    }
  ],
  "priorityAction": "The single most important thing they should do THIS WEEK. One sentence, ultra-specific.",
  "revenueImpact": "Estimated revenue impact if all recommendations are implemented (e.g. '2.4x projected lead volume increase')."
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1200,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No response from AI");

    const analysis = JSON.parse(content);
    return res.status(200).json({ success: true, analysis });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({ error: "Analysis failed. Please try again." });
  }
}
