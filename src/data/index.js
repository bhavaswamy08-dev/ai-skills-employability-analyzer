// Predefined demonstration data (not live employer data).
export const LEVELS=[
 {v:1,name:'Beginner',desc:'Aware of the concept; need guidance for even basic tasks.'},
 {v:2,name:'Basic',desc:'Can do simple tasks with reference material.'},
 {v:3,name:'Intermediate',desc:'Work independently on typical tasks.'},
 {v:4,name:'Advanced',desc:'Handle complex tasks and help others.'},
 {v:5,name:'Proficient',desc:'Expert-level; could teach it and design solutions.'}];
export const CATEGORIES=['Technical skills','AI-related skills','Professional skills'];
export const SKILLS=[
 ['prog','Programming fundamentals',0],['lang','Python or Java',0],['dsa','Data structures and algorithms',0],['sql','SQL and databases',0],['web','Web development',0],['data','Data analysis',0],
 ['genai','Generative AI tool usage',1],['prompt','Prompt engineering',1],['limits','Understanding AI limitations',1],['aips','AI-assisted problem-solving',1],['ml','Basic machine-learning concepts',1],
 ['comm','Communication',2],['prob','Problem-solving',2],['team','Teamwork',2],['crit','Critical thinking',2]
].map(([id,name,cat])=>({id,name,cat}));
export const skillName=id=>SKILLS.find(s=>s.id===id)?.name||id;
const R=(id,title,desc,reqs)=>({id,title,desc,reqs:reqs.map(([skill,level,weight,why])=>({skill,level,weight,why}))});
export const ROLES=[
 R('swe','Software Developer','Designs, builds and tests software applications.',[
  ['prog',4,5,'Core coding ability underpins every development task.'],['lang',4,5,'Day-to-day work needs fluency in a main language.'],
  ['dsa',3,4,'Efficient solutions and technical interviews rely on it.'],['sql',3,3,'Most applications store and query data.'],
  ['prob',4,4,'Debugging and design are structured problem-solving.'],['team',3,3,'Software is built collaboratively.']]),
 R('da','Data Analyst','Turns data into insights that support decisions.',[
  ['sql',4,5,'Querying data is the daily starting point.'],['data',4,5,'Cleaning, summarising and visualising data is the role itself.'],
  ['lang',3,4,'Python scripting extends analysis beyond spreadsheets.'],['crit',4,4,'Insights must be questioned and validated.'],
  ['comm',3,3,'Findings only matter when stakeholders understand them.']]),
 R('ai','AI Tools and Automation Associate','Applies existing AI tools to streamline work processes.',[
  ['genai',4,5,'Choosing and using AI tools effectively is the main task.'],['prompt',4,5,'Prompt quality directly drives output quality.'],
  ['limits',4,4,'Knowing risks (errors, bias, privacy) keeps usage responsible.'],['prog',3,3,'Light scripting enables automation.'],
  ['prob',3,3,'Workflows must be broken into automatable steps.']]),
 R('cloud','Cloud Support Associate','Helps customers resolve cloud service and infrastructure issues.',[
  ['prob',4,5,'Troubleshooting is the heart of support work.'],['comm',4,4,'Clear explanations are needed for customers.'],
  ['prog',3,3,'Scripting helps diagnose and automate fixes.'],['sql',3,3,'Support often involves checking data and logs.'],
  ['team',3,3,'Escalations require smooth teamwork.'],['crit',3,3,'Root-cause analysis needs evidence-based thinking.']]),
 R('web','Web Developer','Builds and maintains websites and web applications.',[
  ['web',4,5,'HTML, CSS and JavaScript are the core toolkit.'],['prog',4,4,'Logic and structure are needed for interactive features.'],
  ['lang',3,3,'Back-end or tooling work often uses Python or Java.'],['sql',2,2,'Dynamic sites read and write database data.'],
  ['team',3,3,'Design and development are shared work.'],['prob',3,3,'Browser bugs demand systematic debugging.']]),
  R('ml','Machine Learning Engineer','Builds, trains and deploys machine-learning models.',[
  ['ml',4,5,'Model selection and evaluation are the core of the role.'],['lang',4,5,'Python is the primary language for ML work.'],
  ['dsa',3,3,'Efficient data handling and algorithms matter at scale.'],['data',4,4,'Models depend on well-prepared data.'],
  ['prob',4,3,'Experiments need structured problem-solving.']]),
 R('ds','Data Scientist','Uses statistics and modelling to extract predictive insights.',[
  ['data',4,5,'Exploring and modelling data is the daily work.'],['ml',3,4,'Predictive models extend analysis.'],
  ['lang',4,4,'Python scripting powers analysis pipelines.'],['sql',3,3,'Data must be pulled from databases.'],
  ['crit',4,4,'Findings must be validated and questioned.'],['comm',3,3,'Insights must be explained to stakeholders.']]),
 R('be','Backend Developer','Builds server-side logic, APIs and databases.',[
  ['prog',4,5,'Core coding ability for services and APIs.'],['lang',4,5,'Fluency in Java or Python is expected.'],
  ['sql',4,4,'Database design and queries are central.'],['dsa',3,3,'Performance relies on sound data structures.'],
  ['prob',4,3,'Debugging distributed issues needs structure.']]),
 R('fe','Frontend Developer','Creates the user-facing part of web applications.',[
  ['web',5,5,'HTML, CSS and JavaScript mastery is the core toolkit.'],['prog',3,4,'Logic drives interactive interfaces.'],
  ['comm',3,3,'Working with designers and users needs clarity.'],['team',3,3,'UI work is highly collaborative.'],
  ['prob',3,3,'Cross-browser bugs need systematic debugging.']]),
 R('fs','Full Stack Developer','Works across front-end, back-end and databases.',[
  ['web',4,5,'Front-end skills are required end to end.'],['prog',4,5,'Strong coding underpins both layers.'],
  ['lang',3,4,'Back-end work uses Python or Java.'],['sql',3,4,'Applications need data storage.'],
  ['team',3,3,'Full stack work spans many collaborators.'],['prob',4,3,'Issues can arise anywhere in the stack.']]),
 R('qa','QA / Test Engineer','Ensures software quality through testing and automation.',[
  ['crit',4,5,'Spotting edge cases needs careful evaluation.'],['prob',4,4,'Reproducing and isolating bugs is core work.'],
  ['prog',3,4,'Test automation needs scripting.'],['comm',4,4,'Bug reports must be clear and precise.'],
  ['sql',2,2,'Data validation often involves queries.'],['team',3,3,'Testers work closely with developers.']]),
 R('devops','DevOps Engineer','Automates building, deploying and operating software.',[
  ['prog',4,5,'Scripting and automation are daily tasks.'],['lang',3,4,'Python is common for tooling.'],
  ['prob',4,5,'Diagnosing pipeline and infra failures is key.'],['team',4,4,'DevOps bridges development and operations.'],
  ['sql',2,2,'Basic data and log queries help troubleshooting.']]),
 R('cyber','Cybersecurity Analyst','Monitors and protects systems from security threats.',[
  ['crit',4,5,'Assessing threats needs evidence-based thinking.'],['prob',4,5,'Investigating incidents is structured problem-solving.'],
  ['prog',3,3,'Scripting helps automate detection and response.'],['sql',3,3,'Log analysis often uses queries.'],
  ['comm',3,3,'Incidents must be reported clearly.'],['limits',3,2,'Understanding AI-driven threats and tools matters.']]),
 R('dba','Database Administrator','Maintains, secures and optimises databases.',[
  ['sql',5,5,'Advanced SQL is the central skill.'],['data',3,3,'Understanding data structure aids design.'],
  ['prob',4,4,'Performance tuning needs systematic analysis.'],['prog',3,3,'Scripting automates maintenance.'],
  ['crit',3,3,'Changes must be evaluated for risk.']]),
 R('bi','Business Intelligence Analyst','Builds dashboards and reports for business decisions.',[
  ['data',4,5,'Visualising and summarising data is the role itself.'],['sql',4,5,'Reports are built on queries.'],
  ['comm',4,4,'Insights must be explained to non-technical users.'],['crit',3,3,'Metrics must be questioned and validated.']]),
 R('pe','Prompt Engineer','Designs and refines prompts for generative AI systems.',[
  ['prompt',5,5,'Prompt design is the role itself.'],['genai',4,5,'Deep familiarity with generative AI tools is required.'],
  ['limits',4,4,'Handling hallucinations and bias is essential.'],['aips',4,3,'AI-assisted workflows must be verified.'],
  ['comm',4,3,'Clear language produces clear outputs.']]),
 R('aie','AI Engineer','Integrates AI models into real applications.',[
  ['ml',3,4,'Understanding models guides integration choices.'],['prog',4,5,'Building applications around models needs coding.'],
  ['lang',4,4,'Python is the main integration language.'],['genai',4,4,'Working with generative AI is routine.'],
  ['limits',4,3,'Responsible deployment requires awareness of limits.'],['prob',3,3,'Integration issues need structured debugging.']]),
 R('airesp','Responsible AI Analyst','Reviews AI use for bias, privacy, safety and compliance.',[
  ['limits',5,5,'Knowing AI risks is the core of the role.'],['crit',4,5,'Audits depend on evaluating evidence.'],
  ['genai',3,3,'Familiarity with AI tools informs reviews.'],['comm',4,4,'Findings must be explained to decision makers.'],
  ['ml',3,3,'Basic ML knowledge helps assess model behaviour.']]),
 R('mobile','Mobile App Developer','Builds apps for Android and iOS devices.',[
  ['prog',4,5,'Strong coding underpins app logic.'],['lang',4,5,'Java or Python-based tooling is widely used.'],
  ['web',3,3,'Web skills transfer to cross-platform frameworks.'],['dsa',3,3,'Efficient apps need good data handling.'],
  ['prob',3,3,'Device-specific bugs need systematic debugging.']]),
 R('game','Game Developer','Creates interactive games and game systems.',[
  ['prog',4,5,'Game logic is code-heavy.'],['lang',4,4,'Fluency in a main language is required.'],
  ['dsa',4,4,'Performance relies on efficient algorithms.'],['team',3,3,'Games are built by multidisciplinary teams.'],
  ['prob',4,3,'Gameplay bugs need structured debugging.']]),
 R('tech_support','IT Support Specialist','Helps users resolve hardware, software and network issues.',[
  ['prob',4,5,'Troubleshooting is the heart of the role.'],['comm',4,5,'Explaining fixes to non-technical users is key.'],
  ['team',3,3,'Escalations need smooth collaboration.'],['crit',3,3,'Root-cause analysis needs careful thinking.']]),
 R('ba','Business Analyst','Bridges business needs and technical solutions.',[
  ['comm',5,5,'Gathering and explaining requirements is the role.'],['crit',4,5,'Requirements must be questioned and validated.'],
  ['data',3,4,'Data supports business cases.'],['sql',3,3,'Querying data helps verify needs.'],
  ['team',4,3,'Analysts work across many stakeholders.']]),
 R('pm','Technical Project Manager','Plans and delivers technology projects with teams.',[
  ['comm',5,5,'Coordinating people and expectations is the job.'],['team',5,4,'Leading collaboration is core.'],
  ['prob',4,4,'Risks and blockers need structured resolution.'],['crit',4,3,'Decisions need evidence.'],
  ['aips',3,2,'AI tools can speed planning and reporting.']]),
 R('uiux','UI/UX Designer','Designs usable and engaging digital experiences.',[
  ['comm',4,5,'Communicating design decisions is vital.'],['crit',4,4,'Design choices need user evidence.'],
  ['web',3,4,'Understanding web tech makes designs feasible.'],['team',4,3,'Design is collaborative.'],
  ['genai',3,2,'AI tools help ideation and prototyping.']]),
 R('tw','Technical Writer','Creates clear documentation for technical products.',[
  ['comm',5,5,'Clear writing is the role itself.'],['crit',4,4,'Accuracy needs careful checking.'],
  ['prog',2,3,'Basic coding helps document APIs.'],['genai',3,3,'AI writing tools speed drafting when verified.'],
  ['limits',3,3,'AI output must be fact-checked.']])];
