import { ShieldCheck, AlertTriangle } from 'lucide-react'
import SectionFrame from './SectionFrame'

const cvssMetrics = [
  { label: 'Vector de ataque',       value: 'Red (N)'        },
  { label: 'Complejidad',            value: 'Baja (L)'       },
  { label: 'Privilegios requeridos', value: 'Ninguno (N)'    },
  { label: 'Interacción de usuario', value: 'Ninguna (N)'    },
  { label: 'Confidencialidad',       value: 'Alta (H)'       },
  { label: 'Integridad',             value: 'Alta (H)'       },
  { label: 'Disponibilidad',         value: 'Alta (H)'       },
]

export default function Sqli() {
  return (
    <SectionFrame
      eyebrow="02 SQL Injection"
      title="Inyección SQL"
      description="Evidencia del ataque, explicación técnica, puntaje CVSS 3.1, política de prevención y controles de mitigación."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        <div>
          <p className="mb-2 font-semibold text-white">Evidencia del ataque</p>
          <img
            src="/img/sqli_galvic.png"
            alt="Evidencia de inyección SQL en DVWA — payload OR 1=1 y resultado con listado de usuarios"
            className="w-full rounded-2xl border border-white/10 shadow-lg"
          />
          <p className="mt-2 text-xs text-slate-500">
            Fig. 1 — Inyección SQL en DVWA (nivel Low). El payload <code className="font-mono text-cyan-300">{'\'OR\'1\'=\'1'}</code> devuelve
            todos los registros de usuarios de la base de datos de Isapre VidaPlena, exponiendo RUT, nombre y contraseñas hasheadas.
          </p>
        </div>

        <div>
          <p className="mb-2 font-semibold text-white">Payload utilizado</p>
          <pre className="overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-cyan-200 text-xs">
            <code>{`' OR '1'='1`}</code>
          </pre>
        </div>

        <div>
          <p className="mb-2 font-semibold text-white">Explicación técnica</p>
          <p>
            La vulnerabilidad existe porque la aplicación construye la consulta SQL concatenando directamente
            el valor ingresado por el usuario sin sanitización ni uso de consultas preparadas. La consulta
            original tiene la forma:
          </p>
          <pre className="my-3 overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-slate-300 text-xs">
            <code>{`SELECT * FROM users WHERE id = '$INPUT'`}</code>
          </pre>
          <p>
            Al inyectar <code className="font-mono text-cyan-300">{'\'OR\'1\'=\'1'}</code>, la condición
            <code className="font-mono text-cyan-300"> WHERE</code> siempre se evalúa como verdadera,
            retornando todos los registros. En el contexto de Isapre VidaPlena esto implica la exposición
            masiva de datos de salud de los afiliados, información protegida por la Ley 20.584 y datos
            bancarios vinculados a reembolsos.
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <p className="font-semibold text-white">Severidad CVSS 3.1</p>
            <span className="rounded-full bg-red-500/20 px-3 py-0.5 text-xs font-bold text-red-300 ring-1 ring-red-400/30">
              CRÍTICA — 9.8
            </span>
          </div>
          <p className="mb-3 text-xs text-slate-400">
            Vector: <code className="font-mono text-cyan-300">CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</code>
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-4 py-2">Métrica</th>
                  <th className="px-4 py-2">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-slate-950/70">
                {cvssMetrics.map(({ label, value }) => (
                  <tr key={label}>
                    <td className="px-4 py-2 text-slate-300">{label}</td>
                    <td className="px-4 py-2 font-medium text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Justificación: el ataque es remoto (AV:N), no requiere configuración especial (AC:L) ni
            autenticación previa (PR:N), y compromete completamente la confidencialidad, integridad y
            disponibilidad de los datos de salud de los afiliados.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <p className="font-semibold text-white">Política de prevención (3.1.4)</p>
          </div>
          <ul className="space-y-2 pl-2">
            {[
              'Implementar consultas parametrizadas (Prepared Statements) en toda interacción con la base de datos, eliminando la posibilidad de concatenación de código SQL.',
              'Utilizar ORM (Object-Relational Mapping) como capa de abstracción que impida la construcción dinámica de consultas con datos del usuario.',
              'Aplicar el principio de mínimo privilegio: la cuenta de base de datos usada por la aplicación solo debe tener permisos de SELECT, INSERT y UPDATE sobre las tablas estrictamente necesarias.',
              'Validar y rechazar entradas que contengan caracteres especiales SQL (comillas simples, dobles, punto y coma, guiones dobles) antes de procesarlas.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <p className="font-semibold text-white">Control de mitigación — OWASP A03:2021 (3.1.5)</p>
          </div>
          <ul className="space-y-2 pl-2">
            {[
              'Desplegar un Web Application Firewall (WAF) configurado con reglas OWASP Core Rule Set (CRS) para detectar y bloquear patrones de inyección SQL en tiempo real.',
              'Activar logging detallado de consultas fallidas y respuestas anómalas del motor de base de datos, enviando alertas al equipo de seguridad ante patrones sospechosos.',
              'Implementar rate limiting en los endpoints de consulta para dificultar ataques de fuerza bruta y extracción masiva de datos (OWASP API4:2023).',
              'Ejecutar análisis de código estático (SAST) periódicos sobre el repositorio para detectar nuevas instancias de concatenación insegura antes de cada despliegue.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </SectionFrame>
  )
}