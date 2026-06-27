import { ShieldCheck, Lock, Eye, AlertTriangle } from 'lucide-react'
import SectionFrame from './SectionFrame'

const controles = [
  {
    vuln: 'SQL Injection',
    riesgo: 'Crítico',
    riesgoColor: 'text-red-300 bg-red-500/15 ring-red-400/30',
    prevencion: [
      { marco: 'OWASP A03:2021', control: 'Reemplazar toda concatenación SQL por Prepared Statements o Stored Procedures. Ningún parámetro de usuario debe insertarse directamente en una consulta.' },
      { marco: 'CIS Control 16', control: 'Validar el tipo, longitud y formato de cada entrada en el servidor. Rechazar entradas que contengan caracteres especiales SQL antes de procesarlas.' },
      { marco: 'NIST SP 800-53 SI-10', control: 'Aplicar principio de mínimo privilegio: la cuenta de BD de la aplicación solo tendrá permisos SELECT/INSERT/UPDATE sobre las tablas necesarias; nunca DROP ni acceso a tablas del sistema.' },
    ],
    mitigacion: [
      { marco: 'OWASP CRS', control: 'WAF con OWASP Core Rule Set activado para detectar y bloquear patrones de inyección SQL en tiempo real, registrando todas las detecciones para análisis forense.' },
      { marco: 'NIST SP 800-92', control: 'Centralizar logs de errores de base de datos y enviar alertas al SIEM ante patrones anómalos (múltiples errores 500, respuestas inusualmente grandes, consultas de larga duración).' },
      { marco: 'OWASP API4', control: 'Rate limiting en endpoints de consulta: máximo 20 requests/minuto por IP. Bloqueo automático temporal ante superación del umbral.' },
    ],
  },
  {
    vuln: 'XSS Reflected',
    riesgo: 'Alto',
    riesgoColor: 'text-orange-300 bg-orange-500/15 ring-orange-400/30',
    prevencion: [
      { marco: 'OWASP A03:2021', control: 'Codificar toda salida HTML que incluya datos del usuario. Convertir caracteres especiales (<, >, &, ", \') en entidades HTML antes de renderizar.' },
      { marco: 'OWASP A05:2021', control: 'Implementar Content Security Policy (CSP) restrictiva via cabecera HTTP: script-src \'self\'; prohibir inline scripts y fuentes externas no autorizadas.' },
      { marco: 'CIS Control 16', control: 'Establecer atributos HttpOnly y Secure en todas las cookies de sesión para impedir su acceso desde JavaScript y su transmisión en canales no cifrados.' },
    ],
    mitigacion: [
      { marco: 'OWASP ZAP / NIST SP 800-115', control: 'Integrar análisis DAST (Dynamic Application Security Testing) en el pipeline CI/CD con OWASP ZAP para detectar nuevas instancias XSS antes de cada despliegue a producción.' },
      { marco: 'OWASP A05:2021', control: 'Configurar cabeceras de seguridad: X-XSS-Protection: 1; mode=block, X-Frame-Options: DENY y Strict-Transport-Security en todos los endpoints del portal.' },
      { marco: 'CIS Control 14', control: 'Capacitar al equipo de desarrollo en técnicas de escape de salida seguro y revisión de código enfocada en XSS cada semestre.' },
    ],
  },
  {
    vuln: 'Command Injection',
    riesgo: 'Crítico',
    riesgoColor: 'text-red-300 bg-red-500/15 ring-red-400/30',
    prevencion: [
      { marco: 'OWASP A03:2021', control: 'Eliminar toda llamada a funciones de ejecución de comandos del sistema (exec, system, shell_exec) que procesen datos del usuario. Reemplazar con APIs nativas del lenguaje.' },
      { marco: 'CIS Control 4', control: 'Aplicar lista blanca estricta: solo permitir el formato de IP válido (regex ^(\\d{1,3}\\.){3}\\d{1,3}$) y rechazar cualquier otro carácter antes de procesar la entrada.' },
      { marco: 'NIST SP 800-53 CM-7', control: 'Deshabilitar funciones PHP peligrosas (exec, passthru, shell_exec, system, proc_open) en php.ini mediante disable_functions en el servidor de producción.' },
    ],
    mitigacion: [
      { marco: 'CIS Control 4 / NIST SP 800-53 AC-6', control: 'Ejecutar el proceso web con una cuenta de sistema operativo sin privilegios de escritura fuera de su directorio. Implementar chroot jail o contenedor Docker para aislar el sistema de archivos accesible.' },
      { marco: 'NIST SP 800-53 AU-2', control: 'Activar auditoría de llamadas al sistema (auditd) para registrar toda ejecución de comandos desde el proceso web y alertar al SIEM ante comportamiento anómalo.' },
      { marco: 'CIS Control 13', control: 'Segmentar la red: el servidor de aplicación no debe tener acceso directo a internet de salida ni a sistemas internos que no sean estrictamente necesarios para su función.' },
    ],
  },
]

export default function Controles() {
  return (
    <SectionFrame
      eyebrow="07 Controles"
      title="Prevención y mitigación"
      description="Controles técnicos y administrativos por vulnerabilidad, referenciando marcos OWASP, CIS Controls y NIST SP 800."
    >
      <div className="space-y-8 text-sm leading-6 text-slate-300">

        {controles.map(({ vuln, riesgo, riesgoColor, prevencion, mitigacion }) => (
          <div key={vuln} className="space-y-4">
            {/* Encabezado de vulnerabilidad */}
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-3">
              <h4 className="font-semibold text-white">{vuln}</h4>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${riesgoColor}`}>
                {riesgo}
              </span>
            </div>

            {/* Prevención */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <p className="font-medium text-emerald-300">Políticas de prevención (3.1.4)</p>
              </div>
              <div className="space-y-2">
                {prevencion.map(({ marco, control }) => (
                  <div key={marco} className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-3">
                    <span className="mb-1 inline-block rounded bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {marco}
                    </span>
                    <p className="text-xs text-slate-300">{control}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigación */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <p className="font-medium text-amber-300">Controles de mitigación (3.1.5)</p>
              </div>
              <div className="space-y-2">
                {mitigacion.map(({ marco, control }) => (
                  <div key={marco} className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-3">
                    <span className="mb-1 inline-block rounded bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {marco}
                    </span>
                    <p className="text-xs text-slate-300">{control}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Resumen de marcos utilizados */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Lock className="h-4 w-4 text-cyan-300" />
            <p className="font-semibold text-white">Marcos de referencia aplicados</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'OWASP Top 10 2021',
              'OWASP Core Rule Set (WAF)',
              'OWASP ZAP (DAST)',
              'CIS Controls v8',
              'NIST SP 800-53 Rev. 5',
              'NIST SP 800-92 (Log Mgmt)',
              'NIST SP 800-115 (Pen Testing)',
            ].map(m => (
              <span key={m} className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-200 ring-1 ring-cyan-400/20">
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>
    </SectionFrame>
  )
}
