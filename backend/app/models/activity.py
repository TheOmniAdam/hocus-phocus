from pydantic import BaseModel
from enum import Enum
from datetime import date

class ActivityStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"
    INVALIDATED = "invalidated"

class ActivityCreate(BaseModel):
    name: str
    category: str
    duration: int
    scheduled_date: date

class Activity(BaseModel):
    id: str
    user_id: str
    name: str
    category: str
    duration: int
    scheduled_date: date | None = None
    status: ActivityStatus = ActivityStatus.ACTIVE
    archived: bool = False

class ActivityStatusUpdate(BaseModel):
    status: ActivityStatus

class ActivitySummary(BaseModel):
    activity_count: int
    total_minutes: int