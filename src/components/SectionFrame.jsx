export default function SectionFrame({ eyebrow, title, description, children }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur">
      <div className="mb-4">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{eyebrow}</p>
        ) : null}
        <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
        {children}
      </div>
    </article>
  )
}
