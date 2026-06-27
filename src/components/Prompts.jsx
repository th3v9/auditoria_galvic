import { MessagesSquare, CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import SectionFrame from './SectionFrame'

const bitacora = [
  {
    seccion: '02 SQL Injection',
    herramienta: 'Claude (claude.ai)',
    prompt: 'necesito documentar el ataque sql injection que hice en dvwa para la isapre vidaplena, use el payload \' OR \'1\'=\'1 y me salio una lista de usuarios, como hago el componente sqli.jsx con eso? necesita tener la explicacion de por que funciona y una tabla con el puntaje cvss',
    acepto: 'La estructura del componente con la tabla CVSS y la explicación del mecanismo de concatenación insegura.',
    corrigio: 'El puntaje CVSS me lo dio 9.6 pero al verificarlo en la calculadora de FIRST.org era 9.8. También cambié el texto del impacto porque era muy genérico, lo hice específico para una isapre mencionando los datos de salud y la Ley 20.584.',
  },
  {
    seccion: '03 XSS Reflected',
    herramienta: 'Claude (claude.ai)',
    prompt: 'ahora necesito lo mismo pero para xss reflected, el payload fue <script>alert(\'XSS\')</script> y se ejecuto un popup en dvwa, hazme el componente xss.jsx con la explicacion tecnica y el cvss, recuerda que es para el portal de isapre vidaplena',
    acepto: 'La explicación del mecanismo XSS Reflected y la tabla CVSS con el vector de alcance cambiado (S:C).',
    corrigio: 'Le agregué el contexto específico de la isapre: que un atacante puede mandar una URL maliciosa por correo a los afiliados para robarles la sesión y emitir bonos. Eso no lo había mencionado en el prompt y la IA lo dejó genérico.',
  },
  {
    seccion: '04 Command Injection',
    herramienta: 'Claude (claude.ai)',
    prompt: 'me falta el de command injection, use 127.0.0.1; cat /etc/passwd y me mostro todos los usuarios del servidor, necesito el componente comandos.jsx igual que los anteriores con cvss y defensa, para isapre vidaplena',
    acepto: 'La explicación del separador ";" en bash y cómo ejecuta dos comandos con los mismos privilegios del servidor.',
    corrigio: 'Agregué la referencia a CIS Control 4 que la IA no incluyó. También cambié el impacto para mencionar ransomware y eliminación de registros médicos, que son consecuencias reales para una isapre.',
  },
  {
    seccion: '05 Activos',
    herramienta: 'Claude (claude.ai)',
    prompt: 'necesito identificar los activos de informacion del portal de isapre vidaplena, al menos 4 o 5, y relacionarlos con las vulnerabilidades que encontre, tambien necesito vincularlo con las leyes chilenas de salud y datos personales',
    acepto: 'La estructura de 5 activos con tarjetas, niveles de criticidad y tabla resumen.',
    corrigio: 'La IA olvidó incluir los registros médicos como activo separado, solo tenía la base de datos general. Lo agregué porque en una isapre el historial clínico es el dato más sensible. También corregí el impacto del portal web que solo decía "indisponibilidad".',
  },
  {
    seccion: '06 Matriz',
    herramienta: 'Claude (claude.ai)',
    prompt: 'hazme la matriz de riesgo con mapa de calor 5x5, sql injection tiene probabilidad alta e impacto muy alto, command injection probabilidad media impacto muy alto, y xss probabilidad alta impacto alto, usa colores rojo naranja amarillo verde segun el nivel de riesgo',
    acepto: 'La grilla 5x5 con celdas coloreadas y las 3 vulnerabilidades posicionadas como puntos.',
    corrigio: 'Los colores estaban al revés, rojo abajo a la izquierda cuando debería ser arriba a la derecha. Tuve que corregir la lógica de la grilla. También agregué la justificación de por qué la probabilidad de command injection es media y no alta.',
  },
  {
    seccion: '07 Controles',
    herramienta: 'Claude (claude.ai)',
    prompt: 'necesito los controles de prevencion y mitigacion para cada vulnerabilidad por separado, con referencias a owasp cis y nist, que sean especificos no genericos tipo "actualizar el sistema"',
    acepto: 'Los controles separados por vulnerabilidad con badges de marco de referencia.',
    corrigio: 'Varios controles seguían siendo vagos como "mejorar la validación". Los reemplacé con acciones concretas: nombre exacto de la función PHP a deshabilitar, nombre de la herramienta (OWASP ZAP) y la referencia exacta al estándar NIST.',
  },
  {
    seccion: '08 Recuperación',
    herramienta: 'Claude (claude.ai)',
    prompt: 'hazme el plan de recuperacion ante desastres para isapre vidaplena, necesita rto rpo mejoras tecnologicas tipo waf y segmentacion de red, y un plan en fases con tiempos, tambien la notificacion a la superintendencia de salud',
    acepto: 'La estructura de 5 fases con tiempos, tarjetas RTO/RPO y las mejoras tecnológicas.',
    corrigio: 'La IA puso RPO de 6 horas pero para el tamaño de una isapre mediana los respaldos diarios son más realistas, lo cambié a 24 horas. También agregué la referencia a la Circular IF/N°269 de la Superintendencia de Salud que la IA no conocía.',
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
              Usar Claude me ayudó bastante para estructurar los componentes React y entender cómo presentar
              la información técnica de forma ordenada. Sin embargo no fue tan simple como pedir y copiar:
              en varios casos la IA me dio información incorrecta o incompleta que tuve que corregir, como
              el puntaje CVSS que estaba mal y los controles que eran demasiado genéricos.
            </p>
            <p>
              Lo que más me costó fue hacer los prompts específicos. Al principio pedía cosas muy generales
              y los resultados no servían. Cuando empecé a mencionar la empresa, el payload concreto y
              el contexto de una isapre, los resultados mejoraron mucho. Entendí que la IA es una herramienta
              que funciona mejor mientras más claro seas con lo que necesitas.
            </p>
            <p>
              La parte que más aprendí fue verificar los resultados: buscar el puntaje CVSS en la calculadora
              oficial, confirmar que los marcos OWASP y NIST que citaba la IA existían realmente, y ajustar
              el impacto de cada vulnerabilidad al contexto real de una isapre. Esa validación es lo que
              convierte el output de la IA en un trabajo propio.
            </p>
          </div>
        </div>

      </div>
    </SectionFrame>
  )
}
