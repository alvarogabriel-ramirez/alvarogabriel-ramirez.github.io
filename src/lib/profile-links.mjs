export const PROFILE_LINKS = Object.freeze({
 email: 'alvarogabrielramirezalvarez@gmail.com',
 github: 'https://github.com/alvarogabriel-ramirez',
 linkedin: 'https://www.linkedin.com/in/gaaabriel/',
 smcApp: 'https://apps.apple.com/eg/app/smc/id1489489692',
});
export const CONTACT_LINKS = Object.freeze([
 {name:'Correo',href:`mailto:${PROFILE_LINKS.email}`},
 {name:'GitHub',href:PROFILE_LINKS.github},
 {name:'LinkedIn',href:PROFILE_LINKS.linkedin},
]);
export function buildContactDraft(name,email,message){
 const subject=`Contacto desde el portafolio — ${name.replace(/[\r\n]/g,' ').trim()}`;
 const body=`Nombre: ${name.trim()}\nCorreo de contacto: ${email.trim()}\n\n${message.trim()}`;
 return `mailto:${PROFILE_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
