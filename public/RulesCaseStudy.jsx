import { useState, useEffect } from 'react'
import Nav from '../components/Nav.jsx'

const accent='#4a7c6f',accentDark='#2d5c52',accentMid='rgba(74,124,111,0.4)',accentLight='rgba(74,124,111,0.12)',accentPale='#e8f0ee',textLight='#f6fbde',warmGray='#59504a',deepBlue='#62748e',cream='#fbfaf4',borderLight='rgba(202,213,226,0.2)',terracotta='#b17c5d'
const sideP='clamp(24px, 12vw, 180px)',contentW='1000px'
const sec=(bg)=>({width:'100%',padding:`120px ${sideP}`,background:bg})
const ct={maxWidth:contentW,width:'100%',margin:'0 auto'}

function StepLabel({children,light}){
  return <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:light?'rgba(232,240,238,0.7)':accent,display:'flex',alignItems:'center',gap:10,marginBottom:24}}>{children}<span style={{flex:1,height:1,background:light?'rgba(255,255,255,0.15)':'rgba(74,124,111,0.2)'}}/></div>
}

function Callout({icon,title,body,style:s}){
  return <div style={{marginTop:40,padding:'28px 36px',background:accentLight,border:'1px solid rgba(74,124,111,0.2)',borderRadius:12,display:'flex',gap:16,alignItems:'flex-start',...s}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>{icon}</span><div><p style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:accentDark,marginBottom:6}}>{title}</p><p style={{fontSize:14,lineHeight:1.65,color:warmGray}}>{body}</p></div></div>
}

function ImgFrame({label,children}){
  return <div style={{borderRadius:10,overflow:'hidden',border:`1px solid ${borderLight}`,background:'rgba(202,213,226,0.08)'}}><div style={{padding:'10px 16px',borderBottom:`1px solid ${borderLight}`,fontSize:11,fontWeight:600,color:deepBlue,background:'white',letterSpacing:'0.03em'}}>{label}</div><div style={{padding:20}}>{children}</div></div>
}

