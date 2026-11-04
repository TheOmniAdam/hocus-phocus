import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Pod from '../Pod'
import { getShortestRotation } from './orbitMath'
import './OrbitLayout.css'
import type { WorkspacePod } from '../Workspace'

type OrbitPod = {
  id: string
  title: string
  content: ReactNode
  appearance?: string
}

type OrbitLayoutProps = {
  pods: WorkspacePod[]
}

export default function OrbitLayout({ pods }: OrbitLayoutProps) {
  // This value can move beyond 0...N-1.
  // That lets the orbit keep rotating rather than snapping backward.
  const [rotation, setRotation] = useState(0)
  

  const count = pods.length
  if (count === 0) return null

  const focusedIndex = ((rotation % count) + count) % count

  function focusPod(id: string) {
    const targetIndex = pods.findIndex((pod) => pod.id === id)
    if (targetIndex === -1) return

    const steps = getShortestRotation(focusedIndex, targetIndex, count)
    setRotation((current) => current + steps)
  }
  
  const focusedSlotRef = useRef<HTMLDivElement>(null)
  const [stageHeight, setStageHeight] = useState(750)

  useLayoutEffect(() => {
    const element = focusedSlotRef.current
    if (!element) return

    const updateHeight = () => {
      const pod = element.querySelector<HTMLElement>('.workspace-pod')
      if (!pod) return

      const slotHeight = pod.getBoundingClientRect().height
      const slotTop = element.offsetTop

      setStageHeight(Math.max(750, slotTop + slotHeight + 40))
    }

    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)

    updateHeight()

    return () => observer.disconnect()
  }, [focusedIndex])

  return (
    <div
      className="orbit-workspace"
      style={{ minHeight: `${stageHeight}px` }}
    >
      {pods.map((pod, index) => {
        const angle =
          ((index - rotation) * 2 * Math.PI) / count

        const x = Math.sin(angle)
        const depth = Math.cos(angle)

        // Focused pod is closest to the viewer.
        const isFocused = index === focusedIndex

        return (
          <div
            key={pod.id}
            ref={isFocused ? focusedSlotRef : null}
            className="orbit-workspace__slot"
            style={{
              left: `${50 + x * 35}%`,
              top: `${(1 - depth) * 100}px`,
              transform: `translateX(-50%) scale(${0.65 + (depth + 1) * 0.175})`,
              transformOrigin: 'top center',
              zIndex: Math.round((depth + 1) * 100),
              opacity: depth < -0.8 ? 0.5 : 1,
            }}
          >
            <Pod
              id={pod.id}
              title={pod.title}
              appearance={pod.appearance}
              presentation={isFocused ? 'focused' : 'background'}
              onFocus={focusPod}
            >
              {pod.content}
            </Pod>
          </div>
        )
      })}
    </div>
  )
}
