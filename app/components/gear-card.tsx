export type Gear = {
  name: string
  category: string
  image: string
  description: string
}

export function GearCard({ gear }: { gear: Gear }) {
  return (
    <article className="group border-edge bg-surface-2 hover:border-accent overflow-hidden rounded-lg border transition-colors">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={gear.image}
          alt={gear.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase">{gear.category}</p>
        <h3 className="mt-1 font-semibold">{gear.name}</h3>
        <p className="text-content-muted mt-2 text-sm leading-relaxed">{gear.description}</p>
      </div>
    </article>
  )
}
