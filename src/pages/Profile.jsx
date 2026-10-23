import {useState} from 'react';
const F=[['name','Full name','text'],['email','Email address','email'],['university','University','text'],['program','Degree / program','text'],['year','Current year of study','select'],['specialization','Area of specialization','text'],['goal','Career goal','text']];
const REQ=['name','email','university','program','year','goal'];
export default function Profile({state,update,notify}){
 const [f,setF]=useState({name:'',email:'',university:'',program:'',year:'',specialization:'',goal:'',...state.profile});
 const [err,setErr]=useState({});
 const submit=e=>{e.preventDefault();const er={};
  REQ.forEach(k=>{if(!String(f[k]).trim())er[k]='This field is required.';});
  if(f.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))er.email='Enter a valid email address.';
  setErr(er);if(Object.keys(er).length)return;
  update({profile:{...f,name:f.name.trim()}});notify('Profile saved.');};
 return(<div className="stack"><div><h1>My Profile</h1><p className="muted">{state.profile?'Edit your details and save.':'Create a local demo profile. No account or email verification is needed; data stays in this browser.'}</p></div>
  <form className="card form" onSubmit={submit} noValidate>
   {F.map(([k,l,t])=>(<label key={k}><span>{l}{REQ.includes(k)&&' *'}</span>
    {t==='select'?<select value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}><option value="">Select year</option>{['1st year','2nd year','3rd year','4th year','Postgraduate'].map(y=><option key={y}>{y}</option>)}</select>
    :<input type={t} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/>}
    {err[k]&&<em className="err">{err[k]}</em>}</label>))}
   <div className="full"><button className="btn" type="submit">Save profile</button></div></form></div>);
}
