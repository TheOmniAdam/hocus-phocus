import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

export type PodPresentation = 'focused' | 'background'

type PodProps = {
  id: string
  title: string
  presentation: PodPresentation
  appearance?: string
  onFocus: (id: string) => void
  children: ReactNode
}

export default function Pod({
  id,
  title,
  presentation,
  appearance,
  onFocus,
  children,
}: PodProps) {
  const isFocused = presentation === 'focused'
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      setContentHeight(element.scrollHeight)
    })

    observer.observe(element)
    setContentHeight(element.scrollHeight)

    return () => observer.disconnect()
  }, [])

  const previewScale = 0.5
  const previewHeight = Math.min(
    650,
    Math.max(120, contentHeight * previewScale)
  )

  return (
    <section
      className={[
        'workspace-pod',
        `workspace-pod--${presentation}`,
        appearance ? `workspace-pod--${appearance}` : '',
      ].filter(Boolean).join(' ')}
      aria-label={title}
      style={{ viewTransitionName: `pod-${id}` }}
    >
      <header className="workspace-pod__header">
        <h2>{title}</h2>
      </header>

      <div 
        className="workspace-pod__viewport"
        style={{
          viewTransitionName: `pod-content-${id}`,
          ...(isFocused ? {} : { height: `${previewHeight}px` }),
        }}
      >
        <div
          className="workspace-pod__content"
          ref={contentRef}
          inert={!isFocused}
        >
          {children}
        </div>
      </div>

      {!isFocused && (
        <button
          type="button"
          className="workspace-pod__focus-overlay"
          aria-label={`Focus ${title}`}
          onClick={() => onFocus(id)}
        >
          <span className="workspace-pod__focus-label">
            Open {title}
          </span>
        </button>
      )}
    </section>
  )
}