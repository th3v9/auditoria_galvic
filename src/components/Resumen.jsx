import { Building2, Globe, Users, ShieldAlert } from 'lucide-react'
import SectionFrame from './SectionFrame'

export default function Resumen() {
  return (
    <SectionFrame
      eyebrow="01 Resumen"
      title="Empresa auditada, objetivo y alcance"
      description="Contexto general de Isapre VidaPlena y del proceso de auditoría realizado."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        {/* Tarjeta empresa */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <div>
              <p className="font-semibold text-white">Empresa asignada</p>
              <p className="mt-1 text-slate-400">Isapre VidaPlena — Institución de Salud Previsional privada que gestiona planes de salud para afiliados y sus cargas familiares a nivel nacional.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <Globe className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <div>
              <p className="font-semibold text-white">Portal de clientes</p>
              <p className="mt-1 text-slate-400">Plataforma web donde los afiliados consultan cobertura, emiten bonos, revisan historial de prestaciones y gestionan su grupo familiar.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <div>
              <p className="font-semibold text-white">Datos en juego</p>
              <p className="mt-1 text-slate-400">RUT, diagnósticos médicos, historial de prestaciones, datos bancarios para reembolsos y credenciales de acceso de los afiliados.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <div>
              <p className="font-semibold text-white">Entorno de prueba</p>
              <p className="mt-1 text-slate-400">Damn Vulnerable Web Application (DVWA) en nivel de seguridad Low, utilizada como sustituto controlado y autorizado del portal real.</p>
            </div>
          </div>
        </div>

        {/* Objetivo */}
        <div>
          <p className="mb-2 font-semibold text-white">Objetivo de la auditoría</p>
          <p>
            Identificar y demostrar vulnerabilidades críticas presentes en el portal web de Isapre VidaPlena,
            medir su severidad mediante el estándar CVSS 3.1, y proponer medidas concretas de prevención,
            mitigación y recuperación adaptadas al rubro de la salud previsional.
          </p>
        </div>

        {/* Ataques demostrados */}
        <div>
          <p className="mb-3 font-semibold text-white">Vulnerabilidades demostradas</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { num: '01', label: 'SQL Injection', detail: "Exposición total de la base de datos de afiliados" },
              { num: '02', label: 'XSS Reflected', detail: 'Ejecución de código en el navegador de la víctima' },
              { num: '03', label: 'Command Injection', detail: 'Toma de control del servidor de la aplicación' },
            ].map(({ num, label, detail }) => (
              <div key={num} className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                <p className="text-xs uppercase tracking-widest text-cyan-300/60">{num}</p>
                <p className="mt-1 font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marco legal */}
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
          <p className="font-semibold text-amber-200">Marco ético-legal</p>
          <p className="mt-1 text-amber-100/80">
            Todos los ataques se realizan exclusivamente sobre DVWA, entorno controlado y autorizado para
            esta actividad académica. Atacar sistemas ajenos sin autorización constituye delito bajo la
            Ley 21.459 (delitos informáticos, Chile). El fin de esta práctica es estrictamente defensivo.
          </p>
        </div>

      </div>
    </SectionFrame>
  )
}
