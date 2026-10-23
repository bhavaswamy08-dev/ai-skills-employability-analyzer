import {useState} from 'react';
import {getRole,RESOURCES,SKILLS,STATUSES,skillName} from '../data';
import {analyze} from '../utils/scoring';
import {recommend} from '../utils/recommendations';
import {EmptyState,ProgressBar,Badge} from '../components/ui';
function Resource({r,status,onChange}){
 return(<div className="res"><div><b>{r.url?<a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>:r.title}</b>
  <div className="small muted">{r.objective} · {r.type} · {r.difficulty}</div></div>
  <select aria-label={`Progress for ${r.title}`} value={status||''} onChange={e=>onChange(e.target.value)}>{STATUSES.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>);
}
export default function LearningRoadmap({state,update,notify,go}){
 const [filter,setFilter]=useState('all'),[rating,setRating]=useState(0),[comment,setComment]=useState(''),[ferr,setFerr]=useState('');
 const role=getRole(state.role),setP=(id,v)=>update({progress:{...state.progress,[id]:v}});
 const recs=role?recommend(analyze(state.answers,role).rows):[];
 const ids=[...new Set(recs.flatMap(r=>r.resources.map(x=>x.id)))];
 const done=ids.filter(i=>state.progress[i]==='done').length,prog=ids.filter(i=>state.progress[i]==='progress').length;
 const lib=RESOURCES.filter(r=>filter==='all'||r.skill===filter);
 const sendFb=e=>{e.preventDefault();if(!rating){setFerr('Please choose a rating.');return;}setFerr('');
  update({feedback:[...state.feedback,{rating,comment:comment.trim(),date:new Date().toISOString()}]});setRating(0);setComment('');notify('Feedback saved locally.');};
 return(<div className="stack"><div><h1>Learning Roadmap</h1><p className="muted">Rule-based recommendations from your assessment and selected role, with free learning resources.</p></div>
  {!role?<EmptyState title="No career role selected" text="Select a role to receive personalised recommendations." action="Choose a role" onAction={()=>go('roles')}/>:
  recs.length===0?<div className="card"><h3>No gaps to address</h3><p className="muted">You meet every requirement for {role.title}. Explore the library below or try another role.</p></div>:
  <>
   <div className="card"><div className="row between"><b>Roadmap progress for {role.title}</b><span className="small muted">{done} completed · {prog} in progress · {ids.length} resources</span></div><ProgressBar value={ids.length?done/ids.length*100:0}/></div>
   {recs.map(r=>(<div className="card" key={r.skill}><div className="row between"><h3>{r.name}</h3><Badge tone={r.priority.toLowerCase()}>{`${r.priority} priority`}</Badge></div>
    <p className="small"><b>Why it matters:</b> {r.why}</p><p className="small"><b>Learning topic:</b> {r.topic}.</p><p className="small"><b>Next step:</b> {r.step}</p>
    {r.resources.map(x=><Resource key={x.id} r={x} status={state.progress[x.id]} onChange={v=>setP(x.id,v)}/>)}</div>))}</>}
  <div className="card"><div className="row between"><h3>Resource library</h3>
   <select aria-label="Filter by skill" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All skills</option>{SKILLS.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
   {lib.length?lib.map(x=><Resource key={x.id} r={x} status={state.progress[x.id]} onChange={v=>setP(x.id,v)}/>):<p className="muted">No resources for {filter==='all'?'this filter':skillName(filter)}.</p>}</div>
  <div className="card"><h3>Keep improving</h3><p className="muted">After learning, update your ratings. Scores, gaps and recommendations recalculate from your saved assessment.</p><button className="btn" onClick={()=>go('assessment')}>Update my skills</button></div>
  <form className="card" onSubmit={sendFb}><h3>Feedback</h3><p className="small muted">Stored only in this demo application on your device; it is not submitted to a real organisation.</p>
   <div className="rating" role="radiogroup" aria-label="Rating">{[1,2,3,4,5].map(n=><button type="button" key={n} role="radio" aria-checked={rating===n} className={rating===n?'on':''} onClick={()=>setRating(n)}>{n}</button>)}</div>
   {ferr&&<em className="err">{ferr}</em>}
   <textarea rows="2" placeholder="Optional comments" value={comment} onChange={e=>setComment(e.target.value)}/>
   <div className="row"><button className="btn" type="submit">Submit feedback</button><span className="small muted">{state.feedback.length} saved locally</span></div></form></div>);
}
