import {SKILLS} from '../data';
const KEY='ai-employability-analyzer-v1';
export const defaults=()=>({profile:null,answers:{},extras:{certs:'',projects:'',education:'',experience:''},role:null,progress:{},feedback:[]});
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
export function load(){
 try{
  const raw=JSON.parse(localStorage.getItem(KEY)); if(!raw||typeof raw!=='object') return defaults();
  const d=defaults(),answers={};
  Object.entries(obj(raw.answers)).forEach(([k,v])=>{if(SKILLS.some(s=>s.id===k)&&Number.isInteger(v)&&v>=1&&v<=5)answers[k]=v;});
  return {...d,profile:obj(raw.profile).name?raw.profile:null,answers,extras:{...d.extras,...obj(raw.extras)},
   role:typeof raw.role==='string'?raw.role:null,progress:obj(raw.progress),feedback:Array.isArray(raw.feedback)?raw.feedback:[]};
 }catch{return defaults();}
}
export function save(state){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{/* storage unavailable */}}
export function clearAll(){try{localStorage.removeItem(KEY);}catch{/* ignore */}}
