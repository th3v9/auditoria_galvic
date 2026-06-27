import { MessagesSquare, CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import SectionFrame from './SectionFrame'

const bitacora = [
  {
    seccion: '02 SQL Injection',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Crea un componente React llamado Sqli.jsx para documentar una inyección SQL encontrada en el portal de afiliados de Isapre VidaPlena. Debe incluir: el payload \'OR\'1\'=\'1, explicación técnica de por qué concatenar entrada del usuario en una consulta SQL lo hace vulnerable, tabla CVSS 3.1 con el vector completo, y defensa basada en consultas parametrizadas. Usa Tailwind CSS y Lucide React. Usa la identidad visual ya existente (slate-950, cyan-300).',
    acepto: 'Estructura del componente, tabla CVSS con vector completo, explicación técnica del mecanismo de concatenación insegura.',
    corrigio: 'Ajusté el puntaje CVSS de 9.6 a 9.8 verificando en la calculadora oficial de FIRST.org. Cambié la redacción genérica del impacto por una específica al rubro: mención de Ley 19.628, datos bancarios de reembolso y diagnósticos médicos.',
  },
  {
    seccion: '03 XSS Reflected',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Documenta la vulnerabilidad XSS Reflected para el portal de Isapre VidaPlena en un componente Xss.jsx. El payload es <script>alert(\'XSS\')</script>. Explica por qué el navegador ejecuta el script, el impacto específico en una isapre (robo de sesión de afiliado para emitir bonos o ver diagnósticos), tabla CVSS 3.1 y política de prevención con CSP y HttpOnly. Mantén la misma identidad visual del proyecto.',
    acepto: 'Explicación del mecanismo de Reflected XSS, tabla CVSS con justificación del alcance cambiado (S:C), y controles CSP e HttpOnly.',
    corrigio: 'Reescribí el impacto para hacerlo específico al negocio de una isapre: agregué el vector de phishing por correo a afiliados y la acción de emitir bonos como consecuencia del robo de sesión. Agregué referencia a OWASP A05:2021 (Security Misconfiguration) para la política CSP.',
  },
  {
    seccion: '04 Command Injection',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Crea Comandos.jsx para el portal de Isapre VidaPlena documentando Command Injection. Payload: 127.0.0.1; cat /etc/passwd. Explica el separador ";" en Bash, por qué el servidor ejecuta ambos comandos con los privilegios del proceso web, impacto en una isapre (ransomware, eliminación de registros médicos, Ley 19.628) y defensa: eliminar exec/system, lista blanca de IPs, chroot/Docker. CVSS 3.1 completo. Referencia OWASP y CIS.',
    acepto: 'Explicación del separador Bash, el mecanismo de ejecución con privilegios del proceso web, tabla CVSS 9.8 con justificación.',
    corrigio: 'Agregué la referencia específica al CIS Control 4 (mínimo privilegio) que el modelo no incluyó inicialmente. Reemplazé "puede causar daños" por consecuencias concretas para Isapre VidaPlena: cifrado de registros médicos con ransomware y responsabilidad bajo Ley 20.584.',
  },
  {
    seccion: '05 Activos',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Genera el componente Activos.jsx con al menos 5 activos de información del portal de Isapre VidaPlena. Vincula cada activo al rubro de salud previsional en Chile (Ley 19.628, Ley 20.584, Superintendencia de Salud). Para cada activo indica: ID, nombre, tipo, descripción, nivel de criticidad y qué vulnerabilidades de las tres demostradas (SQLi, XSS, Command Injection) lo ponen en riesgo. Incluye tabla resumen al final.',
    acepto: 'Estructura de 5 activos con tarjetas, clasificación por criticidad y tabla resumen. La vinculación a las leyes chilenas específicas del rubro.',
    corrigio: 'Añadí el activo "Registros médicos y prestaciones" que el modelo omitió. Corregí el impacto del activo A3 (portal web) que inicialmente solo mencionaba indisponibilidad, agregando la distribución de payloads a otros afiliados como vector secundario.',
  },
  {
    seccion: '06 Matriz',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Crea el componente Matriz.jsx con un mapa de calor visual 5x5 de probabilidad × impacto. Posiciona SQL Injection en (prob: Alta, impacto: Muy Alto), Command Injection en (prob: Media, impacto: Muy Alto) y XSS en (prob: Alta, impacto: Alto). Usa colores Tailwind: rojo=crítico, naranja=alto, amarillo=medio, verde=bajo. Justifica la probabilidad y el impacto en el contexto de una isapre. Agrega sección de priorización vinculada al CVSS.',
    acepto: 'Grilla 5x5 con celdas coloreadas, posicionamiento de las 3 vulnerabilidades como puntos en la matriz, tabla resumen con nivel de riesgo y sección de priorización.',
    corrigio: 'El modelo generó inicialmente una grilla con colores invertidos (rojo abajo-izquierda). Corregí la lógica para que el riesgo sea mayor hacia arriba-derecha (mayor impacto + mayor probabilidad). También agregué la justificación específica por rubro que el modelo dejó genérica.',
  },
  {
    seccion: '07 Controles',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Genera Controles.jsx con controles de prevención y mitigación separados por cada vulnerabilidad (SQLi, XSS, Command Injection). Para prevención usa referencias de OWASP A03:2021 y CIS Controls. Para mitigación usa NIST SP 800-53 y OWASP. Los controles deben ser específicos, no genéricos: nombrar la técnica concreta (Prepared Statements, CSP, chroot, WAF con CRS). Identidad visual del proyecto.',
    acepto: 'Controles separados por vulnerabilidad, badges de marco de referencia por control, sección de resumen de marcos utilizados.',
    corrigio: 'Reescribí varios controles que usaban lenguaje vago ("mejorar la validación", "usar herramientas de seguridad"). Los reemplacé con acciones concretas: nombre de función PHP a deshabilitar (disable_functions en php.ini), nombre de herramienta (OWASP ZAP), y referencia exacta al estándar (NIST SP 800-53 SI-10).',
  },
  {
    seccion: '08 Recuperación',
    herramienta: 'Claude (claude.ai)',
    prompt: 'Crea Recuperacion.jsx con plan DR para Isapre VidaPlena tras un incidente de seguridad web. Debe incluir: RTO (4 horas, justificado por necesidad de emitir bonos de urgencia) y RPO (24 horas), mejoras tecnológicas (WAF, segmentación de red en DMZ, SIEM, cifrado AES-256), plan DR en 5 fases con tiempos (Detección 0-15 min, Contención 15-60 min, Erradicación 1-4 h, Recuperación 4-8 h, Notificación < 72 h según Circular IF/N°269), política de respaldos. Referencias NIST SP 800-34, NIST SP 800-53, CIS Controls.',
    acepto: 'Estructura de 5 fases con tiempos, tarjetas de RTO/RPO, mejoras tecnológicas con badges de marco y política de respaldos en 3 columnas.',
    corrigio: 'Agregué la referencia específica a la Circular IF/N°269 de la Superintendencia de Salud en la fase de Notificación, que el modelo omitió. Ajusté el RPO de 6 horas a 24 horas porque los respaldos incrementales diarios son más realistas para el tamaño de la organización.',
  },
]

export default function Prompts() {
  return (
    <SectionFrame
      eyebrow="09 Bitácora de IA"
      title="Registro de uso de Inteligencia Artificial"
      description="Prompts utilizados, herramienta, sección correspondiente, qué se aceptó, qué se corrigió y reflexión final."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        {/* Resumen */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Herramienta principal', value: 'Claude (claude.ai)', color: 'text-cyan-300' },
            { label: 'Secciones asistidas',   value: '7 de 9',            color: 'text-purple-300' },
            { label: 'Correcciones realizadas', value: '7 iteraciones',   color: 'text-amber-300' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-center">
              <p className={`text-lg font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Bitácora */}
        <div className="space-y-4">
          {bitacora.map(({ seccion, herramienta, prompt, acepto, corrigio }) => (
            <div key={seccion} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <MessagesSquare className="h-4 w-4 text-cyan-300" />
                  <p className="font-semibold text-white">{seccion}</p>
                </div>
                <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300 ring-1 ring-cyan-400/20">
                  {herramienta}
                </span>
              </div>

              {/* Prompt */}
              <div>
                <p className="mb-1 text-xs font-medium text-slate-400 uppercase tracking-wider">Prompt utilizado</p>
                <div className="rounded-xl bg-slate-950/60 p-3 text-xs text-slate-300 italic border border-white/5">
                  "{prompt}"
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Aceptado */}
                <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <p className="text-xs font-medium text-emerald-300">Qué acepté</p>
                  </div>
                  <p className="text-xs text-slate-300">{acepto}</p>
                </div>

                {/* Corregido */}
                <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-3">
                  <div className="mb-1 flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5 text-amber-400" />
                    <p className="text-xs font-medium text-amber-300">Qué corregí</p>
                  </div>
                  <p className="text-xs text-slate-300">{corrigio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reflexión final */}
        <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-300" />
            <p className="font-semibold text-white">Reflexión final sobre el uso de IA</p>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              El uso de Claude como asistente aceleró significativamente la estructuración del informe y la
              generación del código React, especialmente para componentes repetitivos como las tablas CVSS y
              las secciones de controles. Sin embargo, la IA no reemplazó el análisis; lo que aportó fue
              un borrador estructurado que requirió validación y ajuste en cada iteración.
            </p>
            <p>
              El valor real del proceso estuvo en las correcciones: reconocer que el puntaje CVSS inicial
              era incorrecto obligó a usar la calculadora oficial de FIRST.org y entender los vectores.
              Identificar que los controles eran genéricos llevó a investigar los marcos OWASP, CIS y NIST
              para obtener referencias concretas. La IA bien dirigida actuó como punto de partida, no como
              respuesta final.
            </p>
            <p>
              La calidad de los prompts fue determinante: un prompt que nombraba la empresa, la vulnerabilidad
              concreta, el payload real y el marco legal aplicable (Ley 19.628, Circular IF/N°269) produjo
              resultados significativamente más útiles que uno genérico. Esto refuerza que el valor del
              auditor está en saber qué pedir, no solo en saber ejecutar.
            </p>
          </div>
        </div>

      </div>
    </SectionFrame>
  )
}
