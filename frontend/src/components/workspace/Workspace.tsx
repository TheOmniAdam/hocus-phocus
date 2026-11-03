import { useState } from 'react'
import type { ReactNode } from 'react'
import Pod from './Pod'

export type WorkspacePod = {
  id: string
  title: string
  content: ReactNode
}

type WorkspaceProps = {
  pods: WorkspacePod[]
  layout?: 'adaptive' | 'deck' | 'floating'
}

export default function Workspace({
  pods,
  layout = 'adaptive',
}: WorkspaceProps) {
  const [focusedPodId, setFocusedPodId] = useState('planner')

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
          onFocus={setFocusedPodId}
        >
          {pod.content}
        </Pod>
      ))}
    </div>
  )
}
