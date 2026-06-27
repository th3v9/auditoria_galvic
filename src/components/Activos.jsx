import { Database, Key, Globe, Server, FileHeart, AlertTriangle } from 'lucide-react'
import SectionFrame from './SectionFrame'

const activos = [
  {
    icon: Database,
    id: 'A1',
    nombre: 'Base de datos de afiliados',
    tipo: 'Información',
    descripcion: 'Registros de afiliados y cargas: RUT, diagnósticos, historial de prestaciones, planes contratados y datos bancarios para reembolsos.',
    clasificacion: 'Crítico',
    vulns: ['SQL Injection'],
    impacto: 'Filtración masiva de datos de salud protegidos por Ley 19.628 y Ley 20.584. Multas regulatorias y pérdida de confianza.',
  },
  {
    icon: Key,
    id: 'A2',
    nombre: 'Credenciales y sesiones',
    tipo: 'Lógico',
    descripcion: 'Usuarios, contraseñas hasheadas y tokens de sesión que controlan el acceso al portal de clientes y al panel administrativo.',
    clasificacion: 'Crítico',
    vulns: ['SQL Injection', 'XSS Reflected'],
    impacto: 'Suplantación de identidad de afiliados; acceso no autorizado para emitir bonos o modificar datos bancarios.',
  },
  {
    icon: Globe,
    id: 'A3',
    nombre: 'Portal web de clientes',
    tipo: 'Software',
    descripcion: 'Aplicación web mediante la cual los afiliados consultan cobertura, emiten bonos, revisan historial y gestionan su grupo familiar.',
    clasificacion: 'Alto',
    vulns: ['XSS Reflected', 'SQL Injection'],
    impacto: 'Interrupción del servicio; distribución de payloads maliciosos a otros afiliados mediante URLs adulteradas.',
  },
  {
    icon: Server,
    id: 'A4',
    nombre: 'Servidor de aplicación',
    tipo: 'Hardware/Software',
    descripcion: 'Servidor que ejecuta el backend del portal, con acceso al sistema de archivos, a los servicios de red internos y a la base de datos.',
    clasificacion: 'Crítico',
    vulns: ['Command Injection'],
    impacto: 'Compromiso total del servidor: instalación de malware, ransomware, exfiltración de archivos de configuración y llaves de API.',
  },
  {
    icon: FileHeart,
    id: 'A5',
    nombre: 'Registros médicos y prestaciones',
    tipo: 'Información',
    descripcion: 'Historial clínico digitalizado, licencias médicas, cirugías y tratamientos de cada afiliado y sus cargas.',
    clasificacion: 'Crítico',
    vulns: ['SQL Injection', 'Command Injection'],
    impacto: 'Violación de privacidad médica con consecuencias legales; posible extorsión o venta de datos en mercados ilícitos.',
  },
]

const nivel = {
  'Crítico': 'bg-red-500/20 text-red-300 ring-red-400/30',
  'Alto':    'bg-orange-500/20 text-orange-300 ring-orange-400/30',
  'Medio':   'bg-yellow-500/20 text-yellow-300 ring-yellow-400/30',
}

const vulnColor = {
  'SQL Injection':    'bg-red-400/10 text-red-300 ring-1 ring-red-400/30',
  'XSS Reflected':   'bg-orange-400/10 text-orange-300 ring-1 ring-orange-400/30',
  'Command Injection':'bg-purple-400/10 text-purple-300 ring-1 ring-purple-400/30',
}

export default function Activos() {
  return (
    <SectionFrame
      eyebrow="05 Activos"
      title="Activos de información"
      description="Identificación y clasificación de los activos del portal de Isapre VidaPlena, vinculados al rubro de salud previsional y a las vulnerabilidades que los ponen en riesgo."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        {/* Intro rubro */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p>
            Isapre VidaPlena opera en el sector de salud previsional privada, un rubro de <span className="font-semibold text-white">alta regulación</span> en Chile.
            Sus activos de información están sujetos a la <span className="font-semibold text-white">Ley 19.628</span> (protección de datos personales),
            la <span className="font-semibold text-white">Ley 20.584</span> (derechos de los pacientes y confidencialidad médica) y las circulares de la
            <span className="font-semibold text-white"> Superintendencia de Salud</span>. Una brecha implica consecuencias legales, multas y pérdida de la
            habilitación como isapre.
          </p>
        </div>

        {/* Tabla activos */}
        <div className="space-y-4">
          {activos.map(({ icon: Icon, id, nombre, tipo, descripcion, clasificacion, vulns, impacto }) => (
            <div key={id} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-500">{id}</span>
                      <p className="font-semibold text-white">{nombre}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${nivel[clasificacion]}`}>
                        {clasificacion}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{tipo}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">{descripcion}</p>

              {/* Vulnerabilidades asociadas */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Expuesto por:</span>
                {vulns.map(v => (
                  <span key={v} className={`rounded-full px-2 py-0.5 text-xs font-medium ${vulnColor[v]}`}>{v}</span>
                ))}
              </div>

              {/* Impacto */}
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-white/5 bg-slate-950/40 p-3">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <p className="text-xs text-slate-400">{impacto}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Activo</th>
                <th className="px-4 py-2">Clasificación</th>
                <th className="px-4 py-2">Vulnerabilidades</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/70">
              {activos.map(({ id, nombre, clasificacion, vulns }) => (
                <tr key={id}>
                  <td className="px-4 py-2 font-mono text-slate-400">{id}</td>
                  <td className="px-4 py-2 text-white">{nombre}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${nivel[clasificacion]}`}>
                      {clasificacion}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {vulns.map(v => (
                        <span key={v} className={`rounded-full px-2 py-0.5 text-xs font-medium ${vulnColor[v]}`}>{v}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </SectionFrame>
  )
}