export const getRole=id=>ROLES.find(r=>r.id===id)||null;
export const TIPS={
 prog:['variables, control flow, functions and debugging','Solve five small exercises a week and explain each solution aloud.'],
 lang:['functions, collections, file handling and object-oriented basics','Build a small command-line app such as an expense tracker.'],
 dsa:['arrays, hash maps, stacks, queues, sorting and Big-O','Solve two easy practice problems a week and note their complexity.'],
 sql:['SELECT, filtering, joins, aggregation and subqueries','Write ten queries on a sample database covering joins and GROUP BY.'],
 web:['HTML, CSS, JavaScript and responsive layout','Build and publish a small personal page.'],
 data:['cleaning, summarising and visualising datasets','Analyse a public CSV dataset and write three findings.'],
 genai:['choosing and using generative AI tools responsibly','Use a tool on one real study task and record what worked and what failed.'],
 prompt:['clear prompts, context, output formats and checking results','Rewrite five vague prompts with context and format, then compare outputs.'],
 limits:['hallucinations, bias, privacy and responsible AI usage','Fact-check three AI answers against reliable sources.'],
 aips:['breaking problems into steps and verifying AI suggestions','Solve a problem with AI help, then verify and document each step.'],
 ml:['supervised vs unsupervised learning, training/testing and overfitting','Complete one introductory module and summarise the key terms.'],
 comm:['clear writing, presenting and explaining technical ideas','Give a five-minute talk on a project and ask for feedback.'],
 prob:['decomposing problems and systematic debugging','For each task write: define, split, test, review.'],
 team:['collaboration, Git workflows and roles in group projects','Join a group project and take a clearly defined role.'],
 crit:['evaluating evidence, assumptions and arguments','Review an article and list its claims, evidence and gaps.']};
