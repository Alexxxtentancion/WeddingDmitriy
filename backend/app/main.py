import os
from datetime import date, datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.csv_store import append_rsvp
from app.models import RsvpRequest
from app.rate_limit import RateLimitMiddleware, get_rate_limit

app = FastAPI(title="Wedding RSVP API")

cors_origins = os.getenv("CORS_ORIGINS", "*")
if cors_origins == "*":
    allow_origins = ["*"]
else:
    allow_origins = [origin.strip() for origin in cors_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RateLimitMiddleware, max_requests=get_rate_limit())


def get_rsvp_deadline() -> date:
    deadline_str = os.getenv("RSVP_DEADLINE", "2026-08-15")
    return date.fromisoformat(deadline_str)


def is_rsvp_closed() -> bool:
    return date.today() > get_rsvp_deadline()


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/rsvp", status_code=201)
def submit_rsvp(data: RsvpRequest):
    if is_rsvp_closed():
        raise HTTPException(
            status_code=403,
            detail=f"RSVP deadline has passed ({get_rsvp_deadline().isoformat()})",
        )

    append_rsvp(data)
    return {"message": "RSVP saved successfully"}
