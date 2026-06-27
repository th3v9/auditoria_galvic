import SectionFrame from './SectionFrame'

// Matriz 5x5: filas = Impacto (5=máx arriba), columnas = Probabilidad (1=min izq)
// colores: rojo=crítico, naranja=alto, amarillo=medio, verde=bajo
const COLS = ['Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta']
const ROWS = ['Muy Alto', 'Alto', 'Medio', 'Bajo', 'Muy Bajo'] // impacto de mayor a menor

// Nivel de riesgo por [fila(impacto)][col(prob)] — 5x5
// R=rojo/crítico, O=naranja/alto, Y=amarillo/medio, G=verde/bajo
const RISK = [
  // Muy Alta Prob → Muy Baja Prob (columnas)
  ['O', 'R', 'R', 'R', 'R'], // Muy Alto impacto
  ['Y', 'O', 'R', 'R', 'R'], // Alto impacto
  ['G', 'Y', 'O', 'R', 'R'], // Medio impacto
  ['G', 'G', 'Y', 'O', 'R'], // Bajo impacto
  ['G', 'G', 'G', 'Y', 'O'], // Muy Bajo impacto
]

// Orden de columnas es [MuyBaja, Baja, Media, Alta, MuyAlta] → índices 0..4
// Para que "Muy Alta" quede a la derecha invertimos: col index en UI = 4 - data_col_index
// En realidad armamos como: col 0 = MuyBaja, col 4 = MuyAlta → se muestra izq→der

const colorClass = {
  R: { bg: 'bg-red-500/80',    text: 'text-white', label: 'Crítico' },
  O: { bg: 'bg-orange-500/80', text: 'text-white', label: 'Alto'    },
  Y: { bg: 'bg-yellow-500/70', text: 'text-slate-900', label: 'Medio' },
  G: { bg: 'bg-emerald-600/70',text: 'text-white', label: 'Bajo'    },
}

// Vulnerabilidades posicionadas en la matriz [fila, col] (0-indexed, arriba-izquierda = Muy Alto / Muy Baja)
const vulns = [
  {
    id: 'SQLi',
    label: 'SQL Injection',
    row: 0, // Impacto: Muy Alto
    col: 3, // Probabilidad: Alta
    cvss: '9.8 — Crítica',
    dot: 'bg-red-300',
  },
  {
    id: 'CMD',
    label: 'Command Injection',
    row: 0, // Impacto: Muy Alto
    col: 2, // Probabilidad: Media
    cvss: '9.8 — Crítica',
    dot: 'bg-orange-300',
  },
  {
    id: 'XSS',
    label: 'XSS Reflected',
    row: 1, // Impacto: Alto
    col: 3, // Probabilidad: Alta
    cvss: '7.4 — Alta',
    dot: 'bg-yellow-300',
  },
]

