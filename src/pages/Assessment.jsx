import {useState} from 'react';
import {SKILLS,CATEGORIES,LEVELS} from '../data';
import {completion} from '../utils/scoring';
import {ProgressBar,SkillRating} from '../components/ui';
const X=[['certs','Certifications'],['projects','Projects'],['education','Education details'],['experience','Experience']];
export default function Assessment({state,update,notify,go}){
 const [draft,setDraft]=useState(state.answers),[extras,setExtras]=useState(state.extras);
 const c=completion(draft);
 const dirty=JSON.stringify(draft)!==JSON.stringify(state.answers)||JSON.stringify(extras)!==JSON.stringify(state.extras);
 const set=(id,v)=>setDraft(d=>{const n={...d};if(v==null)delete n[id];else n[id]=v;return n;});
 const save=()=>{update({answers:draft,extras});notify(c.count===c.total?'Assessment saved. Results recalculated.':`Progress saved (${c.count}/${c.total} skills).`);};
 return(<div className="stack"><div><h1>Skills Assessment</h1><p className="muted">Rate each skill honestly from 1 to 5. Unrated skills are treated as "Not Assessed". You can save progress, return later and edit at any time.</p></div>
  <div className="card"><h3>Proficiency levels</h3><div className="levels">{LEVELS.map(l=><div key={l.v}><b>{l.v}. {l.name}</b><div className="small muted">{l.desc}</div></div>)}</div></div>
  <div className="card sticky"><div className="row between"><b>{c.count} of {c.total} skills rated ({c.pct}%)</b>{dirty&&<span className="small warn">Unsaved changes</span>}</div><ProgressBar value={c.pct}/></div>
  {CATEGORIES.map((cat,i)=>(<div className="card" key={cat}><h3>{cat}</h3>
   {SKILLS.filter(s=>s.cat===i).map(s=>(<div className="skill" key={s.id}><div className="sname">{s.name}</div><SkillRating label={s.name} value={draft[s.id]} onChange={v=>set(s.id,v)}/></div>))}</div>))}
  <div className="card form"><h3 className="full">Additional details (optional)</h3>
   {X.map(([k,l])=><label key={k} className="full"><span>{l}</span><textarea rows="2" value={extras[k]} onChange={e=>setExtras({...extras,[k]:e.target.value})}/></label>)}</div>
  <div className="row"><button className="btn" onClick={save}>Save assessment</button>
   <button className="btn ghost" onClick={()=>setDraft({})}>Clear all ratings</button>
   {!dirty&&c.count>0&&<button className="btn ghost" onClick={()=>go(state.role?'gaps':'roles')}>{state.role?'View skill gaps':'Choose a career role'}</button>}</div></div>);
}
