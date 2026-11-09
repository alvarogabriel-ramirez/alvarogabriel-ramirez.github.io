import { PROFILE_LINKS } from "./profile-links.mjs";
export const PROMPT = 'visitor@gabriel-alvarez-os:~$';
export const COMMAND_GUIDE = [
 {command:'whoami',label:'IDENTITY',description:'Rol profesional, ubicación y estado actual.'},
 {command:'cat experience.log',label:'EXPERIENCE',description:'Experiencia en GTBilt y talleres de Raspberry Pi e IoT en la USAC.'},
 {command:'tech_stack',label:'TECH ARSENAL',description:'Docker, Kubernetes, AWS, Linux, Python y CI/CD.'},
 {command:'contact',label:'DATA LINK',description:'Accesos de contacto: correo, GitHub y LinkedIn.'},
 {command:'help',label:'COMMAND INDEX',description:'Lista todos los comandos disponibles.'},
 {command:'clear',label:'RESET SCREEN',description:'Limpia la pantalla de la terminal.'},
] as const;
export type CommandResult={command:string;kind:'text'|'contact'|'error'|'clear';lines:string[]};
export function runCommand(raw:string):CommandResult|null{
 const command=raw.trim().replace(/\s+/g,' ');if(!command)return null;
 const key=command.toLowerCase();
 if(key==='clear')return {command,kind:'clear',lines:[]};
 if(key==='whoami')return {command,kind:'text',lines:['Gabriel Alvarez','──────────────────────────────────','Rol        Systems Engineer & Digital Architect','Ubicación  Guatemala','Estado     Ingeniería en Sistemas · USAC','Enfoque    Desarrollo full stack, infraestructura y automatización.']};
 if(key==='cat experience.log')return {command,kind:'text',lines:['EXPERIENCE.LOG / 02 ENTRIES','──────────────────────────────────','[01] GTBilt, S.A. — Desarrollo móvil','Desarrollo de una aplicación Flutter/Dart para Android e iOS.','Integración de API para consultar sensores de humedad del suelo','y visualizar sus lecturas y estado en tiempo real.','','[02] USAC — Raspberry Pi & IoT','Instructor de talleres y laboratorios prácticos de hardware.','Configuración de Raspberry Pi, programación de pines GPIO','y desarrollo de prototipos conectados.']};
 if(key==='tech_stack')return {command,kind:'text',lines:['TECH ARSENAL / 06 MODULES','──────────────────────────────────','Docker      · Contenedores de aplicaciones','Kubernetes  · Orquestación de contenedores','AWS         · Infraestructura en la nube','Linux       · Sistemas y administración','Python      · Scripting y automatización','CI/CD       · Integración y entrega continua']};
 if(key==='contact')return {command,kind:'contact',lines:['CONTACT / DATA LINK','──────────────────────────────────',`Correo    ${PROFILE_LINKS.email}`,`GitHub    ${PROFILE_LINKS.github}`,`LinkedIn  ${PROFILE_LINKS.linkedin}`,'','Elige un acceso directo o abre el apartado CONTACT.']};
 if(key==='help')return {command,kind:'text',lines:['AVAILABLE COMMANDS','──────────────────────────────────',...COMMAND_GUIDE.map(x=>`${x.command.padEnd(22)} ${x.description}`),'','↑ / ↓ historial · Tab autocompletar · Enter ejecutar']};
 return {command,kind:'error',lines:[`Comando no reconocido: ${command}`,'Escribe help o elige un comando de la guía.']};
}
