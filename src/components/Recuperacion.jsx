import { RefreshCcw, Server, Database, Bell, ShieldCheck, Clock } from 'lucide-react'
import SectionFrame from './SectionFrame'

const mejoras = [
  {
    icon: ShieldCheck,
    titulo: 'Web Application Firewall (WAF)',
    descripcion: 'Desplegar un WAF en modo inline frente al portal de clientes, configurado con el OWASP Core Rule Set (CRS 3.3+). Bloqueará patrones de SQLi, XSS y Command Injection antes de que lleguen a la aplicación. Recomendación: AWS WAF, Cloudflare WAF o ModSecurity sobre el servidor actual.',
    marco: 'OWASP / NIST SP 800-41',
  },
  {
    icon: Server,
    titulo: 'Segmentación de red y DMZ',
    descripcion: 'Ubicar el servidor web en una zona desmilitarizada (DMZ) separada de la base de datos y de los sistemas internos de la isapre mediante firewall de capa 7. El servidor web solo debe poder conectarse a la BD por un puerto específico y no tener salida directa a internet.',
    marco: 'CIS Control 12 / NIST SP 800-53 SC-7',
  },
  {
    icon: Database,
    titulo: 'Cifrado de datos en reposo y en tránsito',
    descripcion: 'Cifrar la base de datos de afiliados con AES-256. Habilitar TLS 1.3 obligatorio en todos los endpoints del portal. Cifrar las copias de respaldo con llave independiente almacenada en un gestor de secretos (AWS KMS, HashiCorp Vault).',
    marco: 'NIST SP 800-111 / Ley 19.628',
  },
  {
    icon: Bell,
    titulo: 'SIEM y monitoreo continuo',
    descripcion: 'Centralizar logs del portal, el servidor de aplicación y la base de datos en un SIEM (ej. Wazuh, Azure Sentinel). Configurar alertas en tiempo real ante: múltiples errores 500 seguidos, consultas SQL con patrones anómalos, ejecuciones de comandos desde el proceso web o intentos de autenticación fallidos repetidos.',
    marco: 'NIST SP 800-92 / CIS Control 8',
  },
]

const pasosDR = [
  {
    fase: '1. Detección',
    tiempo: '0 – 15 min',
    color: 'border-red-400/30 bg-red-400/5',
    badge: 'bg-red-400/10 text-red-300',
    pasos: [
      'El SIEM genera alerta ante comportamiento anómalo (exfiltración de datos, errores masivos, tráfico inusual).',
      'El analista de turno valida la alerta y confirma el incidente.',
      'Se activa el protocolo de respuesta a incidentes y se notifica al equipo de seguridad y al encargado de sistemas.',
    ],
  },
  {
    fase: '2. Contención',
    tiempo: '15 – 60 min',
    color: 'border-orange-400/30 bg-orange-400/5',
    badge: 'bg-orange-400/10 text-orange-300',
    pasos: [
      'Aislar el servidor afectado desconectándolo de la red interna y de internet para evitar propagación.',
      'Revocar y rotar inmediatamente todas las credenciales de acceso al portal, base de datos y sistemas internos.',
      'Activar modo de mantenimiento en el portal para evitar acceso de nuevos usuarios durante el incidente.',
    ],
  },
  {
    fase: '3. Erradicación',
    tiempo: '1 – 4 h',
    color: 'border-yellow-400/30 bg-yellow-400/5',
    badge: 'bg-yellow-400/10 text-yellow-300',
    pasos: [
      'Identificar el vector de ataque revisando logs del WAF, del servidor web y del sistema operativo.',
      'Aplicar parches o correcciones de código que eliminen la vulnerabilidad explotada.',
      'Preservar evidencia forense (imagen del disco, logs, tráfico de red) antes de cualquier modificación.',
    ],
  },
  {
    fase: '4. Recuperación',
    tiempo: '4 – 8 h',
    color: 'border-emerald-400/30 bg-emerald-400/5',
    badge: 'bg-emerald-400/10 text-emerald-300',
    pasos: [
      'Restaurar el servicio desde el respaldo verificado más reciente (< 24 h) en un servidor limpio o contenedor nuevo.',
      'Verificar integridad de los datos restaurados comparando hashes con los registros de respaldo.',
      'Ejecutar pruebas de regresión de seguridad (OWASP ZAP) antes de reactivar el servicio en producción.',
    ],
  },
  {
    fase: '5. Notificación',
    tiempo: '< 72 h',
    color: 'border-blue-400/30 bg-blue-400/5',
    badge: 'bg-blue-400/10 text-blue-300',
    pasos: [
      'Notificar a la Superintendencia de Salud dentro de las 72 horas de detectado el incidente, según Circular IF/N°269.',
      'Comunicar a los afiliados afectados el alcance del incidente y las medidas adoptadas para protegerlos.',
      'Documentar el incidente completo (cronología, impacto, acciones tomadas) para el informe post-mortem.',
    ],
  },
]

