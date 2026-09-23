from fastapi import FastAPI, HTTPException

from app.models.activity import Activity, ActivityCreate, ActivityDelete, ActivityStatusUpdate

app = FastAPI(
    title="Hocus PHocus API",
    version="0.1.0",
)

activities: list[Activity] = []

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/activities")
def get_activities():
    return activities

@app.post("/activities", status_code=201)
def create_activity(activity: ActivityCreate):
    new_activity = Activity(
        id=len(activities) + 1,
        name=activity.name,
        category=activity.category,
        duration=activity.duration,
    )

    activities.append(new_activity)

    return new_activity

@app.patch("/activities/{activity_id}/status")
def update_activity_status(
    activity_id: int,
    status_update: ActivityStatusUpdate,
):
    activity = next(
        (
            activity
            for activity in activities
            if activity.id == activity_id
        ),
        None,
    )

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found",
        )

    activity.status = status_update.status

    return activity

@app.patch("/activities/{activity_id}/archive")
def archive_activity(activity_id: int):
    global activities

    activity = next(
        (activity for activity in activities if activity.id == activity_id),
        None,
    )

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found",
        )

    activity.archived = True

    return activity  

@app.delete("/activities/{activity_id}")
def delete_activity(activity_id: int):
    global activities

    activity = next(
        (activity for activity in activities if activity.id == activity_id),
        None,
    )

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found",
        )

    activities = [
        activity
        for activity in activities
        if activity.id != activity_id
    ]

    return {"message": "Activity deleted"}