export type Gear = {
  name: string
  category: string
  image: string
  description: string
}

export function GearCard({ gear }: { gear: Gear }) {
  return (
    <article className="border-edge bg-surface-2 overflow-hidden rounded-lg border">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={gear.image} alt={gear.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <p className="text-accent font-mono text-xs">{gear.category}</p>
        <h3 className="mt-1 font-semibold">{gear.name}</h3>
        <p className="text-content-muted mt-2 text-sm leading-relaxed">{gear.description}</p>
      </div>
    </article>
  )
}
