import { useState } from 'react'
import ActivityCard from './components/ActivityCard'
import ActivityForm from './components/ActivityForm'
import type { Activity } from './types/Activity'
import './App.css'

const initialActivities: Activity[] = [
  {
    id: 1,
    name: 'Apply to Acme Corp',
    category: 'Career',
    duration: 45,
    completed: false,
  },
  {
    id: 2,
    name: 'Learn React Components',
    category: 'Learning',
    duration: 30,
    completed: false,
  },
  {
    id: 3,
    name: 'Do Laundry',
    category: 'Home',
    duration: 20,
    completed: false,
  },
]

function App() {
    const [activities, setActivities] =
        useState<Activity[]>(initialActivities)

    function handleAddActivity(
        name: string,
        category: string,
        duration: number
    ) {
        const newActivity: Activity = {
            id: Date.now(),
            name,
            category,
            duration,
            completed: false,
        }

        setActivities([...activities, newActivity])
    }

    function handleCompleteActivity(id: number) {
        setActivities(
            activities.map((activity) => {
                if (activity.id === id) {
                    return { ...activity, completed: true }
                }
                return activity
            })
        )
    }

    function handleDeleteActivity(id: number) {
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
                    completed={activity.completed}
                    onComplete={handleCompleteActivity}
                    onDelete={handleDeleteActivity}
                />
            ))}
        </section>
    </main>
    </>
  )
}

export default App