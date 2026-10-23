import {SKILLS} from '../data';
// Skill match % = sum(min(user, required) x weight) / sum(required x weight) x 100
// Unassessed skills contribute 0 points (never treated as proven) and are flagged "Not Assessed".
export function completion(answers){
 const count=SKILLS.filter(s=>Number.isInteger(answers[s.id])).length;
 return {count,total:SKILLS.length,pct:Math.round(count/SKILLS.length*100)};
}
export function priorityOf(weight,gap,level){
 const p=weight*(gap??level); return p>=12?'High':p>=6?'Medium':'Low';
}
export function analyze(answers,role){
 const rows=role.reqs.map(r=>{
  const u=answers[r.skill],assessed=Number.isInteger(u);
  const matched=assessed?Math.min(u,r.level):0,gap=assessed?Math.max(0,r.level-u):null;
  const status=!assessed?'Not Assessed':gap>0?'Needs Improvement':'Meets Requirement';
  return {...r,current:assessed?u:null,matched,gap,status,points:matched*r.weight,maxPoints:r.level*r.weight,
   rank:r.weight*(gap??r.level),priority:priorityOf(r.weight,gap,r.level)};
 });
 const earned=rows.reduce((a,r)=>a+r.points,0),max=rows.reduce((a,r)=>a+r.maxPoints,0);
 const score=max>0?Math.round(earned/max*1000)/10:0;
 const band=score>=85?'Strong match':score>=70?'Approaching readiness':score>=40?'Developing':'Early stage';
 return {rows,earned,max,score,band,
  met:rows.filter(r=>r.status==='Meets Requirement').length,
  unassessed:rows.filter(r=>r.status==='Not Assessed').length};
}
export const rankGaps=rows=>rows.filter(r=>r.status!=='Meets Requirement').sort((a,b)=>b.rank-a.rank);
export function summarize(a,role){
 let t=`Your indicative match for ${role.title} is ${a.score}% (${a.band.toLowerCase()}). You meet ${a.met} of ${a.rows.length} requirements`;
 if(a.unassessed)t+=` and ${a.unassessed} required skill${a.unassessed>1?'s are':' is'} not yet assessed, which counts as 0 points until rated`;
 return t+'.';
}
