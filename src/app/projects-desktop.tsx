"use client";
import { useEffect, useState } from "react";
import { RetroWindow } from "./about-desktop";
import { ArrowUpRight, Cpu } from "lucide-react";
import { PROFILE_LINKS } from "../lib/profile-links.mjs";
type ProjectId = 'smc'|'workshop';
export default function ProjectsDesktop({onExit}:{onExit:()=>void}){
 const [closed,setClosed]=useState<ProjectId[]>([]);const [minimized,setMinimized]=useState<ProjectId[]>([]);const [front,setFront]=useState<ProjectId>('smc');const [gpio,setGpio]=useState(false);
 useEffect(()=>{const handle=(e:KeyboardEvent)=>{if(e.key==='Escape')onExit()};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle)},[onExit]);
 function close(id:ProjectId){const next=[...closed,id];setClosed(next);if(next.length===2)onExit()}
 return <div className="about-desktop projects-desktop"><div className="desktop-shade"/>
 {!closed.includes('smc')&&!minimized.includes('smc')&&<RetroWindow id="smc" title="GTBILT, S.A." front={front==='smc'} onFocus={()=>setFront('smc')} onClose={()=>close('smc')} onMinimize={()=>setMinimized(v=>[...v,'smc'])}>
 <div className="project-heading"><h2>01 // MOBILE PROJECT<br/>[SMC_APP]</h2><span aria-hidden="true">✦</span></div>
 <div className="project-content smc-content"><aside className="project-visuals"><div className="reference-slice gtbilt-slice" role="img" aria-label="GTBILT, S.A."/><a className="phone-preview-button" href={PROFILE_LINKS.smcApp} target="_blank" rel="noopener noreferrer" aria-label="Ver SMC en App Store"><span className="reference-slice phone-slice" role="img" aria-label="Pantalla de la aplicación SMC"/></a><div className="reference-slice sensor-slice" role="img" aria-label="Sensor de humedad del suelo"/></aside>
 <article className="project-description"><h3>SMC MOBILE<br/>APP</h3><p className="project-role">DESARROLLADOR / PRACTICANTE</p><p>Desarrollo individual de la app SMC para Android/iOS usando Flutter y Dart.</p><p>Diseño de pantallas, lógica e integración de API para el control de humedad del suelo de la empresa.</p><p>Permite a los clientes visualizar sensores y su estado en tiempo real.</p><a className="view-app-button" href={PROFILE_LINKS.smcApp} target="_blank" rel="noopener noreferrer">「 VIEW_APP_LINK 」<ArrowUpRight aria-hidden="true"/></a></article></div>
 </RetroWindow>}
 {!closed.includes('workshop')&&!minimized.includes('workshop')&&<RetroWindow id="workshop" title="USAC - UNIVERSIDAD DE SAN CARLOS" front={front==='workshop'} onFocus={()=>setFront('workshop')} onClose={()=>close('workshop')} onMinimize={()=>setMinimized(v=>[...v,'workshop'])}>
 <div className="project-heading"><h2>02 // HARDWARE WORKSHOP<br/>[R_PI_TALLY]</h2><span aria-hidden="true">✦</span></div>
 <div className="project-content workshop-content"><div className="workshop-intro"><div className="reference-slice usac-slice" role="img" aria-label="Universidad de San Carlos de Guatemala"/><div><h3>RASPBERRY PI<br/>WORKSHOP</h3><p className="project-role">INSTRUCTOR DE TALLERES, 2026</p></div></div><div className="workshop-columns"><aside className="project-visuals"><div className="reference-slice board-slice" role="img" aria-label="Ilustración de placa Raspberry Pi y conexiones GPIO"/><span className="board-status">STATUS: {gpio?'GPIO HIGH':'ACTIVE'}<br/>YEAR: 2026</span><div className="dial-row" aria-hidden="true"><div className="analog-dial"><i style={{transform:`rotate(${gpio?45:-35}deg)`}}/></div><div className="analog-dial"><i style={{transform:`rotate(${gpio?30:-55}deg)`}}/></div></div></aside><article className="project-description"><p>Instructor de talleres y laboratorios prácticos de hardware y IoT con Raspberry Pi en la USAC.</p><p>Introducción al ecosistema, configuración de sistemas, programación de pines GPIO y desarrollo de prototipos conectados.</p><button className={`gpio-toggle ${gpio?'gpio-on':''}`} aria-pressed={gpio} onClick={()=>setGpio(v=>!v)}><Cpu aria-hidden="true"/><span>GPIO DEMO<br/><b>{gpio?'ON / HIGH':'OFF / LOW'}</b></span><span className="gpio-led"/></button></article></div></div>
 </RetroWindow>}
 <div className="desktop-taskbar"><button onClick={onExit}>◀ HOME</button>{(['smc','workshop'] as ProjectId[]).filter(id=>!closed.includes(id)).map(id=><button key={id} className={minimized.includes(id)?'is-minimized':''} onClick={()=>{setMinimized(v=>v.filter(x=>x!==id));setFront(id)}}>{id==='smc'?'SMC_APP':'R_PI_TALLY'}{minimized.includes(id)?' ↑':''}</button>)}<span>G.A. SYSTEMS / PROJECTS</span></div>

 </div>
}
