import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ActiveSection = { active: string | null; setActive: (id: string | null) => void }

const Context = createContext<ActiveSection>({ active: null, setActive: () => {} })

/** Shares which home-page section is in view, so the header can highlight it. */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null)
  return <Context.Provider value={{ active, setActive }}>{children}</Context.Provider>
}

export function useActiveSection() {
  return useContext(Context).active
}

/**
 * Watches the elements with these ids and reports the one crossing a band
 * just above the middle of the viewport. Clears on unmount.
 */
export function useTrackSections(ids: readonly string[]) {
  const { setActive } = useContext(Context)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      setActive(null)
    }
  }, [ids, setActive])
}
