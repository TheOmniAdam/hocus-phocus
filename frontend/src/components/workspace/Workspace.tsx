import { useState } from 'react'
import type { ReactNode } from 'react'
import Pod from './Pod'
import OrbitLayout from './layouts/OrbitLayout'

export type WorkspaceLayout =
  | 'foreground'
  | 'carousel'
  | 'orbit'
  | 'floating'

export type WorkspacePod = {
  id: string
  title: string
  content: ReactNode
}

type WorkspaceProps = {
  pods: WorkspacePod[]
  layout?: WorkspaceLayout
}

export default function Workspace({
  pods,
  layout = 'foreground',
}: WorkspaceProps) {
  const [focusedPodId, setFocusedPodId] = useState('planner')
  const focusedIndex = pods.findIndex(
    (pod) => pod.id === focusedPodId
  )

  function focusPod(id: string) {
    if (id === focusedPodId) return

    if (!document.startViewTransition) {
      setFocusedPodId(id)
      return
    }

    document.startViewTransition(() => {
      setFocusedPodId(id)
    })
  }

  if (layout === 'orbit') {
    return <OrbitLayout pods={pods} />
  }

  return (
    <div className={`workspace workspace--${layout}`}>
      <div
        className="workspace__track"
        style={
          layout === 'carousel'
            ? {
                transform: `translateX(calc(15% - ${focusedIndex} * (70% + var(--space-4))))`,
              }
            : undefined
        }
      >
        {pods.map((pod) => (
          <Pod
            key={pod.id}
            id={pod.id}
            title={pod.title}
            presentation={
              pod.id === focusedPodId ? 'focused' : 'background'
            }
            onFocus={focusPod}
          >
            {pod.content}
          </Pod>
        ))}
      </div>
    </div>
  )
}
