import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from bson import ObjectId
from bson.errors import InvalidId

from app.database import activities_collection
from app.models.activity import (
    Activity,
    ActivityCreate,
    ActivityStatus,
    ActivityStatusUpdate,
)

app = FastAPI(
    title="Hocus PHocus API",
    version="0.1.0",
)

def document_to_activity(document: dict) -> Activity:
    return Activity(
        id=str(document["_id"]),
        user_id=document["user_id"],
        name=document["name"],
        category=document["category"],
        duration=document["duration"],
        status=document["status"],
        archived=document["archived"],
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

activities: list[Activity] = []

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/activities")
def get_activities():
    user_id = os.environ["DEV_USER_ID"]

    documents = activities_collection.find({
        "user_id": user_id,
        "archived": False,
    })

    return [
        document_to_activity(document)
        for document in documents
    ]

@app.post("/activities", status_code=201)
def create_activity(activity: ActivityCreate):
    document = {
        "user_id": os.environ["DEV_USER_ID"],
        "name": activity.name,
        "category": activity.category,
        "duration": activity.duration,
        "status": ActivityStatus.ACTIVE.value,
        "archived": False,
    }

    result = activities_collection.insert_one(document)

    return Activity(
        id=str(result.inserted_id),
        **document,
    )

@app.patch("/activities/{activity_id}/status")
def update_activity_status(
    activity_id: str,
    status_update: ActivityStatusUpdate,
):
    try:
        object_id = ObjectId(activity_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Activity not found")

    user_id = os.environ["DEV_USER_ID"]

    result = activities_collection.find_one_and_update(
        {
            "_id": object_id,
            "user_id": user_id,
        },
        {
            "$set": {
                "status": status_update.status.value,
            }
        },
        return_document=True,
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Activity not found")

    return document_to_activity(result)

@app.patch("/activities/{activity_id}/archive")
def archive_activity(activity_id: str):
    try:
        object_id = ObjectId(activity_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Activity not found")

    user_id = os.environ["DEV_USER_ID"]

    result = activities_collection.find_one_and_update(
        {
            "_id": object_id,
            "user_id": user_id,
        },
        {
            "$set": {
                "archived": True,
            }
        },
        return_document=True,
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Activity not found")

    return document_to_activity(result)

@app.delete("/activities/{activity_id}")
def delete_activity(activity_id: str):
    try:
        object_id = ObjectId(activity_id)
    except InvalidId:
        raise HTTPException(status_code=404, detail="Activity not found")

    user_id = os.environ["DEV_USER_ID"]

    result = activities_collection.delete_one({
        "_id": object_id,
        "user_id": user_id,
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Activity not found")

    return {"message": "Activity deleted"}