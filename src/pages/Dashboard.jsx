import {getRole,SKILLS,skillName} from '../data';
import {analyze,completion,rankGaps,summarize} from '../utils/scoring';
import {StatCard,EmptyState,ProgressBar,Ring,CompareChart,Badge} from '../components/ui';
export default function Dashboard({state,go}){
 const role=getRole(state.role),comp=completion(state.answers);
 const a=role&&analyze(state.answers,role);
 const rows=a&&a.rows.map(r=>({...r,name:skillName(r.skill)}));
 const strongest=SKILLS.filter(s=>state.answers[s.id]).sort((x,y)=>state.answers[y.id]-state.answers[x.id]).slice(0,3);
 const improve=a?rankGaps([...a.rows]).slice(0,3):[];
 return(<div className="stack">
  <div className="hero card"><div><h1>{state.profile?`Welcome, ${state.profile.name.split(' ')[0]}`:'Welcome to the Employability Analyzer'}</h1>
   <p className="muted">Rate your technical, AI-related and professional skills, pick a target career role, and see an indicative skill-match estimate, your skill gaps and a learning plan.</p>
   <div className="row"><button className="btn" onClick={()=>go(!state.profile?'profile':comp.count===0?'assessment':!role?'roles':'gaps')}>
    {!state.profile?'Create your profile':comp.count===0?'Start skills assessment':!role?'Choose a career role':'View skill gaps'}</button>
    <button className="btn ghost" onClick={()=>go('assessment')}>{comp.count?'Update assessment':'Skills assessment'}</button></div></div>
   <ol className="steps small"><li className={state.profile?'done':''}>Profile</li><li className={comp.count?'done':''}>Assess skills</li><li className={role?'done':''}>Select role</li><li className={a&&comp.count?'done':''}>Review results</li></ol></div>
  <div className="grid3">
   <StatCard label="Selected role" value={role?role.title:'None selected'} hint={role?role.desc:'Choose a role to compute your estimate.'}><button className="link" onClick={()=>go('roles')}>{role?'Change role':'Choose role'}</button></StatCard>
   <StatCard label="Assessment completion" value={`${comp.pct}%`} hint={`${comp.count} of ${comp.total} skills rated`}><ProgressBar value={comp.pct}/></StatCard>
   <StatCard label="Readiness estimate" value={a?`${a.score}%`:'–'} hint={a?a.band:'Needs a role and assessed skills'}>{a&&<ProgressBar value={a.score} tone="navy"/>}</StatCard></div>
  {!role||comp.count===0?<EmptyState title="Your results will appear here" text={comp.count===0?'Complete at least part of the skills assessment, then select a career role.':'Select a career role to compare your skills with its requirements.'} action={comp.count===0?'Go to assessment':'Choose a role'} onAction={()=>go(comp.count===0?'assessment':'roles')}/>:
  <>
   <div className="card row top"><Ring value={a.score}/><div><h3>Readiness summary</h3><p>{summarize(a,role)}</p>
    <p className="small muted">Indicative, rule-based estimate from your self-assessment and predefined demonstration requirements. It does not guarantee employment.</p></div></div>
   <div className="card"><h3>Current proficiency vs. {role.title} requirements</h3><CompareChart rows={rows}/></div>
   <div className="grid2">
    <div className="card"><h3>Strongest assessed skills</h3>{strongest.length?strongest.map(s=><div key={s.id} className="li"><span>{s.name}</span><Badge tone="ok">{state.answers[s.id]}/5</Badge></div>):<p className="muted">None yet.</p>}</div>
    <div className="card"><h3>Skills requiring improvement</h3>{improve.length?improve.map(r=><div key={r.skill} className="li"><span>{skillName(r.skill)}</span><Badge>{r.status}</Badge></div>):<p className="muted">All required skills meet the requirement.</p>}</div></div>
   <div className="row"><button className="btn" onClick={()=>go('gaps')}>Skill gap analysis</button><button className="btn ghost" onClick={()=>go('roadmap')}>Learning roadmap</button></div></>}
 </div>);
}
