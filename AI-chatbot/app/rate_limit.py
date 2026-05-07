import time
from dataclasses import dataclass

from app.config import settings


@dataclass
class Bucket:
    count: int
    reset_at: float


_buckets: dict[str, Bucket] = {}


def check_rate_limit(key: str) -> tuple[bool, int]:
    now = time.time()
    window_seconds = settings.rate_limit_window_ms / 1000
    bucket = _buckets.get(key)

    if bucket is None or bucket.reset_at <= now:
        _buckets[key] = Bucket(count=1, reset_at=now + window_seconds)
        return True, 0

    if bucket.count >= settings.rate_limit_max:
        return False, max(1, int(bucket.reset_at - now))

    bucket.count += 1
    return True, 0
