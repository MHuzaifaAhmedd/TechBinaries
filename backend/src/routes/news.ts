import { Router } from "express";
import { fetchLiveTechNews } from "../services/newsService";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const { items, fetchedAt } = await fetchLiveTechNews();

    res.set(
      "Cache-Control",
      "public, max-age=300, s-maxage=300, stale-while-revalidate=86400"
    );

    return res.status(200).json({
      ok: true,
      items,
      fetchedAt,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Failed to load latest tech news.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
