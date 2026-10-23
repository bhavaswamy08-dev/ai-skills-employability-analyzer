import {TIPS,RESOURCES,skillName} from '../data';
import {rankGaps} from './scoring';
// Rule-based: every non-met required skill gets a predefined topic and next step.
export function recommend(rows){
 return rankGaps([...rows]).map(r=>({
  skill:r.skill,name:skillName(r.skill),priority:r.priority,why:r.why,status:r.status,gap:r.gap,
  topic:TIPS[r.skill][0],
  step:r.status==='Not Assessed'?'Rate this skill in Skills Assessment first, then revisit this recommendation. Suggested practice: '+TIPS[r.skill][1]:TIPS[r.skill][1],
  resources:RESOURCES.filter(x=>x.skill===r.skill)}));
}
