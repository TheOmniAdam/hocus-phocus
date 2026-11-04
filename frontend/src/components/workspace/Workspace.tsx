import { useState } from 'react'
import type { ReactNode } from 'react'
import Pod from './Pod'

export type WorkspaceLayout =
  | 'foreground'
  | 'carousel'
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

  return (
    <div className={`workspace workspace--${layout}`}>
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
  )
}
