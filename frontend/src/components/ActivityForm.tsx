import { useState } from 'react'
import './ActivityForm.css'

type ActivityFormProps = {
    onAddActivity: (
        name: string,
        category: string,
        duration: number
    ) => Promise<boolean>
}


function ActivityForm({ onAddActivity }: ActivityFormProps) {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [duration, setDuration] = useState('')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!name || !category || !duration) {
            return
        }

        const activityCreated = await onAddActivity(
            name,
            category,
            Number(duration)
        )

        if (activityCreated) {
            setName('')
            setCategory('')
            setDuration('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Activity</h2>

            <label>
            Activity
            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            </label>

            <label>
            Category
            <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            </label>

            <label>
            Minutes
            <input
                type="number"
                min="1"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
            />
            </label>

            <button type="submit">Add Activity</button>
        </form>
    )
}

export default ActivityForm