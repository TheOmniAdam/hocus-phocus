from pydantic import BaseModel
from enum import Enum

class ActivityStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"
    INVALIDATED = "invalidated"

class ActivityCreate(BaseModel):
    name: str
    category: str
    duration: int

class ActivityStatusUpdate(BaseModel):
    status: ActivityStatus

class ActivityArchive(BaseModel):
    id: int

class ActivityDelete(BaseModel):
    id: int

class Activity(BaseModel):
    id: int
    name: str
    category: str
    duration: int
    status: ActivityStatus = ActivityStatus.ACTIVE
    archived: bool = False
