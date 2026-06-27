import { ShieldCheck, AlertTriangle } from 'lucide-react'
import SectionFrame from './SectionFrame'

const cvssMetrics = [
  { label: 'Vector de ataque',       value: 'Red (N)'        },
  { label: 'Complejidad',            value: 'Baja (L)'       },
  { label: 'Privilegios requeridos', value: 'Ninguno (N)'    },
  { label: 'Interacción de usuario', value: 'Requerida (R)'  },
  { label: 'Confidencialidad',       value: 'Alta (H)'       },
  { label: 'Integridad',             value: 'Alta (H)'       },
  { label: 'Disponibilidad',         value: 'Ninguna (N)'    },
]

export default function Xss() {
  return (
    <SectionFrame
      eyebrow="03 XSS"
      title="Cross-Site Scripting (Reflected)"
      description="Evidencia del ataque, explicación técnica, puntaje CVSS 3.1, política de prevención y controles de mitigación."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        <div>
          <p className="mb-2 font-semibold text-white">Evidencia del ataque</p>
          <img
            src="/img/xss_galvic.png"
            alt="Evidencia de XSS Reflected en DVWA — popup alert ejecutado en el navegador"
            className="w-full rounded-2xl border border-white/10 shadow-lg"
          />
          <p className="mt-2 text-xs text-slate-500">
            Fig. 2 — XSS Reflected en DVWA (nivel Low). El script inyectado se refleja en la respuesta HTTP
            y el navegador lo ejecuta dentro de la sesión del afiliado de Isapre VidaPlena, permitiendo
            robo de cookies de sesión o redirección a sitios maliciosos.
          </p>
        </div>

        <div>
          <p className="mb-2 font-semibold text-white">Payload utilizado</p>
          <pre className="overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-cyan-200 text-xs">
            <code>{'<script>alert(\'XSS\')</script>'}</code>
          </pre>
        </div>

        <div>
          <p className="mb-2 font-semibold text-white">Explicación técnica</p>
          <p>
            El XSS Reflected ocurre cuando la aplicación toma un parámetro de la solicitud HTTP (en este
            caso, el campo <code className="font-mono text-cyan-300">name</code>) y lo inserta directamente
            en el HTML de la respuesta sin codificar ni sanitizar. El navegador interpreta la etiqueta
            <code className="font-mono text-cyan-300"> &lt;script&gt;</code> como código válido y lo ejecuta
            en el contexto de la sesión activa del usuario.
          </p>
          <p className="mt-3">
            En Isapre VidaPlena este vector es especialmente grave porque un atacante puede distribuir
            una URL maliciosa a afiliados mediante correo o SMS, capturar sus cookies de sesión con
            <code className="font-mono text-cyan-300"> document.cookie</code>, y suplantar su identidad para
            emitir bonos, consultar diagnósticos o modificar datos bancarios de reembolso.
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <p className="font-semibold text-white">Severidad CVSS 3.1</p>
            <span className="rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-bold text-orange-300 ring-1 ring-orange-400/30">
              ALTA — 7.4
            </span>
          </div>
          <p className="mb-3 text-xs text-slate-400">
            Vector: <code className="font-mono text-cyan-300">CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N</code>
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
            Justificación: requiere que el afiliado haga clic en el enlace malicioso (UI:R), pero el alcance
            es cambiado (S:C) porque el script opera en el navegador de la víctima fuera del control de la
            aplicación, comprometiendo confidencialidad e integridad de la sesión del afiliado.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <p className="font-semibold text-white">Política de prevención (3.1.4)</p>
          </div>
          <ul className="space-y-2 pl-2">
            {[
              'Codificar (escapar) toda salida HTML que incluya datos controlados por el usuario, convirtiendo caracteres especiales (<, >, &, ", \') en sus entidades HTML equivalentes.',
              'Implementar Content Security Policy (CSP) mediante cabecera HTTP que restrinja las fuentes desde las cuales el navegador puede cargar y ejecutar scripts.',
              'Utilizar frameworks de renderizado (React, Angular, Vue) que apliquen escape automático de salida en lugar de insertar HTML directamente mediante innerHTML.',
              'Establecer la bandera HttpOnly en las cookies de sesión para impedir su acceso desde JavaScript, limitando el impacto del robo de sesión.',
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
              'Desplegar WAF con reglas específicas para detección de patrones XSS (etiquetas de script, event handlers, javascript:) en parámetros GET y POST.',
              'Configurar cabecera X-XSS-Protection: 1; mode=block y Strict-Transport-Security (HSTS) en todos los endpoints del portal.',
              'Implementar validación de entrada en el servidor rechazando cualquier parámetro que contenga etiquetas HTML o JavaScript antes de procesarlo.',
              'Realizar pruebas de seguridad automatizadas (DAST) en el pipeline CI/CD usando herramientas como OWASP ZAP para detectar nuevas instancias XSS antes del despliegue.',
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