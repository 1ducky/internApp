import { useEffect } from "react"

const observerMap = new Map<Element, (isIntersecting: boolean) => void>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observerMap.get(entry.target)?.(entry.isIntersecting)
        })
      },
      { threshold: 0 }
    )
  }
  return sharedObserver
}

export function useVisibilityHide(
  ref: React.RefObject<HTMLDivElement | null>,
  onHide: () => void
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    observerMap.set(el, (isIntersecting) => {
      if (!isIntersecting) onHide()
    })
    getObserver().observe(el)

    return () => {
      observerMap.delete(el)
      getObserver().unobserve(el)
    }
  }, [ref, onHide])
}