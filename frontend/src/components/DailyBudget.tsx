type DailyBudgetProps = {
  availableMinutes: number
  plannedMinutes: number
  onBudgetChange: (minutes: number) => void
}

function DailyBudget({
  availableMinutes,
  plannedMinutes,
  onBudgetChange,
}: DailyBudgetProps) {
  const remainingMinutes = availableMinutes - plannedMinutes
  const isOvercommitted = remainingMinutes < 0

  return (
    <section>
      <h2>Daily Time Budget</h2>

      <label>
        Available minutes:
        <input
          type="number"
          min="0"
          value={availableMinutes}
          onChange={(event) =>
            onBudgetChange(Number(event.target.value))
          }
        />
      </label>

      <p>Planned: {plannedMinutes} minutes</p>
      <p>Remaining: {remainingMinutes} minutes</p>

      {isOvercommitted && (
        <p>
          Overcommitted by {Math.abs(remainingMinutes)} minutes!
        </p>
      )}
    </section>
  )
}

export default DailyBudget
