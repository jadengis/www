import { Eye } from 'lucide-react'
import { useState } from 'react'
import { cn } from '~/lib/cn'
import { decodeEmail } from '~/lib/email'

// Roughly the real address's width, with ascenders so the blur reads as text.
// It is deliberately not the address (see ~/lib/email).
const DECOY = 'hello@there.co'

const type = 'font-display text-4xl leading-tight sm:text-5xl'

/**
 * The contact address, shown blurred until clicked. The click decodes the
 * real address and brings it into focus as a mailto: link.
 */
export function RevealEmail({ className }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null)

  return (
    <p aria-live="polite" className={className}>
      {email ? (
        <a
          href={`mailto:${email}`}
          className={cn(type, 'animate-unblur hover:text-accent break-all transition-colors')}
        >
          {email}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setEmail(decodeEmail())}
          className="group relative inline-grid cursor-pointer place-items-center text-left"
        >
          <span
            aria-hidden="true"
            className={cn(
              type,
              'text-content/75 blur-[10px] transition-[filter] duration-300 select-none group-hover:blur-[8px] motion-reduce:transition-none',
            )}
          >
            {DECOY}
          </span>
          <span className="border-edge bg-surface/80 text-content group-hover:border-content absolute inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium backdrop-blur-sm transition-colors">
            <Eye className="h-4 w-4" aria-hidden="true" />
            Reveal email
          </span>
        </button>
      )}
    </p>
  )
}
