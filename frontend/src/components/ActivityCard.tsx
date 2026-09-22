type ActivityCardProps = {
    name: string,
    category: string,
    duration: number
}

function ActivityCard(
    {
        name,
        category,
        duration
    }: ActivityCardProps
) {
    return(
        <>
            <p>
                {name}
            </p>
            <p>
                {category}
            </p>
            <p>
                {duration}
            </p>
        </>
    )
}
export default ActivityCard