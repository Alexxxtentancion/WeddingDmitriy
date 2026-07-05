from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, field_validator, model_validator


class FoodChoice(str, Enum):
    MEAT = "meat"
    FISH = "fish"


class DrinkChoice(str, Enum):
    CHAMPAGNE = "champagne"
    WHITE_WINE = "white_wine"
    RED_WINE = "red_wine"
    WHISKY = "whisky"
    VODKA = "vodka"
    COGNAC = "cognac"
    NON_ALCOHOLIC = "non_alcoholic"


class RsvpRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    attending: bool
    guests_count: Optional[int] = Field(None, ge=1, le=5)
    food: Optional[FoodChoice] = None
    drinks: list[DrinkChoice] = Field(default_factory=list)
    comment: Optional[str] = Field(None, max_length=500)

    @field_validator("name")
    @classmethod
    def strip_name(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Name cannot be empty")
        return cleaned

    @model_validator(mode="after")
    def validate_attending_fields(self) -> "RsvpRequest":
        if self.attending:
            if self.guests_count is None:
                raise ValueError("guests_count is required when attending")
            if self.food is None:
                raise ValueError("food is required when attending")
        else:
            self.guests_count = None
            self.food = None
            self.drinks = []
        return self
