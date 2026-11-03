import { useEffect, useState } from 'react'
import ActivityCard from './components/ActivityCard'
import ActivityForm from './components/ActivityForm'
import ActivitySummary from './components/ActivitySummary'
import type { ActivitySummary as ActivitySummaryType } from './types/ActivitySummary'
import type { Activity, ActivityStatus } from './types/Activity'
import DailyBudget from './components/DailyBudget'
import Workspace from './components/workspace/Workspace'
import './components/ActivityCard.css'
import './components/ActivityForm.css'
import './styles/workspace.css'
import './App.css'

const apiActivitiesUrl = 'http://localhost:8000/activities'

function App() {
  const [activities, setActivities] =
  useState<Activity[]>([])
  const [summary, setSummary] = useState<ActivitySummaryType | null>(null)
  const [dailyBudget, setDailyBudget] = useState<number>(180)
  const [selectedDate, setSelectedDate] = useState<string>(
    () => {
      const now = new Date();
      const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60_000
      );
      return localDate.toISOString().slice(0, 10);
    }
  );

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(apiActivitiesUrl)

        if (!response.ok) {
          throw new Error('Failed to load activities')
        }

        const data: Activity[] = await response.json()
        setActivities(data)
      } catch (error) {
        console.error('Could not load activities:', error)
      }
    }

    void loadActivities()
  }, [])

  useEffect(() => {
    let cancelled = false

    async function refreshSummary() {
      try {
        const response = await fetch(
          `${apiActivitiesUrl}/summary?scheduled_date=${selectedDate}`
        )

        if (!response.ok) {
          throw new Error('Failed to load activity summary')
        }

        const data: ActivitySummaryType = await response.json()

        if (!cancelled) {
          setSummary(data)
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Could not load summary:', error)
          setSummary(null)
        }
      }
    }

    setSummary(null)
    void refreshSummary()

    return () => {
      cancelled = true
    }
  }, [selectedDate])

  async function loadSummary() {
    try {
      const response = await fetch(`${apiActivitiesUrl}/summary?scheduled_date=${selectedDate}`)

      if (!response.ok) {
        throw new Error('Failed to load activity summary')
      }

      const data: ActivitySummaryType = await response.json()
      setSummary(data)
    } catch (error) {
      console.error('Could not load summary:', error)
    }
  }


  async function handleAddActivity(
    name: string,
    category: string,
    duration: number
  ): Promise<boolean> {
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
          scheduled_date: selectedDate,
        }),
      }
    )

    if (!response.ok) {
      console.error('Failed to create activity')
      return false
    }

    const newActivity: Activity = await response.json()

    setActivities((currentActivities) => [
      ...currentActivities,
      newActivity,
    ])
    await loadSummary()
    return true
  }

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
    await loadSummary()
  }

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
    await loadSummary()
  }

  async function handleDeleteActivity(id: string) {
    const response = await fetch(
      `${apiActivitiesUrl}/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      console.error('Failed to delete activity')
      return
    }

    setActivities((currentActivities) =>
      currentActivities.filter(
        (activity) => activity.id !== id
      )
    )
    await loadSummary()
  }

  const activitiesForSelectedDate = activities.filter(
    (activity) =>
      !activity.archived &&
      activity.scheduled_date === selectedDate
  )

  return (
    <>
    <header>
        <h1>Hocus PHocus</h1>
        <p>Your life is a resource management game.</p>
    </header>

    <main>
      <Workspace
        pods={[
          {
            id: 'planner',
            title: 'Daily Planner',
            content: (
              <div className="planner-content">
                <div className="planner-date">
                  <label htmlFor="planning-date">Planning date</label>
                  <input
                    id="planning-date"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                  />
                </div>

                <ActivityForm onAddActivity={handleAddActivity} />
                {summary && <ActivitySummary summary={summary} />}

                {summary && (
                  <DailyBudget
                    availableMinutes={dailyBudget}
                    plannedMinutes={summary.total_minutes}
                    onBudgetChange={setDailyBudget}
                  />
                )}
                
                <section>
                    <h2>Activities for {selectedDate}</h2>

                    {activitiesForSelectedDate.map((activity) => (
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
                      ))
                    }
                </section>
              </div>
            ),
          },
          {
            id: 'todo',
            title: 'General To-Do',
            content: (
              <div>
                <p>Your general task list will live here.</p>
              </div>
            ),
          },
          {
            id: 'templates',
            title: 'Templates',
            content: (
              <div>
                <p>Reusable activity templates will live here.</p>
              </div>
            ),
          },
        ]}
      />
    </main>
    </>
  )
}

export default App