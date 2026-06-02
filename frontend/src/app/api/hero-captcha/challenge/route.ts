import { NextResponse } from "next/server";
import { checkHeroCaptchaIssueRateLimit, issueHeroCaptchaChallenge } from "../../_lib/hero-captcha-store";
import { getRequestClientIp } from "../../_lib/request-client-ip";

export async function GET(request: Request) {
  const clientIp = getRequestClientIp(request);
  const rateLimit = checkHeroCaptchaIssueRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        message: "Too many captcha requests. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  const challenge = issueHeroCaptchaChallenge();
  return NextResponse.json(challenge, { status: 200 });
}
