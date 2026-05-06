import { NextResponse } from "next/server";
import { issueHeroCaptchaChallenge } from "../../_lib/hero-captcha-store";

export async function GET() {
  const challenge = issueHeroCaptchaChallenge();
  return NextResponse.json(challenge, { status: 200 });
}
