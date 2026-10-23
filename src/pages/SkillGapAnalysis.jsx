import {getRole,skillName} from '../data';
import {analyze,completion,rankGaps} from '../utils/scoring';
import {EmptyState,ProgressBar,Badge,CompareChart} from '../components/ui';
export default function SkillGapAnalysis({state,go}){
 const role=getRole(state.role);
 if(!role)return <EmptyState title="No career role selected" text="Select a role to compare your skills with its requirements." action="Choose a role" onAction={()=>go('roles')}/>;
 const a=analyze(state.answers,role),comp=completion(state.answers);
 const rows=a.rows.map(r=>({...r,name:skillName(r.skill)})),ranked=rankGaps([...rows]);
 return(<div className="stack"><div><h1>Skill Gap Analysis</h1><p className="muted">Target role: <b>{role.title}</b>. Estimated readiness: <b>{a.score}%</b> ({a.band}).</p></div>
  {comp.count===0&&<EmptyState title="No skills assessed yet" text="All skills show as Not Assessed until you rate them." action="Start assessment" onAction={()=>go('assessment')}/>}
  <div className="card"><h3>Comparison</h3><CompareChart rows={rows}/></div>
  <div className="card"><h3>Gap table and score calculation</h3><div className="scroll"><table><thead><tr><th>Skill</th><th>Current</th><th>Required</th><th>Gap</th><th>Status</th><th>Weight</th><th>min(cur, req) × weight</th></tr></thead><tbody>
   {rows.map(r=><tr key={r.skill}><td>{r.name}<ProgressBar value={r.current?r.current*20:0} tone={r.status==='Meets Requirement'?'':'navy'}/></td><td>{r.current??'Not assessed'}</td><td>{r.level}</td><td>{r.gap??'–'}</td><td><Badge>{r.status}</Badge></td><td>{r.weight}</td><td>{r.points} / {r.maxPoints}</td></tr>)}
   <tr className="total"><td colSpan="6">Total</td><td>{a.earned} / {a.max}</td></tr></tbody></table></div>
   <p className="small">Skill match % = Σ(min(current, required) × weight) ÷ Σ(required × weight) × 100 = {a.earned} ÷ {a.max} × 100 = <b>{a.score}%</b>. Unassessed skills score 0 points until rated.</p>
   <p className="small muted">Disclaimer: this is an indicative, rule-based estimate from your self-assessment and predefined demonstration requirements. It is not an AI prediction and does not guarantee employment.</p></div>
  <div className="card"><h3>Priority ranking (importance × gap size)</h3>
   {ranked.length===0?<p className="muted">Every required skill meets the requirement.</p>:ranked.map((r,i)=>(
    <div className="li top" key={r.skill}><div><b>{i+1}. {r.name}</b> <span className="small muted">{r.status==='Not Assessed'?'(not assessed)':`(gap ${r.gap})`}</span><div className="small muted">Why it matters: {r.why}</div></div><Badge>{r.priority}</Badge></div>))}
   {ranked.length>0&&<button className="btn" onClick={()=>go('roadmap')}>Open learning roadmap</button>}</div></div>);
}
