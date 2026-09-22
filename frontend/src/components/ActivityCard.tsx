type ActivityCardProps = {
    id: number
    name: string
    category: string
    duration: number
    completed: boolean
    onComplete: (id: number) => void
    onDelete: (id: number) => void
}

function isCompleted(completed: boolean) {
    return completed ? '✓' : 'X'
}   

function ActivityCard({
    id,
    name,
    category,
    duration,
    completed,
    onComplete,
    onDelete,
}: ActivityCardProps) {
    return(
        <>
            <p>
                {name} {isCompleted(completed)}
            </p>
            <p>
                {category}
            </p>
            <p>
                {duration}
            </p>
            <button onClick={() => onComplete(id)}>
                Complete
            </button>
            <button onClick={() => onDelete(id)}>
                Remove
            </button>
        </>
    )
}
export default ActivityCard