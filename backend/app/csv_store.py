import csv
import os
from datetime import datetime, timezone
from pathlib import Path

from app.models import RsvpRequest

CSV_HEADERS = [
    "timestamp",
    "name",
    "attending",
    "guests_count",
    "food",
    "drinks",
    "comment",
]


def get_csv_path() -> Path:
    path = Path(os.getenv("CSV_PATH", "data/rsvp.csv"))
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def append_rsvp(data: RsvpRequest) -> None:
    csv_path = get_csv_path()
    file_exists = csv_path.exists() and csv_path.stat().st_size > 0

    with csv_path.open("a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=CSV_HEADERS)
        if not file_exists:
            writer.writeheader()

        writer.writerow(
            {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "name": data.name,
                "attending": "yes" if data.attending else "no",
                "guests_count": data.guests_count if data.attending else "",
                "food": data.food.value if data.food else "",
                "drinks": ";".join(d.value for d in data.drinks),
                "comment": data.comment or "",
            }
        )
