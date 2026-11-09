"use client";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { Container, Orbit, Sparkles } from "lucide-react";
type WindowId = "bio" | "tech" | "liquid";
const skills=[{name:"AWS",detail:"Cloud infrastructure"},{name:"KUBERNETES",detail:"Container orchestration"},{name:"LINUX",detail:"Operating systems"},{name:"TERRAFORM",detail:"Infrastructure as code"},{name:"DOCKER",detail:"Application containers"},{name:"DEV OPS",detail:"Development & operations"},{name:"PYTHON",detail:"Scripting & automation"},{name:"CI/CD",detail:"Continuous integration & delivery"}];
export function RetroWindow({id,title,children,onClose,onMinimize,onFocus,front}: {id:string;title:string;children:ReactNode;onClose:()=>void;onMinimize:()=>void;onFocus:()=>void;front:boolean}){
 const [position,setPosition]=useState<{x:number;y:number}|null>(null);const [maximized,setMaximized]=useState(false);const frame=useRef<HTMLElement>(null);const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
 function start(e:ReactPointerEvent<HTMLElement>){if((e.target as HTMLElement).closest('button')||maximized)return;const r=frame.current!.getBoundingClientRect();drag.current={x:e.clientX,y:e.clientY,left:r.left,top:r.top};e.currentTarget.setPointerCapture(e.pointerId);onFocus()}
 function move(e:ReactPointerEvent<HTMLElement>){if(!drag.current)return;const d=drag.current;const width=frame.current?.offsetWidth||320;setPosition({x:Math.max(0,Math.min(window.innerWidth-Math.min(width,180),d.left+e.clientX-d.x)),y:Math.max(0,Math.min(window.innerHeight-90,d.top+e.clientY-d.y))})}
 return <section ref={frame} role="dialog" aria-label={title} className={`retro-window ${id}-window ${maximized?'maximized':''}`} style={{...(position&&!maximized?{left:position.x,top:position.y}:{}),zIndex:front?3:2}} onPointerDown={onFocus}>
 <header className="window-titlebar" onPointerDown={start} onPointerMove={move} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onDoubleClick={()=>setMaximized(v=>!v)}>
 <span className="window-title" tabIndex={0} title="Arrastra para mover. Usa las flechas del teclado para ajustar." onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)||maximized)return;e.preventDefault();const r=frame.current!.getBoundingClientRect();setPosition({x:Math.max(0,r.left+(e.key==='ArrowLeft'?-20:e.key==='ArrowRight'?20:0)),y:Math.max(0,r.top+(e.key==='ArrowUp'?-20:e.key==='ArrowDown'?20:0))})}}>{title}</span>
 <div className="window-controls"><button onClick={onMinimize} aria-label={`Minimizar ${title}`} title="Minimizar">_</button><button onClick={()=>setMaximized(v=>!v)} aria-label={`${maximized?'Restaurar':'Maximizar'} ${title}`} title={maximized?'Restaurar':'Maximizar'}>{maximized?'❐':'□'}</button><button onClick={onClose} aria-label={`Cerrar ${title}`} title="Cerrar">×</button></div>
 </header>{children}<div className="retro-status"><span>◀</span><div/><span>▶</span></div></section>
}
export default function AboutDesktop({onExit}:{onExit:()=>void}){
 const [closed,setClosed]=useState<WindowId[]>([]);const [minimized,setMinimized]=useState<WindowId[]>([]);const [front,setFront]=useState<WindowId>('bio');const [skill,setSkill]=useState<string|null>(null);
 useEffect(()=>{const listener=(e:KeyboardEvent)=>{if(e.key==='Escape')onExit()};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener)},[onExit]);
 function close(id:WindowId){const next=[...closed,id];setClosed(next);if(next.length===3)onExit()}
 return <div className="about-desktop"><div className="desktop-shade"/>
 {!closed.includes('bio')&&!minimized.includes('bio')&&<RetroWindow id="bio" title="BIOGRAPHY" front={front==='bio'} onFocus={()=>setFront('bio')} onClose={()=>close('bio')} onMinimize={()=>setMinimized(v=>[...v,'bio'])}>
 <div className="biography-body"><figure className="avatar-window"><div className="avatar-title">PROFILE_AVATAR <span>_ □ ×</span></div><img src="/assets/biography-avatar.png" alt="Retrato ilustrado con gorra y gafas moradas"/><figcaption>PROFILE_AVATAR.JPG</figcaption></figure>
 <div className="biography-copy"><h2>SYSTEMS ENGINEERING<br/>& FULL STACK DEVELOPMENT.</h2><p>Estudiante de Ingeniería en Sistemas en la USAC, Guatemala.</p><p>Desarrollo aplicaciones web y móviles con React, Go y Flutter.</p><p className="bio-signature">Gabriel Alvarez</p></div></div>

 </RetroWindow>}
 {!closed.includes('tech')&&!minimized.includes('tech')&&<RetroWindow id="tech" title="THE TECH ARSENAL" front={front==='tech'} onFocus={()=>setFront('tech')} onClose={()=>close('tech')} onMinimize={()=>setMinimized(v=>[...v,'tech'])}>
 <div className="arsenal-body"><div className="arsenal-top"><span className="mini-meter"/><span>▧ ★ ✳</span></div><div className="arsenal-grid">{skills.map(s=><button className={skill===s.name?'skill-active':''} key={s.name} onClick={()=>setSkill(s.name)} aria-pressed={skill===s.name}>{s.name}</button>)}<div className="docker-mark" aria-hidden="true"><Container/><span>docker</span></div></div><div className="arsenal-bottom"><Orbit aria-hidden="true"/><div className="arsenal-readout" aria-live="polite"><strong>{skill||'SYSTEM READY'}</strong><span>{skills.find(s=>s.name===skill)?.detail||'SELECT A TECHNOLOGY'}</span></div><Sparkles aria-hidden="true"/></div></div>
 </RetroWindow>}
 {!closed.includes('liquid')&&!minimized.includes('liquid')&&<RetroWindow id="liquid" title="LIQUID METAL" front={front==='liquid'} onFocus={()=>setFront('liquid')} onClose={()=>close('liquid')} onMinimize={()=>setMinimized(v=>[...v,'liquid'])}>
 <div className="liquid-body"><img src="/assets/liquid-metal.png" alt="Líquido metálico violeta de formas onduladas" draggable="false"/></div>
 </RetroWindow>}
 <div className="desktop-taskbar"><button className="desktop-home" onClick={onExit}>◀ HOME</button>{(['bio','tech','liquid'] as WindowId[]).filter(id=>!closed.includes(id)).map(id=><button key={id} className={minimized.includes(id)?'is-minimized':''} onClick={()=>{setMinimized(v=>v.filter(x=>x!==id));setFront(id)}}>{id==='bio'?'BIOGRAPHY':id==='tech'?'THE TECH ARSENAL':'LIQUID METAL'}{minimized.includes(id)?' ↑':''}</button>)}<span>G.A. SYSTEMS / ABOUT</span></div>
 </div>
}
