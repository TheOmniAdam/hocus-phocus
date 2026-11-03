import type { ReactNode } from 'react'

export type PodPresentation = 'focused' | 'background'

type PodProps = {
  id: string
  title: string
  presentation: PodPresentation
  onFocus: (id: string) => void
  children: ReactNode
}

export default function Pod({
  id,
  title,
  presentation,
  onFocus,
  children,
}: PodProps) {
  const isFocused = presentation === 'focused'

  return (
    <section
      className={`workspace-pod workspace-pod--${presentation}`}
      aria-label={title}
    >
      <header className="workspace-pod__header">
        <h2>{title}</h2>

        {!isFocused && (
          <button type="button" onClick={() => onFocus(id)}>
            Focus
          </button>
        )}
      </header>

      <div
        className="workspace-pod__content"
        inert={!isFocused}
      >
        {children}
      </div>
    </section>
  )
}
