import { useState } from 'react'

type ActivityFormProps = {
    onAddActivity: (
        name: string,
        category: string,
        duration: number
    ) => void
}

function ActivityForm({ onAddActivity }: ActivityFormProps) {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [duration, setDuration] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!name || !category || !duration) {
            return
        }

        onAddActivity(name, category, Number(duration))

        setName('')
        setCategory('')
        setDuration('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Activity</h2>

            <label>
            Activity
            &nbsp;<input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            </label> <br />

            <label>
            Category
            &nbsp;<input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            </label> <br />

            <label>
            Minutes
            &nbsp;<input
                type="number"
                min="1"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
            />
            </label> <br />

            <button type="submit">Add Activity</button>
        </form>
    )
}

export default ActivityForm