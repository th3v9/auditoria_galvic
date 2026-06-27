import {
  Shield,
  BookOpen,
  FileText,
  Database,
  Bug,
  Terminal,
  Layers3,
  ClipboardList,
  RefreshCcw,
  MessagesSquare,
} from 'lucide-react'

import Resumen from './components/Resumen'
import Sqli from './components/Sqli'
import Xss from './components/Xss'
import Comandos from './components/Comandos'
import Activos from './components/Activos'
import Matriz from './components/Matriz'
import Controles from './components/Controles'
import Recuperacion from './components/Recuperacion'
import Prompts from './components/Prompts'

const sections = [
  { id: 'resumen', label: 'Resumen', icon: BookOpen, Component: Resumen },
  { id: 'sqli', label: 'SQLi', icon: Database, Component: Sqli },
  { id: 'xss', label: 'XSS', icon: Bug, Component: Xss },
  { id: 'comandos', label: 'Comandos', icon: Terminal, Component: Comandos },
  { id: 'activos', label: 'Activos', icon: Layers3, Component: Activos },
  { id: 'matriz', label: 'Matriz', icon: ClipboardList, Component: Matriz },
  { id: 'controles', label: 'Controles', icon: FileText, Component: Controles },
  { id: 'recuperacion', label: 'Recuperación', icon: RefreshCcw, Component: Recuperacion },
  { id: 'prompts', label: 'Prompts', icon: MessagesSquare, Component: Prompts },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                Evaluación Sumativa N°3
              </p>
              <h1 className="text-2xl font-semibold text-white">
                Auditoría de Seguridad - Isapre VidaPlena
              </h1>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            React + Vite | Preparado para Tailwind, Lucide y Vercel
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-6 h-fit rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
            <FileText className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Contenido</p>
              <p className="text-sm font-medium text-white">Secciones del informe</p>
            </div>
          </div>

          <nav className="grid gap-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
              >
                <Icon className="h-4 w-4 text-cyan-300" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <section className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-8 shadow-2xl shadow-cyan-950/20">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
                Isapre VidaPlena
              </p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Base del informe de auditoría de seguridad, lista para completar por secciones.
              </h2>
              <p className="text-base leading-7 text-slate-300">
                Esta aplicación está organizada para incorporar el contenido técnico, las evidencias,
                la matriz de riesgo y la bitácora de IA de la evaluación 3.
              </p>
            </div>
          </section>

          <div className="grid gap-6">
            {sections.map(({ id, Component }) => (
              <section key={id} id={id} className="scroll-mt-6">
                <Component />
              </section>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-5 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>Estudiante: Vicente Galassi</span>
          <span>Docente: Rubén Schnettler - INACAP Valparaíso</span>
        </div>
      </footer>
    </div>
  )
}

export default App
