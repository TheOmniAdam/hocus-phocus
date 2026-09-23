type ActivityCardProps = {
    id: number
    name: string
    category: string
    duration: number
    status: string
    onStatusUpdate: (id: number, status: string) => void
    onArchive: (id: number) => void
    onDelete: (id: number) => void
}

function getStatusIcon(status: string) {
    switch (status) {
        case 'completed':
            return '✓'
        case 'abandoned':
            return '✗'
        case 'invalidated':
            return '!'
        default:
            return ''
    }
}

function ActivityCard({
    id,
    name,
    category,
    duration,
    status,
    onStatusUpdate,
    onArchive,
    onDelete,
}: ActivityCardProps) {
    return(
        <>
            <p>
                {getStatusIcon(status)} {name}
            </p>
            <p>
                {category}
            </p>
            <p>
                {duration}
            </p>
            <button onClick={() => onStatusUpdate(id, 'completed')}>
                Complete
            </button>
            <button onClick={() => onStatusUpdate(id, 'abandoned')}>
                Abandon
            </button>
            <button onClick={() => onStatusUpdate(id, 'invalidated')}>
                Invalidate
            </button>
            <button onClick={() => onArchive(id)}>
                Archive
            </button>
            <button onClick={() => onDelete(id)}>
                Remove
            </button>
        </>
    )
}
export default ActivityCard