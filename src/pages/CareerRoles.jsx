import {useState} from 'react';
import {ROLES,skillName} from '../data';
import {Badge} from '../components/ui';
export default function CareerRoles({state,update,notify,go}){
 const [q,setQ]=useState('');
 const term=q.trim().toLowerCase();
 const list=ROLES.filter(r=>!term||r.title.toLowerCase().includes(term)||r.desc.toLowerCase().includes(term)||r.reqs.some(x=>skillName(x.skill).toLowerCase().includes(term)));
 return(<div className="stack"><div><h1>Career Roles</h1><p className="muted">Requirements below are predefined demonstration criteria, not live employer data. Changing the role updates your gaps, recommendations and dashboard.</p></div>
  <div><input type="search" aria-label="Search career roles" placeholder="Search roles or skills (e.g. data, AI, developer, security)..." value={q} onChange={e=>setQ(e.target.value)}/>
   <p className="small muted">Showing {list.length} of {ROLES.length} roles</p></div>
  {list.length===0&&<div className="card"><p className="muted">No roles match "{q}". Try a different keyword.</p></div>}
  <div className="grid2">{list.map(r=>{const on=state.role===r.id;return(
   <div key={r.id} className={`card role ${on?'selected':''}`}><div className="row between"><h3>{r.title}</h3>{on&&<Badge tone="ok">Selected</Badge>}</div>
    <p className="muted">{r.desc}</p>
    <table className="mini"><thead><tr><th>Required skill</th><th>Level</th><th>Weight</th></tr></thead><tbody>
     {r.reqs.map(x=><tr key={x.skill}><td>{skillName(x.skill)}</td><td>{x.level}/5</td><td>{x.weight}</td></tr>)}</tbody></table>
    <button className={`btn ${on?'ghost':''}`} disabled={on} onClick={()=>{update({role:r.id});notify(`Target role set to ${r.title}.`);}}>{on?'Current target role':'Select this role'}</button></div>);})}</div>
  {state.role&&<button className="btn" onClick={()=>go('gaps')}>See skill gap analysis</button>}</div>);
}
