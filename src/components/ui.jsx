import {LEVELS} from '../data';
export const ProgressBar=({value,tone=''})=>(
 <div className="bar" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin="0" aria-valuemax="100">
  <span className={tone} style={{width:`${Math.min(100,Math.max(0,value))}%`}}/></div>);
export const StatCard=({label,value,hint,children})=>(
 <div className="card stat"><div className="muted small">{label}</div><div className="big">{value}</div>{hint&&<div className="small muted">{hint}</div>}{children}</div>);
export const EmptyState=({title,text,action,onAction})=>(
 <div className="card empty"><h3>{title}</h3><p className="muted">{text}</p>{action&&<button className="btn" onClick={onAction}>{action}</button>}</div>);
export const Badge=({children,tone})=><span className={`badge ${tone||String(children).toLowerCase().replace(/\s+/g,'-')}`}>{children}</span>;
export const Ring=({value})=>(
 <div className="ring" style={{background:`conic-gradient(var(--teal) ${value*3.6}deg,#e3e8ef 0)`}}><div><b>{Math.round(value)}%</b></div></div>);
export function ConfirmationDialog({title,text,confirmLabel,onConfirm,onCancel}){
 return(<div className="overlay" role="dialog" aria-modal="true" aria-label={title}><div className="card dialog">
  <h3>{title}</h3><p className="muted">{text}</p>
  <div className="row end"><button className="btn ghost" onClick={onCancel}>Cancel</button><button className="btn danger" onClick={onConfirm}>{confirmLabel}</button></div></div></div>);
}
export function SkillRating({value,onChange,label}){
 return(<div>
  <div className="rating" role="radiogroup" aria-label={label}>
   {LEVELS.map(l=>(<button key={l.v} type="button" role="radio" aria-checked={value===l.v} title={`${l.name}: ${l.desc}`}
    className={value===l.v?'on':''} onClick={()=>onChange(value===l.v?null:l.v)}>{l.v}</button>))}</div>
  <div className="small muted">{value?`${LEVELS[value-1].name}: ${LEVELS[value-1].desc}`:'Not assessed (select a level)'}</div></div>);
}
export function CompareChart({rows}){
 return(<div className="chart" aria-label="Current versus required proficiency">
  {rows.map(r=>(<div key={r.skill} className="crow">
   <div className="clabel">{r.name}</div>
   <div className="ctrack"><span className={`cfill ${r.current==null?'na':r.status==='Meets Requirement'?'ok':''}`} style={{width:`${(r.current||0)*20}%`}}/>
    <i className="cmark" style={{left:`${r.level*20}%`}} title={`Required: ${r.level}`}/></div>
   <div className="cval small">{r.current??'–'} / {r.level}</div></div>))}
  <div className="legend small muted"><span><b className="sw teal"/> Current</span><span><b className="sw navy"/> Required level marker</span><span>– = not assessed</span></div></div>);
}
