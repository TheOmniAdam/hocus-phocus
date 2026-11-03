import './ActivityCard.css'

type ActivityCardProps = {
    id: string
    name: string
    category: string
    duration: number
    status: ActivityStatus
    archived: boolean
    onStatusUpdate: (id: string, status: ActivityStatus) => void
    onArchive: (id: string) => void
    onDelete: (id: string) => void
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
    archived,
    onStatusUpdate,
    onArchive,
    onDelete,
}: ActivityCardProps) {
    return(
        <article className="activity-card">
            <div className="activity-card__details">
                <p>
                    {getStatusIcon(status)} {name}
                </p>
                <p>
                    {category}
                </p>
                <p>
                    {duration} minutes
                </p>
            </div>
            <div className="activity-card__actions">
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
            </div>
        </article>
    )
}
export default ActivityCard