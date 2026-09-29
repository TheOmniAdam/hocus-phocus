import { useEffect, useState } from 'react'
import ActivityCard from './components/ActivityCard'
import ActivityForm from './components/ActivityForm'
import type { Activity, ActivityStatus } from './types/Activity'
import './App.css'

const apiActivitiesUrl = 'http://localhost:8000/activities'

const initialActivities: Activity[] = [
  {
    id: 1,
    name: 'Apply to Acme Corp',
    category: 'Career',
    duration: 45,
    status: 'active',
    archived: false,
  },
  {
    id: 2,
    name: 'Learn React Components',
    category: 'Learning',
    duration: 30,
    status: 'active',
    archived: false,
  },
  {
    id: 3,
    name: 'Do Laundry',
    category: 'Home',
    duration: 20,
    status: 'active',
    archived: false,
  },
]

function App() {
  const [activities, setActivities] =
  useState<Activity[]>([])

  useEffect(() => {
    async function loadActivities() {
      const response = await fetch(
        apiActivitiesUrl
      )

      const data: Activity[] = await response.json()

      setActivities(data)
    }

    loadActivities()
  }, [])


  async function handleAddActivity(
    name: string,
    category: string,
    duration: number
  ) {
  const response = await fetch(
    apiActivitiesUrl,
    {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        category,
        duration,
      }),
    }
  )

  if (!response.ok) {
    console.error('Failed to create activity')
    return
  }

  const newActivity: Activity = await response.json()

  setActivities((currentActivities) => [
    ...currentActivities,
    newActivity,
  ])
  }

  // function handleUpdateStatusActivity(id: string, status: ActivityStatus) {
  //   setActivities(
  //     activities.map((activity) => {
  //       if (activity.id === id) {
  //         return { ...activity, status: status }
  //       }
  //       return activity
  //     })
  //   )
  // }

  async function handleUpdateStatusActivity(
  id: string,
  status: ActivityStatus
) {
  const response = await fetch(
    `${apiActivitiesUrl}/${id}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    }
  )

  if (!response.ok) {
    console.error('Failed to update activity status')
    return
  }

  const updatedActivity: Activity = await response.json()

  setActivities((currentActivities) =>
    currentActivities.map((activity) =>
      activity.id === updatedActivity.id
        ? updatedActivity
        : activity
    )
  )
}

  // function handleArchiveActivity(id: number) {
  //   setActivities(
  //     activities.map((activity) => {
  //       if (activity.id === id) {
  //         return { ...activity, archived: true }
  //       }
  //       return activity
  //     })
  //   )
  // }

  async function handleArchiveActivity(id: string) {
  const response = await fetch(
    `${apiActivitiesUrl}/${id}/archive`,
    {
      method: 'PATCH',
    }
  )

  if (!response.ok) {
    console.error('Failed to archive activity')
    return
  }

  const updatedActivity: Activity = await response.json()

  setActivities((currentActivities) =>
    currentActivities.map((activity) =>
      activity.id === updatedActivity.id
        ? updatedActivity
        : activity
    )
  )
}

  function handleDeleteActivity(id: string) {
    setActivities(
      activities.filter((activity) => activity.id !== id)
    )
  }

  return (
    <>
    <header>
        <h1>Hocus PHocus</h1>
        <p>Your life is a resource management game.</p>
    </header>

    <main>
        <ActivityForm onAddActivity={handleAddActivity} />

        <section>
            <h2>Today's Activities</h2>

            {activities.map((activity) => (
                <ActivityCard
                    key={activity.id}
                    id={activity.id}
                    name={activity.name}
                    category={activity.category}
                    duration={activity.duration}
                    status={activity.status}
                    archived={activity.archived}
                    onStatusUpdate={handleUpdateStatusActivity}
                    onArchive={handleArchiveActivity}
                    onDelete={handleDeleteActivity}
                />
            ))}
        </section>
    </main>
    </>
  )
}

export default App