import {useEffect,useState} from 'react';
import {load,save,clearAll,defaults} from './utils/storage';
import {ConfirmationDialog} from './components/ui';
import Dashboard from './pages/Dashboard';import Profile from './pages/Profile';import Assessment from './pages/Assessment';
import CareerRoles from './pages/CareerRoles';import SkillGapAnalysis from './pages/SkillGapAnalysis';import LearningRoadmap from './pages/LearningRoadmap';
const NAV=[['dashboard','Dashboard',Dashboard],['profile','My Profile',Profile],['assessment','Skills Assessment',Assessment],['roles','Career Roles',CareerRoles],['gaps','Skill Gap Analysis',SkillGapAnalysis],['roadmap','Learning Roadmap',LearningRoadmap]];
export default function App(){
 const [state,setState]=useState(load),[page,setPage]=useState('dashboard'),[toast,setToast]=useState(''),[confirm,setConfirm]=useState(false),[ver,setVer]=useState(0);
 useEffect(()=>save(state),[state]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t);},[toast]);
 const update=p=>setState(s=>({...s,...p})),go=p=>{setPage(p);window.scrollTo(0,0);};
 const Page=NAV.find(n=>n[0]===page)[2];
 const reset=()=>{clearAll();setState(defaults());setVer(v=>v+1);setConfirm(false);setPage('dashboard');setToast('Demo data reset.');};
 return(<div className="app">
  <aside className="side"><div className="brand">AI Skills &amp; Employability<small>Analyzer</small></div>
   <nav>{NAV.map(([k,l])=><button key={k} className={page===k?'active':''} onClick={()=>go(k)}>{l}</button>)}</nav>
   <button className="reset" onClick={()=>setConfirm(true)}>Reset demo data</button></aside>
  <main><Page key={page+ver} state={state} update={update} notify={setToast} go={go}/></main>
  {toast&&<div className="toast" role="status">{toast}</div>}
  {confirm&&<ConfirmationDialog title="Reset demo data?" text="This permanently deletes your profile, assessment, role, learning progress and feedback from this browser." confirmLabel="Reset everything" onConfirm={reset} onCancel={()=>setConfirm(false)}/>}
 </div>);
}
