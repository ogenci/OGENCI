import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "reports@ogenci.com";

interface SendReportRequest {
  email: string;
  name: string;
  businessName: string;
  overallPercentage: number;
  pdfBase64: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, businessName, overallPercentage, pdfBase64 } =
    req.body as SendReportRequest;

  if (!email || !name || !businessName || !pdfBase64) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const gradeLabel =
    overallPercentage >= 80
      ? "Elite"
      : overallPercentage >= 60
        ? "Advanced"
        : overallPercentage >= 40
          ? "Developing"
          : "Critical";

  try {
    const { data, error } = await resend.emails.send({
      from: `OGENCI Digital <${FROM_EMAIL}>`,
      to: email,
      subject: `Your Digital Audit Report — ${businessName} (${overallPercentage}% Score)`,
      attachments: [
        {
          filename: `OGENCI-Audit-${businessName.replace(/\s+/g, "-")}.pdf`,
          content: pdfBase64,
        },
      ],
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Your OGENCI Digital Audit Report</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;min-height:100vh;">
    <tr>
      <td align="center" style="padding:60px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding:0 0 48px 0;border-bottom:1px solid #1a1a1a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-1px;">OGENCI<span style="color:#bae637;">.</span></span>
                  </td>
                  <td align="right">
                    <span style="font-size:9px;font-family:monospace;color:#555;letter-spacing:3px;text-transform:uppercase;">Strategic Intelligence</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Score Hero -->
          <tr>
            <td style="padding:64px 0 48px 0;text-align:center;">
              <p style="margin:0 0 16px 0;font-size:9px;font-family:monospace;color:#bae637;letter-spacing:4px;text-transform:uppercase;">Digital Efficiency Score</p>
              <p style="margin:0;font-size:96px;font-weight:900;color:#bae637;line-height:1;letter-spacing:-4px;">${overallPercentage}%</p>
              <p style="margin:16px 0 0 0;font-size:11px;font-family:monospace;color:#555;letter-spacing:3px;text-transform:uppercase;">${gradeLabel} Classification · ${businessName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 0 48px 0;border-top:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;">
              <p style="margin:40px 0 8px 0;font-size:9px;font-family:monospace;color:#bae637;letter-spacing:3px;text-transform:uppercase;">Dear ${name},</p>
              <p style="margin:0 0 24px 0;font-size:16px;color:#ffffff;line-height:1.7;">Your comprehensive digital audit has been completed. The full strategic report — including your 5-pillar breakdown, AI-generated recommendations, and your 90-day growth roadmap — is attached to this email as a PDF.</p>
              <p style="margin:0;font-size:14px;color:#888;line-height:1.7;">This report was generated exclusively for <strong style="color:#fff;">${businessName}</strong> and contains proprietary strategic insights. Please treat it as confidential.</p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:48px 0;text-align:center;">
              <p style="margin:0 0 32px 0;font-size:13px;color:#888;line-height:1.7;">Ready to implement these recommendations? Our team of specialists is available to begin within 48 hours.</p>
              <a href="https://ogenci.com/audit" style="display:inline-block;padding:18px 48px;background:#bae637;color:#0a0a0a;font-size:11px;font-family:monospace;font-weight:700;letter-spacing:3px;text-transform:uppercase;text-decoration:none;border-radius:100px;">Book a Strategy Call</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 0 0 0;border-top:1px solid #1a1a1a;">
              <p style="margin:0;font-size:9px;font-family:monospace;color:#333;letter-spacing:2px;text-transform:uppercase;text-align:center;">OGENCI Digital · Accra, Ghana · ogenci.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }

    return res.status(200).json({ success: true, emailId: data?.id });
  } catch (err) {
    console.error("Send report error:", err);
    return res.status(500).json({ error: "Email delivery failed." });
  }
}
