import type { ActivitySummary as ActivitySummaryType } from '../types/ActivitySummary'

type ActivitySummaryProps = {
  summary: ActivitySummaryType
}

function ActivitySummary({ summary }: ActivitySummaryProps) {
  return (
    <section>
      <h2>Active Workload</h2>
      <p>Active activities: {summary.activity_count}</p>
      <p>Planned minutes: {summary.total_minutes}</p>
    </section>
  )
}

export default ActivitySummary