export default function Recuperacion() {
  return (
    <SectionFrame
      eyebrow="08 Recuperación"
      title="Mejora tecnológica y plan de recuperación"
      description="Mejoras tecnológicas preventivas y plan de recuperación ante desastres (DR) adaptado al sector de salud previsional, referenciando estándares NIST y CIS."
    >
      <div className="space-y-8 text-sm leading-6 text-slate-300">

        {/* RTO / RPO */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-cyan-300" />
              <p className="font-semibold text-white">RTO — Recovery Time Objective</p>
            </div>
            <p className="text-2xl font-bold text-cyan-300">4 horas</p>
            <p className="mt-1 text-xs text-slate-400">
              Tiempo máximo tolerable de indisponibilidad del portal. Los afiliados deben poder emitir
              bonos de urgencia dentro de este plazo. Referencia: NIST SP 800-34.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-purple-300" />
              <p className="font-semibold text-white">RPO — Recovery Point Objective</p>
            </div>
            <p className="text-2xl font-bold text-purple-300">24 horas</p>
            <p className="mt-1 text-xs text-slate-400">
              Pérdida máxima de datos tolerable. Se realizan respaldos incrementales cada 24 h y
              completos cada semana, almacenados en ubicación geográficamente separada.
            </p>
          </div>
        </div>

        {/* Mejoras tecnológicas */}
        <div>
          <p className="mb-3 font-semibold text-white">Mejoras tecnológicas recomendadas</p>
          <div className="space-y-3">
            {mejoras.map(({ icon: Icon, titulo, descripcion, marco }) => (
              <div key={titulo} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-white">{titulo}</p>
                      <span className="rounded bg-cyan-400/10 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                        {marco}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan DR */}
        <div>
          <p className="mb-3 font-semibold text-white">Plan de recuperación ante desastres (DR)</p>
          <div className="space-y-3">
            {pasosDR.map(({ fase, tiempo, color, badge, pasos }) => (
              <div key={fase} className={`rounded-2xl border p-4 ${color}`}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{fase}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>
                    {tiempo}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {pasos.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Política de respaldos */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <RefreshCcw className="h-4 w-4 text-cyan-300" />
            <p className="font-semibold text-white">Política de respaldos</p>
          </div>
          <div className="grid gap-3 text-xs sm:grid-cols-3">
            {[
              { tipo: 'Completo',     frec: 'Semanal',    dest: 'Almacenamiento externo cifrado (AES-256) en región geográfica distinta.' },
              { tipo: 'Incremental', frec: 'Diario',      dest: 'Snapshot de base de datos con verificación automática de integridad (hash SHA-256).' },
              { tipo: 'Logs',         frec: 'Tiempo real', dest: 'Centralización en SIEM con retención mínima de 90 días según regulación de la Superintendencia de Salud.' },
            ].map(({ tipo, frec, dest }) => (
              <div key={tipo} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <p className="font-semibold text-cyan-300">{tipo}</p>
                <p className="text-slate-400">{frec}</p>
                <p className="mt-1 text-slate-400">{dest}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionFrame>
  )
}
