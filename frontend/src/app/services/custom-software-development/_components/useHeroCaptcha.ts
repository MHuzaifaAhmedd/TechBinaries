"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { parseChallengePayload, parseHeroLeadResponse } from "./CsdHeroLeadForm.api";
import { ChallengePayload } from "./CsdHeroLeadForm.types";

const CHALLENGE_LOAD_ERROR = "Could not load captcha challenge.";
const CHALLENGE_RATE_LIMIT_ERROR = "Too many captcha requests. Please wait a moment and try again.";

type UseHeroCaptchaOptions = {
  onLoadError: (message: string) => void;
  onBeforeLoad: () => void;
};

type UseHeroCaptchaResult = {
  challenge: ChallengePayload | null;
  loadingChallenge: boolean;
  hasLoadedChallengeOnce: boolean;
  refreshIconRef: RefObject<SVGSVGElement | null>;
  loadChallenge: () => Promise<void>;
  handleRefreshClick: () => void;
};

export function useHeroCaptcha(options: UseHeroCaptchaOptions): UseHeroCaptchaResult {
  const { onLoadError, onBeforeLoad } = options;
  const refreshIconRef = useRef<SVGSVGElement | null>(null);
  const refreshSpinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [challenge, setChallenge] = useState<ChallengePayload | null>(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [hasLoadedChallengeOnce, setHasLoadedChallengeOnce] = useState(false);

  const loadChallenge = useCallback(async () => {
    setLoadingChallenge(true);
    onBeforeLoad();
    try {
      const response = await fetch("/api/hero-captcha/challenge", { cache: "no-store" });
      const payload: unknown = await response.json();

      if (response.status === 429) {
        const parsedError = parseHeroLeadResponse(payload);
        throw new Error(parsedError?.message ?? CHALLENGE_RATE_LIMIT_ERROR);
      }

      const parsedPayload = parseChallengePayload(payload);
      if (!response.ok || !parsedPayload) {
        throw new Error(CHALLENGE_LOAD_ERROR);
      }
      setChallenge(parsedPayload);
      setHasLoadedChallengeOnce(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : CHALLENGE_LOAD_ERROR;
      onLoadError(message);
    } finally {
      setLoadingChallenge(false);
    }
  }, [onBeforeLoad, onLoadError]);

  useEffect(() => {
    const challengeLoadTimer = setTimeout(() => {
      void loadChallenge();
    }, 0);

    return () => {
      clearTimeout(challengeLoadTimer);
      if (refreshSpinTimeoutRef.current) {
        clearTimeout(refreshSpinTimeoutRef.current);
      }
    };
  }, [loadChallenge]);

  const handleRefreshClick = useCallback(() => {
    void loadChallenge();
    const icon = refreshIconRef.current;
    if (!icon) return;

    icon.classList.add("spin-animation");
    if (refreshSpinTimeoutRef.current) {
      clearTimeout(refreshSpinTimeoutRef.current);
    }
    refreshSpinTimeoutRef.current = setTimeout(() => {
      icon.classList.remove("spin-animation");
    }, 500);
  }, [loadChallenge]);

  return {
    challenge,
    loadingChallenge,
    hasLoadedChallengeOnce,
    refreshIconRef,
    loadChallenge,
    handleRefreshClick,
  };
}