export default function Matriz() {
  // Construir mapa de qué celdas tienen vulnerabilidades
  const vulnMap = {}
  vulns.forEach(v => {
    const key = `${v.row}-${v.col}`
    if (!vulnMap[key]) vulnMap[key] = []
    vulnMap[key].push(v)
  })

  return (
    <SectionFrame
      eyebrow="06 Matriz"
      title="Matriz de riesgo"
      description="Mapa de calor probabilidad × impacto con priorización justificada según CVSS 3.1 y el contexto de Isapre VidaPlena."
    >
      <div className="space-y-6 text-sm leading-6 text-slate-300">

        {/* Leyenda */}
        <div className="flex flex-wrap gap-3">
          {[
            { code: 'R', label: 'Crítico' },
            { code: 'O', label: 'Alto'    },
            { code: 'Y', label: 'Medio'   },
            { code: 'G', label: 'Bajo'    },
          ].map(({ code, label }) => (
            <div key={code} className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-sm ${colorClass[code].bg}`} />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Mapa de calor */}
        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
            {/* Etiqueta eje X */}
            <div className="mb-1 ml-20 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
              Probabilidad →
            </div>

            {/* Cabecera columnas */}
            <div className="flex">
              <div className="w-20 shrink-0" />
              {COLS.map(c => (
                <div key={c} className="flex-1 text-center text-[10px] text-slate-400 pb-1">{c}</div>
              ))}
            </div>

            {/* Filas */}
            {ROWS.map((rowLabel, ri) => (
              <div key={rowLabel} className="flex">
                {/* Etiqueta fila */}
                <div className="flex w-20 shrink-0 items-center justify-end pr-2 text-[10px] text-slate-400">{rowLabel}</div>

                {/* Celdas */}
                {COLS.map((_, ci) => {
                  const code = RISK[ri][ci]
                  const { bg, text } = colorClass[code]
                  const cellVulns = vulnMap[`${ri}-${ci}`] || []

                  return (
                    <div
                      key={ci}
                      className={`relative flex-1 border border-slate-950/40 ${bg} flex items-center justify-center`}
                      style={{ height: '56px' }}
                    >
                      {cellVulns.map(v => (
                        <div key={v.id} className="flex flex-col items-center">
                          <span className={`h-2 w-2 rounded-full ${v.dot} shadow-lg`} />
                          <span className={`mt-0.5 text-[9px] font-bold leading-tight text-center ${text} drop-shadow`}>
                            {v.id}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Etiqueta eje Y */}
            <div className="mt-1 ml-20 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              ↑ Impacto
            </div>
          </div>
        </div>

        {/* Tabla de vulnerabilidades */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-2">Vulnerabilidad</th>
                <th className="px-4 py-2">Probabilidad</th>
                <th className="px-4 py-2">Impacto</th>
                <th className="px-4 py-2">Nivel de riesgo</th>
                <th className="px-4 py-2">CVSS 3.1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/70">
              {[
                { name: 'SQL Injection',     prob: 'Alta',  impact: 'Muy Alto', risk: 'R', cvss: '9.8 — Crítica', justif: 'Nivel Low expuesto en producción; exploit automatizable sin autenticación.' },
                { name: 'Command Injection', prob: 'Media', impact: 'Muy Alto', risk: 'R', cvss: '9.8 — Crítica', justif: 'Probabilidad media porque el módulo de ping es menos visible, pero el impacto es máximo.' },
                { name: 'XSS Reflected',     prob: 'Alta',  impact: 'Alto',     risk: 'O', cvss: '7.4 — Alta',    justif: 'Requiere interacción del usuario, pero en una isapre el phishing por email es vector habitual.' },
              ].map(({ name, prob, impact, risk, cvss, justif }) => (
                <tr key={name}>
                  <td className="px-4 py-3 font-medium text-white">{name}</td>
                  <td className="px-4 py-3">{prob}</td>
                  <td className="px-4 py-3">{impact}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ring-1 ${colorClass[risk].bg} ${colorClass[risk].text}`}>
                      {colorClass[risk].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-cyan-300">{cvss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Justificación por industria */}
        <div>
          <p className="mb-2 font-semibold text-white">Justificación por industria</p>
          <p>
            En el sector de salud previsional, el impacto de una brecha de datos es amplificado por la
            sensibilidad de la información médica y el marco regulatorio estricto. Una filtración en Isapre
            VidaPlena afectaría la confidencialidad de diagnósticos, historial de tratamientos y datos
            bancarios de los afiliados, generando responsabilidad civil y sanciones de la Superintendencia
            de Salud. Esto eleva el impacto percibido de todas las vulnerabilidades respecto a sectores
            de menor regulación.
          </p>
        </div>

        {/* Priorización */}
        <div>
          <p className="mb-2 font-semibold text-white">Priorización de atención</p>
          <div className="space-y-2">
            {[
              { pos: '1°', name: 'SQL Injection',     reason: 'Riesgo Crítico (CVSS 9.8). Alta probabilidad + impacto máximo sobre la base de datos de afiliados. Debe corregirse de inmediato.' },
              { pos: '2°', name: 'Command Injection', reason: 'Riesgo Crítico (CVSS 9.8). Impacto máximo sobre el servidor; probabilidad media por ser menos visible. Requiere corrección urgente.' },
              { pos: '3°', name: 'XSS Reflected',     reason: 'Riesgo Alto (CVSS 7.4). Probabilidad alta en contexto de phishing a afiliados. Corrección prioritaria una vez resueltas las críticas.' },
            ].map(({ pos, name, reason }) => (
              <div key={pos} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">
                  {pos}
                </span>
                <div>
                  <p className="font-medium text-white">{name}</p>
                  <p className="text-xs text-slate-400">{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionFrame>
  )
}