function Placeholder({h=200,label,warm}){
  return <div style={{background:warm?'linear-gradient(135deg,#f5f0eb,#ede8e3)':'linear-gradient(135deg,#f0f4f3,#e8f0ee)',border:`1px solid ${warm?'rgba(177,124,93,0.2)':'rgba(74,124,111,0.2)'}`,borderRadius:10,height:h,display:'flex',alignItems:'center',justifyContent:'center',color:warm?terracotta:accent,fontSize:12,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',textAlign:'center',padding:'0 20px'}}>{label}</div>
}

const blobColors={g:'#7ec870',y:'#f5c542',b:'#6ab4e8',o:'#f59a7a',p:'#e8a0d0'}
const stickyColor=(c)=>({bg:blobColors[c],text:c==='g'?'#1a3d12':c==='y'?'#3d2800':c==='b'?'#0a2540':c==='o'?'#3d0a00':'#3d0028'})

const thumbClusters=[
  {id:1,title:'Rules list lacks searchability',blobs:[['g',44],['o',50],['p',42],['y',48]]},
  {id:2,title:'Keyword selection is opaque',blobs:[['g',48],['y',52],['b',44],['y',40]]},
  {id:3,title:'Difficult to build rules without tribal knowledge',blobs:[['g',52],['b',44],['y',48],['y',40]]},
  {id:4,title:'Insufficient documentation and audit tracking',span2:true,blobs:[['o',48],['y',44],['o',52],['b',46],['g',40],['o',50],['g',44],['b',42]]},
  {id:5,title:'Help content not accessible',blobs:[['g',46],['p',50],['b',52],['y',38]]},
  {id:6,title:'Triggered rules lack visibility',span2:true,blobs:[['b',52],['b',48],['o',44],['g',50]]},
]

const fullClusters=[
  {id:1,label:'Cluster 01',title:'Rules list lacks searchability',stickies:[{c:'g',t:"inactive rules take up space — nice to filter off ones you don't need"},{c:'o',t:'finding rule use ctrl + F — use separate Excel to track changes'},{c:'p',t:'search on rules list could be better — do ctrl+F for rules with a criteria'},{c:'y',t:'smart search for keywords — on metadata like a book catalog'}]},
  {id:2,label:'Cluster 02',title:'Keyword selection is opaque and error-prone',stickies:[{c:'g',t:'would be helpful to have keyword definition info where you are selecting it'},{c:'y',t:'only know what keyword means by trial and error — select and click next'},{c:'b',t:'cumbersome to figure out what keywords apply — call NFS, trial and error'},{c:'y',t:'today email CSM to ask what a keyword does if not familiar with it'}]},
  {id:3,label:'Cluster 03',title:'Difficult to build a rule without tribal knowledge',stickies:[{c:'g',t:'linear box for long entries — not easy to enter or jump to end of 60 entries'},{c:'b',t:'hard to know where to find help — not intuitive to click the question mark'},{c:'y',t:'formatting long list of symbols to put in the system'},{c:'y',t:'took a couple years to really understand who this would impact'}]},
  {id:4,label:'Cluster 04',title:'Insufficient documentation and audit tracking',span2:true,stickies:[{c:'o',t:'rule creation free form — put the list into Excel and concatenate'},{c:'y',t:'list of rules — have to go into each rule, copy to Excel to search'},{c:'o',t:'track in SharePoint — reason for creating the rule, rationale when trader calls'},{c:'b',t:'rules change log would be helpful — in platform, not a separate Excel'},{c:'g',t:'hard to see what changed — which column to look at'},{c:'o',t:'jumping back and forth — lose my place, creates room for error'},{c:'g',t:'free form personal notes — tracking why rule was created, changed'},{c:'b',t:'ask for a reason when someone makes a change — optional or required'}]},
  {id:5,label:'Cluster 05',title:'Help content not accessible',stickies:[{c:'g',t:'never seen help content — too far away'},{c:'p',t:'apply to managed acct advisor and super trader — not super descriptive'},{c:'b',t:"doesn't know help content exists — didn't know that was here, that's cool"},{c:'y',t:'hover to see keyword meaning would be too much — needs a dedicated button'}]},
  {id:6,label:'Cluster 06',title:'Triggered rules lack visibility',span2:true,stickies:[{c:'b',tall:true,t:'no plain-language explanation of why a rule blocked a trade — just the rule name'},{c:'b',tall:true,t:'rule conditions may have changed since it triggered — no way to know without digging'},{c:'o',t:'no paper trail connecting a triggered rule to what the conditions were at that moment'},{c:'g',t:'compliance user has to manually reconstruct what happened when a trader calls'},{c:'y',t:'rule name alone is not enough context — need to see what criteria matched'}]},
]

function AffinityMap(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  return(<>
    <div onClick={()=>setOpen(true)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setOpen(true)} style={{background:'linear-gradient(145deg,#1e2e2a,#243830)',borderRadius:20,padding:'28px 28px 22px',cursor:'pointer',boxShadow:'0 8px 40px rgba(0,0,0,0.18)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(74,124,111,0.85)'}}>FigJam — Synthesis Board</span>
        <span style={{fontSize:11,fontWeight:600,color:'rgba(246,251,222,0.6)',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:20,padding:'5px 14px'}}>⛶ Explore board</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
        {thumbClusters.map(cl=>(
          <div key={cl.id} style={{gridColumn:cl.span2?'span 2':undefined,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:10,padding:12}}>
            <div style={{fontSize:8.5,fontWeight:700,color:'rgba(246,251,222,0.75)',marginBottom:8,lineHeight:1.3}}>{cl.title}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{cl.blobs.map(([c,w],i)=><div key={i} style={{height:18,width:w,borderRadius:3,background:blobColors[c],opacity:0.75}}/>)}</div>
          </div>
        ))}
      </div>
    </div>
    {open&&(
      <div style={{position:'fixed',inset:0,zIndex:9000,background:'#1e2e2a',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 28px',background:'rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(74,124,111,0.9)'}}>Synthesis Board — FigJam</div>
            <div style={{fontSize:10,color:'rgba(246,251,222,0.3)',fontStyle:'italic',marginTop:3}}>Simplified for portfolio — representative stickies shown, not all verbatims included</div>
          </div>
          <button onClick={()=>setOpen(false)} style={{width:32,height:32,borderRadius:8,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',color:'rgba(246,251,222,0.7)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>
        <div style={{flex:1,overflowX:'auto',overflowY:'hidden',padding:'32px 40px 24px'}}>
          <div style={{display:'flex',flexDirection:'row',gap:16,alignItems:'flex-start',minWidth:'max-content'}}>
            {fullClusters.map(cl=>(
              <div key={cl.id} style={{width:cl.span2?520:320,flexShrink:0,background:'rgba(255,255,255,0.055)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,padding:'18px 16px 16px'}}>
                <div style={{paddingBottom:12,borderBottom:'1px solid rgba(255,255,255,0.08)',marginBottom:10}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(74,124,111,0.9)',marginBottom:4}}>{cl.label}</div>
                  <div style={{fontSize:12,fontWeight:700,color:'rgba(246,251,222,0.9)',lineHeight:1.3}}>{cl.title}</div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:cl.span2?'1fr 1fr 1fr 1fr':'1fr 1fr',gap:8}}>
                  {cl.stickies.map((s,i)=>{const sc=stickyColor(s.c);return <div key={i} style={{borderRadius:6,padding:'10px 11px',fontSize:13,lineHeight:1.5,fontWeight:500,background:sc.bg,color:sc.text,boxShadow:'0 2px 8px rgba(0,0,0,0.2)',gridRow:s.tall?'span 2':undefined}}>{s.t}</div>})}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </>)
}

function PrototypeLauncher(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  return(<>
    <div onClick={()=>setOpen(true)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setOpen(true)} style={{background:'linear-gradient(145deg,#26303e,#2d3a4a)',borderRadius:16,padding:'24px 28px',cursor:'pointer',boxShadow:'0 8px 32px rgba(66,125,219,0.18)',border:'1px solid rgba(66,125,219,0.2)',display:'flex',alignItems:'center',gap:28,marginBottom:40}}>
      {/* Mini thumbnail */}
      <div style={{width:220,height:132,background:'#1e2a38',borderRadius:8,overflow:'hidden',flexShrink:0,border:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{background:'rgba(38,48,62,0.95)',height:26,borderBottom:'2px solid rgba(66,125,219,0.6)',display:'flex',alignItems:'center',padding:'0 10px',gap:6}}>
          <div style={{height:4,width:4,borderRadius:'50%',background:'rgba(255,255,255,0.2)'}}/>
          <span style={{fontSize:8,color:'rgba(255,255,255,0.45)',fontWeight:600,letterSpacing:'0.04em'}}>Rule Management</span>
          <div style={{marginLeft:'auto',background:'rgba(66,125,219,0.7)',borderRadius:3,padding:'2px 7px',fontSize:7,color:'#fff',fontWeight:700}}>+ New Rule</div>
        </div>
        <div style={{display:'flex',height:'calc(100% - 26px)'}}>
          <div style={{width:36,background:'rgba(0,0,0,0.2)',borderRight:'1px solid rgba(255,255,255,0.06)',padding:'6px 4px',display:'flex',flexDirection:'column',gap:2,alignItems:'center'}}>
            {[1,0,0,0].map((a,i)=><div key={i} style={{width:18,height:18,borderRadius:4,background:a?'rgba(66,125,219,0.28)':'transparent'}}/>)}
          </div>
          <div style={{flex:1,padding:'5px 7px'}}>
            <div style={{display:'flex',gap:4,marginBottom:4}}>
              <div style={{height:3,borderRadius:2,background:'rgba(66,125,219,0.35)',flex:1}}/>
              <div style={{height:3,borderRadius:2,background:'rgba(255,255,255,0.1)',width:30}}/>
            </div>
            {[true,false,false,false].map((sel,i)=>(
              <div key={i} style={{padding:'4px 5px',marginBottom:2,borderRadius:3,background:sel?'rgba(66,125,219,0.18)':'rgba(255,255,255,0.04)',borderLeft:`2px solid ${sel?'rgba(66,125,219,0.75)':'transparent'}`,display:'flex',gap:5,alignItems:'center'}}>
                <div style={{height:3,borderRadius:2,background:sel?'rgba(255,255,255,0.65)':'rgba(255,255,255,0.18)',flex:1}}/>
                <div style={{height:3,width:16,borderRadius:2,background:sel?'rgba(78,148,102,0.65)':'rgba(255,255,255,0.08)'}}/>
              </div>
            ))}
          </div>
          <div style={{width:60,borderLeft:'1px solid rgba(255,255,255,0.07)',padding:'6px 7px'}}>
            <div style={{height:3,borderRadius:2,background:'rgba(255,255,255,0.2)',marginBottom:5,width:'60%'}}/>
            {['rgba(66,125,219,0.5)','rgba(255,255,255,0.15)','rgba(78,148,102,0.5)','rgba(255,255,255,0.1)','rgba(255,255,255,0.1)'].map((bg,i)=>(
              <div key={i} style={{height:2,borderRadius:2,background:bg,marginBottom:3}}/>
            ))}
          </div>
        </div>
      </div>
      {/* Label + CTA */}
      <div style={{flex:1}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(66,125,219,0.85)',marginBottom:8}}>Interactive Prototype</div>
        <div style={{fontSize:17,fontWeight:700,color:'rgba(255,255,255,0.92)',marginBottom:8,letterSpacing:'-0.2px',lineHeight:1.3}}>Rule Management — Guided Walkthrough</div>
        <p style={{fontSize:12,color:'rgba(255,255,255,0.45)',lineHeight:1.65,marginBottom:18,maxWidth:420}}>A 33-step guided tour through the redesigned rules list and create rule wizard — from filtering and plain-language logic to clause selection, bulk value upload, and review before save.</p>
        <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.75)',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:20,padding:'7px 18px',transition:'all 0.15s'}}>Launch prototype →</span>
      </div>
    </div>
    {open&&(
      <div style={{position:'fixed',inset:0,zIndex:9000,background:'#0d1117',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 20px',background:'rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(66,125,219,0.9)'}}>Interactive Prototype — Rule Management</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.3)',fontStyle:'italic',marginTop:2}}>Use "Start guided tour" in the prototype, or explore freely. Press Esc to return.</div>
          </div>
          <button onClick={(e)=>{e.stopPropagation();setOpen(false)}} style={{width:32,height:32,borderRadius:8,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.7)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>
        <iframe src="/rulemanagementprototype.html" style={{flex:1,border:'none',width:'100%'}} title="Rule Management Prototype"/>
      </div>
    )}
  </>)
}

// Shared dark mockup frame wrapper
const MockFrame = ({label, children}) => (
  <div style={{background:'#1a2e28',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
    <div style={{background:'#162420',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
      {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
      <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{label}</span>
    </div>
    <div style={{padding:'14px 16px'}}>{children}</div>
  </div>
)

const annStyle = {display:'inline-flex',alignItems:'flex-start',gap:4,marginTop:8}
const annArr = {fontSize:11,color:'rgba(255,220,150,0.85)'}
const annTxt = {fontSize:10,fontWeight:600,color:'rgba(255,220,150,0.85)',lineHeight:1.4,fontStyle:'italic'}

const hmwItems=[
  {id:1,pill:'HMW 01',pillText:'Locate, understand & manage rules',
   q:"How might we make it faster to find, understand, and act on rules without digging through a long list?",
   stickies:[{c:'b',t:"Search rules by keyword, channel, status, or metadata — not just by name"},{c:'g',t:"Bulk actions: activate, deactivate, apply to multiple rules at once"},{c:'y',t:"User-created tags to find thematically related rules"},{c:'b',t:"Plain language rule preview visible without navigating from list"}],
   visual:<MockFrame label="Rule Management — search on metadata">
     <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
     <div style={{display:'flex',alignItems:'center',border:'1px solid rgba(255,255,255,0.18)',borderRadius:6,padding:'7px 12px',marginBottom:10,background:'rgba(255,255,255,0.05)',gap:8}}>
       <span style={{fontSize:13,color:'rgba(255,255,255,0.35)'}}>⌕</span>
       <span style={{fontSize:12,flex:1,display:'flex',alignItems:'center',gap:0}}>
         <span style={{color:'rgba(255,255,255,0.85)'}}>AAP</span><span style={{display:'inline-block',width:1.5,height:13,background:'rgba(255,255,255,0.8)',marginLeft:1,animation:'blink 1s step-end infinite',verticalAlign:'middle'}}/> 
       </span>
       <span style={{fontSize:11,color:'rgba(255,255,255,0.25)'}}>Filters</span>
     </div>
     <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:10}}>
       <span style={{fontSize:10,color:'rgba(255,255,255,0.35)'}}>Filters:</span>
       <span style={{fontSize:10,fontWeight:600,padding:'2px 10px',borderRadius:20,background:'rgba(74,190,155,0.2)',border:'1px solid rgba(74,190,155,0.5)',color:'rgba(74,190,155,0.9)'}}>Active</span>
       <span style={{fontSize:10,padding:'2px 10px',borderRadius:20,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.45)'}}>All channels</span>
     </div>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1px 180px',gap:'0 0',alignItems:'stretch'}}>
       <div style={{paddingRight:12}}>
         <div style={{display:'grid',gridTemplateColumns:'1fr 60px',gap:'0 8px',borderBottom:'1px solid rgba(255,255,255,0.08)',paddingBottom:5,marginBottom:6}}>
           {['RULE NAME','STATUS'].map(h=><span key={h} style={{fontSize:8,fontWeight:700,letterSpacing:'0.08em',color:'rgba(255,255,255,0.25)'}}>{h}</span>)}
         </div>
         <div style={{display:'grid',gridTemplateColumns:'1fr 60px',gap:'0 8px',alignItems:'center',padding:'7px 8px',background:'rgba(74,190,155,0.1)',borderRadius:4,borderLeft:'2px solid rgba(74,190,155,0.6)',marginBottom:4}}>
           <span style={{fontSize:11,color:'rgba(255,255,255,0.9)',fontWeight:600}}>Review high dollar tech stock</span>
           <span style={{fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:10,background:'rgba(74,190,155,0.2)',color:'rgba(74,190,155,0.9)',textAlign:'center'}}>Active</span>
         </div>
         {[['Crypto ETF Blacklist','Active'],['Rep Account Monitor','Inactive']].map(([n,s],i)=>(
           <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 60px',gap:'0 8px',alignItems:'center',padding:'6px 8px',borderRadius:4,marginBottom:3,background:'rgba(255,255,255,0.03)'}}>
             <span style={{fontSize:10,color:'rgba(255,255,255,0.5)'}}>{n}</span>
             <span style={{fontSize:9,padding:'1px 6px',borderRadius:10,background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.3)',textAlign:'center'}}>{s}</span>
           </div>
         ))}
         <div style={{marginTop:8,fontSize:10,fontStyle:'italic',color:'rgba(74,190,155,0.6)'}}>1 result for "AAP"</div>
       </div>
       <div style={{background:'rgba(255,255,255,0.08)',margin:'0 0'}}/>
       <div style={{paddingLeft:12}}>
         <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.08em',color:'rgba(255,255,255,0.25)',marginBottom:8,textTransform:'uppercase'}}>Rule Logic</div>
         {[
           {text:<>If Security = <span style={{background:'rgba(74,190,155,0.3)',color:'rgba(74,190,155,1)',fontWeight:700,padding:'0 2px 0 3px',borderRadius:2}}>AAP</span>L, AMZN…</>,bg:'rgba(106,129,178,0.15)',bl:'rgba(180,200,255,0.5)',tc:'rgba(220,230,255,0.9)'},
           {text:'and Action = Buy',bg:'rgba(255,255,255,0.06)',bl:'rgba(200,255,220,0.35)',tc:'rgba(210,255,230,0.8)'},
           {text:'→ REVIEW',bg:'rgba(255,200,150,0.12)',bl:'rgba(255,180,100,0.5)',tc:'rgba(255,220,170,0.9)'},
         ].map((r,i)=>(
           <div key={i} style={{borderRadius:3,padding:'5px 7px',marginBottom:4,background:r.bg,borderLeft:`2px solid ${r.bl}`,color:r.tc,fontSize:10,lineHeight:1.4}}>{r.text}</div>
         ))}
         <div style={{marginTop:10,borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:8}}>
           <div style={{fontSize:9,color:'rgba(255,255,255,0.25)',marginBottom:3}}>Created by K.D. · Mar 2</div>
           <div style={{fontSize:9,color:'rgba(255,255,255,0.25)'}}>Last modified · Mar 10</div>
         </div>
       </div>
     </div>
     <div style={annStyle}><span style={annArr}>↑</span><span style={annTxt}>search on metadata — rule detail visible without navigating from list</span></div>
   </MockFrame>
  },
  {id:2,pill:'HMW 02',pillText:'Find the right keywords',
   q:"How might we make it easier to locate appropriate keywords for the rule they want to create?",
   stickies:[],
   visual:<HMW02Visual/>
  },
  {id:3,pill:'HMW 03',pillText:'Surface help where it\'s needed',
   q:"How might we make it easier for users to have support content available when and where they need it?",
   stickies:[],
   visual:<HMW03Visual/>
  },
  {id:4,pill:'HMW 04',pillText:'Intuitive controls for building rules',
   q:"How might we provide more ease + flexibility when building rules — with more intuitive controls to input values?",
   stickies:[],
   visual:<HMW04Visual/>
  },
  {id:5,pill:'HMW 05 + 06',pillText:'Confidence before go-live & audit trail after',
   q:"How might we give users confidence their rule will do what they want before it goes live — and enable better documentation and audit tracking after?",
   stickies:[],
   visual:<HMW05Visual/>
  },
]

function CarouselShell({tabs, tab, setTab, children}){
  return(
    <div>
      <div style={{display:'flex',gap:6,marginBottom:14}}>
        {tabs.map((label,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:'5px 14px',fontSize:10,fontWeight:600,cursor:'pointer',borderRadius:6,background:i===tab?'rgba(74,190,155,0.2)':'rgba(255,255,255,0.05)',border:`1px solid ${i===tab?'rgba(74,190,155,0.45)':'rgba(255,255,255,0.1)'}`,color:i===tab?'rgba(74,190,155,0.95)':'rgba(255,255,255,0.4)',transition:'all 0.15s',fontFamily:'Inter,sans-serif'}}>
            {label}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}

const sBg4={g:'#4caf6e',y:'#f5c842',b:'#5bb8e8',o:'#f07a5a'}
const sTx4={g:'#051a0a',y:'#1a1200',b:'#001828',o:'#2a0800'}

function HMW02Visual(){
  const [tab,setTab]=useState(0)
  const tabs=['Concept 1 — Keyword selector','Concept 2 — Keyword assistant']
  const stickies=[
    [{c:'y',t:"Keyword descriptions surfaced inline — not buried in a help doc"},{c:'g',t:"Hover icon reveals definition + accepted values at point of selection"}],
    [{c:'b',t:"Keyword assistant suggests relevant keywords based on what you're trying to restrict"},{c:'o',t:"Send transcript to support if still stuck"}],
  ]
  return(
    <CarouselShell tabs={tabs} tab={tab} setTab={setTab}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div style={{background:'#1a2e28',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#162420',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Keyword selector':'Keyword assistant'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:0}}>
                <div style={{borderRight:'1px solid rgba(255,255,255,0.08)',paddingRight:10}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.25)',marginBottom:10,textTransform:'uppercase'}}>Keywords</div>
                  {[80,55,70,null,40,65,50,80,45].map((w,i)=>w===null
                    ?<div key={i} style={{height:32,background:'rgba(74,190,155,0.12)',borderLeft:'2px solid rgba(74,190,155,0.7)',paddingLeft:8,display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:3,borderRadius:'0 4px 4px 0'}}><span style={{fontSize:11,color:'rgba(74,190,155,0.9)',fontWeight:600}}>Security Type</span><span style={{fontSize:10,color:'rgba(74,190,155,0.6)'}}>›</span></div>
                    :<div key={i} style={{height:8,background:'rgba(255,255,255,0.1)',borderRadius:2,marginBottom:8,width:`${w}%`}}/>
                  )}
                </div>
                <div style={{paddingLeft:12}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(74,190,155,0.7)',marginBottom:6,textTransform:'uppercase'}}>Keyword Detail</div>
                  <div style={{fontSize:14,fontWeight:700,color:'rgba(255,255,255,0.9)',marginBottom:8,lineHeight:1.2}}>Security Type</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.55)',lineHeight:1.55,marginBottom:10}}>Filters orders based on the type of security being traded.</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',marginBottom:4}}>Accepted values</div>
                  <div style={{fontSize:10,color:'rgba(74,190,155,0.8)',lineHeight:1.6,marginBottom:12}}>Equity, Fixed Income, ETF, Mutual Fund…</div>
                  <div style={{background:'rgba(74,190,155,0.15)',border:'1px solid rgba(74,190,155,0.35)',borderRadius:5,padding:'7px 12px',textAlign:'center',fontSize:11,fontWeight:600,color:'rgba(74,190,155,0.9)'}}>+ Add to rule</div>
                </div>
              </div>
              <div style={{...annStyle,marginTop:10}}><span style={annArr}>↑</span><span style={annTxt}>click keyword to preview details before adding</span></div>
            </>):(<>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:8}}>
                <div style={{background:'rgba(74,124,111,0.3)',borderRadius:'10px 10px 10px 2px',padding:'8px 10px',maxWidth:'90%'}}><div style={{fontSize:10,color:'rgba(255,255,255,0.8)',lineHeight:1.5}}>Hi! Describe the rule you're trying to build and I'll suggest the right keywords.</div></div>
                <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'10px 10px 2px 10px',padding:'8px 10px',marginLeft:'auto',maxWidth:'85%'}}><div style={{fontSize:10,color:'rgba(255,255,255,0.75)',lineHeight:1.5}}>I want to restrict trades on specific stocks for certain account types</div></div>
                <div style={{background:'rgba(74,124,111,0.3)',borderRadius:'10px 10px 10px 2px',padding:'8px 10px',maxWidth:'95%'}}>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.8)',marginBottom:6}}>Try these keywords:</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:5}}>{['Security Type','Account Class','CUSIP / Symbol'].map(k=><span key={k} style={{fontSize:9,fontWeight:600,padding:'3px 8px',borderRadius:10,background:'rgba(74,190,155,0.2)',border:'1px solid rgba(74,190,155,0.4)',color:'rgba(74,190,155,0.9)'}}>{k}</span>)}</div>
                </div>
                <div style={{background:'rgba(74,124,111,0.2)',borderRadius:'10px 10px 10px 2px',padding:'7px 10px',maxWidth:'95%'}}><div style={{fontSize:10,color:'rgba(255,255,255,0.6)'}}>Still stuck? <span style={{color:'rgba(74,190,155,0.8)',textDecoration:'underline'}}>Send transcript to support →</span></div></div>
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <div style={{flex:1,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,padding:'6px 10px',fontSize:10,color:'rgba(255,255,255,0.25)',fontStyle:'italic'}}>Ask about a keyword…</div>
                <div style={{width:28,height:28,borderRadius:6,background:'rgba(74,190,155,0.3)',border:'1px solid rgba(74,190,155,0.5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'rgba(74,190,155,0.9)',flexShrink:0}}>↑</div>
              </div>
              <div style={{...annStyle,marginTop:8}}><span style={annArr}>↑</span><span style={annTxt}>available on landing page + within create rule flow</span></div>
            </>)}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {stickies[tab].map((s,i)=><div key={i} style={{background:sBg4[s.c],color:sTx4[s.c],borderRadius:6,padding:'10px 12px',fontSize:11,fontWeight:500,lineHeight:1.55,boxShadow:'2px 3px 8px rgba(0,0,0,0.25)'}}>{s.t}</div>)}
        </div>
      </div>
    </CarouselShell>
  )
}

function HMW03Visual(){
  const [tab,setTab]=useState(0)
  const tabs=['Concept 1 — Help icon in-page','Concept 2 — Step-by-step guidance']
  const stickies=[
    [{c:'b',t:"Help icon links directly to keyword definition and relevant rule help content"},{c:'y',t:"Contextual help throughout the create rule flow — not just on the landing page"}],
    [{c:'g',t:"Don't bury it — users shouldn't discover help by accident"},{c:'y',t:"Instructions provided at each step reduce errors before they happen"}],
  ]
  return(
    <CarouselShell tabs={tabs} tab={tab} setTab={setTab}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div style={{background:'#1a2e28',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#162420',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Help icon in-page':'Step-by-step instructions per clause'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.85)'}}>Add clause — Rule Logic</span>
                <div style={{width:26,height:26,borderRadius:'50%',background:'rgba(74,190,155,0.2)',border:'1px solid rgba(74,190,155,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'rgba(74,190,155,0.9)',fontWeight:700,flexShrink:0}}>?</div>
              </div>
              <div style={{background:'rgba(74,124,111,0.15)',border:'1px solid rgba(74,190,155,0.25)',borderRadius:6,padding:'10px 12px',marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.85)',marginBottom:5}}>Keyword help</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.55)',lineHeight:1.55,marginBottom:8}}>Each clause filters orders by a specific condition. Select a keyword to see accepted values.</div>
                <div style={{fontSize:10,color:'rgba(74,190,155,0.8)',textDecoration:'underline'}}>View full keyword guide →</div>
              </div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',marginBottom:5}}>Selected keyword</div>
                <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:5,padding:'8px 10px',height:36,display:'flex',alignItems:'center'}}><div style={{height:5,background:'rgba(255,255,255,0.15)',borderRadius:2,width:'45%'}}/></div>
              </div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',marginBottom:5}}>Value</div>
                <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:5,padding:'8px 10px',height:36,display:'flex',alignItems:'center'}}><div style={{height:5,background:'rgba(255,255,255,0.12)',borderRadius:2,width:'55%'}}/></div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <div style={{flex:1,padding:'7px 12px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,textAlign:'center',fontSize:11,color:'rgba(255,255,255,0.5)'}}>Cancel</div>
                <div style={{flex:1,padding:'7px 12px',background:'rgba(74,190,155,0.2)',border:'1px solid rgba(74,190,155,0.4)',borderRadius:5,textAlign:'center',fontSize:11,fontWeight:600,color:'rgba(74,190,155,0.9)'}}>Add clause</div>
              </div>
              <div style={{...annStyle,marginTop:10}}><span style={annArr}>↑</span><span style={annTxt}>help icon links directly to keyword + rule help content</span></div>
            </>):(<>
              <div style={{display:'flex',gap:4,marginBottom:12}}>{[1,1,1,0,0].map((f,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:f?'rgba(74,190,155,0.7)':'rgba(255,255,255,0.12)'}}/>)}</div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.1em',color:'rgba(74,190,155,0.7)',marginBottom:6,textTransform:'uppercase'}}>Step 3 of 5 — Rule Logic</div>
              <div style={{fontSize:15,fontWeight:600,color:'rgba(255,255,255,0.9)',marginBottom:12,lineHeight:1.3}}>Define your rule conditions</div>
              <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderLeft:'3px solid rgba(74,190,155,0.5)',borderRadius:5,padding:'10px 12px',marginBottom:16}}>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.55)',lineHeight:1.6}}>Each clause narrows which orders this rule applies to. Select a keyword, choose an operator, then enter the values to match against.</div>
              </div>
              <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:5,padding:'8px 12px',marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>If</span>
                <div style={{height:5,background:'rgba(255,255,255,0.15)',borderRadius:2,flex:1}}/>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>is</span>
                <div style={{height:5,background:'rgba(255,255,255,0.12)',borderRadius:2,width:80}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{padding:'6px 14px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,fontSize:11,color:'rgba(255,255,255,0.5)'}}>← Back</div>
                <div style={{padding:'6px 14px',background:'rgba(74,190,155,0.2)',border:'1px solid rgba(74,190,155,0.4)',borderRadius:5,fontSize:11,fontWeight:600,color:'rgba(74,190,155,0.9)'}}>Next →</div>
              </div>
              <div style={{...annStyle,marginTop:10}}><span style={annArr}>↑</span><span style={annTxt}>instructions provided at each step of the create rule flow</span></div>
            </>)}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {stickies[tab].map((s,i)=><div key={i} style={{background:sBg4[s.c],color:sTx4[s.c],borderRadius:6,padding:'10px 12px',fontSize:11,fontWeight:500,lineHeight:1.55,boxShadow:'2px 3px 8px rgba(0,0,0,0.25)'}}>{s.t}</div>)}
        </div>
      </div>
    </CarouselShell>
  )
}





function HMW04Visual(){
  const [tab, setTab] = useState(0)
  const tabs=['Concept 1 — Rule builder','Concept 2 — List manager']
  const stickies = [
    [{c:'g',t:"Rule builder breaks down each clause into an intuitive step"},{c:'b',t:"More intuitive form controls to match input value types — e.g. bulk import vs. pasting a comma-separated list into a simple input box"},{c:'o',t:"Validate format on input — account numbers vs. security symbols have different formats"},{c:'y',t:"Decision tree / guided wizard — give users somewhere to start (not pictured)"}],
    [{c:'g',t:"Define a list once, reuse it across many rules"},{c:'b',t:"Edit list values in one place — all rules using it update automatically"},{c:'y',t:"Rule builder — better controls shown in Concept 1"}],
  ]
  return (
    <CarouselShell tabs={tabs} tab={tab} setTab={setTab}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div style={{background:'#1a2e28',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#162420',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Rule builder — better controls':'List manager'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1px 1fr',gap:0,alignItems:'stretch'}}>
                <div style={{paddingRight:16}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.25)',marginBottom:8,textTransform:'uppercase'}}>Rule Conditions</div>
                  <div style={{fontSize:10,fontStyle:'italic',color:'rgba(255,255,255,0.35)',marginBottom:10}}>Review orders where...</div>
                  <div style={{background:'rgba(74,190,155,0.12)',border:'1px solid rgba(74,190,155,0.35)',borderRadius:5,padding:'8px 10px',marginBottom:6}}>
                    <div style={{fontSize:10,lineHeight:1.5,color:'rgba(255,255,255,0.85)'}}>IF <span style={{color:'rgba(74,190,155,0.9)',fontWeight:700}}>CUSIP / Symbol / SEDOL</span> equals one of the following <span style={{color:'rgba(74,190,155,0.9)',fontWeight:700}}>2,806 values</span></div>
                  </div>
                  {[1,2].map(i=><div key={i} style={{height:32,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:5,marginBottom:6}}/>)}
                  <div style={{marginTop:8,display:'inline-flex',alignItems:'center',gap:6,padding:'6px 12px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,fontSize:10,color:'rgba(255,255,255,0.5)'}}>+ Add clause</div>
                </div>
                <div style={{background:'rgba(255,255,255,0.08)'}}/>
                <div style={{paddingLeft:16}}>
                  <div style={{fontSize:14,fontWeight:600,color:'rgba(74,190,155,0.9)',marginBottom:4}}>CUSIP / Symbol</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',marginBottom:10}}>Operator: <span style={{color:'rgba(255,255,255,0.5)'}}>equals one of</span></div>
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:8,fontStyle:'italic',color:'rgba(255,255,255,0.25)',marginBottom:4}}>single-line input</div>
                    <div style={{position:'relative',display:'inline-block',width:120}}>
                      <div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:4,padding:'5px 8px',background:'rgba(255,255,255,0.03)',display:'flex',alignItems:'center',gap:6}}>
                        <span style={{fontSize:9,color:'rgba(255,255,255,0.25)'}}>Values</span>
                        <div style={{height:4,background:'rgba(255,255,255,0.08)',borderRadius:2,flex:1}}/>
                      </div>
                      <svg style={{position:'absolute',top:'-6px',left:'-6px',width:'calc(100% + 12px)',height:'calc(100% + 12px)',pointerEvents:'none'}} viewBox="0 0 112 42" preserveAspectRatio="none">
                        <line x1="4" y1="4" x2="108" y2="38" stroke="rgba(200,80,80,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="108" y1="4" x2="4" y2="38" stroke="rgba(200,80,80,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{fontSize:8,fontStyle:'italic',color:'rgba(255,255,255,0.25)',marginBottom:4,marginTop:18}}>import tool</div>
                  <div style={{border:'1.5px dashed rgba(74,190,155,0.4)',borderRadius:5,padding:'10px 12px',background:'rgba(74,190,155,0.05)',textAlign:'center'}}>
                    <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.8)',marginBottom:3}}>↑ Upload CSV</div>
                    <div style={{fontSize:9,color:'rgba(255,255,255,0.4)',marginBottom:8}}>or paste values</div>
                    <div style={{display:'flex',gap:6,justifyContent:'center'}}>
                      <div style={{padding:'5px 10px',background:'rgba(74,190,155,0.2)',border:'1px solid rgba(74,190,155,0.4)',borderRadius:4,fontSize:10,fontWeight:600,color:'rgba(74,190,155,0.9)'}}>Add to List</div>
                      <div style={{padding:'5px 10px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:4,fontSize:10,color:'rgba(255,255,255,0.4)'}}>Cancel</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={annStyle}><span style={annTxt}>input type matches the data — no more comma-separated guesswork</span><span style={annArr}>↑</span></div>
            </>) : (<>
              <div style={{fontSize:10,fontStyle:'italic',color:'rgba(255,255,255,0.35)',marginBottom:12}}>Saved lists — reusable across rules</div>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
                {[{name:'High-risk securities',items:'42 items',rules:'3 rules',color:'rgba(74,190,155,0.8)'},{name:'Exempt accounts',items:'18 items',rules:'1 rule',color:'rgba(106,129,178,0.8)'},{empty:true}].map((r,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8}}>
                    {r.empty?<><div style={{width:8,height:8,borderRadius:'50%',background:'rgba(255,255,255,0.15)',flexShrink:0}}/><div style={{height:5,background:'rgba(255,255,255,0.1)',borderRadius:2,width:140}}/></>:<>
                      <div style={{width:8,height:8,borderRadius:'50%',background:r.color,flexShrink:0}}/>
                      <span style={{fontSize:13,fontWeight:500,color:'rgba(255,255,255,0.85)',flex:1}}>{r.name}</span>
                      <span style={{fontSize:11,color:'rgba(255,255,255,0.35)',marginRight:8}}>{r.items}</span>
                      <span style={{fontSize:10,fontWeight:600,padding:'2px 10px',borderRadius:20,background:'rgba(74,190,155,0.12)',border:'1px solid rgba(74,190,155,0.3)',color:'rgba(74,190,155,0.8)'}}>{r.rules}</span>
                    </>}
                  </div>
                ))}
              </div>
              <div style={{fontSize:13,color:'rgba(74,190,155,0.6)',marginBottom:12}}>+ Create new list</div>
              <div style={annStyle}><span style={annArr}>↑</span><span style={annTxt}>define once, reuse across many rules</span></div>
            </>)}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {stickies[tab].map((s,i)=><div key={i} style={{background:sBg4[s.c],color:sTx4[s.c],borderRadius:6,padding:'10px 12px',fontSize:11,fontWeight:500,lineHeight:1.55,boxShadow:'2px 3px 8px rgba(0,0,0,0.25)'}}>{s.t}</div>)}
        </div>
      </div>
    </CarouselShell>
  )
}

function HMW05Visual(){
  const [tab, setTab] = useState(0)
  const tabs=['Concept 1 — Rule preview','Concept 2 — Change history']
  const stickies = [
    [{c:'y',t:"Plain-language rule preview builds live as user adds clauses — confidence before activation"},{c:'g',t:"Review & Confirm step shows full rule summary before going live"}],
    [{c:'b',t:"Audit log at rule-level and across all rules — two view options"},{c:'g',t:"Free-form notes: capture why a rule was created or changed — inside the platform"},{c:'o',t:"Prompt for change reason — optional or required by org"}],
  ]
  const events = [
    {label:'Modified',color:'rgba(74,190,155,0.9)',border:'rgba(74,190,155,0.45)',bg:'rgba(74,190,155,0.12)',dot:'#4caf6e',name:'K.D.',detail:'Added 3 account values',time:'Today 9:41am'},
    {label:'Activated',color:'rgba(245,200,66,0.95)',border:'rgba(245,200,66,0.4)',bg:'rgba(245,200,66,0.1)',dot:'#c8a800',name:'S.R.',detail:'Rule set to active',time:'Mar 2, 2:15pm'},
    {label:'Created',color:'rgba(91,184,232,0.9)',border:'rgba(91,184,232,0.4)',bg:'rgba(91,184,232,0.1)',dot:'#5bb8e8',name:'K.D.',detail:'Rule created',time:'Feb 28, 10:00am'},
  ]
  return (
    <CarouselShell tabs={tabs} tab={tab} setTab={setTab}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div style={{background:'#1a2e28',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#162420',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Rule Logic Preview':'Rule Change History'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:8}}>Builds as you go</div>
              {[{t:'if',text:'If Account No. is one of…',bg:'rgba(106,129,178,0.15)',bl:'rgba(180,200,255,0.5)',tc:'rgba(220,230,255,0.9)'},{t:'and',text:'and Action is Buy',bg:'rgba(255,255,255,0.07)',bl:'rgba(200,255,220,0.4)',tc:'rgba(210,255,230,0.85)'},{t:'then',text:'→ then REJECTED',bg:'rgba(255,200,150,0.15)',bl:'rgba(255,180,100,0.55)',tc:'rgba(255,220,170,0.95)'}].map((r,i)=>(
                <div key={i} style={{borderRadius:4,padding:'7px 10px',marginBottom:5,background:r.bg,borderLeft:`3px solid ${r.bl}`,color:r.tc,fontSize:11,lineHeight:1.4,fontWeight:r.t==='then'?600:400}}>{r.text}</div>
              ))}
              <div style={annStyle}><span style={annArr}>↑</span><span style={annTxt}>plain-language preview builds as you go</span></div>
            </>) : (<>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:12}}>Audit trail — in platform</div>
              <div style={{position:'relative'}}>
                {/* Vertical timeline line centered at x=8 */}
                <div style={{position:'absolute',left:8,top:0,bottom:0,width:2,background:'rgba(255,255,255,0.1)',borderRadius:2}}/>
                {events.map((r,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',marginBottom:i<events.length-1?24:0,position:'relative'}}>
                    {/* Dot centered on the line */}
                    <div style={{width:18,height:18,borderRadius:'50%',background:r.dot,flexShrink:0,zIndex:1,border:'2px solid #1a2e28',marginTop:2,marginRight:12}}/>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
                        <span style={{fontSize:10,fontWeight:600,padding:'2px 12px',borderRadius:20,background:r.bg,border:`1px solid ${r.border}`,color:r.color}}>{r.label}</span>
                        <span style={{fontSize:9,color:'rgba(255,255,255,0.3)'}}>by {r.name}</span>
                      </div>
                      <div style={{height:4,background:'rgba(255,255,255,0.15)',borderRadius:2,width:'80%',marginBottom:3}}/>
                      <div style={{fontSize:9,color:'rgba(255,255,255,0.25)'}}>{r.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...annStyle,marginTop:16}}><span style={annArr}>↑</span><span style={annTxt}>rule-level or all-rules timeline — no more Excel</span></div>
            </>)}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {stickies[tab].map((s,i)=><div key={i} style={{background:sBg4[s.c],color:sTx4[s.c],borderRadius:6,padding:'10px 12px',fontSize:11,fontWeight:500,lineHeight:1.55,boxShadow:'2px 3px 8px rgba(0,0,0,0.25)'}}>{s.t}</div>)}
        </div>
      </div>
    </CarouselShell>
  )
}

function HMWExplorer(){
  const [active,setActive]=useState(1)
  const item=hmwItems.find(h=>h.id===active)
  const sBg={g:'#4caf6e',y:'#f5c842',b:'#5bb8e8',o:'#f07a5a',p:'#e87dc8'}
  const sTx={g:'#051a0a',y:'#1a1200',b:'#001828',o:'#2a0800',p:'#2a0028'}
  return(
    <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:0,alignItems:'stretch'}}>
      {/* Left sidebar */}
      <div style={{borderRight:'1px solid rgba(255,255,255,0.1)',paddingRight:24}}>
        {hmwItems.map((h,i)=>(
          <button key={h.id} onClick={()=>setActive(h.id)} style={{display:'flex',flexDirection:'column',gap:4,width:'100%',background:'transparent',border:'none',padding:'14px 16px',cursor:'pointer',fontFamily:'Inter,sans-serif',textAlign:'left',borderRadius:10,marginBottom:4,transition:'all 0.2s',background:active===h.id?'rgba(74,124,111,0.2)':'transparent',borderLeft:active===h.id?'2px solid rgba(74,190,155,0.7)':'2px solid transparent'}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:active===h.id?'rgba(74,190,155,0.8)':'rgba(232,240,238,0.35)'}}>{h.pill}</span>
            <span style={{fontSize:12,fontWeight:600,color:active===h.id?'rgba(246,251,222,0.95)':'rgba(246,251,222,0.5)',lineHeight:1.35}}>{h.pillText}</span>
          </button>
        ))}
      </div>
      {/* Right content */}
      {item&&(
        <div style={{paddingLeft:32}}>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(232,240,238,0.45)',marginBottom:8}}>{item.pill}</div>
            <p style={{fontSize:15,fontWeight:500,color:'rgba(246,251,222,0.95)',lineHeight:1.45,margin:0}}>{item.q}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:item.stickies.length===0?'1fr':'2fr 1fr',gap:24,alignItems:'start'}}>
            <div>{item.visual}</div>
            {item.stickies.length>0&&<div style={{display:'flex',flexDirection:'column',gap:8}}>
              {item.stickies.map((s,i)=>(<div key={i} style={{background:sBg[s.c],color:sTx[s.c],borderRadius:6,padding:'10px 12px',fontSize:11,fontWeight:500,lineHeight:1.55,boxShadow:'2px 3px 8px rgba(0,0,0,0.25)'}}>{s.t}</div>))}
            </div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default function RulesCaseStudy(){
  return(<div style={{fontFamily:'Inter,sans-serif',fontSize:16,lineHeight:1.5,color:warmGray,background:cream,overflowX:'hidden'}}>
    <Nav/>

    {/* HERO */}
    <section style={{background:'linear-gradient(160deg,#2d5c52 0%,#3d6e63 40%,#4a7c6f 100%)',paddingTop:140,paddingBottom:0,paddingLeft:sideP,paddingRight:sideP,overflow:'hidden'}}>
      <div style={ct}>
        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:20,opacity:0,animation:'fadeUp 0.7s ease 0.1s forwards'}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(246,251,222,0.45)'}}>UX Case Study</span>
          <span style={{width:1,height:12,background:'rgba(255,255,255,0.2)'}}/>
          {['Research','Strategy','Product Design','Testing'].map(tag=>(<span key={tag} style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:'rgba(255,255,255,0.1)',color:'rgba(246,251,222,0.85)'}}>{tag}</span>))}
          <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:'rgba(255,255,255,0.18)',color:'rgba(246,251,222,0.95)',border:'1px solid rgba(255,255,255,0.25)'}}>Shipped ✓</span>
        </div>
        <h1 style={{fontSize:42,fontWeight:700,lineHeight:1.25,letterSpacing:'-0.5px',color:textLight,maxWidth:780,marginBottom:16,opacity:0,animation:'fadeUp 0.7s ease 0.25s forwards'}}>Inside the Rule Engine — Compliance, Redesigned for Enterprise Trading</h1>
        <p style={{fontSize:18,fontWeight:400,fontStyle:'italic',color:'rgba(246,251,222,0.65)',marginBottom:60,opacity:0,animation:'fadeUp 0.7s ease 0.4s forwards'}}>From research landscape to shipped product — navigating complexity, prioritizing impact</p>
      </div>
      <div style={{...ct,marginTop:48,overflow:'hidden',paddingBottom:0,opacity:0,animation:'fadeUp 0.7s ease 0.55s forwards'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'center',gap:32,paddingTop:48}}>
          {/* Screen 1 */}
          <div style={{width:520,height:340,background:'rgba(20,50,44,0.6)',borderRadius:'10px 10px 0 0',overflow:'hidden',flexShrink:0,marginBottom:60}}>
            <div style={{background:'rgba(255,255,255,0.1)',borderBottom:'1px solid rgba(255,255,255,0.1)',padding:'8px 14px',display:'flex',alignItems:'center',gap:6}}>
              {[0.3,0.2].map((o,i)=><span key={i} style={{width:7,height:7,borderRadius:'50%',background:`rgba(255,255,255,${o})`,display:'inline-block'}}/>)}
              <span style={{fontSize:9,color:'rgba(255,255,255,0.6)',fontWeight:600,marginLeft:6}}>Rule Management</span>
              <div style={{marginLeft:'auto',background:'rgba(255,255,255,0.2)',borderRadius:4,padding:'2px 8px',fontSize:8,color:'rgba(255,255,255,0.8)',fontWeight:600}}>+ New Rule</div>
            </div>
            <div style={{display:'flex',height:'calc(100% - 29px)'}}>
              <div style={{width:130,borderRight:'1px solid rgba(255,255,255,0.1)',padding:14,flexShrink:0}}>
                <div style={{fontSize:7,fontWeight:700,color:'rgba(255,255,255,0.4)',letterSpacing:'0.1em',marginBottom:8,textTransform:'uppercase'}}>Filters</div>
                <div style={{height:5,background:'rgba(255,255,255,0.15)',borderRadius:2,marginBottom:6}}/>
                <div style={{height:5,width:'70%',background:'rgba(255,255,255,0.1)',borderRadius:2,marginBottom:10}}/>
                <div style={{fontSize:7,fontWeight:700,color:'rgba(255,255,255,0.4)',marginBottom:6}}>STATUS</div>
                <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:4}}><div style={{width:8,height:8,borderRadius:2,background:'rgba(74,190,155,0.6)'}}/><span style={{fontSize:8,color:'rgba(255,255,255,0.7)'}}>Active</span></div>
                <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:8,height:8,borderRadius:2,background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.2)'}}/><span style={{fontSize:8,color:'rgba(255,255,255,0.4)'}}>Inactive</span></div>
              </div>
              <div style={{flex:1,overflow:'hidden'}}>
                <div style={{padding:'6px 10px',borderBottom:'1px solid rgba(255,255,255,0.1)',display:'flex',gap:8}}>{['STATUS','RULE NAME'].map(h=><span key={h} style={{fontSize:7,fontWeight:700,color:'rgba(255,255,255,0.5)'}}>{h}</span>)}</div>
                {['Crypto ETF Blacklist','PIP Whitelist — Inv. Prof','Suitability Check — IRA','Large Cap Growth Block','Fixed Income — Restrict'].map(n=>(<div key={n} style={{padding:'7px 10px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:8}}><div style={{padding:'2px 8px',borderRadius:8,background:'rgba(74,190,155,0.2)',fontSize:9,fontWeight:700,color:'rgba(74,190,155,0.9)',flexShrink:0}}>Active</div><span style={{fontSize:10,color:'rgba(255,255,255,0.75)',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{n}</span></div>))}
              </div>
              <div style={{width:160,borderLeft:'1px solid rgba(255,255,255,0.1)',padding:14,flexShrink:0}}>
                <div style={{fontSize:7,fontWeight:700,color:'rgba(255,255,255,0.45)',marginBottom:8}}>RULE LOGIC</div>
                <div style={{fontSize:7.5,lineHeight:1.55,color:'rgba(255,255,255,0.7)'}}>
                  <span style={{color:'rgba(144,180,255,0.8)',fontWeight:600}}>If</span> Account Number is one of…
                  <div style={{margin:'4px 0',padding:'3px 6px',background:'rgba(255,255,255,0.08)',borderRadius:3,fontSize:7}}>• XXXXXXX <span style={{color:'rgba(74,190,155,0.7)'}}>+2 more</span></div>
                  <span style={{color:'rgba(144,180,255,0.6)',fontSize:7}}>and</span> Action is Buy<br/><br/>
                  <span style={{color:'rgba(255,200,100,0.9)',fontWeight:700,fontSize:7}}>→ REJECTED</span>
                </div>
              </div>
            </div>
          </div>
          {/* Screen 2 */}
          <div style={{width:360,height:300,background:'rgba(20,50,44,0.6)',borderRadius:'10px 10px 0 0',overflow:'hidden',flexShrink:0,alignSelf:'flex-end',marginBottom:60}}>
            <div style={{background:'rgba(255,255,255,0.1)',borderBottom:'1px solid rgba(255,255,255,0.1)',padding:'8px 14px',display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'rgba(255,255,255,0.3)',display:'inline-block'}}/>
              <span style={{fontSize:9,color:'rgba(255,255,255,0.6)',fontWeight:600,marginLeft:6}}>Create New Rule</span>
            </div>
            <div style={{padding:10}}>
              <div style={{display:'flex',gap:4,marginBottom:10}}>{[1,1,0,0,0].map((f,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:f?'rgba(74,190,155,0.7)':'rgba(255,255,255,0.15)'}}/>)}</div>
              <div style={{fontSize:8,fontWeight:700,color:'rgba(255,255,255,0.5)',letterSpacing:'0.1em',marginBottom:8,textTransform:'uppercase'}}>Add Clause</div>
              {[{n:'Account Number',s:true},{n:'Ticker Symbol',s:false},{n:'Action Type',s:false}].map(item=>(<div key={item.n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 8px',marginBottom:5,background:item.s?'rgba(74,190,155,0.15)':'rgba(255,255,255,0.06)',borderRadius:5,border:`1px solid ${item.s?'rgba(74,190,155,0.3)':'rgba(255,255,255,0.08)'}`}}><span style={{fontSize:8,color:'rgba(255,255,255,0.8)'}}>{item.n}</span><span style={{fontSize:7,padding:'1px 6px',borderRadius:6,background:item.s?'rgba(74,190,155,0.25)':'rgba(255,255,255,0.12)',color:item.s?'rgba(74,190,155,0.9)':'rgba(255,255,255,0.5)',fontWeight:600}}>{item.s?'Selected':'Select'}</span></div>))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TL;DR */}
    <section style={sec('white')}>
      <div style={ct}>
        <h2 style={{fontSize:72,fontWeight:800,color:accentDark,lineHeight:1,marginBottom:24}}>tl;dr</h2>
        <p style={{fontSize:20,fontWeight:500,lineHeight:1.65,letterSpacing:'-0.3px',color:accent,maxWidth:820,marginBottom:48}}>Across a suite of compliance tools on an enterprise investing platform, we identified where to focus design effort — then redesigned the rule management and creation experience from the ground up. The result: a shipped, user-tested redesign that replaced tribal knowledge with guided workflows and shadow spreadsheets with built-in documentation.</p>
        <div style={{background:accentLight,border:'1px solid rgba(74,124,111,0.18)',borderRadius:14,padding:'28px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:24}}>
          {[{l:'Role',v:'Lead UX Designer — Trading'},{l:'Timeline',v:'Q1–Q4 2025'},{l:'Team',v:'Design · Product · Engineering · Business'},{l:'Status',v:'Shipped ✓'}].map((item,i,arr)=>(<div key={item.l} style={{display:'flex',alignItems:'center',gap:24}}><div style={{whiteSpace:'nowrap'}}><p style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:6}}>{item.l}</p><p style={{fontSize:15,fontWeight:600,color:warmGray}}>{item.v}</p></div>{i<arr.length-1&&<div style={{width:1,height:36,background:'rgba(74,124,111,0.2)',flexShrink:0}}/>}</div>))}
        </div>
      </div>
    </section>

    {/* FRAMING */}
    <section style={sec(accentDark)}>
      <div style={ct}>
        <h2 style={{fontSize:28,fontWeight:900,color:textLight,lineHeight:1.3,marginBottom:20,letterSpacing:'-0.3px'}}>finding the right problem <span style={{fontWeight:300}}>before designing the right solution</span></h2>
        <p style={{fontSize:15,lineHeight:1.75,color:'rgba(246,251,222,0.85)',maxWidth:760,marginBottom:16}}>This wasn't a project that started with a design brief. It started with two questions: across a complex, sprawling ecosystem of aging compliance tools — where do we even begin? How do we make an impact?</p>
        <p style={{fontSize:15,lineHeight:1.75,color:'rgba(246,251,222,0.85)',maxWidth:760}}>I led the team through a structured discovery and sprint process — analyzing user interviews, synthesizing research, and facilitating design thinking workshops — before a single pixel was touched. The decision about <em>what</em> to design was as deliberate as the design itself.</p>
      </div>
    </section>

    {/* DISCOVERY */}
    <section style={sec(cream)}>
      <div style={ct}>
        <StepLabel>Step 01 — Discovery</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:warmGray,letterSpacing:'-0.3px',marginBottom:20}}>Surveying the Compliance Landscape</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:48}}>Rather than commission new research, we surfaced existing user interviews that had never been acted on. In partnership with product, business, and engineering, we collectively revisited the verbatims and raw feedback — synthesizing themes and affinity mapping together before aligning on the problem space.</p>

        <div style={{marginBottom:56}}>
          <StepLabel>The existing experience</StepLabel>
          <h3 style={{fontSize:19,fontWeight:700,color:warmGray,marginBottom:10}}>What users were working with</h3>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:620,marginBottom:32}}>Before anything else, it helps to see the starting point. The legacy rules management experience was functional — but barely.</p>
          <div style={{background:'#3d6e63',borderRadius:16,overflow:'hidden',boxShadow:'0 8px 48px rgba(0,0,0,0.18)'}}>
            <div style={{background:'#2d5c52',padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',gap:8}}>{['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>)}</div>
              <span style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.35)',letterSpacing:'0.06em',textTransform:'uppercase'}}>Legacy Rules Management — Interactive Prototype</span>
              <div style={{width:60}}/>
            </div>
            <div style={{padding:'24px 36px'}}>
              {/* Rules table preview — matches actual legacy UI */}
              <div style={{background:'white',borderRadius:4,overflow:'hidden',marginBottom:24,fontFamily:'Arial,Helvetica,sans-serif',fontSize:11,boxShadow:'0 2px 12px rgba(0,0,0,0.15)'}}>
                <div style={{borderLeft:'4px solid #222',paddingLeft:7,fontWeight:'bold',fontSize:13,textDecoration:'underline',padding:'10px 14px 6px',borderBottom:'1px solid #ddd'}}>Rules</div>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:10}}>
                    <thead>
                      <tr>
                        {[['Rule Id',48],['Rule Name',160],['Active',44],['Investment Professional',72],['Managed Account Advisor',72],['Investor',56],['Super Trader',60],['Detail',null]].map(([h,w])=>(
                          <th key={h} style={{background:'#b4c8dc',border:'1px solid #7a96ae',padding:'4px 7px',fontWeight:'bold',textAlign:'left',verticalAlign:'bottom',width:w||undefined,whiteSpace:w&&w<80?'normal':undefined}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {id:'U010',name:'Restricted Symbol Watch List',active:'No',ip:true,maa:true,inv:true,st:true,detail:'REVIEW, If Action =[ S], If Position Source =[ A], If Symbol / CUSIP / SEDOL =[ AAPL, MSFT, AMZN, CAKE, TSLA, META, QQQ, SPY, SPF, AA, BBB, NVDA, … ]'},
                        {id:'U011',name:'Rep Account Number Monitor',active:'Yes',ip:true,maa:false,inv:false,st:true,detail:'REVIEW, If Accepting Rep =[ 123, 456], If Account Number =[ 033000086]'},
                        {id:'U012',name:'Low Dollar Order Cap',active:'No',ip:true,maa:true,inv:true,st:false,detail:'REVIEW, If Account Number =[ 033370983], If Order Value >= [ CAP 70.00]'},
                        {id:'U013',name:'Multi-Account Hold Flag',active:'Yes',ip:false,maa:true,inv:true,st:true,detail:'REVIEW, If Account Number =[ 033000256, 044000123, 044000456, 044000789, 055000111, 055000222, 055000333, … ]'},
                        {id:'U014',name:'Commission Variance Threshold',active:'No',ip:true,maa:true,inv:true,st:false,detail:'REVIEW, If Commission Variance > 2.50 %'},
                        {id:'U015',name:'Rep Code Restriction',active:'No',ip:true,maa:false,inv:false,st:false,detail:'REVIEW, If Accepting Rep =[ B[]]'},
                        {id:'U016',name:'Multi-Branch Activity Review',active:'No',ip:true,maa:true,inv:true,st:true,detail:'REVIEW, If Branch =[ 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, … ]'},
                      ].map((row,i)=>(
                        <tr key={row.id} style={{background:i%2===0?'#fff':'#fafafa'}}>
                          <td style={{border:'1px solid #c4d0dc',padding:'3px 7px',color:'#0000cc',textDecoration:'underline',cursor:'pointer',whiteSpace:'nowrap'}}>{row.id}</td>
                          <td style={{border:'1px solid #c4d0dc',padding:'3px 7px'}}>{row.name}</td>
                          <td style={{border:'1px solid #c4d0dc',padding:'3px 7px',textAlign:'center'}}>{row.active}</td>
                          {[row.ip,row.maa,row.inv,row.st].map((v,j)=>(
                            <td key={j} style={{border:'1px solid #c4d0dc',padding:'3px 7px',textAlign:'center'}}>
                              {v && <svg width="12" height="12" viewBox="0 0 12 12"><polyline points="1,6 4,10 11,2" stroke="#2a7a2a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </td>
                          ))}
                          <td style={{border:'1px solid #c4d0dc',padding:'3px 7px',fontSize:10,lineHeight:1.4,color:'#333',maxWidth:300}}>{row.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:28}}>
                {['60+ rules, no search or filter','Technical syntax, not plain language','Logic truncated mid-sentence','Ctrl+F as primary navigation','Create Rule buried at bottom','Keywords with no descriptions'].map(t=>(<span key={t} style={{background:'rgba(200,114,58,0.15)',color:'#e8a87c',fontSize:11,fontWeight:600,padding:'5px 12px',borderRadius:20,border:'1px solid rgba(200,114,58,0.25)'}}>{t}</span>))}
              </div>
              <a href="/legacy-rules-annotated.html" target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#c8723a',color:'white',fontSize:13,fontWeight:700,padding:'13px 24px',borderRadius:28,textDecoration:'none',letterSpacing:'0.03em',boxShadow:'0 4px 20px rgba(200,114,58,0.4)'}}>
                <span style={{width:18,height:18,borderRadius:'50%',background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9}}>▶</span>
                Launch Guided Walkthrough
              </a>
              <p style={{fontSize:11,color:'rgba(255,255,255,0.3)',marginTop:12}}>7 annotated issues across 3 screens</p>
            </div>
          </div>
        </div>

        <Callout icon="💡" title="Research Approach" body="Interviews spanned compliance officers setting up and managing rules, traders subject to those rules, and ops and admin users — giving us a cross-functional view of where the system was breaking down and for whom."/>

        <div style={{marginTop:48,marginBottom:16}}>
          <StepLabel>Synthesis</StepLabel>
          <h3 style={{fontSize:17,fontWeight:700,color:warmGray,marginBottom:8}}>Affinity mapping with the team</h3>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:620,marginBottom:28}}>We brought the raw interview verbatims into a shared FigJam board and affinity mapped as a cross-functional group. Clustering patterns surfaced five clear problem areas that the whole team had a hand in naming.</p>
          <AffinityMap/>
        </div>

        <div style={{marginTop:56}}>
          <h3 style={{fontSize:17,fontWeight:700,color:warmGray,marginBottom:8}}>Five problem areas emerged</h3>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:32}}>Six clusters pointed to five distinct design problems — each one a gap between what the platform assumed users knew and what they actually needed.</p>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>

            {/* 01 — Findability */}
            <div style={{background:'white',border:`1px solid rgba(202,213,226,0.35)`,borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'row',alignItems:'stretch',borderLeft:`4px solid ${accent}`}}>
              <div style={{background:'#f4f3f0',borderRight:'1px solid rgba(202,213,226,0.4)',padding:32,display:'flex',alignItems:'center',justifyContent:'center',width:'42%',flexShrink:0,position:'relative'}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:'100%',maxWidth:240,border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',fontSize:9,boxShadow:'2px 2px 6px rgba(0,0,0,0.1)',opacity:0.9}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'4px 8px',fontWeight:700,fontSize:10,color:'#1a1a1a'}}>Rules</div>
                  <div style={{display:'grid',gridTemplateColumns:'28px 82px 22px 1fr',background:'#e8e8e8',borderBottom:'1px solid #ccc'}}>
                    {['ID','Rule Name','Act.','Detail'].map(h=><div key={h} style={{padding:'3px 6px',fontSize:7.5,fontWeight:700,color:'#333',borderRight:'1px solid #ccc'}}>{h}</div>)}
                  </div>
                  {[['U021','Test Rule 1','Yes','REJECT, If Action = X…'],['U022','Test Rule 2','No','REJECT, If Branch = X…'],['U023','Test Rule 3','Yes','REJECT, If Action = BUY…'],['U024','Test Rule 4','Yes','REJECT, If Rep Type…'],['U025','Test Rule 5','No','REJECT, If Order Outcome…']].map(([id,name,a,d],i)=>(
                    <div key={id} style={{display:'grid',gridTemplateColumns:'28px 82px 22px 1fr',background:i%2===0?'#fff':'#fafafa',borderBottom:'1px solid #f0f0f0'}}>
                      <div style={{padding:'3px 6px',fontSize:8,color:'#2563eb',fontWeight:600,borderRight:'1px solid #eee'}}>{id}</div>
                      <div style={{padding:'3px 6px',fontSize:8,color:'#333',borderRight:'1px solid #eee'}}>{name}</div>
                      <div style={{padding:'3px 6px',fontSize:7.5,color:'#555',borderRight:'1px solid #eee'}}>{a}</div>
                      <div style={{padding:'3px 6px',fontSize:8,color:'#888',fontStyle:'italic',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{d}</div>
                    </div>
                  ))}
                  <div style={{padding:'3px 8px',fontSize:7.5,color:'#aaa',fontStyle:'italic',borderTop:'1px solid #eee'}}>… 55 more rules</div>
                </div>
                {/* Ctrl+F callout */}
                <div style={{position:'absolute',top:16,right:16,background:'#f1f3f4',border:'1px solid #ccc',borderRadius:3,padding:'4px 8px',fontSize:8,fontFamily:'Arial,sans-serif',display:'flex',alignItems:'center',gap:5,boxShadow:'0 2px 6px rgba(0,0,0,0.15)',color:'#333'}}>
                  <span style={{fontSize:7.5,fontWeight:600}}>Find:</span>
                  <div style={{background:'white',border:'1px solid #bbb',borderRadius:2,padding:'1px 5px',fontSize:8,color:'#555',width:60}}>equity</div>
                  <span style={{fontSize:8,color:'#888'}}>3 of 60</span>
                </div>
              </div>
              <div style={{padding:'32px 36px',flex:1}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>01</div>
                <div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8,lineHeight:1.35}}>Users can't manage what they can't find</div>
                <p style={{fontSize:13,lineHeight:1.7,color:deepBlue,marginBottom:12}}>Ctrl+F is the primary search tool. No filtering, no status toggle, no search by criteria. 100+ rules in a flat undifferentiated table — users copy the entire list into Excel just to sort it.</p>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Have to use ctrl+F to find rules and some cutoff logic is unsearchable so I have to keep a separate spreadsheet to simply track down a rule"</p>
              </div>
            </div>

            {/* 02 — Keywords opaque */}
            <div style={{background:'white',border:`1px solid rgba(202,213,226,0.35)`,borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'row',alignItems:'stretch',borderLeft:`4px solid ${accent}`}}>
              <div style={{background:'#f4f3f0',borderRight:'1px solid rgba(202,213,226,0.4)',padding:32,display:'flex',alignItems:'center',justifyContent:'center',width:'42%',flexShrink:0,position:'relative'}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:'100%',maxWidth:196,border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 6px rgba(0,0,0,0.1)'}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'4px 8px',fontWeight:700,fontSize:9.5,color:'#1a1a1a'}}>Rule Keywords — Select 1 to 4:</div>
                  <div style={{fontSize:7.5,fontWeight:700,color:'#555',padding:'3px 8px',background:'#f5f5f5',borderBottom:'1px solid #e8e8e8',letterSpacing:'0.04em',textTransform:'uppercase'}}>Account Related</div>
                  {['Rep Type','Rep Status','Rep Credentials','Rep Production Level'].map(k=>(
                    <div key={k} style={{display:'flex',alignItems:'center',gap:6,padding:'3px 8px',fontSize:9,color:'#333',borderBottom:'1px solid #f0f0f0'}}>
                      <div style={{width:9,height:9,border:'1px solid #999',borderRadius:1,background:'white',flexShrink:0}}/>
                      {k}
                    </div>
                  ))}
                  <div style={{padding:'4px 8px',textAlign:'right',background:'#fafafa',borderTop:'1px solid #eee',display:'flex',justifyContent:'flex-end',gap:4}}>
                    <button style={{fontSize:8,padding:'2px 8px',border:'1px solid #aaa',borderRadius:2,background:'#f0f0f0'}}>Cancel</button>
                    <button style={{fontSize:8,padding:'2px 8px',border:'1px solid #aaa',borderRadius:2,background:'#d4e0ec'}}>Next &gt;&gt;</button>
                  </div>
                </div>
                <div style={{position:'absolute',right:24,top:'50%',transform:'translateY(-50%)',background:'#fff8f0',border:'1px solid #c8723a',borderRadius:6,padding:'5px 8px',fontSize:8,fontFamily:'Inter,sans-serif',color:'#c8723a',fontWeight:600,maxWidth:110,lineHeight:1.4,boxShadow:'0 2px 6px rgba(200,114,58,0.2)'}}>What's the difference between these?</div>
              </div>
              <div style={{padding:'32px 36px',flex:1}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>02</div>
                <div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8,lineHeight:1.35}}>Guesswork shouldn't be part of building a compliance rule</div>
                <p style={{fontSize:13,lineHeight:1.7,color:deepBlue,marginBottom:12}}>100+ keywords listed by name only — no descriptions, no context. No way to know what values each keyword accepts without clicking back and forth between keyword selection and value entry.</p>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Only know what a keyword means by trial and error — select it and click next, then go back and search again for another keyword"</p>
              </div>
            </div>

            {/* 03 — Rule creation */}
            <div style={{background:'white',border:`1px solid rgba(202,213,226,0.35)`,borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'row',alignItems:'stretch',borderLeft:`4px solid ${accent}`}}>
              <div style={{background:'#f4f3f0',borderRight:'1px solid rgba(202,213,226,0.4)',padding:32,display:'flex',alignItems:'center',justifyContent:'center',width:'42%',flexShrink:0}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:'100%',maxWidth:260,border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'4px 8px',fontWeight:700,fontSize:10,color:'#1a1a1a'}}>Rule Details</div>
                  <div style={{padding:'6px 8px',borderBottom:'1px solid #eee'}}>
                    <div style={{fontSize:8,color:'#555',marginBottom:3}}>CUSIP/Symbol/SEDOL <span style={{color:'#c00'}}>*</span></div>
                    <div style={{display:'flex',gap:4,alignItems:'center'}}>
                      <select style={{fontSize:8,padding:'1px 4px',border:'1px solid #aaa',borderRadius:2,color:'#333',flexShrink:0}}><option>Equal to</option></select>
                      <div style={{border:'1px solid #aaa',borderRadius:2,background:'white',padding:'2px 6px',fontSize:8,color:'#888',fontStyle:'italic',flex:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>AAPL, TSLA, AMZN, MSFT, GOOGL…</div>
                    </div>
                    <div style={{fontSize:7,color:'#c8723a',marginTop:3,fontStyle:'italic'}}>↑ Free text — up to 20,000 comma-separated values entered manually</div>
                  </div>
                  <div style={{padding:'5px 8px',borderBottom:'1px solid #eee'}}>
                    <div style={{fontSize:8,color:'#555',marginBottom:2}}>Action <span style={{color:'#c00'}}>*</span></div>
                    <div style={{display:'flex',gap:4}}>
                      <select style={{fontSize:8,padding:'1px 4px',border:'1px solid #aaa',borderRadius:2}}><option>Equal to</option></select>
                      <select style={{fontSize:8,padding:'1px 4px',border:'1px solid #aaa',borderRadius:2}}><option>BUY</option></select>
                    </div>
                  </div>
                  <div style={{padding:'4px 8px',display:'flex',justifyContent:'flex-end',gap:4,background:'#fafafa'}}>
                    <button style={{fontSize:8,padding:'2px 8px',border:'1px solid #aaa',borderRadius:2,background:'#f0f0f0'}}>Cancel</button>
                    <button style={{fontSize:8,padding:'2px 8px',border:'1px solid #aaa',borderRadius:2,background:'#d4e0ec'}}>Save Rule</button>
                  </div>
                </div>
              </div>
              <div style={{padding:'32px 36px',flex:1}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>03</div>
                <div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8,lineHeight:1.35}}>The system expects expertise it never provides</div>
                <p style={{fontSize:13,lineHeight:1.7,color:deepBlue,marginBottom:12}}>A single text box for thousands of comma-separated values. No validation, no search, no structure. Users spend years learning by trial and error — no guardrails, no guidance.</p>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"One-line box for 600 ticker symbols — impossible to jump to the end of that list"</p>
              </div>
            </div>

            {/* 04 — Shadow systems */}
            <div style={{background:'white',border:`1px solid rgba(202,213,226,0.35)`,borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'row',alignItems:'stretch',borderLeft:`4px solid ${accent}`}}>
              <div style={{background:'#f4f3f0',borderRight:'1px solid rgba(202,213,226,0.4)',padding:32,display:'flex',alignItems:'center',justifyContent:'center',width:'42%',flexShrink:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  {[{bar:'#d4e0ec',title:'Platform — Rules',rows:['U023 — Equity Buy…','U030 — NF Training…','U058 — Reject Order…']},{bar:'#e2efda',title:'Excel / SharePoint',rows:['Rule | Rationale | Date','U023 | Equity res…','U030 | Training ID…']}].map((app,i)=>[
                    i===1 && <div key="arrow" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,color:'#c8723a',fontSize:16,fontWeight:700,lineHeight:1}}>⇄<span style={{fontSize:7,color:'#999',fontStyle:'italic',whiteSpace:'nowrap'}}>copy &amp; paste</span></div>,
                    <div key={app.title} style={{border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)',width:100}}>
                      <div style={{padding:'3px 6px',fontSize:7.5,fontWeight:700,background:app.bar,borderBottom:'1px solid rgba(0,0,0,0.1)',color:'#1a1a1a'}}>{app.title}</div>
                      {app.rows.map(r=><div key={r} style={{padding:'2px 6px',fontSize:7.5,color:'#555',borderBottom:'1px solid #f0f0f0'}}>{r}</div>)}
                      <div style={{padding:'2px 6px',fontSize:7,color:'#aaa',fontStyle:'italic'}}>+ 58 more…</div>
                    </div>
                  ])}
                </div>
              </div>
              <div style={{padding:'32px 36px',flex:1}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>04</div>
                <div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8,lineHeight:1.35}}>Users forced outside the platform for context</div>
                <p style={{fontSize:13,lineHeight:1.7,color:deepBlue,marginBottom:12}}>Users maintain shadow systems in Excel and SharePoint to track rule rationale and change history. Jumping between systems creates room for error — consequential in a compliance context.</p>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Jumping back and forth loses my place — and if I forget to update the spreadsheet, it's hard to know the single source of truth. In compliance, that gap can mean a costly trading error."</p>
              </div>
            </div>

            {/* 05 — Help buried */}
            <div style={{background:'white',border:`1px solid rgba(202,213,226,0.35)`,borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'row',alignItems:'stretch',borderLeft:`4px solid ${accent}`}}>
              <div style={{background:'#f4f3f0',borderRight:'1px solid rgba(202,213,226,0.4)',padding:32,display:'flex',alignItems:'center',justifyContent:'center',width:'42%',flexShrink:0}}>
                <div style={{position:'relative',width:160,margin:'0 auto'}}>
                  <div style={{border:'1px solid #b8b8b8',borderRadius:3,overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
                    <div style={{background:'#2a2a6e',padding:'5px 10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{fontSize:8.5,color:'white',fontWeight:700}}>Platform™</span>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <span style={{fontSize:7.5,color:'rgba(255,255,255,0.65)'}}>🏠</span>
                        <span style={{fontSize:8,color:'rgba(255,255,255,0.65)',background:'rgba(255,255,255,0.15)',borderRadius:'50%',width:14,height:14,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>?</span>
                      </div>
                    </div>
                    <div style={{padding:8,background:'white'}}>
                      <div style={{fontSize:8,fontWeight:700,color:'#1a1a1a',marginBottom:4}}>Rules</div>
                      {[90,75,60].map(w=><div key={w} style={{height:5,background:'#eee',borderRadius:2,marginBottom:3,width:`${w}%`}}/>)}
                    </div>
                  </div>
                  <div style={{position:'absolute',top:6,right:-80,display:'flex',alignItems:'center',gap:3}}>
                    <div style={{width:38,height:1,borderTop:'1.5px dashed #c8723a'}}/>
                    <span style={{fontSize:7,color:'#c8723a',fontStyle:'italic',whiteSpace:'nowrap'}}>buried here</span>
                  </div>
                </div>
              </div>
              <div style={{padding:'32px 36px',flex:1}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>05</div>
                <div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8,lineHeight:1.35}}>Help exists — users just never find it</div>
                <p style={{fontSize:13,lineHeight:1.7,color:deepBlue,marginBottom:12}}>Support material exists but users don't find it. A question mark icon buried in the top-right nav is the only entry point — and most users never click it. Discovery is entirely accidental.</p>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Didn't know that was here, that's cool"</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* DESIGN SPRINT */}
    <section style={sec(accent)}>
      <div style={ct}>
        <StepLabel light>Step 02 — Design Sprint</StepLabel>
        <h2 style={{fontSize:28,fontWeight:900,color:textLight,marginBottom:8}}>Insight → "How Might We"</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:'rgba(246,251,222,0.85)',maxWidth:720,marginBottom:16}}>Rather than jumping straight from research to wireframes, our full product team — PM, dev lead, and business analyst — agreed to join me in a design thinking sprint. The goal was collective ownership of both the problem and the direction, not just design sign-off.</p>
        <p style={{fontSize:15,lineHeight:1.75,color:'rgba(246,251,222,0.85)',maxWidth:720,marginBottom:48}}>And it worked. This isn't like redesigning a weather app — it's a highly complex, compliance-critical suite built on an antiquated tech stack — used by broker-dealers who feel the consequences of a single misconfigured rule across their entire firm's trades. Having engineering constraints, business logic, and product knowledge in the room while sketching didn't slow us down. It made the ideas exponentially sharper. The range and quality of what we generated together, in one session, would have taken weeks to arrive at through back-and-forth handoffs alone.</p>
        <div style={{width:40,height:3,background:'rgba(255,255,255,0.3)',borderRadius:2,marginBottom:32}}/>
        <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(232,240,238,0.6)'}}>How Might We — Six Opportunity Areas</p>
        </div>
        <p style={{fontSize:12,color:'rgba(232,240,238,0.4)',marginBottom:16,fontStyle:'italic'}}>Select a prompt to see the concept sketches and ideas it generated.</p>
        <div style={{marginBottom:24}}>
          <a href="https://www.figma.com/board/fOKBJ0Tc2lHQtjQiUKUugr/HMW-and-Concepts?node-id=0-1&t=xeVKVgdQRSJCUicq-1" target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.25)',borderRadius:8,padding:'8px 16px',fontSize:12,fontWeight:600,color:'rgba(246,251,222,0.85)',textDecoration:'none',letterSpacing:'0.02em',transition:'all 0.2s'}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 1H3a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V3a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.25"/><path d="M5 9l4-4M9 9V5H5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            View Original Sketches in FigJam
          </a>
        </div>
        <HMWExplorer/>
      </div>
    </section>

    {/* PRIORITIZATION */}
    <section style={sec('white')}>
      <div style={ct}>
        <StepLabel>Step 03 — Prioritization</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:warmGray,letterSpacing:'-0.3px',marginBottom:20}}>Deciding Where to Start</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:32}}>With six HMW areas and a list of concepts, the team worked through effort vs. impact. The most exciting concept (List Manager) got deferred. The highest-impact, most sequentially logical work got prioritized.</p>

        {/* Effort vs Impact Matrix */}
        <div style={{background:'#f4f7f2',border:'1px solid rgba(74,124,111,0.15)',borderRadius:14,padding:'24px 32px 16px 44px',marginBottom:4,position:'relative'}}>
          {/* Y axis label — rotated, pinned to left inside box */}
          <div style={{position:'absolute',left:0,top:0,bottom:0,width:28,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{transform:'rotate(-90deg)',fontSize:8,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(74,124,111,0.5)',whiteSpace:'nowrap'}}>↓ LOWER IMPACT · HIGHER IMPACT ↑</div>
          </div>
          {/* Matrix grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,position:'relative',marginBottom:0}}>
            {/* Quadrant TL */}
            <div style={{borderRight:'1px solid rgba(74,124,111,0.15)',borderBottom:'1px solid rgba(74,124,111,0.15)',padding:'14px 16px 20px 20px',minHeight:200,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(74,124,111,0.6)'}}>HIGH IMPACT · LOW EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 04',title:'More intuitive form controls',phase:'Phase 2',color:'#dce8f5'},
                {hmw:'HMW 03',title:'Surface help where it\'s needed — contextual guidance',phase:'Phase 2',color:'#dce8f5'},
                {hmw:'HMW 01',title:'Find & manage rules — search and filter on metadata + plain language rule preview',phase:'Phase 1',color:'#d4edda'},
                {hmw:'HMW 05',title:'Intuitive rule builder — split panel, plain language preview builds as details are added',phase:'Phase 2',color:'#dce8f5'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.color,borderRadius:6,padding:'8px 10px',width:c.hmw==='HMW 01'?'calc(40% - 5px)':'calc(30% - 8px)',minWidth:110,flexShrink:0}}>
                  <div style={{fontSize:8,fontWeight:700,color:'rgba(74,124,111,0.7)',letterSpacing:'0.08em',marginBottom:4}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#2d5c52',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{fontSize:9,fontWeight:700,color:c.phase==='Phase 1'?'#2d5c52':c.phase==='Phase 2'?'#3a5f8a':'#8a6a3a'}}>→ {c.phase}</div>
                </div>
              ))}
              </div>
            </div>
            {/* Quadrant TR */}
            <div style={{borderBottom:'1px solid rgba(74,124,111,0.15)',padding:'14px 16px 20px 16px',minHeight:200,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(144,161,185,0.7)'}}>HIGH IMPACT · HIGH EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 02',title:'Keyword assistant — view keyword descriptions on selection surface',phase:'Phase 2',color:'#dce8f5',phaseColor:'#3a5f8a'},
                {hmw:'HMW 06',title:'Documentation & audit trail — change history',phase:'Phase 3',color:'#ede8f5',phaseColor:'#6b4f9e'},
                {hmw:'HMW 04',title:'List Manager — bulk editing, inheritance, validation',phase:'Deferred',color:'#fdf0dc',phaseColor:'#b07a30'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.color,borderRadius:6,padding:'8px 10px',width:'calc(50% - 5px)',minWidth:120}}>
                  <div style={{fontSize:8,fontWeight:700,color:'rgba(74,124,111,0.7)',letterSpacing:'0.08em',marginBottom:4}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#2d5c52',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{fontSize:9,fontWeight:700,color:c.phaseColor}}>→ {c.phase}</div>
                </div>
              ))}
              </div>
            </div>
            {/* Quadrant BL */}
            <div style={{borderRight:'1px solid rgba(74,124,111,0.15)',padding:'14px 16px 20px 20px',minHeight:160,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(144,161,185,0.6)'}}>LOW IMPACT · LOW EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 01',title:'Bulk actions',phase:'Deprioritized',color:'#fde8e8'},
                {hmw:'HMW 01',title:'Custom rule description',phase:'Deprioritized',color:'#fde8e8'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.color,borderRadius:6,padding:'8px 10px',width:'calc(40% - 5px)',minWidth:110}}>
                  <div style={{fontSize:8,fontWeight:700,color:'rgba(180,60,60,0.6)',letterSpacing:'0.08em',marginBottom:4}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#6b2f2f',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{fontSize:9,fontWeight:700,color:'#b04040'}}>→ {c.phase}</div>
                </div>
              ))}
              </div>
            </div>
            {/* Quadrant BR */}
            <div style={{padding:'14px 16px 20px 16px',minHeight:160,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(144,161,185,0.6)'}}>LOW IMPACT · HIGH EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 04',title:'Rule Wizard',phase:'Deprioritized',color:'#fde8e8'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.color,borderRadius:6,padding:'8px 10px',width:'calc(45% - 5px)',minWidth:120}}>
                  <div style={{fontSize:8,fontWeight:700,color:'rgba(180,60,60,0.6)',letterSpacing:'0.08em',marginBottom:4}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#6b2f2f',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{fontSize:9,fontWeight:700,color:'#b04040'}}>→ {c.phase}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
          {/* X axis label — inside, bottom center */}
          <div style={{textAlign:'center',paddingTop:12,fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(144,161,185,0.6)'}}>← LOWER EFFORT · HIGHER EFFORT →</div>
        </div>

        <h3 style={{fontSize:16,fontWeight:700,color:warmGray,letterSpacing:'-0.2px',marginTop:36,marginBottom:16}}>The resulting phased approach</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            {pill:'✓ Phase 1',title:'Rules List Redesign',body:'Users need to find and understand existing rules before anything else. Real search, filtering, and a plain language rule preview accomplish this. The layout of this page — and getting users familiar with the plain language format — made it easier to build rules in Phase 2, which reused the same pattern.',bg:'#d4edda',border:'rgba(74,124,111,0.25)',pillBg:'rgba(74,124,111,0.15)',pillColor:'#2d5c52'},
            {pill:'→ Phase 2',title:'Rule Creation Redesign',body:'Getting new rules into the system cleanly — with guided input, contextual keyword help, and confidence before going live — was the most consequential workflow. It also laid the groundwork for edit rule, which could follow the same pattern with minimal additional mapping.',bg:'#dce8f5',border:'rgba(58,95,138,0.2)',pillBg:'rgba(58,95,138,0.12)',pillColor:'#3a5f8a'},
            {pill:'→ Phase 3',title:'Edit Rule + Change History',body:'Editing and viewing change history depends on users having a solid mental model of rules first. Sequencing this after creation and list work made the later problem easier to solve.',bg:'#ede8f5',border:'rgba(120,90,160,0.2)',pillBg:'rgba(120,90,160,0.12)',pillColor:'#6b4f9e'},
            {pill:'→ Deferred',title:'List Manager',body:null,bg:'#fdf0dc',border:'rgba(176,122,48,0.2)',pillBg:'rgba(176,122,48,0.12)',pillColor:'#b07a30'},
          ].map(card=>(
            <div key={card.title} style={{borderRadius:12,padding:'28px 32px',background:card.bg,border:`1px solid ${card.border}`}}>
              <div style={{display:'inline-flex',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14,background:card.pillBg,color:card.pillColor}}>{card.pill}</div>
              <div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8}}>{card.title}</div>
              {card.body && <p style={{fontSize:13,lineHeight:1.65,color:deepBlue}}>{card.body}</p>}
              {card.title === 'List Manager' && (
                <>
                  <p style={{fontSize:13,lineHeight:1.65,color:deepBlue,marginBottom:16}}>The most exciting concept from the sprint — and the most complex. Sprint edge-case analysis revealed significant downstream complexity. Deferred, not abandoned.</p>
                  <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:4,padding:'6px 12px',borderRadius:8,background:'rgba(176,122,48,0.12)',border:'1px solid rgba(176,122,48,0.25)'}}>
                    <span style={{fontSize:12,fontStyle:'italic',color:'#b07a30',letterSpacing:'0.01em'}}>↓ See note on pivoting in the face of tech constraints — in Redesigning Rule Creation below</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>


    <section style={sec(cream)}>
      <div style={ct}>
        <StepLabel>Step 04 — Design</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:warmGray,letterSpacing:'-0.3px',marginBottom:20}}>Redesigning the Rules List</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:40}}>The legacy rules list had one job — display all rules — and did it without any ability to navigate, filter, or understand. The redesign introduced a three-panel layout that turned the list into a genuine decision-making surface.</p>
        <PrototypeLauncher/>
        <div style={{display:'flex',flexDirection:'column',gap:24}}>
          {[{num:'01',title:'Three-panel layout: Filter → List → Detail',body:'A persistent left filter panel, a center rules list with sortable columns, and a right detail panel showing rule logic in plain English alongside a rule timeline summary. Users no longer need to click into a rule to understand what it does.'},{num:'02',title:'Plain language rule logic',body:'Rule logic is rendered as human-readable sentences rather than raw conditional strings. Compliance officers can field trader calls without hunting through opaque logic.'},{num:'03',title:'Rule Timeline Summary + Change History link',body:'Each rule shows create date, created by, last modified date, and last modified by — directly on the detail panel. A "View Rule Change History" link begins to replace the Excel/SharePoint shadow system.'}].map(d=>(<div key={d.num} style={{display:'flex',gap:28,padding:'28px 32px',background:'white',borderRadius:12,border:`1px solid ${borderLight}`}}><div style={{fontSize:32,fontWeight:800,color:accentMid,lineHeight:1,flexShrink:0,width:40}}>{d.num}</div><div><div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8}}>{d.title}</div><p style={{fontSize:13,lineHeight:1.65,color:deepBlue}}>{d.body}</p></div></div>))}
        </div>
        <div style={{marginTop:40,display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <ImgFrame label="Lo-fi → Hi-fi: Rule Management"><Placeholder h={220} label="[Placeholder — Rule Management hi-fi screen]"/></ImgFrame>
          <ImgFrame label="Before: Legacy Rules List"><Placeholder h={220} label="[Placeholder — Legacy rules list screen]" warm/></ImgFrame>
        </div>
      </div>
    </section>

    {/* DESIGN — Rule Creation */}
    <section style={sec('white')}>
      <div style={ct}>
        <h2 style={{fontSize:28,fontWeight:800,color:warmGray,letterSpacing:'-0.3px',marginBottom:20}}>Redesigning Rule Creation</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:40}}>The legacy creation experience assumed expert knowledge. The redesign built that knowledge into the flow — replacing a blank form with a guided wizard. Core structural shift: from a single overwhelming page to a stepped workflow — Keywords → Rule Logic → Order Placed By → Rule Outcome → Review &amp; Confirm.</p>
        <div style={{display:'flex',flexDirection:'column',gap:24}}>
          {[{num:'01',title:'Clause-based keyword selection with preview',body:"The keyword page became a three-column layout: searchable clause list on the left, a preview panel in the center showing each clause's name, usage examples, value type, and tips, and a 'selected clauses' summary on the right. Users can preview a clause before committing — eliminating the trial-and-error loop."},{num:'02',title:'Structured value input with inline validation',body:'The single 2,000-value text box was replaced with tabular input: each value gets its own row with a real-time valid/invalid indicator. Users know before saving whether their rule is correctly formed. This evolved across two iterations based on user testing feedback.'},{num:'03',title:'Live plain-language rule preview throughout',body:'As users complete each step, the left panel builds up a plain-English summary of the rule. By the time they reach Review & Confirm, the full rule logic is visible in human-readable form — giving confidence before going live.'}].map(d=>(<div key={d.num} style={{display:'flex',gap:28,padding:'28px 32px',background:'white',borderRadius:12,border:`1px solid ${borderLight}`}}><div style={{fontSize:32,fontWeight:800,color:accentMid,lineHeight:1,flexShrink:0,width:40}}>{d.num}</div><div><div style={{fontSize:15,fontWeight:700,color:warmGray,marginBottom:8}}>{d.title}</div><p style={{fontSize:13,lineHeight:1.65,color:deepBlue}}>{d.body}</p></div></div>))}
        </div>
        <div style={{marginTop:40,display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,alignItems:'start'}}>
          <div>
            <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:deepBlue,marginBottom:14}}>Plain Language Rule Preview</p>
            <div style={{background:'#2d4a45',borderRadius:10,padding:20,fontSize:11,color:'rgba(246,251,222,0.8)',border:'1px solid rgba(74,124,111,0.3)'}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(74,124,111,0.8)',marginBottom:14}}>Rule Logic Preview — builds as you go</div>
              {[{t:'if',bg:'rgba(106,129,178,0.15)',bl:'rgba(106,129,178,0.5)',jsx:<><b style={{color:'rgba(200,220,230,0.95)'}}>If</b> <b style={{color:'rgba(200,220,230,0.95)'}}>Account Number</b> is one of <span style={{color:'rgba(74,190,155,0.9)',fontWeight:600}}>XXXXXXX, XXXXXXX</span></>},{t:'and',bg:'rgba(74,124,111,0.12)',bl:'rgba(74,124,111,0.4)',jsx:<><b style={{color:'rgba(200,220,230,0.95)'}}>and</b> <b style={{color:'rgba(200,220,230,0.95)'}}>Action</b> is <span style={{color:'rgba(74,190,155,0.9)',fontWeight:600}}>Buy</span></>},{t:'then',bg:'rgba(177,124,93,0.15)',bl:'rgba(177,124,93,0.5)',jsx:<>→ <b>then</b> the order will be <b style={{color:'rgba(255,160,100,0.95)'}}>REJECTED</b></>}].map((cl,i)=>(<div key={i} style={{padding:'8px 12px',borderRadius:6,marginBottom:6,fontSize:11,background:cl.bg,borderLeft:`3px solid ${cl.bl}`,color:cl.t==='then'?'rgba(246,251,222,0.9)':'rgba(246,251,222,0.8)'}}>{cl.jsx}</div>))}
            </div>
          </div>
          <div>
            <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:deepBlue,marginBottom:14}}>Value Input — Iteration 2</p>
            <ImgFrame label="After user testing: structured table with inline validation"><Placeholder h={180} label="[Placeholder — Bulk value add iteration 2]"/></ImgFrame>
          </div>
        </div>
        <div style={{marginTop:32,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
          {[['Add Clause — keyword preview','[Placeholder — Add Clauses modal]'],['Rule Outcome step','[Placeholder — Rule Outcome screen]'],['Review & Confirm','[Placeholder — Review & Confirm screen]']].map(([l,p])=>(<ImgFrame key={l} label={l}><Placeholder h={160} label={p}/></ImgFrame>))}
        </div>
      </div>
    </section>

    {/* ASIDE — List Manager / Tech Constraint */}
    <section style={{...sec('white'),paddingTop:72,paddingBottom:80,background:'#fdfcf8'}}>
      <div style={ct}>
        {/* Aside header */}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
          <div style={{width:3,height:36,background:'#b07a30',borderRadius:2,flexShrink:0}}/>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'#b07a30',marginBottom:3}}>A closer look</div>
            <div style={{fontSize:18,fontWeight:800,color:warmGray,letterSpacing:'-0.2px'}}>Pivoting in the Face of Tech Constraints</div>
          </div>
        </div>

        <p style={{fontSize:14,lineHeight:1.75,color:deepBlue,maxWidth:760,marginBottom:40}}>Adding large, constantly-changing value sets to rules — blacklisted securities, rep IDs by licensing status, entities by risk tier — is core to how compliance rules work in practice. The legacy process for doing this required tribal knowledge to even attempt. Here's what it actually looked like.</p>

        {/* Two-step annotated visual */}
        <div style={{background:'#f7f6f2',border:'1px solid rgba(202,213,226,0.35)',borderRadius:14,padding:'32px 36px',marginBottom:36}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(144,161,185,0.7)',marginBottom:24}}>Legacy workflow — uploading a securities list to a rule</div>

          {/* Step 1 */}
          <div style={{marginBottom:32}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:'#b07a30',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:'white'}}>1</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:warmGray,letterSpacing:'0.01em'}}>Leave rule creation — navigate to a separate import page via main nav</div>
            </div>
            <div style={{display:'flex',gap:20,alignItems:'flex-start'}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:'100%',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'5px 10px',fontWeight:700,fontSize:11,color:'#1a1a1a'}}>Data Import</div>
                  <div style={{padding:'16px 20px',display:'flex',flexDirection:'column',gap:12}}>
                    <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                      <span style={{fontSize:10,fontWeight:700,color:'#cc0000',whiteSpace:'nowrap',minWidth:44}}>Step 1:</span>
                      <div>
                        <div style={{fontSize:10,color:'#333',marginBottom:6}}>Type the file name below or use the Browse button to locate the file on your desktop.</div>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>
                          <div style={{border:'1px solid #aaa',borderRadius:2,padding:'2px 10px',fontSize:10,background:'#f0f0f0',color:'#333'}}>Choose File</div>
                          <span style={{fontSize:10,color:'#888'}}>No file chosen</span>
                        </div>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:10,alignItems:'center'}}>
                      <span style={{fontSize:10,fontWeight:700,color:'#cc0000',whiteSpace:'nowrap',minWidth:44}}>Step 2:</span>
                      <span style={{fontSize:10,color:'#333'}}>Data Validation Display:</span>
                      <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:11,height:11,borderRadius:'50%',border:'2px solid #aaa',background:'#0a246a',flexShrink:0}}/><span style={{fontSize:10,color:'#333'}}>All Records</span></div>
                      <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:11,height:11,borderRadius:'50%',border:'2px solid #aaa',background:'white',flexShrink:0}}/><span style={{fontSize:10,color:'#333'}}>Errors Only</span></div>
                    </div>
                    <div style={{display:'flex',gap:10,alignItems:'center'}}>
                      <span style={{fontSize:10,fontWeight:700,color:'#cc0000',whiteSpace:'nowrap',minWidth:44}}>Step 3:</span>
                      <span style={{fontSize:10,color:'#333'}}>Click Submit to initiate Import Process.</span>
                    </div>
                    <div style={{paddingLeft:54}}>
                      <div style={{display:'inline-block',border:'1px solid #aaa',borderRadius:2,padding:'2px 16px',fontSize:10,color:'#333',background:'#f0f0f0'}}>Submit</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{width:200,flexShrink:0,background:'#f5c542',borderRadius:6,padding:'12px 14px',boxShadow:'2px 3px 10px rgba(0,0,0,0.15)',position:'relative',top:8}}>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3d2800',fontWeight:500}}>This page lives in main nav — not linked to or from rule creation. No obvious path here if you don't already know it exists.</div>
              </div>
            </div>
          </div>

          {/* Divider arrow */}
          <div style={{display:'flex',justifyContent:'center',marginBottom:28}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
              <div style={{width:1,height:16,background:'rgba(176,122,48,0.35)'}}/>
              <span style={{fontSize:16,color:'rgba(176,122,48,0.5)'}}>↓</span>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:'#b07a30',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:'white'}}>2</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:warmGray,letterSpacing:'0.01em'}}>Back in rule creation — set keyword to "Securities Upload," then match rule name exactly to the CSV filename</div>
            </div>
            <div style={{display:'flex',gap:20,alignItems:'flex-start'}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:'100%',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'5px 10px',fontWeight:700,fontSize:11,color:'#1a1a1a'}}>Rule Management — Edit Rule</div>
                  <div style={{padding:'12px 16px'}}>
                    <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:10,flexWrap:'wrap'}}>
                      <span style={{fontSize:10,color:'#555'}}>rule 0000001</span>
                      <div style={{display:'flex',alignItems:'center',gap:6,marginLeft:'auto'}}>
                        <span style={{fontSize:10,color:'#555'}}>Rule Name:</span>
                        <div style={{border:'2px solid #f5a623',borderRadius:2,padding:'2px 8px',fontSize:10,background:'white',color:'#000',minWidth:150,fontWeight:600}}>blacklisted securities 2025</div>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8,flexWrap:'wrap'}}>
                      <span style={{fontSize:10,color:'#555'}}>Keyword:</span>
                      <div style={{background:'white',border:'1px solid #aaa',borderRadius:2,overflow:'hidden',fontSize:10,minWidth:140}}>
                        <div style={{padding:'3px 8px',background:'#dce8f5',borderBottom:'1px solid #ccc',display:'flex',alignItems:'center',gap:4,color:'#1a3a6a',fontWeight:600}}><span style={{color:'#2a6a2a'}}>✓</span> Securities Upload</div>
                        <div style={{padding:'3px 8px',color:'#555'}}>Not Securities Upload</div>
                      </div>
                      <span style={{fontSize:10,color:'#555',marginLeft:8}}>Action:</span>
                      <div style={{border:'1px solid #aaa',borderRadius:2,padding:'2px 8px',background:'white',fontSize:10,color:'#333'}}>REVIEW ▾</div>
                    </div>
                    <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10,fontSize:10,color:'#555',flexWrap:'wrap'}}>
                      <span>Applies To: *</span>
                      {['Junior Trader','Advisor','Investor','Senior Trader'].map((r,i)=>(
                        <label key={r} style={{display:'flex',alignItems:'center',gap:3,cursor:'default'}}>
                          <div style={{width:11,height:11,border:'1px solid #aaa',borderRadius:2,background:i!==1?'#dce8f5':'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            {i!==1 && <span style={{fontSize:8,color:'#1a3a6a',fontWeight:900,lineHeight:1}}>✓</span>}
                          </div>
                          {r}
                        </label>
                      ))}
                    </div>
                    <div style={{display:'flex',gap:5,marginBottom:14}}>
                      {['Choose Keywords','Save Rule','Save as New Rule','Delete Rule','Cancel'].map(b=>(
                        <div key={b} style={{border:'1px solid #aaa',borderRadius:2,padding:'2px 8px',fontSize:9,color:'#333',background:'#f0f0f0'}}>{b}</div>
                      ))}
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:6}}>
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <div style={{width:1,height:18,borderLeft:'2px dashed rgba(176,122,48,0.45)'}}/>
                        <span style={{fontSize:9,color:'rgba(176,122,48,0.7)',fontStyle:'italic'}}>filename must match rule name exactly ↕</span>
                      </div>
                    </div>
                    <div style={{border:'1px solid #bbb',borderRadius:3,overflow:'hidden',boxShadow:'0 2px 6px rgba(0,0,0,0.08)'}}>
                      <div style={{background:'#1d6f42',padding:'4px 10px',display:'flex',alignItems:'center',gap:6}}>
                        <div style={{width:14,height:14,background:'white',borderRadius:2,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><span style={{fontSize:9,color:'#1d6f42',fontWeight:900}}>X</span></div>
                        <span style={{fontSize:10,color:'white',fontWeight:700}}>blacklisted securities 2025</span>
                      </div>
                      <div style={{display:'flex',background:'#f3f3f3',borderBottom:'1px solid #ddd'}}>
                        {['A','B','C','D','E','F','G','H','I','J'].map(h=><div key={h} style={{flex:1,padding:'2px 4px',fontSize:8,color:'#555',textAlign:'center',borderRight:'1px solid #ddd'}}>{h}</div>)}
                      </div>
                      <div style={{display:'flex',borderBottom:'1px solid #eee'}}>
                        <div style={{width:20,padding:'2px 4px',fontSize:8,color:'#888',textAlign:'center',borderRight:'1px solid #ddd',background:'#f3f3f3',flexShrink:0}}>1</div>
                        {['Securities Upload','AAPL','AMZN','AAA','MSFT','TSLA','FB','NFLX','NVDA','INTC'].map((v,i)=>(
                          <div key={i} style={{flex:1,padding:'2px 4px',fontSize:8,color:i===0?'#1d6f42':'#333',fontWeight:i===0?700:400,borderRight:'1px solid #eee',whiteSpace:'nowrap',overflow:'hidden'}}>{v}</div>
                        ))}
                      </div>
                      {[2,3,4].map(r=>(
                        <div key={r} style={{display:'flex',borderBottom:'1px solid #f0f0f0'}}>
                          <div style={{width:20,padding:'2px 4px',fontSize:8,color:'#888',textAlign:'center',borderRight:'1px solid #ddd',background:'#f3f3f3',flexShrink:0}}>{r}</div>
                          {Array(10).fill('').map((_,i)=><div key={i} style={{flex:1,borderRight:'1px solid #f0f0f0',padding:'2px 4px',fontSize:8,minHeight:14}}/>)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{width:200,flexShrink:0,background:'#f5c542',borderRadius:6,padding:'12px 14px',boxShadow:'2px 3px 10px rgba(0,0,0,0.15)',position:'relative',top:8}}>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3d2800',fontWeight:500,marginBottom:8}}>Rule name has to match the .csv filename exactly.</div>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3d2800',fontWeight:500}}>No in-product guidance tells you this. Unclear how they're linked.</div>
              </div>
            </div>
          </div>

          {/* Warning note */}
          <div style={{marginTop:28,padding:'14px 18px',background:'rgba(176,122,48,0.08)',border:'1px solid rgba(176,122,48,0.2)',borderRadius:8,display:'flex',gap:10,alignItems:'flex-start'}}>
            <span style={{fontSize:14,flexShrink:0}}>⚠️</span>
            <p style={{fontSize:12,lineHeight:1.65,color:'#7a5020',margin:0}}>And the master lists themselves? Always managed <em>outside</em> the platform entirely — in Excel or shared drives — because the system couldn't store them. Two potential sources of truth, with no reconciliation mechanism.</p>
          </div>
        </div>
        <p style={{fontSize:11,fontStyle:'italic',color:deepBlue,opacity:0.5,marginBottom:40}}>Legacy securities upload workflow — reproduced from the production system</p>

        {/* Concept vs. Shipped — side by side */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:40}}>
          <ImgFrame label="Concept — List Manager"><Placeholder h={260} label="[Placeholder — List Manager concept screens]"/></ImgFrame>
          <ImgFrame label="What shipped — inline value management + CSV upload"><Placeholder h={260} label="[Placeholder — Shipped value input UI]"/></ImgFrame>
        </div>

        {/* Narrative: what we wanted, what blocked us, what we shipped */}
        <div style={{display:'flex',flexDirection:'column',gap:0}}>
          {[
            {
              label:'What we wanted to fix',
              body:'The ask from user interviews was clear: let compliance teams manage securities lists inside the platform — with visibility into which rules used which lists, and the ability to update one list without touching every rule that referenced it. A full List Manager, a dedicated tool for defining, storing, and reusing named lists across rules, was the natural answer.'
            },
            {
              label:'Why it didn\'t ship',
              body:'The constraint was genuinely immovable. The current data storage architecture couldn\'t hold list-level entities — supporting that would\'ve required infrastructure investment that wasn\'t resourced for this cycle. We pushed hard to understand exactly where the wall was, and once it was confirmed, we stopped designing around it and started designing within it.'
            },
            {
              label:'What we shipped instead',
              body:'The insight was that the rule itself could store its own value set — just not as a reusable, named list. So we focused on making the upload and editing experience within the rule dramatically better: structured tabular input with per-row validation, a CSV upload path, and real-time valid/invalid feedback before saving. No more comma-separated text box. No more filename-matching ritual. It\'s not the List Manager. But it solves the most acute version of the problem for the people doing this work every day — and it builds the right functional foundation for when full list management becomes feasible.'
            },
          ].map((item, i, arr) => (
            <div key={item.label} style={{padding:'28px 32px',background:'white',border:`1px solid ${borderLight}`,borderBottom: i < arr.length - 1 ? 'none' : `1px solid ${borderLight}`,borderRadius: i === 0 ? '12px 12px 0 0' : i === arr.length - 1 ? '0 0 12px 12px' : '0'}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#b07a30',marginBottom:10}}>{item.label}</div>
              <p style={{fontSize:13,lineHeight:1.75,color:deepBlue,margin:0}}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section style={sec(cream)}>
      <div style={ct}>
        <StepLabel>Step 05 — Validate</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:warmGray,letterSpacing:'-0.3px',marginBottom:20}}>Lo-fi Prototype Testing</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:40}}>We tested with lo-fi prototypes intentionally — avoiding the trap of over-investing in visual polish before validating the core concept. Each workflow step was mapped to a specific research question. Areas of highest uncertainty — clause selection, value input, and the add list flow — were the focus.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:16,color:accent}}>What worked well</div>
            {["General workflow described as intuitive, smooth, comfortable — looks great and a lot easier to use","Plain language rule preview that builds throughout the flow was a standout — users specifically called it out","Add Clause step: users liked the search, additional info, and flexibility of quick add vs. preview first","Upload pattern felt familiar and seamless; valid/invalid summary well received","Rule Management screen improved — filtering helpful, rule preview on the right landed well","Review & Confirm: users loved the rule preview at the end"].map((item,i)=>(<div key={i} style={{fontSize:13,lineHeight:1.6,color:deepBlue,padding:'10px 14px',borderRadius:8,marginBottom:8,background:'rgba(74,124,111,0.07)',borderLeft:`3px solid ${accentMid}`}}>{item}</div>))}
          </div>
          <div>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:16,color:terracotta}}>Iterated on</div>
            {["Entry point for adding values was unclear — users eventually found it but path wasn't obvious enough","Invalid values error handling confusing — led to Iteration 2 with table-based input and inline validation","No download template for value upload — users felt unsure without a format reference","Clause preview felt editable — users tried to interact with it; needed clearer read-only treatment","Order Placed By step lacked the contextual definitions users loved on Order Outcome — inconsistency noticed"].map((item,i)=>(<div key={i} style={{fontSize:13,lineHeight:1.6,color:deepBlue,padding:'10px 14px',borderRadius:8,marginBottom:8,background:'rgba(177,124,93,0.07)',borderLeft:'3px solid rgba(177,124,93,0.4)'}}>{item}</div>))}
          </div>
        </div>
        <div style={{marginTop:36}}><ImgFrame label="User Testing Plan — workflow steps mapped to research questions"><Placeholder h={200} label="[Placeholder — User testing plan artifact]"/></ImgFrame></div>
      </div>
    </section>

    {/* OUTCOMES */}
    <section style={sec(accentDark)}>
      <div style={ct}>
        <StepLabel light>Outcomes</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:textLight,marginBottom:16}}>From shipped to what's next</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:'rgba(246,251,222,0.85)',maxWidth:680,marginBottom:48}}>Both the rule management redesign and the rule creation wizard were user tested, iterated, and shipped. The work established patterns and groundwork for the next phase — edit rule, change history, and eventually the full List Manager.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:32}}>
          {[{icon:'🎯',title:'Guided creation over blank forms',body:'Stepped wizard with clause preview replaced a single overwhelming page — reducing expert knowledge required to create a rule correctly.'},{icon:'🔍',title:'Findable, scannable rules list',body:'Real search, active/inactive filtering, keyword filtering, and plain-English rule preview replaced Ctrl+F and Excel workarounds.'},{icon:'✅',title:'Confidence before going live',body:'Live rule preview, inline value validation, and structured clause details give users assurance their rule will do what they intended.'}].map(card=>(<div key={card.title} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:12,padding:'28px 24px'}}><div style={{fontSize:28,marginBottom:14}}>{card.icon}</div><div style={{fontSize:14,fontWeight:700,color:textLight,marginBottom:8}}>{card.title}</div><p style={{fontSize:12,lineHeight:1.65,color:'rgba(246,251,222,0.7)'}}>{card.body}</p></div>))}
        </div>
        <div style={{padding:32,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:12}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(232,240,238,0.55)',marginBottom:16}}>What's next — Phase 2</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
            {['Edit Rule flow — building on the creation patterns established in Phase 1','Rule Change History — surfacing the audit trail users currently track in Excel','List Manager — the most complex and most requested capability, now better scoped'].map(t=>(<div key={t} style={{padding:'14px 16px',background:'rgba(255,255,255,0.06)',borderRadius:8,fontSize:12,lineHeight:1.6,color:'rgba(246,251,222,0.75)'}}>{t}</div>))}
          </div>
        </div>
      </div>
    </section>

    {/* REFLECTION */}
    <section style={sec('white')}>
      <div style={{...ct,maxWidth:720}}>
        <StepLabel>Reflection</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:warmGray,letterSpacing:'-0.3px',marginBottom:20}}>What I'd do differently</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,padding:'24px 32px',background:accentPale,border:'1px solid rgba(74,124,111,0.15)',borderRadius:12,fontStyle:'italic'}}>[Placeholder — Add your reflection here. Consider: what constraint shaped the design most unexpectedly? What would you prioritize differently with more time? What did this project reinforce about how you work?]</p>
      </div>
    </section>

    <footer style={{padding:`40px ${sideP}`,display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${borderLight}`,background:cream}}>
      <div style={{fontSize:13,fontWeight:700,color:warmGray}}>kristin<span style={{color:accent}}>.garza</span> · UX Designer</div>
      <div style={{display:'flex',gap:28}}>
        {[['LinkedIn','https://linkedin.com'],['Email','mailto:you@email.com'],['Résumé','/resume.pdf']].map(([label,href])=>(<a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" style={{fontSize:13,fontWeight:500,color:warmGray,opacity:0.6,textDecoration:'none'}}>{label}</a>))}
      </div>
    </footer>
  </div>)
}
