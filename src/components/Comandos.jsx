import { ShieldCheck, AlertTriangle } from 'lucide-react'
import SectionFrame from './SectionFrame'

const cvssMetrics = [
  { label: 'Vector de ataque',       value: 'Red (N)'     },
  { label: 'Complejidad',            value: 'Baja (L)'    },
  { label: 'Privilegios requeridos', value: 'Ninguno (N)' },
  { label: 'Interacción de usuario', value: 'Ninguna (N)' },
  { label: 'Confidencialidad',       value: 'Alta (H)'    },
  { label: 'Integridad',             value: 'Alta (H)'    },
  { label: 'Disponibilidad',         value: 'Alta (H)'    },
]

export default function Comandos() {
  return (
    <SectionFrame
      eyebrow="04 Command Injection"
      title="Inyección de comandos"
      description="Evidencia del ataque, explicación técnica, puntaje CVSS 3.1, política de prevención y controles de mitigación."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        <div>
          <p className="mb-2 font-semibold text-white">Evidencia del ataque</p>
          <img
            src="/img/comandos_galvic.png"
            alt="Evidencia de inyección de comandos en DVWA — contenido de /etc/passwd expuesto"
            className="w-full rounded-2xl border border-white/10 shadow-lg"
          />
          <p className="mt-2 text-xs text-slate-500">
            Fig. 3 — Command Injection en DVWA (nivel Low). El separador <code className="font-mono text-cyan-300">;</code> encadena
            un segundo comando al ping legítimo, exponiendo el archivo de usuarios del sistema operativo del
            servidor de Isapre VidaPlena.
          </p>
        </div>

        <div>
          <p className="mb-2 font-semibold text-white">Payload utilizado</p>
          <pre className="overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-cyan-200 text-xs">
            <code>{'127.0.0.1; cat /etc/passwd'}</code>
          </pre>
        </div>

        <div>
          <p className="mb-2 font-semibold text-white">Explicación técnica</p>
          <p>
            La vulnerabilidad ocurre cuando la aplicación construye un comando de shell usando directamente
            el valor ingresado por el usuario. La función vulnerable ejecuta algo equivalente a:
          </p>
          <pre className="my-3 overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-slate-300 text-xs">
            <code>{'system("ping -c 4 " + $INPUT)'}</code>
          </pre>
          <p>
            El carácter <code className="font-mono text-cyan-300">;</code> es un separador de comandos en
            Bash que le indica al shell que ejecute lo que viene después como un comando independiente.
            Al agregar <code className="font-mono text-cyan-300">cat /etc/passwd</code>, el servidor ejecuta
            ambos comandos con los mismos privilegios del proceso de la aplicación web.
          </p>
          <p className="mt-3">
            En Isapre VidaPlena, esta vulnerabilidad permitiría al atacante leer archivos de configuración
            con credenciales de base de datos, instalar malware en el servidor, eliminar registros médicos
            o cifrar datos para un ataque de ransomware, con consecuencias regulatorias bajo la Ley 19.628
            de protección de datos personales.
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
            Justificación: no requiere autenticación (PR:N) ni interacción del usuario (UI:N). Un atacante
            remoto puede comprometer completamente el servidor, afectando la confidencialidad de datos de
            salud, la integridad de los registros y la disponibilidad del servicio.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <p className="font-semibold text-white">Política de prevención (3.1.4)</p>
          </div>
          <ul className="space-y-2 pl-2">
            {[
              'Eliminar completamente el uso de funciones que ejecutan comandos del sistema (exec, system, popen) con datos provenientes del usuario. Si la funcionalidad requiere ping, implementarla mediante librerías nativas del lenguaje.',
              'Aplicar una lista blanca estricta de entradas: solo permitir direcciones IP con formato válido (regex) y rechazar cualquier carácter que no sea dígito o punto.',
              'Ejecutar el proceso de la aplicación web con una cuenta de sistema operativo sin privilegios (sin acceso de escritura fuera de directorios específicos).',
              'Deshabilitar funciones peligrosas de PHP como exec, shell_exec, passthru y system en el archivo php.ini mediante disable_functions.',
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
            <p className="font-semibold text-white">Control de mitigación — OWASP A03:2021 / CIS Control 4 (3.1.5)</p>
          </div>
          <ul className="space-y-2 pl-2">
            {[
              'Implementar principio de mínimo privilegio (CIS Control 4): el usuario del servidor web no debe tener acceso a archivos de sistema como /etc/passwd, bases de datos de credenciales ni directorios de configuración.',
              'Configurar chroot jail o contenedores (Docker) para aislar el proceso de la aplicación y limitar el sistema de archivos accesible, reduciendo el radio de daño ante una explotación exitosa.',
              'Activar auditoría de llamadas al sistema (auditd en Linux) para registrar ejecuciones de comandos del proceso web y generar alertas ante comportamiento anómalo.',
              'Integrar análisis de comportamiento en tiempo real (EDR/SIEM) que detecte patrones de exfiltración de archivos de sistema desde procesos de servidor web.',
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