export const RESOURCES=[
 ['r1','CS50x: Introduction to Computer Science','prog','Learn programming and problem-solving foundations.','Beginner','Course','https://cs50.harvard.edu/x/'],
 ['r2','The Python Tutorial (official docs)','lang','Practise functions, data structures and modules.','Beginner','Documentation','https://docs.python.org/3/tutorial/'],
 ['r3','Dev.java Learn','lang','Learn Java language basics and core APIs.','Beginner','Tutorial','https://dev.java/learn/'],
 ['r4','VisuAlgo','dsa','Visualise core data structures and algorithms.','Intermediate','Interactive tool','https://visualgo.net/'],
 ['r5','SQLBolt','sql','Learn SELECT, joins and aggregation interactively.','Beginner','Tutorial','https://sqlbolt.com/'],
 ['r6','MDN: Learn Web Development','web','Build HTML, CSS and JavaScript skills.','Beginner','Tutorial','https://developer.mozilla.org/en-US/docs/Learn'],
 ['r7','10 minutes to pandas','data','Load, clean and summarise data with pandas.','Intermediate','Documentation','https://pandas.pydata.org/docs/user_guide/10min.html'],
 ['r8','Prompt Engineering Guide','prompt','Write clear prompts with context and output formats.','Beginner','Guide','https://www.promptingguide.ai/'],
 ['r9','Elements of AI','limits','Understand what AI can and cannot do.','Beginner','Course','https://www.elementsofai.com/'],
 ['r10','Machine Learning Crash Course (Google)','ml','Learn basic machine-learning concepts.','Intermediate','Course','https://developers.google.com/machine-learning/crash-course'],
 ['r11','Elements of AI','ml','Grasp ML concepts without heavy mathematics.','Beginner','Course','https://www.elementsofai.com/'],
 ['r12','Practice project: use a generative AI tool on a study task','genai','Compare tool outputs and note strengths and failures.','Beginner','Practice project',''],
 ['r13','Practice project: solve a problem with AI help and verify it','aips','Document and verify each AI-assisted step.','Intermediate','Practice project',''],
 ['r14','Practice project: five-minute technical talk','comm','Explain a project clearly and gather feedback.','Beginner','Practice project',''],
 ['r15','Practice project: group software project','team','Practise roles, planning and version control.','Intermediate','Practice project',''],
 ['r16','Practice project: article claim-and-evidence review','crit','Identify assumptions and weak evidence.','Beginner','Practice project',''],
 ['r17','Practice project: debugging log','prob','Record and solve ten bugs using a fixed method.','Intermediate','Practice project',''],
 ['r18','Practice project: prompt rewrite exercise','prompt','Improve five vague prompts and compare results.','Beginner','Practice project','']
].map(([id,title,skill,objective,difficulty,type,url])=>({id,title,skill,objective,difficulty,type,url}));
export const STATUSES=[['','Not started'],['planned','Planned'],['progress','In progress'],['done','Completed']];
