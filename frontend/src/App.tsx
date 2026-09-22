import './App.css'
import ActivityCard from './components/ActivityCard'
import type { Activity } from './types/Activity'

const activities: Activity[] = [
  {
    id: 1,
    name: 'Apply to Acme Corp',
    category: 'Career',
    duration: 45,
  },
  {
    id: 2,
    name: 'Learn React Components',
    category: 'Learning',
    duration: 30,
  },
  {
    id: 3,
    name: 'Do Laundry',
    category: 'Home',
    duration: 20,
  },
]

function App() {
  return (
    <>
      <h1>Hocus PHocus</h1>
      <p>
        Your life is a resource management game.
      </p>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          name={activity.name}
          category={activity.category}
          duration={activity.duration}
        />
      ))}
    </>
  )
}

export default App
