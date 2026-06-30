import { useState, useEffect, useRef } from 'react'
import Nav from '../components/Nav.jsx'
import './case-study-shared.css'

// Palette matches the Order Management case study (the reference): terracotta
// accent, charcoal text, warm cream page surface. The old steel-blue values
// were replaced when the case studies were unified on the warm palette.
const accent='var(--clay)',accentDark='var(--ink-2)',accentMid='rgba(184,103,87,0.35)',accentLight='rgba(184,103,87,0.06)',accentPale='var(--clay-tint)',textLight='#edeef0',warmGray='var(--ink-2)',deepBlue='var(--ink-2)',cream='var(--bg)',pageBg='var(--bg)',borderLight='rgba(184,103,87,0.18)',terracotta='var(--clay)'
const sideP='clamp(20px, 5vw, 64px)',contentW='1240px'
const sec=(bg)=>({width:'100%',padding:`clamp(60px, 10vw, 140px) 0`,background:bg})
const ct={maxWidth:contentW,width:'100%',margin:'0 auto',padding:`0 ${sideP}`}

// Chapter list for the sticky scrollspy rail. Each `id` matches a section's
// id below; matching the OM pattern this case study has 11 chapters mapped
// to the 7-step process plus tl;dr / framing / outcomes / reflection.
const CHAPTERS = [
  { id: 'ch-tldr',        label: 'Context' },
  { id: 'ch-discovery',   label: 'Research' },
  { id: 'ch-design',      label: 'Redesign' },
  { id: 'ch-outcomes',    label: 'Outcome' },
  { id: 'ch-reflection',  label: 'Reflection' },
]

function StepLabel({children,light}){
  // Reads styling from .cs-page .step-label in case-study-shared.css so OM,
  // Rules, and Positions all share one rule. The trailing rule line is
  // produced by the CSS ::after, not a span here.
  return <div className={light ? 'step-label light' : 'step-label'}>{children}</div>
}

function Callout({icon,title,body,style:s}){
  return <div style={{marginTop:64,padding:'28px 36px',background:accentLight,border:'1px solid rgba(184,103,87,0.2)',borderRadius:12,display:'flex',gap:16,alignItems:'flex-start',...s}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>{icon}</span><div><p style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:accentDark,marginBottom:6}}>{title}</p><p style={{fontSize:14,lineHeight:1.65,color:accentDark}}>{body}</p></div></div>
}

function ImgFrame({label,children,stretch}){
  return <div style={stretch?{display:'flex',flexDirection:'column',height:'100%'}:{}}><p style={{fontSize:11,fontWeight:600,color:deepBlue,letterSpacing:'0.03em',marginBottom:12,opacity:0.75,textTransform:'uppercase'}}>{label}</p><div style={stretch?{flex:1,display:'flex',flexDirection:'column'}:{}}>{children}</div></div>
}

function Placeholder({h=200,label,warm}){
  return <div style={{background:warm?'linear-gradient(135deg,#f5f0eb,#ede8e3)':'linear-gradient(135deg,#ededee,#dde1e5)',border:`1px solid ${warm?'rgba(177,124,93,0.2)':'rgba(184,103,87,0.2)'}`,borderRadius:10,height:h,display:'flex',alignItems:'center',justifyContent:'center',color:warm?terracotta:accent,fontSize:12,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',textAlign:'center',padding:'0 20px'}}>{label}</div>
}

/* Shared close button used inside every fullscreen view in this case study.
   Big, high-contrast pill with a "× Close" label so it's unmistakable, and
   the .compare-close-btn class hooks into hover/focus + mobile rules in
   case-study-shared.css. */
function FullscreenCloseBtn({onClose, label='Close'}){
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={`${label} full screen view`}
      className="compare-close-btn"
      style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.8)',color:'var(--ink)',border:'1px solid rgba(255,255,255,0.55)',height:44,minWidth:44,padding:'0 18px 0 14px',borderRadius:999,fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',cursor:'pointer',boxShadow:'0 6px 24px rgba(55,43,11,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',fontFamily:'inherit',flexShrink:0}}
    >
      <span aria-hidden="true" style={{fontSize:18,lineHeight:1,display:'inline-flex',alignItems:'center',justifyContent:'center',width:20,height:20}}>×</span>
      <span className="compare-close-label">{label}</span>
    </button>
  )
}

/* ── Lofi wireframe flow ── */
function LofiFlow(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    if(!open) return
    const h=(e)=>{if(e.key==='Escape')setOpen(false)}
    window.addEventListener('keydown',h)
    document.body.style.overflow='hidden'
    return()=>{window.removeEventListener('keydown',h);document.body.style.overflow=''}
  },[open])
  return(<>
    {/* Inline strip + expand trigger */}
    <div style={{position:'relative'}}>
      <LofiFlowStrip/>
      <div onClick={()=>setOpen(true)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setOpen(true)} style={{position:'absolute',top:8,right:0,cursor:'zoom-in',background:'rgba(0,0,0,0.55)',color:'#fff',fontSize:10,fontWeight:600,padding:'5px 9px',borderRadius:5,letterSpacing:'0.04em',backdropFilter:'blur(4px)'}}>⤢ Expand</div>
    </div>
    {/* Fullscreen lightbox  -  dark bg, floating cards */}
    {open&&(
      <div onClick={()=>setOpen(false)} id="lofi-lightbox" style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(246, 241, 232, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',justifyContent:'center',padding:'88px 0 40px'}}>
        <style>{`
          #lofi-lightbox-scroll::-webkit-scrollbar{height:6px}
          #lofi-lightbox-scroll::-webkit-scrollbar-track{background:transparent}
          #lofi-lightbox-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:100px}
          #lofi-lightbox-scroll::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.28)}
          #lofi-lightbox-scroll{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.15) transparent}
        `}</style>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 28px',flexShrink:0}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(55, 43, 11, 0.55)'}}>Lofi Wireframe Flow</span>
          <FullscreenCloseBtn onClose={()=>setOpen(false)}/>
        </div>
        <div id="lofi-lightbox-scroll" onClick={e=>e.stopPropagation()} style={{overflowX:'auto',padding:'0 48px 16px',flex:1,display:'flex',alignItems:'center'}}>
          <div style={{transform:'scale(3.2)',transformOrigin:'center left',padding:'0 0 0 40px',minWidth:'max-content'}}>
            <LofiFlowStrip/>
          </div>
        </div>
        <div style={{textAlign:'center',fontSize:11,color:'rgba(55, 43, 11, 0.4)',letterSpacing:'0.06em',flexShrink:0}}>Scroll to explore · Press Esc to close</div>
      </div>
    )}
  </>)
}

function LofiFlowStrip(){
  const cardW=180,cardH=140
  const card={background:'#fff',borderRadius:8,border:'1px solid rgba(0,0,0,0.08)',overflow:'hidden',width:cardW,height:cardH,flexShrink:0,boxShadow:'0 2px 12px rgba(0,0,0,0.06)',display:'flex',flexDirection:'column'}
  const hdr={background:'#f0f0f0',padding:'3px 8px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(0,0,0,0.06)',flexShrink:0}
  const body={padding:'5px 8px',flex:1,overflow:'hidden'}
  const b=(w,dk)=>(<div style={{height:3,width:w,background:dk?'rgba(0,0,0,0.32)':'rgba(0,0,0,0.1)',borderRadius:1,marginBottom:2}}/>)
  const dot=<div style={{width:5,height:5,borderRadius:'50%',background:'#5cb176',flexShrink:0}}/>
  const bc=(active)=>(<div style={{display:'flex',gap:2,padding:'2px 8px',borderBottom:'1px solid rgba(0,0,0,0.05)',alignItems:'center',flexShrink:0}}>{['Kw','Logic','Order','Outcome','Review'].map((s,i)=><span key={i} style={{fontSize:3.5,color:s===active?'rgba(0,0,0,0.65)':'rgba(0,0,0,0.2)',fontWeight:s===active?700:400,borderBottom:s===active?'1px solid rgba(0,0,0,0.45)':'none'}}>{s}</span>)}</div>)
  const pc=(lines)=>(<div style={{border:'1px solid rgba(0,0,0,0.07)',borderRadius:2,padding:'2px 3px',marginBottom:2}}>{lines.map((l,i)=><div key={i} style={{height:2,width:l,background:'rgba(0,0,0,0.09)',borderRadius:1,marginBottom:i<lines.length-1?1:0}}/>)}</div>)
  const arrow=<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,width:24,height:cardH}}><svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 6h12m0 0l-3.5-3.5m3.5 3.5l-3.5 3.5" stroke="rgba(184,103,87,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  const lbl=(text)=>(<div style={{fontSize:7,fontWeight:600,color:deepBlue,textAlign:'center',marginTop:6,letterSpacing:'0.02em',opacity:0.65}}>{text}</div>)
  const sh={fontSize:3.5,fontWeight:700,color:'rgba(0,0,0,0.45)',marginBottom:2}

  return(
    <div>
      <div style={{display:'inline-flex',alignItems:'flex-start',gap:0}}>

        {/* 1  -  Rule Management */}
        <div>
          <div style={card}>
            <div style={hdr}>
              <span style={{fontSize:5,fontWeight:700,color:'rgba(0,0,0,0.55)'}}>Rule Management</span>
              <div style={{background:'#5cb176',borderRadius:2,padding:'1px 5px',fontSize:3.5,fontWeight:700,color:'#fff'}}>New Rule</div>
            </div>
            <div style={{...body,display:'grid',gridTemplateColumns:'1fr 1.4fr 1fr',gap:4}}>
              <div style={{borderRight:'1px solid rgba(0,0,0,0.05)',paddingRight:3}}>
                <div style={sh}>Filter Rules</div>
                {[18,14,20,12].map((w,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:2,marginBottom:1.5}}><div style={{width:4,height:4,borderRadius:1,border:'1px solid rgba(0,0,0,0.18)',flexShrink:0}}/>{b(w)}</div>)}
              </div>
              <div>
                <div style={sh}>Rules</div>
                {[1,1,1,1,1,1].map((_,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:2,marginBottom:1.5}}>{dot}<div style={{height:2,flex:1,background:i===0||i===2?'rgba(0,0,0,0.28)':'rgba(0,0,0,0.08)',borderRadius:1}}/></div>))}
              </div>
              <div style={{borderLeft:'1px solid rgba(0,0,0,0.05)',paddingLeft:3}}>
                <div style={sh}>Selected Rule</div>
                {b(28)}{b(18,true)}
                <div style={{fontSize:2.5,fontStyle:'italic',color:'rgba(0,0,0,0.25)',marginTop:2,marginBottom:1}}>Rule Logic</div>
                {b(34)}{b(24)}
              </div>
            </div>
          </div>
          {lbl('Rule Management')}
        </div>

        {arrow}

        {/* 2  -  Keywords */}
        <div>
          <div style={card}>
            <div style={{...hdr,borderBottom:'none'}}><span style={{fontSize:5,fontWeight:700,color:'rgba(0,0,0,0.55)'}}>Create New Rule</span></div>
            {bc('Kw')}
            <div style={{...body,display:'grid',gridTemplateColumns:'1fr 1fr 0.7fr',gap:4}}>
              <div>
                <div style={sh}>Available Keywords</div>
                {['Acct Value','Acct Number','Sym / CUSIP','Order Type','Price','Quantity'].map((k,i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:1.5,borderBottom:'1px solid rgba(0,0,0,0.03)',paddingBottom:1}}><span style={{fontSize:3,color:'rgba(0,0,0,0.45)'}}>{k}</span><span style={{fontSize:2.5,color:'rgba(0,0,0,0.25)',border:'1px solid rgba(0,0,0,0.1)',borderRadius:1,padding:'0 2px'}}>Add</span></div>))}
              </div>
              <div>
                <div style={sh}>Keyword Preview</div>
                {b(36,true)}{b(44)}{b(30,true)}{b(40)}{b(26)}
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
                <div style={{...sh,marginBottom:0}}>Added</div>
                {['Acct Num','Action','Sym/CUSIP'].map((k,i)=>(<div key={i} style={{background:'rgba(0,0,0,0.65)',color:'#fff',borderRadius:3,padding:'1px 3px',fontSize:2.5,fontWeight:600,lineHeight:1}}>{k} ×</div>))}
              </div>
            </div>
          </div>
          {lbl('Keywords')}
        </div>

        {arrow}

        {/* 3  -  Rule Logic */}
        <div>
          <div style={card}>
            <div style={{...hdr,borderBottom:'none'}}><span style={{fontSize:5,fontWeight:700,color:'rgba(0,0,0,0.55)'}}>Create New Rule</span></div>
            {bc('Logic')}
            <div style={{...body,display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:4}}>
              <div>
                <div style={sh}>Add clause details</div>
                <div style={{fontSize:3,fontWeight:600,color:'rgba(0,0,0,0.35)',marginBottom:1.5}}>Keyword: Symbol / CUSIP</div>
                {b(44)}{b(36)}
                <div style={{display:'flex',gap:2,alignItems:'center',marginTop:2}}>
                  <span style={{fontSize:2.5,color:'rgba(0,0,0,0.25)'}}>Operator</span>
                  <div style={{border:'1px solid rgba(0,0,0,0.12)',borderRadius:1,padding:'0.5px 3px',fontSize:2.5,color:'rgba(0,0,0,0.35)'}}>Is equal to ▾</div>
                </div>
                <div style={{marginTop:2,display:'flex',gap:2,alignItems:'center'}}>
                  <div style={{border:'1px solid rgba(0,0,0,0.1)',borderRadius:1,flex:1,height:6}}/><span style={{fontSize:2.5,color:'#5cb176',fontWeight:600}}>Add Multiple</span>
                </div>
              </div>
              <div>
                <div style={sh}>Rule Logic Preview</div>
                {pc(['90%','55%'])}
                {pc(['85%','40%','48%'])}
                <div style={{border:'1px dashed rgba(200,160,50,0.4)',borderRadius:2,padding:'1.5px 3px',marginBottom:2}}><div style={{height:2,width:'75%',background:'rgba(200,160,50,0.25)',borderRadius:1}}/></div>
              </div>
            </div>
          </div>
          {lbl('Rule Logic')}
        </div>

        {arrow}

        {/* 4  -  Order Placed By */}
        <div>
          <div style={card}>
            <div style={{...hdr,borderBottom:'none'}}><span style={{fontSize:5,fontWeight:700,color:'rgba(0,0,0,0.55)'}}>Create New Rule</span></div>
            {bc('Order')}
            <div style={{...body,display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:4}}>
              <div>
                <div style={sh}>Order Placed By</div>
                {[true,true,false,false].map((ck,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:2,marginBottom:2}}><div style={{width:5,height:5,borderRadius:1,border:'1px solid rgba(0,0,0,0.18)',background:ck?'rgba(0,0,0,0.55)':'transparent',flexShrink:0}}/><div style={{height:3,width:ck?42:32,background:ck?'rgba(0,0,0,0.28)':'rgba(0,0,0,0.08)',borderRadius:1}}/></div>))}
              </div>
              <div>
                <div style={sh}>Rule Logic Preview</div>
                {pc(['90%','55%'])}
                {pc(['85%','40%','48%'])}
                {pc(['78%','42%','50%'])}
                {pc(['72%','46%','42%'])}
              </div>
            </div>
          </div>
          {lbl('Order Placed By')}
        </div>

        {arrow}

        {/* 5  -  Rule Outcome */}
        <div>
          <div style={card}>
            <div style={{...hdr,borderBottom:'none'}}><span style={{fontSize:5,fontWeight:700,color:'rgba(0,0,0,0.55)'}}>Create New Rule</span></div>
            {bc('Outcome')}
            <div style={{...body,display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:4}}>
              <div>
                <div style={sh}>Specify Rule Outcome</div>
                <div style={{fontSize:2.5,color:'rgba(0,0,0,0.3)',marginBottom:2}}>If all clauses are true…</div>
                {[true,false,false,false].map((ck,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:2,marginBottom:2}}><div style={{width:5,height:5,borderRadius:1,border:'1px solid rgba(0,0,0,0.18)',background:ck?'rgba(0,0,0,0.55)':'transparent',flexShrink:0}}/><div style={{height:3,width:ck?42:34,background:ck?'rgba(0,0,0,0.28)':'rgba(0,0,0,0.08)',borderRadius:1}}/></div>))}
              </div>
              <div>
                <div style={sh}>Rule Logic Preview</div>
                {pc(['90%','55%'])}
                {pc(['85%','40%','48%'])}
                {pc(['78%','42%','50%'])}
                {pc(['72%','46%','42%'])}
                {pc(['68%','38%'])}
              </div>
            </div>
          </div>
          {lbl('Rule Outcome')}
        </div>

        {arrow}

        {/* 6  -  Review & Confirm */}
        <div>
          <div style={card}>
            <div style={{...hdr,borderBottom:'none'}}><span style={{fontSize:5,fontWeight:700,color:'rgba(0,0,0,0.55)'}}>Create New Rule</span></div>
            {bc('Review')}
            <div style={{...body,display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:4}}>
              <div>
                <div style={sh}>Review & Confirm</div>
                <div style={{fontSize:2.5,color:'rgba(0,0,0,0.25)',marginBottom:1}}>Rule Name</div>
                <div style={{border:'1px solid rgba(0,0,0,0.1)',borderRadius:1,padding:'1.5px 3px',marginBottom:2}}><span style={{fontSize:2.5,color:'rgba(0,0,0,0.4)'}}>Reject xxxxxxx…</span></div>
                <div style={{fontSize:2.5,color:'rgba(0,0,0,0.25)',marginBottom:1}}>Rule Status</div>
                {b(48)}{b(32)}
                <div style={{display:'flex',gap:2,marginTop:1}}>
                  <div style={{border:'1px solid rgba(0,0,0,0.18)',borderRadius:1,padding:'0.5px 4px',fontSize:2.5,fontWeight:600,color:'rgba(0,0,0,0.45)'}}>✓ Active</div>
                  <div style={{border:'1px solid rgba(0,0,0,0.08)',borderRadius:1,padding:'0.5px 4px',fontSize:2.5,color:'rgba(0,0,0,0.2)'}}>Inactive</div>
                </div>
              </div>
              <div>
                <div style={sh}>Rule Logic Preview</div>
                {pc(['90%','55%'])}
                {pc(['85%','40%','48%'])}
                {pc(['78%','42%','50%'])}
                {pc(['72%','46%','42%'])}
                {pc(['68%','38%'])}
              </div>
            </div>
            <div style={{padding:'2px 8px 3px',display:'flex',justifyContent:'flex-end',flexShrink:0}}>
              <div style={{background:'#5cb176',borderRadius:2,padding:'1px 6px',fontSize:3,fontWeight:700,color:'#fff'}}>Confirm Rule Setup</div>
            </div>
          </div>
          {lbl('Review & Confirm')}
        </div>

      </div>
    </div>
  )
}

const blobColors={g:'#9bbf7a',y:'#e8b84b',b:'#8aafc4',o:'#cc7a58',p:'#c9a090'}
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
  {id:1,label:'Cluster 01',title:'Rules list lacks searchability',stickies:[{c:'g',t:"inactive rules take up space  -  nice to filter off ones you don't need"},{c:'o',t:'finding rule use ctrl + F  -  use separate Excel to track changes'},{c:'p',t:'search on rules list could be better  -  do ctrl+F for rules with a criteria'},{c:'y',t:'smart search for keywords  -  on metadata like a book catalog'}]},
  {id:2,label:'Cluster 02',title:'Keyword selection is opaque and error-prone',stickies:[{c:'g',t:'would be helpful to have keyword definition info where you are selecting it'},{c:'y',t:'only know what keyword means by trial and error  -  select and click next'},{c:'b',t:'cumbersome to figure out what keywords apply  -  call NFS, trial and error'},{c:'y',t:'today email CSM to ask what a keyword does if not familiar with it'}]},
  {id:3,label:'Cluster 03',title:'Difficult to build a rule without tribal knowledge',stickies:[{c:'g',t:'linear box for long entries  -  not easy to enter or jump to end of 60 entries'},{c:'b',t:'hard to know where to find help  -  not intuitive to click the question mark'},{c:'y',t:'formatting long list of symbols to put in the system'},{c:'y',t:'took a couple years to really understand who this would impact'}]},
  {id:4,label:'Cluster 04',title:'Insufficient documentation and audit tracking',span2:true,stickies:[{c:'o',t:'rule creation free form  -  put the list into Excel and concatenate'},{c:'y',t:'list of rules  -  have to go into each rule, copy to Excel to search'},{c:'o',t:'track in SharePoint  -  reason for creating the rule, rationale when trader calls'},{c:'b',t:'rules change log would be helpful  -  in platform, not a separate Excel'},{c:'g',t:'hard to see what changed  -  which column to look at'},{c:'o',t:'jumping back and forth  -  lose my place, creates room for error'},{c:'g',t:'free form personal notes  -  tracking why rule was created, changed'},{c:'b',t:'ask for a reason when someone makes a change  -  optional or required'}]},
  {id:5,label:'Cluster 05',title:'Help content not accessible',stickies:[{c:'g',t:'never seen help content  -  too far away'},{c:'p',t:'apply to managed acct advisor and super trader  -  not super descriptive'},{c:'b',t:"doesn't know help content exists  -  didn't know that was here, that's cool"},{c:'y',t:'hover to see keyword meaning would be too much  -  needs a dedicated button'}]},
  {id:6,label:'Cluster 06',title:'Triggered rules lack visibility',span2:true,stickies:[{c:'b',tall:true,t:'no plain-language explanation of why a rule blocked a trade  -  just the rule name'},{c:'b',tall:true,t:'rule conditions may have changed since it triggered  -  no way to know without digging'},{c:'o',t:'no paper trail connecting a triggered rule to what the conditions were at that moment'},{c:'g',t:'compliance user has to manually reconstruct what happened when a trader calls'},{c:'y',t:'rule name alone is not enough context  -  need to see what criteria matched'}]},
]

function PrototypeEmbed(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  return(<>
    <button onClick={()=>setOpen(true)} className="btn">
      Meet the redesign ▶
    </button>
    {open&&(
      <div style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(246, 241, 232, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',paddingTop:80}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',background:'rgba(255,255,255,0.6)',borderBottom:'1px solid rgba(184,103,87,0.25)',flexShrink:0}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accentDark}}>Interactive Prototype  -  Rule Management Redesign</div>
            <div style={{fontSize:10,color:'rgba(55, 43, 11, 0.5)',fontStyle:'italic',marginTop:2}}>Press Esc or click × to close</div>
          </div>
          <FullscreenCloseBtn onClose={()=>setOpen(false)}/>
        </div>
        <iframe src="/rule-management-prototype-v1.html" style={{flex:1,width:'100%',border:'none'}} title="Rule Management Prototype  -  V1"/>
      </div>
    )}
  </>)
}

function AffinityMap(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  return(<>
    <div onClick={()=>setOpen(true)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setOpen(true)} style={{background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(238, 229, 211, 0.6)',borderRadius:20,padding:'28px 28px 22px',cursor:'pointer',boxShadow:'0 4px 24px rgba(55,43,11,0.08)',border:'1px solid rgba(184,103,87,0.22)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accentDark}}>FigJam  -  Synthesis Board</span>
        <span style={{fontSize:11,fontWeight:600,color:accentDark,background:'rgba(255,255,255,0.55)',border:'1px solid rgba(184,103,87,0.3)',borderRadius:20,padding:'5px 14px'}}>⛶ Explore board</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
        {thumbClusters.map(cl=>(
          <div key={cl.id} style={{gridColumn:cl.span2?'span 2':undefined,background:'rgba(255,255,255,0.5)',border:'1px solid rgba(184,103,87,0.25)',borderRadius:10,padding:12}}>
            <div style={{fontSize:8.5,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.3}}>{cl.title}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{cl.blobs.map(([c,w],i)=><div key={i} style={{height:18,width:w,borderRadius:3,background:blobColors[c],opacity:0.85}}/>)}</div>
          </div>
        ))}
      </div>
    </div>
    {open&&(
      <div style={{position:'fixed',inset:0,zIndex:9000,background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 28px 28px, rgba(246, 241, 232, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',paddingTop:24}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 28px',background:'rgba(255,255,255,0.5)',borderBottom:'1px solid rgba(184,103,87,0.25)',flexShrink:0}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:accentDark}}>Synthesis Board  -  FigJam</div>
            <div style={{fontSize:10,color:'rgba(55, 43, 11, 0.55)',fontStyle:'italic',marginTop:3}}>Simplified for portfolio  -  representative stickies shown, not all verbatims included</div>
          </div>
          <FullscreenCloseBtn onClose={()=>setOpen(false)}/>
        </div>
        <div style={{flex:1,overflowX:'auto',overflowY:'hidden',padding:'32px 40px 24px'}}>
          <div style={{display:'flex',flexDirection:'row',gap:16,alignItems:'flex-start',minWidth:'max-content'}}>
            {fullClusters.map(cl=>(
              <div key={cl.id} style={{width:cl.span2?520:320,flexShrink:0,background:'rgba(255,255,255,0.45)',border:'1px solid rgba(184,103,87,0.25)',borderRadius:14,padding:'18px 16px 16px'}}>
                <div style={{paddingBottom:12,borderBottom:'1px solid rgba(184,103,87,0.2)',marginBottom:10}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:4}}>{cl.label}</div>
                  <div style={{fontSize:12,fontWeight:700,color:accentDark,lineHeight:1.3}}>{cl.title}</div>
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


/* ── Ideation highlight reel  -  compact concept cards from the HMW sprint.
   A skimmable stand-in for the full sketch explorer: each card pairs a mini
   mockup with the HMW prompt it answered. The FigJam board carries the rest. */
function ReelCard({pill,title,cap,children}){
  return(
    <div style={{width:330,flexShrink:0,scrollSnapAlign:'start',background:'#FFFFFD',borderRadius:12,overflow:'hidden',border:'1px solid rgba(44,59,85,0.14)',boxShadow:'0 2px 14px rgba(44,59,85,0.07)',fontFamily:'Inter,sans-serif',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'14px 16px',flex:1}}>{children}</div>
      <div style={{padding:'12px 16px 14px',background:'rgba(196,207,223,0.18)',borderTop:'1px solid rgba(44,59,85,0.08)'}}>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:4}}>{pill}</div>
        <div style={{fontSize:13,fontWeight:700,color:accentDark,marginBottom:4}}>{title}</div>
        <div style={{fontSize:11,lineHeight:1.55,color:'rgba(44,59,85,0.65)'}}>{cap}</div>
      </div>
    </div>
  )
}

function IdeationReel(){
  const railRef=useRef(null)
  const nudge=(dir)=>railRef.current?.scrollBy({left:dir*346,behavior:'smooth'})
  const ann=(text)=>(<div style={{display:'flex',gap:4,marginTop:10,alignItems:'flex-start'}}><span style={{fontSize:11,color:'#b07a30'}}>↑</span><span style={{fontSize:10,fontWeight:600,color:'#b07a30',fontStyle:'italic',lineHeight:1.4}}>{text}</span></div>)
  const logicRow=(text,bg,bl,tc,bold)=>(<div style={{borderRadius:4,padding:'6px 9px',marginBottom:5,background:bg,borderLeft:`3px solid ${bl}`,color:tc,fontSize:10.5,lineHeight:1.4,fontWeight:bold?600:400}}>{text}</div>)
  return(
    <div>
      <style>{`
        .ideation-reel{scrollbar-width:thin;scrollbar-color:rgba(44,59,85,0.25) transparent}
        .ideation-reel::-webkit-scrollbar{height:6px}
        .ideation-reel::-webkit-scrollbar-track{background:transparent}
        .ideation-reel::-webkit-scrollbar-thumb{background:rgba(44,59,85,0.2);border-radius:100px}
        .ideation-reel::-webkit-scrollbar-thumb:hover{background:rgba(44,59,85,0.35)}
      `}</style>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent}}>Sprint Highlights  -  Seven Concepts</p>
        <div style={{display:'flex',gap:8}}>
          {[['‹','Scroll reel left',-1],['›','Scroll reel right',1]].map(([ch,label,dir])=>(
            <button key={ch} type="button" onClick={()=>nudge(dir)} aria-label={label} style={{width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,0.6)',border:'1px solid rgba(125,145,165,0.35)',color:accentDark,fontSize:17,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>{ch}</button>
          ))}
        </div>
      </div>
      <div ref={railRef} className="ideation-reel" style={{display:'flex',gap:16,overflowX:'auto',scrollSnapType:'x proximity',paddingBottom:14}}>

        {/* 1  -  Search on metadata */}
        <ReelCard pill="HMW 01" title="Find & understand rules" cap="Real search across names and metadata, with plain-language rule detail right in the list  -  no more Ctrl+F.">
          <div style={{display:'flex',alignItems:'center',border:'1px solid rgba(44,59,85,0.2)',borderRadius:6,padding:'6px 10px',marginBottom:8,background:'rgba(44,59,85,0.03)',gap:7}}>
            <span style={{fontSize:12,color:'rgba(44,59,85,0.4)'}}>⌕</span>
            <span style={{fontSize:11,color:accentDark,flex:1}}>AAP</span>
            <span style={{fontSize:10,color:'rgba(44,59,85,0.35)'}}>Filters</span>
          </div>
          <div style={{display:'flex',gap:6,marginBottom:8}}>
            <span style={{fontSize:9,fontWeight:600,padding:'2px 9px',borderRadius:20,background:'rgba(95,122,154,0.12)',border:'1px solid rgba(95,122,154,0.45)',color:'#4a6378'}}>Active</span>
            <span style={{fontSize:9,padding:'2px 9px',borderRadius:20,background:'rgba(44,59,85,0.04)',border:'1px solid rgba(44,59,85,0.15)',color:'rgba(44,59,85,0.45)'}}>All channels</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 8px',background:'rgba(95,122,154,0.1)',borderRadius:4,borderLeft:'2px solid rgba(95,122,154,0.6)',marginBottom:4}}>
            <span style={{fontSize:10.5,color:accentDark,fontWeight:600}}>Review high dollar tech stock</span>
            <span style={{fontSize:8.5,fontWeight:700,padding:'1px 6px',borderRadius:10,background:'rgba(95,122,154,0.15)',color:'#4a6378'}}>Active</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 8px',borderRadius:4,marginBottom:6,background:'rgba(44,59,85,0.03)'}}>
            <span style={{fontSize:10,color:'rgba(44,59,85,0.35)'}}>Crypto ETF Blacklist</span>
            <span style={{fontSize:8.5,padding:'1px 6px',borderRadius:10,background:'rgba(44,59,85,0.05)',color:'rgba(44,59,85,0.35)'}}>Active</span>
          </div>
          <div style={{fontSize:9.5,fontStyle:'italic',color:'rgba(95,122,154,0.75)'}}>1 result for "AAP"</div>
          {ann('search on metadata  -  rule detail without leaving the list')}
        </ReelCard>

        {/* 2  -  Keyword definitions */}
        <ReelCard pill="HMW 02" title="Keywords, explained" cap="Definitions and accepted values surfaced at the moment of selection  -  ending the trial-and-error loop.">
          <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:accent,marginBottom:6,textTransform:'uppercase'}}>Keyword Detail</div>
          <div style={{fontSize:14,fontWeight:700,color:accentDark,marginBottom:6}}>Security Type</div>
          <div style={{fontSize:10,color:'rgba(44,59,85,0.6)',lineHeight:1.55,marginBottom:8}}>Filters orders based on the type of security being traded.</div>
          <div style={{fontSize:9,color:'rgba(44,59,85,0.4)',marginBottom:3}}>Accepted values</div>
          <div style={{fontSize:10,color:'#4a6378',marginBottom:10}}>Equity, Fixed Income, ETF, Mutual Fund…</div>
          <div style={{background:'rgba(95,122,154,0.1)',border:'1px solid rgba(95,122,154,0.35)',borderRadius:5,padding:'6px 10px',textAlign:'center',fontSize:10,fontWeight:600,color:'#4a6378'}}>+ Add to rule</div>
          {ann('definition and values before committing to a keyword')}
        </ReelCard>

        {/* 3  -  Contextual help */}
        <ReelCard pill="HMW 03" title="Help where it's needed" cap="Contextual guidance inside the create-rule flow  -  not buried in a help center nobody finds.">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <span style={{fontSize:12,fontWeight:600,color:accentDark}}>Add clause  -  Rule Logic</span>
            <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(95,122,154,0.12)',border:'1px solid rgba(95,122,154,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#4a6378',fontWeight:700,flexShrink:0}}>?</div>
          </div>
          <div style={{background:'rgba(196,207,223,0.25)',border:'1px solid rgba(95,122,154,0.25)',borderRadius:6,padding:'9px 11px',marginBottom:10}}>
            <div style={{fontSize:10.5,fontWeight:700,color:accentDark,marginBottom:4}}>Keyword help</div>
            <div style={{fontSize:9.5,color:'rgba(44,59,85,0.6)',lineHeight:1.55,marginBottom:6}}>Each clause filters orders by a specific condition. Select a keyword to see accepted values.</div>
            <div style={{fontSize:9.5,color:'#4a6378',textDecoration:'underline'}}>View full keyword guide →</div>
          </div>
          <div style={{background:'rgba(44,59,85,0.03)',border:'1px solid rgba(44,59,85,0.1)',borderRadius:5,padding:'8px 10px',height:30,display:'flex',alignItems:'center'}}><div style={{height:4,background:'rgba(44,59,85,0.12)',borderRadius:2,width:'45%'}}/></div>
          {ann('keyword-specific guidance directly in the flow')}
        </ReelCard>

        {/* 4  -  Structured value input */}
        <ReelCard pill="HMW 04" title="Structured value entry" cap="Bulk upload with validation instead of one comma-separated text box for thousands of values.">
          <div style={{fontSize:8,fontStyle:'italic',color:'rgba(44,59,85,0.4)',marginBottom:4}}>single-line input</div>
          <div style={{position:'relative',display:'inline-block',width:140,marginBottom:12}}>
            <div style={{border:'1px solid rgba(44,59,85,0.15)',borderRadius:4,padding:'5px 8px',background:'rgba(44,59,85,0.02)',display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:9,color:'rgba(44,59,85,0.35)'}}>Values</span>
              <div style={{height:4,background:'rgba(44,59,85,0.08)',borderRadius:2,flex:1}}/>
            </div>
            <svg style={{position:'absolute',top:-6,left:-6,width:'calc(100% + 12px)',height:'calc(100% + 12px)',pointerEvents:'none'}} viewBox="0 0 112 42" preserveAspectRatio="none">
              <line x1="4" y1="4" x2="108" y2="38" stroke="rgba(200,80,80,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="108" y1="4" x2="4" y2="38" stroke="rgba(200,80,80,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{fontSize:8,fontStyle:'italic',color:'rgba(44,59,85,0.4)',marginBottom:4}}>import tool</div>
          <div style={{border:'1.5px dashed rgba(95,122,154,0.5)',borderRadius:5,padding:'10px 12px',background:'rgba(95,122,154,0.05)',textAlign:'center'}}>
            <div style={{fontSize:10.5,fontWeight:600,color:accentDark,marginBottom:2}}>↑ Upload CSV</div>
            <div style={{fontSize:8.5,color:'rgba(44,59,85,0.45)'}}>or paste values</div>
          </div>
          {ann('input type matches the data  -  no more comma-separated guesswork')}
        </ReelCard>

        {/* 5  -  List manager */}
        <ReelCard pill="HMW 04" title="List manager" cap="Define a list once, reuse it across rules  -  the concept an infrastructure constraint deferred (see The Pivot).">
          <div style={{fontSize:9.5,fontStyle:'italic',color:'rgba(44,59,85,0.45)',marginBottom:9}}>Saved lists  -  reusable across rules</div>
          {[{name:'High-risk securities',items:'42 items',rules:'3 rules',color:'#5F7A9A'},{name:'Exempt accounts',items:'18 items',rules:'1 rule',color:'#6a81b2'}].map((r,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 11px',background:'rgba(44,59,85,0.03)',border:'1px solid rgba(44,59,85,0.1)',borderRadius:8,marginBottom:6}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:r.color,flexShrink:0}}/>
              <span style={{fontSize:11,fontWeight:500,color:accentDark,flex:1}}>{r.name}</span>
              <span style={{fontSize:9.5,color:'rgba(44,59,85,0.4)'}}>{r.items}</span>
              <span style={{fontSize:9,fontWeight:600,padding:'1px 8px',borderRadius:20,background:'rgba(95,122,154,0.1)',border:'1px solid rgba(95,122,154,0.3)',color:'#4a6378'}}>{r.rules}</span>
            </div>
          ))}
          <div style={{fontSize:11,color:'#4a6378',marginTop:2}}>+ Create new list</div>
          {ann('define once, reuse across many rules')}
        </ReelCard>

        {/* 6  -  Plain-language preview */}
        <ReelCard pill="HMW 05" title="Confidence before go-live" cap="A plain-language preview that builds as the rule is built  -  the concept users later called out as the standout.">
          <div style={{fontSize:8.5,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(44,59,85,0.4)',marginBottom:8}}>Builds as you go</div>
          {logicRow('If Account No. is one of…','rgba(106,129,178,0.12)','rgba(106,129,178,0.55)','#3d5377')}
          {logicRow('and Action is Buy','rgba(92,177,118,0.1)','rgba(92,177,118,0.5)','#2d6c44')}
          {logicRow('→ then REJECTED','rgba(230,150,60,0.12)','rgba(210,140,60,0.6)','#9a6420',true)}
          {ann('plain-language preview builds as you go')}
        </ReelCard>

        {/* 7  -  Audit trail */}
        <ReelCard pill="HMW 06" title="Audit trail, in-platform" cap="Rule change history inside the product  -  retiring the shadow spreadsheet as the source of truth.">
          <div style={{fontSize:8.5,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(44,59,85,0.4)',marginBottom:10}}>Audit trail  -  in platform</div>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute',left:7,top:0,bottom:0,width:2,background:'rgba(44,59,85,0.1)',borderRadius:2}}/>
            {[
              {label:'Modified',color:'#4a6378',border:'rgba(95,122,154,0.4)',bg:'rgba(95,122,154,0.1)',dot:'#8a9aaa',name:'K.D.',time:'Today 9:41am'},
              {label:'Activated',color:'#9a7420',border:'rgba(200,160,60,0.45)',bg:'rgba(230,184,75,0.15)',dot:'#d4a843',name:'S.R.',time:'Mar 2, 2:15pm'},
              {label:'Created',color:'#2e7396',border:'rgba(91,160,200,0.4)',bg:'rgba(91,160,200,0.12)',dot:'#5b9fc8',name:'K.D.',time:'Feb 28, 10:00am'},
            ].map((r,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',marginBottom:i<2?12:0,position:'relative'}}>
                <div style={{width:16,height:16,borderRadius:'50%',background:r.dot,flexShrink:0,zIndex:1,border:'2px solid #FFFFFD',marginTop:1,marginRight:10}}/>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:3}}>
                    <span style={{fontSize:9,fontWeight:600,padding:'1px 9px',borderRadius:20,background:r.bg,border:`1px solid ${r.border}`,color:r.color}}>{r.label}</span>
                    <span style={{fontSize:8.5,color:'rgba(44,59,85,0.45)'}}>by {r.name}</span>
                  </div>
                  <div style={{fontSize:8.5,color:'rgba(44,59,85,0.35)'}}>{r.time}</div>
                </div>
              </div>
            ))}
          </div>
          {ann('rule-level or all-rules timeline  -  no more Excel')}
        </ReelCard>

      </div>
    </div>
  )
}


function ImageLightbox({src, onClose}) {
  useEffect(() => {
    const h = (e) => { if(e.key==='Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [])
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(246, 241, 232, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 40px 40px'}}>
      <div style={{position:'absolute',top:80,right:16,zIndex:2}} onClick={e=>e.stopPropagation()}>
        <FullscreenCloseBtn onClose={onClose}/>
      </div>
      <div onClick={e=>e.stopPropagation()} style={{position:'relative',maxWidth:'90vw',maxHeight:'85vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={src} style={{maxWidth:'100%',maxHeight:'85vh',borderRadius:10,boxShadow:'0 8px 60px rgba(55,43,11,0.18)',display:'block'}}/>
      </div>
      <div style={{position:'absolute',bottom:24,fontSize:11,color:'rgba(55, 43, 11, 0.5)',letterSpacing:'0.08em'}}>Press Esc or click outside to close</div>
    </div>
  )
}

function ExpandableImage({src, style}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{position:'relative',display:'inline-block',cursor:'zoom-in',width:'100%'}} onClick={()=>setOpen(true)}>
        <img src={src} style={{...style, display:'block'}}/>
        <div style={{position:'absolute',bottom:8,right:8,width:26,height:26,borderRadius:6,background:'rgba(0,0,0,0.45)',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)'}}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 1h4v4M5 8L12 1M1 5v7h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {open && <ImageLightbox src={src} onClose={()=>setOpen(false)}/>}
    </>
  )
}

function PartBFeatureTabs({tabs}) {
  const [active, setActive] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const tab = tabs[active]

  const handleTabChange = (i) => {
    setActive(i)
    setShowBefore(false)
  }

  const hasBefore = tab.beforeVid || tab.beforeImg

  return (
    <div>
      {/* Horizontal tabs */}
      <div style={{display:'flex',gap:0,borderBottom:`1px solid ${borderLight}`,marginBottom:0}}>
        {tabs.map((t,i) => (
          <button key={i} onClick={()=>handleTabChange(i)} style={{
            display:'flex',alignItems:'center',gap:8,
            background:'transparent',border:'none',
            padding:'14px 24px',cursor:'pointer',fontFamily:'inherit',
            textAlign:'left',transition:'all 0.15s',
            borderBottom:`2px solid ${active===i?accent:'transparent'}`,
            marginBottom:-1,
          }}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:active===i?accent:'rgba(89,80,74,0.35)'}}>{t.num}</span>
            <span style={{fontSize:12,fontWeight:600,color:active===i?warmGray:'rgba(89,80,74,0.5)',lineHeight:1.4}}>{t.title}</span>
          </button>
        ))}
      </div>

      {/* Description + toggle */}
      <div style={{padding:'24px 0 20px',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:20}}>
        <p style={{fontSize:13,lineHeight:1.65,color:deepBlue,margin:0,maxWidth:700}}>{tab.body}</p>
        {hasBefore && (
          <button
            onClick={() => setShowBefore(s => !s)}
            style={{
              display:'flex',alignItems:'center',gap:7,flexShrink:0,
              fontSize:11,fontWeight:700,letterSpacing:'0.06em',
              padding:'6px 14px',borderRadius:20,cursor:'pointer',
              background:showBefore?accentLight:'rgba(217,172,151,0.15)',
              border:`1px solid ${showBefore?'rgba(184,103,87,0.35)':'rgba(217,172,151,0.4)'}`,
              color:showBefore?accentDark:warmGray,
              transition:'all 0.2s',outline:'none',
            }}
          >
            <span style={{fontSize:12}}>&#8644;</span>
            {showBefore ? 'See redesign' : 'Compare to Legacy'}
          </button>
        )}
      </div>

      {/* Label */}
      {hasBefore && (
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:deepBlue,opacity:0.7,marginBottom:12}}>
          {showBefore ? 'Before \u2014 Legacy' : 'After \u2014 Redesign'}
        </div>
      )}

      {/* Video / image area  -  full width */}
      <div style={{position:'relative',borderRadius:12,overflow:'hidden',background:'#FBF9F4',border:`1px solid ${borderLight}`}}>
        {/* After layer */}
        <div style={{transition:'opacity 0.35s ease',opacity:showBefore?0:1,pointerEvents:showBefore?'none':'auto'}}>
          {tab.afterVid
            ? <video key={tab.afterVid} src={tab.afterVid} autoPlay loop muted playsInline style={{width:'100%',display:'block',borderRadius:12}}/>
            : tab.afterImg2
              ? <div style={{display:'flex',gap:16,padding:24,alignItems:'center',justifyContent:'center'}}>
                  {tab.afterImg && <ExpandableImage src={tab.afterImg} style={{width:'48%',borderRadius:8,boxShadow:'0 2px 20px rgba(0,0,0,0.10)'}}/>}
                  <ExpandableImage src={tab.afterImg2} style={{width:'48%',borderRadius:8,boxShadow:'0 2px 20px rgba(0,0,0,0.10)'}}/>
                </div>
              : <ExpandableImage src={tab.afterImg} style={{width:'100%',borderRadius:12,display:'block'}}/>
          }
        </div>
        {/* Before layer */}
        {hasBefore && (
          <div style={{position:'absolute',inset:0,transition:'opacity 0.35s ease',opacity:showBefore?1:0,pointerEvents:showBefore?'auto':'none'}}>
            {tab.beforeVid
              ? <video key={tab.beforeVid} src={tab.beforeVid} autoPlay loop muted playsInline style={{width:'100%',display:'block',borderRadius:12}}/>
              : <img src={tab.beforeImg} style={{width:'100%',display:'block',borderRadius:12}}/>
            }
          </div>
        )}
      </div>
    </div>
  )
}

function CardWithToggle({num, title, body, afterContent, beforeContent}) {
  const [showBefore, setShowBefore] = useState(false)
  return (
    <div style={{background:'white',borderRadius:12,border:`1px solid ${borderLight}`,overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 3fr',alignItems:'stretch'}}>
        <div style={{padding:'32px 36px',borderRight:`1px solid ${borderLight}`,display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
          <div style={{fontSize:32,fontWeight:800,color:accentDark,lineHeight:1,marginBottom:16}}>{num}</div>
          <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:10,lineHeight:1.35}}>{title}</div>
          <p style={{fontSize:13,lineHeight:1.65,color:deepBlue,marginBottom:0}}>{body}</p>
        </div>
        <div style={{background:'#FBF9F4',display:'flex',alignItems:'center',justifyContent:'center',padding:24,position:'relative',minHeight:240}}>
          <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',transition:'opacity 0.35s ease',opacity:showBefore?0:1,position:'absolute',inset:0,padding:24,pointerEvents:showBefore?'none':'auto'}}>
            {afterContent}
          </div>
          <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',transition:'opacity 0.35s ease',opacity:showBefore?1:0,position:'absolute',inset:0,padding:24,pointerEvents:showBefore?'auto':'none'}}>
            {beforeContent}
          </div>
          <button
            onClick={()=>setShowBefore(s=>!s)}
            style={{
              position:'absolute',top:12,right:12,zIndex:2,
              display:'flex',alignItems:'center',gap:7,
              fontSize:11,fontWeight:700,letterSpacing:'0.06em',
              padding:'6px 14px',borderRadius:20,cursor:'pointer',
              background:showBefore?accentLight:'rgba(255,255,255,0.85)',
              border:`1px solid ${showBefore?'rgba(184,103,87,0.35)':'rgba(217,172,151,0.4)'}`,
              color:showBefore?accentDark:warmGray,
              transition:'all 0.2s',outline:'none',
              backdropFilter:'blur(4px)',
            }}
          >
            <span style={{fontSize:12}}>⇄</span>
            {showBefore ? 'See redesign' : 'Compare to Legacy'}
          </button>
        </div>
      </div>
    </div>
  )
}


function BeforeAfterWipe() {
  const [showBefore, setShowBefore] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) return
    const h = (e) => { if (e.key === 'Escape') setExpanded(false) }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [expanded])

  const toggleBtn = (
    <button
      onClick={(e) => { e.stopPropagation(); setShowBefore(s => !s) }}
      style={{
        display:'flex',alignItems:'center',gap:7,
        fontSize:11,fontWeight:700,letterSpacing:'0.06em',
        padding:'6px 14px',borderRadius:20,cursor:'pointer',
        background:showBefore?accentLight:'rgba(217,172,151,0.15)',
        border:`1px solid ${showBefore?'rgba(184,103,87,0.35)':'rgba(217,172,151,0.4)'}`,
        color:showBefore?accentDark:warmGray,
        transition:'all 0.2s',outline:'none',
      }}
    >
      <span style={{fontSize:12}}>⇄</span>
      {showBefore ? 'See redesign' : 'Compare to Legacy'}
    </button>
  )

  const imageBlock = (abs) => (
    <div style={{position:'relative',borderRadius:12,overflow:'hidden',border:'1px solid rgba(217,172,151,0.3)', ...(abs ? {maxWidth:'90vw',maxHeight:'85vh'} : {})}}>
      <img
        src="/rule-management-v1-screenshot.png"
        style={{display:'block',width:'100%',height:'auto',transition:'opacity 0.35s ease',opacity:showBefore?0:1, ...(abs ? {maxHeight:'85vh',objectFit:'contain'} : {})}}
      />
      <img
        src="/legacy-rules-screenshot.png"
        style={{display:'block',width:'100%',height:'auto',position:'absolute',top:0,left:0,transition:'opacity 0.35s ease',opacity:showBefore?1:0, ...(abs ? {maxHeight:'85vh',objectFit:'contain'} : {})}}
      />
    </div>
  )

  return (
    <div style={{marginBottom:40}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:deepBlue,opacity:0.7}}>
          {showBefore ? 'Before  -  Legacy Rules List' : 'After  -  Redesigned Rule Management'}
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {toggleBtn}
        </div>
      </div>
      <div style={{position:'relative',cursor:'zoom-in'}} onClick={() => setExpanded(true)}>
        {imageBlock(false)}
        <div style={{position:'absolute',top:8,right:8,cursor:'zoom-in',background:'rgba(0,0,0,0.55)',color:'#fff',fontSize:10,fontWeight:600,padding:'5px 9px',borderRadius:5,letterSpacing:'0.04em',backdropFilter:'blur(4px)'}}>⤢ Expand</div>
      </div>

      {expanded && (
        <div onClick={() => setExpanded(false)} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(246, 241, 232, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 40px 40px'}}>
          <div style={{position:'absolute',top:80,right:16,zIndex:2}} onClick={e=>e.stopPropagation()}>
            <FullscreenCloseBtn onClose={() => setExpanded(false)}/>
          </div>
          <div onClick={e => e.stopPropagation()} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,maxWidth:'90vw'}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accentDark}}>
                {showBefore ? 'Before  -  Legacy Rules List' : 'After  -  Redesigned Rule Management'}
              </div>
              {toggleBtn}
            </div>
            {imageBlock(true)}
          </div>
          <div style={{position:'absolute',bottom:24,fontSize:11,color:'rgba(55, 43, 11, 0.5)',letterSpacing:'0.08em'}}>Press Esc or click outside to close</div>
        </div>
      )}
    </div>
  )
}

/* ── Iteration cards with fullscreen overlay ── */
const iterationCards = [
  {
    id:1,
    feedback:'Clause preview felt editable  -  users tried to interact with the form fields in the preview panel. In v2, I removed the form representation entirely and replaced it with a read-only summary, making the distinction between preview and configuration unambiguous.',
    v1Label:'V1  -  Form fields in preview',
    v2Label:'V2  -  Read-only summary',
    v1:{type:'video',src:'/iter-1v1.mov'},
    v2:{type:'video',src:'/iter-1v2.mov'},
  },
  {
    id:2,
    feedback:'Bulk value entry surface was not intuitive  -  users were thrown off by the basic text input with "Add Value" and "Add List of Values" options side by side. There was no structure, no validation feedback, and no format guidance for file uploads.',
    changed:'Replaced the flat input with a structured values grid showing each entry with inline validation status. Added a dedicated "Upload a List" action with format guidance and a sample template.',
    v1Label:'V1  -  Flat input with no structure',
    v2Label:'V2  -  Structured values grid + upload',
    v1:{type:'video',src:'/iter-2v1.mov'},
    v2:{type:'video',src:'/iter-2v2.mov'},
  },
  {
    id:3,
    feedback:'Users wondered what would happen if an invalid value was added  -  a validation gap I hadn\'t fully considered. This led to the editable review grid with per-row validation icons and counts, so users can catch and fix errors before saving.',
    v1Label:'V1  -  No inline validation',
    v2Label:'V2  -  Inline validation per row',
    v1:{type:'video',src:'/iter-3v1.mov'},
    v2:{type:'video',src:'/iter-3v2.mov'},
  },
  {
    id:4,
    feedback:'Order Placed By step lacked the contextual definitions users loved on Order Outcome  -  an inconsistency they noticed immediately. V2 added role descriptions to match the pattern established elsewhere in the flow.',
    v1Label:'V1  -  No role descriptions',
    v2Label:'V2  -  Contextual role definitions added',
    v1:{type:'image',src:'/v1-opb-fullpage.png'},
    v2:{type:'image',src:'/v2-opb-fullpage.png'},
  },
]

function IterationOverlay({cards,openIdx,onClose}){
  const [idx,setIdx]=useState(openIdx)
  const [version,setVersion]=useState('both')
  useEffect(()=>{setIdx(openIdx)},[openIdx])
  useEffect(()=>{
    const h=(e)=>{
      if(e.key==='Escape') onClose()
      if(e.key==='ArrowRight') setIdx(i=>Math.min(i+1,cards.length-1))
      if(e.key==='ArrowLeft') setIdx(i=>Math.max(i-1,0))
    }
    window.addEventListener('keydown',h)
    document.body.style.overflow='hidden'
    return()=>{window.removeEventListener('keydown',h);document.body.style.overflow=''}
  },[onClose,cards.length])
  const c=cards[idx]
  const navBtn=(dir)=>{
    const isLeft=dir==='left'
    const disabled=isLeft?idx===0:idx===cards.length-1
    return(<button onClick={(e)=>{e.stopPropagation();setIdx(i=>isLeft?i-1:i+1)}} disabled={disabled} style={{width:44,height:44,borderRadius:'50%',background:disabled?'rgba(255,255,255,0.35)':'rgba(255,255,255,0.65)',border:`1px solid ${disabled?'rgba(184,103,87,0.18)':'rgba(184,103,87,0.35)'}`,color:disabled?'rgba(55,43,11,0.25)':accentDark,fontSize:20,cursor:disabled?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>{isLeft?'‹':'›'}</button>)
  }
  const renderMedia=(item,abs)=>{
    const s={width:'100%',display:'block',borderRadius:8,...(abs?{maxHeight:'65vh',objectFit:'contain'}:{})}
    return item.type==='video'
      ?<video src={item.src} autoPlay loop muted playsInline style={s}/>
      :<img src={item.src} alt="" style={s}/>
  }
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(246, 241, 232, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',paddingTop:80}}>
      {/* Header */}
      <div onClick={e=>e.stopPropagation()} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 32px',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(55, 43, 11, 0.55)'}}>Iteration {idx+1} of {cards.length}</span>
          {/* v1/v2/both toggle */}
          <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.5)',border:'1px solid rgba(184,103,87,0.25)',borderRadius:20,padding:3}}>
            {['v1','both','v2'].map(v=>(
              <button key={v} onClick={()=>setVersion(v)} style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'4px 12px',borderRadius:16,border:'none',cursor:'pointer',transition:'all 0.2s',background:version===v?accentDark:'transparent',color:version===v?'#fff':'rgba(55, 43, 11, 0.6)'}}>{v==='both'?'Side by side':v.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <FullscreenCloseBtn onClose={onClose}/>
      </div>
      {/* Body */}
      <div onClick={e=>e.stopPropagation()} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:24,padding:'0 32px',overflow:'hidden'}}>
        {navBtn('left')}
        <div style={{flex:1,maxWidth:1100,display:'flex',flexDirection:'column',gap:20,alignItems:'center'}}>
          {/* Feedback text */}
          <div style={{background:'rgba(255,255,255,0.55)',border:'1px solid rgba(184,103,87,0.2)',borderRadius:10,padding:'16px 24px',maxWidth:800,width:'100%'}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:terracotta,marginBottom:6}}>Feedback</div>
            <p style={{fontSize:13,lineHeight:1.7,color:accentDark,margin:0}}>{c.feedback}</p>
            {c.changed&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(55, 43, 11, 0.55)',marginTop:10,marginBottom:4}}>What changed</div><p style={{fontSize:12,lineHeight:1.6,color:deepBlue,margin:0}}>{c.changed}</p></>}
          </div>
          {/* Visuals */}
          <div style={{display:'grid',gridTemplateColumns:version==='both'?'1fr 1fr':'1fr',gap:16,width:'100%'}}>
            {(version==='v1'||version==='both')&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(55, 43, 11, 0.6)',marginBottom:8}}>{c.v1Label}</div>
                <div style={{borderRadius:8,overflow:'hidden',border:'1px solid rgba(184,103,87,0.25)'}}>{renderMedia(c.v1,true)}</div>
              </div>
            )}
            {(version==='v2'||version==='both')&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(55, 43, 11, 0.6)',marginBottom:8}}>{c.v2Label}</div>
                <div style={{borderRadius:8,overflow:'hidden',border:'1px solid rgba(184,103,87,0.25)'}}>{renderMedia(c.v2,true)}</div>
              </div>
            )}
          </div>
        </div>
        {navBtn('right')}
      </div>
      {/* Footer */}
      <div style={{textAlign:'center',fontSize:11,color:'rgba(55,43,11,0.4)',letterSpacing:'0.06em',padding:'16px 0',flexShrink:0}}>← → to navigate · Esc to close</div>
    </div>
  )
}

function IterationCards(){
  const [expandIdx,setExpandIdx]=useState(-1)
  const cardStyle={background:'var(--bg)',borderRadius:12,border:'1px solid rgba(177,124,93,0.15)',overflow:'hidden',cursor:'pointer',position:'relative'}
  const expandBadge=<div style={{position:'absolute',top:8,right:8,cursor:'zoom-in',background:'rgba(0,0,0,0.55)',color:'#fff',fontSize:10,fontWeight:600,padding:'5px 9px',borderRadius:5,letterSpacing:'0.04em',backdropFilter:'blur(4px)',zIndex:2}}>⤢ Expand</div>
  const renderMedia=(item)=>{
    const s={width:'100%',display:'block'}
    return item.type==='video'
      ?<video src={item.src} autoPlay loop muted playsInline style={s}/>
      :<img src={item.src} alt="" style={s}/>
  }
  return(<>
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      {iterationCards.map((c,i)=>(
        <div key={c.id} style={cardStyle} onClick={()=>setExpandIdx(i)}>
          {expandBadge}
          <div style={{padding:'24px 28px',borderBottom:`1px solid ${borderLight}`}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:terracotta,marginBottom:8}}>Feedback</div>
            <p style={{fontSize:14,lineHeight:1.65,color:deepBlue,margin:0}}>{c.feedback}</p>
            {c.changed&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginTop:12,marginBottom:4}}>What changed</div><p style={{fontSize:13,lineHeight:1.6,color:deepBlue,margin:0}}>{c.changed}</p></>}
          </div>
          <div style={{padding:24,background:'rgba(89,80,74,0.08)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(89,80,74,0.5)',marginBottom:8}}>{c.v1Label}</div>
                <div style={{borderRadius:8,overflow:'hidden',border:'1px solid rgba(89,80,74,0.1)',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>{renderMedia(c.v1)}</div>
              </div>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(89,80,74,0.5)',marginBottom:8}}>{c.v2Label}</div>
                <div style={{borderRadius:8,overflow:'hidden',border:'1px solid rgba(89,80,74,0.1)',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>{renderMedia(c.v2)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    {expandIdx>=0&&<IterationOverlay cards={iterationCards} openIdx={expandIdx} onClose={()=>setExpandIdx(-1)}/>}
  </>)
}

function SynthesisSection(){
  const [active, setActive] = useState(0)

  const cards = [
    {
      num:'01',
      title:"Rules list lacks searchability",
      summary:"Rules are only findable with Ctrl+F and truncated text; compliance teams keep spreadsheets just to locate the right one.",
      caption:"Rules lived in a dense grid that could only be searched with Ctrl+F—and even that broke once text was truncated—so compliance officers kept parallel spreadsheets just to track down the rule they needed.",
      quote:'"Have to use ctrl+F to find rules and some cutoff logic is unsearchable so I have to keep a separate spreadsheet to simply track down a rule"',
      visual:(
        <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:300,transform:'scale(1.55)',transformOrigin:'center center',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',fontSize:9,boxShadow:'2px 2px 6px rgba(0,0,0,0.1)',opacity:0.9}}>
          <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'4px 8px',fontWeight:700,fontSize:10,color:'#1a1a1a'}}>Rules</div>
          <div style={{display:'grid',gridTemplateColumns:'28px 82px 22px 1fr',background:'#e8e8e8',borderBottom:'1px solid #ccc'}}>
            {['ID','Rule Name','Act.','Detail'].map(h=><div key={h} style={{padding:'3px 6px',fontSize:7.5,fontWeight:700,color:'#333',borderRight:'1px solid #ccc'}}>{h}</div>)}
          </div>
          {[['U021','Equity Watch List','Yes','REJECT, If Symbol = [AAPL, MSFT, AMZN, TSLA, GOOG…',true],['U022','Rep Account Monitor','No','REVIEW, If Accepting Rep = [033000086, 04400012…',false],['U023','Branch Hold Flag','Yes','REJECT, If Branch = [123, 124, 125, 126, 127, 128…',false],['U024','Commission Threshold','No','REJECT, If Commission Variance > 2.50%',false],['U025','Low Dollar Order Cap','Yes','REVIEW, If Account Number = [033370983, 044000…',false]].map(([id,name,a,d,highlight],i)=>(
            <div key={id} style={{display:'grid',gridTemplateColumns:'28px 82px 22px 1fr',background:highlight?'#fffbcc':i%2===0?'#fff':'#fafafa',borderBottom:'1px solid #f0f0f0'}}>
              <div style={{padding:'3px 6px',fontSize:8,color:'#2563eb',fontWeight:600,borderRight:'1px solid #eee'}}>{id}</div>
              <div style={{padding:'3px 6px',fontSize:8,color:'#333',fontWeight:highlight?700:400,borderRight:'1px solid #eee'}}>{highlight?<><span style={{background:'#fdee73',borderRadius:1}}>Equity</span>{' Watch List'}</>:name}</div>
              <div style={{padding:'3px 6px',fontSize:7.5,color:'#555',borderRight:'1px solid #eee'}}>{a}</div>
              <div style={{padding:'3px 6px',fontSize:8,color:'#888',fontStyle:'italic',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{d}</div>
            </div>
          ))}
          <div style={{padding:'3px 8px',fontSize:7.5,color:'#aaa',fontStyle:'italic',borderTop:'1px solid #eee'}}>… 55 more rules</div>
        </div>
      ),
      callout:'Only searchable with Ctrl+F which cannot locate data in truncated portion',
    },
    {
      num:'02',
      title:"Keyword selection is opaque and error-prone",
      summary:"Over a hundred keywords with no definitions—users pick by trial and error, clicking next to discover what each one does.",
      caption:"Keyword selection was a blind trial-and-error process: over a hundred options with no descriptions, forcing users to select one, click next, and backtrack repeatedly just to understand what each keyword did.",
      quote:'"Only know what a keyword means by trial and error  —  select it and click next, then go back and search again for another keyword"',
      visual:(
        <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:240,transform:'scale(1.55)',transformOrigin:'center center',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 6px rgba(0,0,0,0.1)'}}>
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
      ),
      callout:'100+ keywords — no descriptions or context provided',
    },
    {
      num:'03',
      title:"The system expects expertise it never provides",
      summary:"Free-text inputs and no guidance assume expertise the platform never teaches; new users can take years to build confidence.",
      caption:"Core inputs assumed deep institutional knowledge—a single free‑text field for hundreds of ticker symbols with no structure, preview, or validation—turning everyday rule updates into error‑prone chores.",
      quote:'"One-line box for 600 ticker symbols — impossible to jump to the end of that list"',
      visual:(
        <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:280,transform:'scale(1.55)',transformOrigin:'center center',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
          <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'4px 8px',fontWeight:700,fontSize:10,color:'#1a1a1a'}}>Rule Details</div>
          <div style={{padding:'6px 8px',borderBottom:'1px solid #eee'}}>
            <div style={{fontSize:8,color:'#555',marginBottom:3}}>CUSIP/Symbol/SEDOL <span style={{color:'#c00'}}>*</span></div>
            <div style={{display:'flex',gap:4,alignItems:'center'}}>
              <select style={{fontSize:8,padding:'1px 4px',border:'1px solid #aaa',borderRadius:2,color:'#333',flexShrink:0}}><option>Equal to</option></select>
              <div style={{border:'1px solid #aaa',borderRadius:2,background:'white',padding:'2px 6px',fontSize:8,color:'#888',fontStyle:'italic',flex:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>AAPL, TSLA, AMZN, MSFT, GOOGL…</div>
            </div>
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
      ),
      callout:'Free text — up to 20,000 comma-separated values',
    },
    {
      num:'04',
      title:"Insufficient documentation and audit tracking",
      summary:"Rule rationales and change history live in external spreadsheets; if those fall out of sync, there's no authoritative record inside the platform.",
      caption:"Rule rationales, change history, and scope lived in a separate Excel tracker that had to be updated manually; if the spreadsheet and the system disagreed, there was no obvious source of truth in high‑stakes situations.",
      quote:'"Jumping back and forth loses my place — and if I forget to update the spreadsheet, it\'s hard to know the single source of truth. In compliance, that gap can mean a costly trading error."',
      visual:(
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)',width:138}}>
            <div style={{padding:'3px 6px',fontSize:7.5,fontWeight:700,background:'#d4e0ec',borderBottom:'1px solid rgba(0,0,0,0.1)',color:'#1a1a1a'}}>Platform — Rules</div>
            {['U023 — Equity Buy Cap','U030 — NF Training Hold','U058 — Reject Order Flag'].map(r=>(
              <div key={r} style={{padding:'2px 6px',fontSize:7.5,color:'#555',borderBottom:'1px solid #f0f0f0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r}</div>
            ))}
            <div style={{padding:'2px 6px',fontSize:7,color:'#aaa',fontStyle:'italic'}}>+ 58 more…</div>
          </div>
          <div style={{color:'#9ba8b8',fontSize:14}}>⇄</div>
          <div style={{border:'1px solid #b0b0b0',borderRadius:3,background:'white',overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)',width:152}}>
            <div style={{background:'#1d6b38',padding:'3px 6px'}}><span style={{fontSize:7,color:'white',fontWeight:600}}>rules_tracker.xlsx</span></div>
            <div style={{display:'grid',gridTemplateColumns:'18px 36px 56px 36px',background:'#e8e8e8',borderBottom:'1px solid #bbb'}}>
              {['','Rule','Rationale','Updated'].map(h=><div key={h} style={{padding:'2px 3px',fontSize:6.5,fontWeight:700,color:'#444',borderRight:'1px solid #ccc',textAlign:'center'}}>{h}</div>)}
            </div>
            {[['1','U023','Equity res…','Mar 2'],['2','U030','Training ID…','Feb 28'],['3','U058','Order flag…','Mar 10']].map(([n,id,rat,date],i)=>(
              <div key={n} style={{display:'grid',gridTemplateColumns:'18px 36px 56px 36px',background:i%2===0?'#fff':'#f7f7f7',borderBottom:'1px solid #eee'}}>
                <div style={{padding:'2px 3px',fontSize:6.5,color:'#999',background:'#f0f0f0',borderRight:'1px solid #ddd',textAlign:'center'}}>{n}</div>
                <div style={{padding:'2px 3px',fontSize:7,color:'#2563eb',borderRight:'1px solid #eee'}}>{id}</div>
                <div style={{padding:'2px 3px',fontSize:7,color:'#555',borderRight:'1px solid #eee',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{rat}</div>
                <div style={{padding:'2px 3px',fontSize:6.5,color:'#888'}}>{date}</div>
              </div>
            ))}
            <div style={{padding:'2px 5px',fontSize:6.5,color:'#aaa',fontStyle:'italic',borderTop:'1px solid #eee'}}>+ 58 more rows…</div>
          </div>
        </div>
      ),
      callout:'Manual copy & paste between systems',
    },
    {
      num:'05',
      title:"Help content not accessible",
      summary:"The only in-product help is buried in a top-nav link most users have never found—never surfaced at the moment of need.",
      caption:"The only in‑product help lived in a generic help center link buried in the top nav—technically present, practically invisible, and never surfaced at the moment someone was configuring a rule.",
      quote:'"Didn\'t know that was here, that\'s cool"',
      visual:(
        <div style={{width:240,transform:'scale(1.55)',transformOrigin:'center center'}}>
          <div style={{border:'1px solid #b8b8b8',borderRadius:3,overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
            <div style={{background:'#3a4553',padding:'5px 10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:8.5,color:'white',fontWeight:700}}>ABC Investing</span>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinejoin="round"><polyline points="1,6 6,1 11,6"/><rect x="3" y="6" width="6" height="5.2" rx="0.5"/></svg>
                <span style={{fontSize:8,color:'rgba(255,255,255,0.65)',background:'rgba(255,255,255,0.15)',borderRadius:'50%',width:14,height:14,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>?</span>
              </div>
            </div>
            <div style={{padding:8,background:'white'}}>
              <div style={{fontSize:8,fontWeight:700,color:'#1a1a1a',marginBottom:4}}>Rules</div>
              {[90,75,60].map(w=><div key={w} style={{height:5,background:'#eee',borderRadius:2,marginBottom:3,width:`${w}%`}}/>)}
            </div>
          </div>
        </div>
      ),
      callout:'Help buried in top-right nav — rarely discovered',
    },
  ]

  const c = cards[active]

  return (
    <div style={{marginTop:72,marginBottom:24}}>
      <StepLabel>Synthesis</StepLabel>
      <h3 style={{fontFamily:'var(--f-serif)',fontSize:22,fontWeight:400,color:accentDark,letterSpacing:'-0.2px',marginBottom:8}}>Five problem areas emerged</h3>
      <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:32}}>Bringing interviews, screenshots, and support stories together surfaced five patterns I could design against.</p>

      {/* Two-column layout: cards left (1/3), visual panel right (2/3) */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:24,alignItems:'start'}}>

        {/* Left: stacked cards */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {cards.map((card,i)=>{
            const isActive = active===i
            return(
              <button
                key={card.num}
                onClick={()=>setActive(i)}
                style={{
                  background: isActive ? '#F2DCD0' : 'rgba(242,220,208,0.4)',
                  border: isActive ? '1px solid #D9AC97' : '1px solid rgba(217,172,151,0.35)',
                  borderRadius:12,
                  padding:'18px 20px',
                  cursor:'pointer',
                  textAlign:'left',
                  fontFamily:'inherit',
                  display:'flex',
                  flexDirection:'column',
                  gap:6,
                  transition:'all 0.15s',
                  boxShadow: isActive ? '0 2px 10px rgba(55,43,11,0.07)' : 'none',
                  outline:'none',
                }}
              >
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:isActive?terracotta:'rgba(184,103,87,0.45)'}}>{card.num}</span>
                  {!isActive && <span style={{fontSize:11,color:'rgba(184,103,87,0.5)',fontWeight:500}}>View →</span>}
                </div>
                <div style={{fontFamily:'var(--f-serif)',fontSize:15,fontWeight:isActive?700:400,color:isActive?accentDark:'rgba(55,43,11,0.65)',lineHeight:1.35}}>{card.title}</div>
              </button>
            )
          })}

          <div style={{marginTop:8}}>
            <a
              href="https://www.figma.com/board/fOKBJ0Tc2lHQtjQiUKUugr/HMW-and-Concepts?node-id=0-1&t=xeVKVgdQRSJCUicq-1"
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
            >
              Explore synthesis board in FigJam ↗
            </a>
          </div>
        </div>

        {/* Right: sticky visual panel */}
        <div style={{position:'sticky',top:100}}>
          <div style={{background:'#F2DCD0',border:'1px solid #D9AC97',borderRadius:14,overflow:'hidden',boxShadow:'0 2px 14px rgba(55,43,11,0.07)'}}>
            <div style={{background:'radial-gradient(rgba(55,43,11,0.08) 1px,transparent 1px) 0 0/22px 22px, rgba(238,229,211,0.5)',padding:'36px 28px',display:'flex',alignItems:'center',justifyContent:'center',minHeight:240,overflow:'hidden',position:'relative'}}>
              {c.visual}
              <div style={{position:'absolute',bottom:16,left:'50%',transform:'translateX(-50%)',background:'white',border:'1px solid rgba(158,100,75,0.3)',borderRadius:8,padding:'7px 14px',fontSize:10,fontFamily:'Inter,sans-serif',color:'#8E4A2E',fontWeight:600,whiteSpace:'nowrap',boxShadow:'0 2px 8px rgba(158,100,75,0.1)'}}>{c.callout}</div>
            </div>
            <div style={{padding:'22px 26px 26px',display:'flex',flexDirection:'column',gap:12}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:terracotta}}>What this looked like</div>
              <div style={{fontFamily:'var(--f-serif)',fontSize:17,fontWeight:700,color:accentDark,lineHeight:1.35}}>{c.title}</div>
              <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid rgba(184,103,87,0.3)`,lineHeight:1.55,margin:0}}>{c.quote}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function RulesCaseStudy(){
  const chapterBarRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id)
  const [navVisible, setNavVisible] = useState(false)
  const [navCollapsed, setNavCollapsed] = useState(false)

  // --- Chapter nav: scrollspy + visibility (mirrors OM's pattern) ---
  useEffect(() => {
    const sections = CHAPTERS
      .map((c) => document.getElementById(c.id))
      .filter(Boolean)
    if (!sections.length) return

    const threshold = () => Math.max(140, window.innerHeight * 0.28)

    const update = () => {
      const t = threshold()
      let current = sections[0].id
      for (const s of sections) {
        const rect = s.getBoundingClientRect()
        if (rect.top - t <= 0) current = s.id
        else break
      }
      setActiveChapter((prev) => (prev === current ? prev : current))

      const scrollY = window.scrollY || window.pageYOffset
      const past = scrollY > 520
      const docH = document.documentElement.scrollHeight
      const viewH = window.innerHeight
      const nearBottom = scrollY + viewH > docH - 600
      setNavVisible(past && !nearBottom)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Auto-center the active label inside the bottom word bar.
  useEffect(() => {
    const bar = chapterBarRef.current
    if (!bar) return
    const active = bar.querySelector('.is-active')
    if (!active) return
    const barRect = bar.getBoundingClientRect()
    const linkRect = active.getBoundingClientRect()
    const offset = (linkRect.left - barRect.left) - (barRect.width - linkRect.width) / 2
    bar.scrollTo({
      left: bar.scrollLeft + offset,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [activeChapter])

  const scrollToChapter = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const navOffset = 88
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return(<div className="rules-cs-page cs-page rules-page" style={{fontSize:16,lineHeight:1.5,color:accentDark,background:cream,overflowX:'hidden'}}>
    <Nav/>
    {/* Sticky chapter nav  -  left rail at ≥1100px viewport */}
    <aside
      className={`om-chapter-nav${navVisible ? ' is-visible' : ''}${navCollapsed ? ' is-collapsed' : ''}`}
      aria-label="Case study chapters"
    >
      <div className="om-chapter-nav-header">
        <span className="om-chapter-nav-title">{navCollapsed ? '' : "What's inside"}</span>
        <button
          type="button"
          className="om-chapter-nav-toggle"
          aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          onClick={() => setNavCollapsed(c => !c)}
        >
          {navCollapsed ? '›' : '‹'}
        </button>
      </div>
      <ul className="om-chapter-nav-list">
        {CHAPTERS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className={`om-chapter-nav-link${activeChapter === id ? ' is-active' : ''}`}
              aria-current={activeChapter === id ? 'true' : undefined}
              onClick={() => scrollToChapter(id)}
            >
              <span className="om-chapter-nav-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
    {/* Floating word bar  -  mid-viewport fallback (768–1439px) */}
    <aside
      ref={chapterBarRef}
      className={`om-chapter-bar${navVisible ? ' is-visible' : ''}`}
      aria-label="Case study chapter shortcuts"
    >
      <ul>
        {CHAPTERS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className={`om-chapter-bar-link${activeChapter === id ? ' is-active' : ''}`}
              aria-current={activeChapter === id ? 'true' : undefined}
              onClick={() => scrollToChapter(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </aside>

    {/* Plain warm-cream canvas — matches Order Management, which sits flat on
        the page background with no ambient gradient wash. */}
    <div>

    {/* HERO */}
    <section style={{
      background:'transparent',
      minHeight:'100vh',
      paddingTop:'clamp(60px, 10vw, 140px)',paddingBottom:0,overflow:'hidden',position:'relative',display:'flex',flexDirection:'column'
    }}>
      <div style={ct}>
        <div style={{marginBottom:32,opacity:0,animation:'fadeUp 0.7s ease 0.1s forwards'}}>
          <span className="eyebrow">Case Study · Rule Engine · 2025</span>
        </div>
        <h1 style={{fontFamily:'var(--f-serif)',fontWeight:300,fontSize:'clamp(36px, 5vw, 64px)',letterSpacing:'-0.01em',lineHeight:1.1,color:'#372B0B',margin:'0 0 20px',opacity:0,animation:'fadeUp 0.7s ease 0.25s forwards'}}>Inside the Rule Engine<span style={{color:'var(--clay)'}}>.</span></h1>
        <p style={{fontFamily:'var(--f-serif)',fontStyle:'normal',fontWeight:300,fontSize:'clamp(17px, 1.5vw, 21px)',lineHeight:1.55,color:'var(--ink-2)',maxWidth:560,margin:'0 0 36px',opacity:0,animation:'fadeUp 0.7s ease 0.4s forwards'}}>From research landscape to shipped product—designing a rules engine that replaces programmatic jargon and Excel workarounds with plain-English readbacks, revealing logic in clear, discernible chunks so compliance teams can trust what a rule will do as they build it.</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',opacity:0,animation:'fadeUp 0.7s ease 0.5s forwards'}}>
          {['Research','Strategy','Product Design','Testing','Shipped ✓'].map(tag=>(<span key={tag} className="chip chip--neutral">{tag}</span>))}
        </div>
      </div>
      <div style={{maxWidth:1240,margin:'48px auto 0',padding:'0 64px',opacity:0,animation:'fadeUp 0.7s ease 0.55s forwards'}}>
        <video
          src="/design-vid-b3.mov"
          autoPlay
          loop
          muted
          playsInline
          style={{width:'100%',borderRadius:12,display:'block'}}
        />
      </div>
    </section>

    {/* TL;DR */}
    <section id="ch-tldr" style={sec('transparent')}>
      <div style={ct}>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(36px, 5vw, 64px)',fontWeight:300,color:accentDark,lineHeight:1,marginBottom:48}}>tl;dr</h2>

        <div style={{maxWidth:820}}>
          <div style={{marginBottom:36}}>
            <StepLabel>Context</StepLabel>
            <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,marginTop:16,marginBottom:0}}>The rules engine sits upstream of every trade — governing which orders are permitted to execute across a platform serving &gt;3,300 institutional firms. One misconfigured rule could silently block or pass thousands of trades firm-wide — resulting in millions of dollars of trade errors to the business on a daily basis. The system that managed these rules was held together with tribal knowledge and Excel workarounds.</p>
          </div>

          <div style={{marginBottom:36}}>
            <StepLabel>Approach</StepLabel>
            <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,marginTop:16,marginBottom:0}}>I led discovery and a design sprint to identify the highest-leverage slice of the ecosystem before designing anything — landing on rule management and rule creation as the two workflows with the most friction and the highest risk of error. We were initially convinced a standalone list manager would be the biggest win, but an infrastructure constraint forced us to look harder at what users actually needed. What we found: they didn't need a separate system — they needed crisp, approachable, and transparent bulk value entry and clause-building directly within the rule. Making those two things simple gave compliance teams something they'd never had: the ability to know exactly what a rule would do as they built or reviewed it, without relying on anyone else to verify it.</p>
          </div>

          <div style={{marginBottom:48}}>
            <StepLabel>Outcome</StepLabel>
            <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,marginTop:16,marginBottom:0}}>7 of 7 usability participants responded positively — unusually strong signal from a user group that typically resists new tooling. The plain-language rule preview was called out unprompted as the feature that most improved their confidence building rules. Both workflows shipped and were adopted without the resistance that typically accompanies enterprise tool changes, replacing Ctrl+F and Excel workarounds and establishing the interaction patterns the rest of the compliance suite would build on.</p>
          </div>
        </div>

        <div className="meta-pills">
          <span className="chip chip--neutral">My Role: Lead UX Designer</span>
          <span className="chip chip--neutral">~9–12 months</span>
          <span className="chip chip--neutral">Team: Design · Product · Engineering · Business · UXR</span>
          <span className="chip chip--neutral">Shipped ✓</span>
        </div>
      </div>
    </section>

    {/* FRAMING */}
    <section id="ch-framing" style={sec('transparent')}>
      <div style={ct}>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,lineHeight:1.3,marginBottom:36,letterSpacing:'-0.3px'}}>finding the right problem before designing the right solution</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:760,marginBottom:28}}>This wasn't a project that arrived as a neat design brief. It started with two questions: inside a sprawling ecosystem of aging compliance tools, where should we intervene first—and how could design actually reduce risk rather than just re-skin old workflows?</p>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:760,marginBottom:28}}>I led a structured discovery and sprint process, pulling together existing interviews that had never been acted on, synthesizing research with product and engineering, and facilitating design workshops before a single pixel was drawn. The decision about what to design was as deliberate as the design itself.</p>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:760}}>The plain-language preview, the guided creation flow, the structured value input — these weren't just solutions to individual problems. They became the interaction patterns the rest of the compliance suite would build on.</p>
      </div>
    </section>

    {/* DISCOVERY */}
    <section id="ch-discovery" style={{...sec('transparent'),paddingTop:160,paddingBottom:160}}>
      <div style={ct}>
        <StepLabel>Discovery</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28,maxWidth:760}}>Surveying the Compliance Landscape</h2>
        <p style={{fontSize:16,lineHeight:1.8,color:deepBlue,maxWidth:640,marginBottom:100}}>I surfaced and re-read prior compliance interviews that had stalled out, then brought product, engineering, and business into the same room to synthesize themes. That work aligned us on the rules engine as the highest‑leverage slice of the ecosystem—where a better experience would immediately change how compliance teams find, create, and maintain rules.</p>

        <div style={{marginBottom:56}}>
          <StepLabel>The existing experience</StepLabel>
          <h3 style={{fontFamily:'var(--f-serif)',fontSize:22,fontWeight:400,color:accentDark,letterSpacing:'-0.2px',marginBottom:32}}>What users were working with</h3>
          <div>
              {/* Rules table preview  -  matches actual legacy UI */}
              <div style={{background:'white',borderRadius:4,overflow:'hidden',marginBottom:24,fontFamily:'Arial,Helvetica,sans-serif',fontSize:11,boxShadow:'0 2px 12px rgba(0,0,0,0.1)'}}>
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
                        {id:'U017',name:'Penny Stock Block',active:'Yes',ip:true,maa:true,inv:false,st:false,detail:'REJECT, If Order Type =[ MKT], If Symbol Price < [ 1.00], If Exchange =[ OTC, PINK, … ]'},
                        {id:'U018',name:'Options Level Enforcement',active:'Yes',ip:false,maa:false,inv:true,st:true,detail:'REVIEW, If Instrument Type =[ OPT], If Options Level < [ 3], If Strategy =[ SPREAD, NAKED, STRADDLE, … ]'},
                        {id:'U019',name:'Concentration Limit  -  Equity',active:'No',ip:true,maa:true,inv:true,st:false,detail:'REVIEW, If Position Concentration > [ 20.00 %], If Asset Class =[ EQ], If Account Type =[ IRA, ROTH, … ]'},
                        {id:'U020',name:'Short Sale Locate Check',active:'Yes',ip:true,maa:false,inv:false,st:true,detail:'REJECT, If Action =[ SS], If Locate Status =[ NOT_CONFIRMED], If Symbol / CUSIP =[ … ]'},
                        {id:'U021',name:'Day Trade Buying Power',active:'Yes',ip:true,maa:true,inv:true,st:true,detail:'REVIEW, If Day Trade Count >= [ 4], If Account Buying Power < [ ORDER_VALUE], If Period =[ ROLLING_5D]'},
                        {id:'U022',name:'Foreign Issuer Disclosure',active:'No',ip:false,maa:true,inv:true,st:false,detail:'REVIEW, If Issuer Country !=[ US], If Market Cap < [ 500000000], If Action =[ B, S, … ]'},
                        {id:'U023',name:'Margin Call Override Block',active:'Yes',ip:true,maa:true,inv:false,st:false,detail:'REJECT, If Margin Status =[ CALL_OUTSTANDING], If Action =[ B], If Account Number =[ … ]'},
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
              <a href="/legacy-rules-annotated.html" target="_blank" rel="noreferrer" className="btn">
                Meet the legacy system ▶
              </a>
          </div>
        </div>

        <SynthesisSection/>
      </div>
    </section>

    {/* DESIGN SPRINT */}
    <section id="ch-design-sprint" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) 0`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Design Sprint</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,marginBottom:8,display:'flex',alignItems:'center',flexWrap:'wrap',gap:14,letterSpacing:'-0.018em'}}>
          <span>From research insights to</span>
          <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true" style={{flexShrink:0,color:accent}}>
            <path d="M1 7 H25 M19 1 L25 7 L19 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>"How Might We" prompts</span>
          <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true" style={{flexShrink:0,color:accent}}>
            <path d="M1 7 H25 M19 1 L25 7 L19 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>concept sketches</span>
        </h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:720,marginBottom:24}}>With five problem areas defined, I brought key partners from product and engineering into a focused design sprint—framing each problem as a "How might we" prompt and sketching concepts across six opportunity areas with constraints and business logic in the room. The sprint produced the concept set behind everything that shipped, and its key decision: anchor the work in plain-language rule logic, starting with the rules list and a guided creation flow.</p>
        <div>
          <a href="https://www.figma.com/board/fOKBJ0Tc2lHQtjQiUKUugr/HMW-and-Concepts?node-id=0-1&t=xeVKVgdQRSJCUicq-1" target="_blank" rel="noreferrer" className="btn btn--secondary">
            View Original Sketches in FigJam ↗
          </a>
        </div>
      </div>
    </section>

    {/* PRIORITIZATION */}
    <section id="ch-prioritization" style={sec('transparent')}>
      <div style={ct}>
        <StepLabel>Prioritization</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>Deciding Where to Start</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:32}}>With 6 HMW areas and related concepts generated, the team assessed impact vs. effort  -  keeping in mind business, tech, and other environmental constraints.</p>

        {/* Effort vs Impact Matrix */}
        <div style={{background:`radial-gradient(rgba(55,43,11,0.06) 1px, transparent 1px) 0 0 / 28px 28px, rgba(244,239,227,0.8)`,border:'1px solid rgba(55,43,11,0.12)',borderRadius:14,padding:'24px 32px 16px 44px',marginBottom:4,position:'relative'}}>
          {/* Y axis label  -  rotated, pinned to left inside box */}
          <div style={{position:'absolute',left:0,top:0,bottom:0,width:28,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{transform:'rotate(-90deg)',fontSize:8,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#3d3530',whiteSpace:'nowrap'}}>↓ LOWER IMPACT · HIGHER IMPACT ↑</div>
          </div>
          {/* Matrix grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,position:'relative',marginBottom:0}}>
            {/* Quadrant TL */}
            <div style={{borderRight:'1px solid rgba(184,103,87,0.15)',borderBottom:'1px solid rgba(184,103,87,0.15)',padding:'14px 16px 20px 20px',minHeight:200,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>HIGH IMPACT · LOW EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 04',title:'More intuitive form controls',phase:'Phase 2',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
                {hmw:'HMW 03',title:'Surface help where it\'s needed  -  contextual guidance',phase:'Phase 2',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
                {hmw:'HMW 01',title:'Find & manage rules  -  search and filter on metadata + plain language rule preview',phase:'Phase 1',bg:'transparent',border:'var(--clay-edge)',pillBg:'rgba(158,100,75,0.12)',pillColor:'#8E4A2E'},
                {hmw:'HMW 05',title:'Intuitive rule builder  -  split panel, plain language preview builds as details are added',phase:'Phase 2',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:6,padding:'8px 10px',width:c.hmw==='HMW 01'?'calc(40% - 5px)':'calc(30% - 8px)',minWidth:110,flexShrink:0}}>
                  <div style={{fontSize:8,fontWeight:700,color:'#3d3530',letterSpacing:'0.08em',marginBottom:4,opacity:0.8}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#3d3530',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{display:'inline-flex',padding:'2px 8px',borderRadius:20,fontSize:8,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',background:c.pillBg,color:'#3d3530'}}>{c.phase==='Phase 1'?'✓ ':'→ '}{c.phase}</div>
                </div>
              ))}
              </div>
            </div>
            {/* Quadrant TR */}
            <div style={{borderBottom:'1px solid rgba(184,103,87,0.15)',padding:'14px 16px 20px 16px',minHeight:200,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>HIGH IMPACT · HIGH EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 02',title:'Keyword assistant  -  view keyword descriptions on selection surface',phase:'Phase 2',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
                {hmw:'HMW 06',title:'Documentation & audit trail  -  change history',phase:'Phase 3',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
                {hmw:'HMW 04',title:'List Manager  -  bulk editing, inheritance, validation',phase:'Deferred',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:6,padding:'8px 10px',width:'calc(50% - 5px)',minWidth:120}}>
                  <div style={{fontSize:8,fontWeight:700,color:'#3d3530',letterSpacing:'0.08em',marginBottom:4,opacity:0.8}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#3d3530',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{display:'inline-flex',padding:'2px 8px',borderRadius:20,fontSize:8,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',background:c.pillBg,color:'#3d3530'}}>{c.phase==='Phase 1'?'✓ ':'→ '}{c.phase}</div>
                </div>
              ))}
              </div>
            </div>
            {/* Quadrant BL */}
            <div style={{borderRight:'1px solid rgba(184,103,87,0.15)',padding:'14px 16px 20px 20px',minHeight:160,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>LOW IMPACT · LOW EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 01',title:'Bulk actions',phase:'Deprioritized',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
                {hmw:'HMW 01',title:'Custom rule description',phase:'Deprioritized',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:6,padding:'8px 10px',width:'calc(40% - 5px)',minWidth:110}}>
                  <div style={{fontSize:8,fontWeight:700,color:'#3d3530',letterSpacing:'0.08em',marginBottom:4,opacity:0.8}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#3d3530',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{display:'inline-flex',padding:'2px 8px',borderRadius:20,fontSize:8,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',background:c.pillBg,color:'#3d3530'}}>{c.phase==='Phase 1'?'✓ ':'→ '}{c.phase}</div>
                </div>
              ))}
              </div>
            </div>
            {/* Quadrant BR */}
            <div style={{padding:'14px 16px 20px 16px',minHeight:160,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>LOW IMPACT · HIGH EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 04',title:'Rule Wizard',phase:'Deprioritized',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
              ].map((c,i)=>(
                <div key={i} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:6,padding:'8px 10px',width:'calc(45% - 5px)',minWidth:120}}>
                  <div style={{fontSize:8,fontWeight:700,color:'#3d3530',letterSpacing:'0.08em',marginBottom:4,opacity:0.8}}>{c.hmw}</div>
                  <div style={{fontSize:10,color:'#3d3530',lineHeight:1.4,marginBottom:6}}>{c.title}</div>
                  <div style={{display:'inline-flex',padding:'2px 8px',borderRadius:20,fontSize:8,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',background:c.pillBg,color:'#3d3530'}}>{c.phase==='Phase 1'?'✓ ':'→ '}{c.phase}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
          {/* X axis label  -  inside, bottom center */}
          <div style={{textAlign:'center',paddingTop:12,fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>← LOWER EFFORT · HIGHER EFFORT →</div>
        </div>

        <h3 style={{fontFamily:'var(--f-serif)',fontSize:22,fontWeight:400,color:accentDark,letterSpacing:'-0.2px',marginTop:56,marginBottom:28}}>The resulting phased approach</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            {pill:'✓ Phase 1',title:'Rules List',body:'Users need to find and understand existing rules before anything else. Real search, filtering, and a plain language rule preview accomplish this. The layout of this page  -  and getting users familiar with the plain language format  -  made it easier to build rules in Phase 2, which reused the same pattern.',bg:'transparent',border:'var(--clay-edge)',pillBg:'rgba(158,100,75,0.12)',pillColor:'#8E4A2E'},
            {pill:'→ Phase 2',title:'Rule Creation',body:'Getting new rules into the system cleanly  -  with guided input, contextual keyword help, and confidence before going live  -  was the most consequential workflow. It also laid the groundwork for edit rule, which could follow the same pattern with minimal additional mapping.',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
            {pill:'→ Phase 3',title:'Edit Rule + Change History',body:'Editing and viewing change history depends on users having a solid mental model of rules first. Sequencing this after creation and list work made the later problem easier to solve.',bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
            {pill:'→ Deferred',title:'List Manager',body:null,bg:'transparent',border:'var(--hairline-strong)',pillBg:'rgba(31,26,15,0.06)',pillColor:'#6B5E45'},
          ].map(card=>(
            <div key={card.title} style={{borderRadius:12,padding:'28px 32px',background:card.bg,border:`1px solid ${card.border}`}}>
              <div style={{display:'inline-flex',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14,background:card.pillBg,color:card.pillColor}}>{card.pill}</div>
              <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8}}>{card.title}</div>
              {card.body && <p style={{fontSize:13,lineHeight:1.65,color:deepBlue}}>{card.body}</p>}
              {card.title === 'List Manager' && (
                <>
                  <p style={{fontSize:13,lineHeight:1.65,color:deepBlue,marginBottom:16}}>The most exciting concept from the sprint  -  and the most complex. Sprint edge-case analysis revealed significant downstream complexity. Deferred, not abandoned.</p>
                  <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:4,padding:'6px 12px',borderRadius:8,background:'transparent',border:'1px solid var(--hairline-strong)'}}>
                    <span style={{fontSize:12,fontStyle:'italic',color:'#6B5E45',letterSpacing:'0.01em'}}>↓ See The Pivot, directly below</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* THE PIVOT  -  List Manager / Tech Constraint */}
    <section id="ch-closer-look" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) 0`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>The Pivot</StepLabel>
        {/* Section header */}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
          <div style={{width:3,height:36,background:'var(--clay)',borderRadius:2,flexShrink:0}}/>
          <div>
            <div style={{fontFamily:'var(--f-mono)',fontSize:10,fontWeight:500,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--clay)',marginBottom:3}}>When infrastructure ruled out the strongest concept</div>
            <div style={{fontFamily:'var(--f-serif)',fontSize:22,fontWeight:400,color:accentDark,letterSpacing:'-0.2px'}}>The Pivot</div>
          </div>
        </div>

        <p style={{fontSize:14,lineHeight:1.75,color:deepBlue,maxWidth:760,marginBottom:40}}>With priorities set, I zoomed in on the fine details that would make or break the experience. The most significant was the input mechanism for keywords and clauses  -  how compliance teams actually get values into a rule. During the HMW sprint, one of the strongest concepts was a dedicated List Manager  -  a way to define, store, and reuse named value sets across multiple rules. But a hard infrastructure constraint forced a pivot. To understand why this detail mattered so much, it helps to see what the legacy process actually looked like.</p>

        {/* Two-step annotated visual */}
        <div style={{background:'#f7f6f2',border:'1px solid rgba(217,172,151,0.35)',borderRadius:14,padding:'32px 36px',marginBottom:36}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:24}}>Legacy workflow  -  uploading a securities list to a rule</div>

          {/* Step 1 */}
          <div style={{marginBottom:32}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:'#9E644B',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:'white'}}>1</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:accentDark,letterSpacing:'0.01em'}}>Leave rule creation  -  navigate to a separate import page via main nav</div>
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
              <div style={{width:200,flexShrink:0,background:'rgba(184,103,87,0.05)',border:'1px solid var(--clay-edge)',borderLeft:'3px solid var(--clay)',borderRadius:6,padding:'12px 14px',position:'relative',top:8}}>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3D3322',fontWeight:500}}>This page lives in main nav  -  not linked to or from rule creation. No obvious path here if you don't already know it exists.</div>
              </div>
            </div>

            {/* Excel file */}
            <div style={{marginTop:20,border:'1px solid #bbb',borderRadius:3,overflow:'hidden',boxShadow:'0 2px 6px rgba(0,0,0,0.08)'}}>
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

            {/* Warning note */}
            <div style={{marginTop:16,padding:'14px 18px',background:'rgba(184,103,87,0.05)',borderLeft:'3px solid var(--clay)',borderRadius:'0 8px 8px 0',display:'flex',gap:10,alignItems:'flex-start'}}>
              <span style={{fontSize:14,flexShrink:0}}>⚠️</span>
              <p style={{fontSize:12,lineHeight:1.65,color:'#3D3322',margin:0}}>And the master lists themselves? Always managed <em>outside</em> the platform entirely  -  in Excel or shared drives  -  because the system couldn't store them. Two potential sources of truth, with no reconciliation mechanism.</p>
            </div>
          </div>


          {/* Step 2 */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:'#9E644B',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:'white'}}>2</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:accentDark,letterSpacing:'0.01em'}}>Back in rule creation  -  set keyword to "Securities Upload," then match rule name exactly to the CSV filename</div>
            </div>
            <div style={{display:'flex',gap:20,alignItems:'flex-start'}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:'100%',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)'}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'5px 10px',fontWeight:700,fontSize:11,color:'#1a1a1a'}}>Rule Management  -  Edit Rule</div>
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
                      <span style={{fontSize:10,color:'#333',fontWeight:600}}>Securities Upload</span>
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
                  </div>
                </div>
              </div>
              <div style={{width:200,flexShrink:0,background:'rgba(184,103,87,0.05)',border:'1px solid var(--clay-edge)',borderLeft:'3px solid var(--clay)',borderRadius:6,padding:'12px 14px',position:'relative',top:8}}>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3D3322',fontWeight:500,marginBottom:8}}>Rule name has to match the .csv filename exactly.</div>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3D3322',fontWeight:500}}>No in-product guidance tells you this. Unclear how they're linked.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Concept vs. Shipped  -  side by side */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:40,alignItems:'stretch'}}>
          <ImgFrame label="HMW Concept  -  Standalone List Manager" stretch>
          <div style={{borderRadius:12,overflow:'hidden',background:'#23283a',padding:'18px 20px',fontFamily:"'Inter',-apple-system,sans-serif",display:'flex',flexDirection:'column',height:'100%',boxSizing:'border-box'}}>
            {/* Window chrome */}
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:16}}>
              <div style={{width:11,height:11,borderRadius:'50%',background:'#ff5f57'}}/>
              <div style={{width:11,height:11,borderRadius:'50%',background:'#febc2e'}}/>
              <div style={{width:11,height:11,borderRadius:'50%',background:'#28c840'}}/>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginLeft:8,letterSpacing:'0.02em'}}>List manager</span>
            </div>
            {/* Subtitle */}
            <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginBottom:14,letterSpacing:'0.01em'}}>Saved lists  -  reusable across rules</div>
            {/* List items */}
            {[{name:'High-risk securities',items:42,rules:3},{name:'Exempt accounts',items:18,rules:1},{name:'Licensed reps  -  Series 7',items:134,rules:2},{name:'Restricted entities',items:27,rules:4},{name:'Emerging market issuers',items:61,rules:1}].map((l,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.07)',borderRadius:8,padding:'11px 14px',marginBottom:8,display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:'#6B8EBF',flexShrink:0}}/>
                <span style={{fontSize:12,color:'rgba(255,255,255,0.88)',fontWeight:500,flex:1}}>{l.name}</span>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginRight:8}}>{l.items} items</span>
                <div style={{background:'rgba(255,255,255,0.12)',borderRadius:20,padding:'2px 10px',fontSize:10,color:'rgba(255,255,255,0.6)',fontWeight:500}}>{l.rules} {l.rules===1?'rule':'rules'}</div>
              </div>
            ))}
            {/* Skeleton row */}
            <div style={{background:'rgba(255,255,255,0.04)',borderRadius:8,padding:'11px 14px',marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:'rgba(255,255,255,0.15)',flexShrink:0}}/>
              <div style={{height:8,width:120,borderRadius:4,background:'rgba(255,255,255,0.1)'}}/>
            </div>
            {/* Create new */}
            <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:12}}>+ Create new list</div>
            {/* Annotation */}
            <div style={{fontSize:10,color:'#d4a843',fontStyle:'italic',fontWeight:600}}>↑ define once, reuse across many rules</div>
          </div>
          </ImgFrame>
          <ImgFrame label="Pivoted Direction  -  Bulk Upload Within the Rule" stretch>
            <div style={{borderRadius:12,overflow:'hidden',background:'#23283a',padding:'18px 20px',fontFamily:"'Inter',-apple-system,sans-serif",display:'flex',flexDirection:'column',height:'100%',boxSizing:'border-box'}}>
              {/* Window chrome */}
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:16}}>
                <div style={{width:11,height:11,borderRadius:'50%',background:'#ff5f57'}}/>
                <div style={{width:11,height:11,borderRadius:'50%',background:'#febc2e'}}/>
                <div style={{width:11,height:11,borderRadius:'50%',background:'#28c840'}}/>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginLeft:8,letterSpacing:'0.02em'}}>Create a New Rule</span>
              </div>
              {/* Context label */}
              <div style={{fontSize:9,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:12}}>within clause builder</div>
              {/* Modal card */}
              <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'16px 16px 14px',flex:1}}>
                {/* Modal header */}
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.9)'}}>Add List of Values</span>
                  <span style={{fontSize:15,color:'rgba(255,255,255,0.25)',lineHeight:1}}>×</span>
                </div>
                {/* Tabs */}
                <div style={{display:'flex',gap:14,paddingBottom:8,marginBottom:12,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{fontSize:11,fontWeight:500,color:'#7ab8d4',borderBottom:'1.5px solid #7ab8d4',paddingBottom:3}}>Enter Values</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.25)',paddingBottom:3}}>Review List</div>
                </div>
                {/* Description */}
                <p style={{fontSize:9.5,color:'rgba(255,255,255,0.35)',lineHeight:1.55,marginBottom:12}}>Add values to your list by uploading a local file and/or pasting directly into the second box below. Once you've entered all values, click next to review and edit the list as needed.</p>
                {/* Upload */}
                <div style={{fontSize:8.5,fontWeight:700,letterSpacing:'0.08em',color:'rgba(255,255,255,0.3)',marginBottom:5,textTransform:'uppercase'}}>Upload File</div>
                <div style={{border:'1.5px dashed rgba(255,255,255,0.12)',borderRadius:6,padding:'12px',textAlign:'center',marginBottom:12,background:'rgba(255,255,255,0.02)'}}>
                  <div style={{fontSize:14,color:'rgba(255,255,255,0.2)',marginBottom:4}}>↑</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.3)'}}>Drag and drop file here or <span style={{color:'#7ab8d4',textDecoration:'underline'}}>browse local files</span></div>
                </div>
                {/* Paste */}
                <div style={{fontSize:8.5,fontWeight:700,letterSpacing:'0.08em',color:'rgba(255,255,255,0.3)',marginBottom:5,textTransform:'uppercase'}}>Enter or Paste Values <span style={{fontWeight:400,color:'rgba(255,255,255,0.2)'}}>(?)</span></div>
                <div style={{border:'1px solid rgba(255,255,255,0.08)',borderRadius:4,padding:'8px 10px',fontSize:9,color:'rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.02)',minHeight:40,marginBottom:4}}>Manually enter or paste values here</div>
                <div style={{fontSize:8,color:'rgba(255,255,255,0.2)',marginBottom:12}}>Separate multiple values using commas, semicolons, or new lines.</div>
                {/* Footer */}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:4,padding:'4px 12px',fontSize:9,color:'rgba(255,255,255,0.4)'}}>Cancel</div>
                  <div style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:4,padding:'4px 14px',fontSize:9,color:'white',fontWeight:600}}>Next →</div>
                </div>
              </div>
            </div>
          </ImgFrame>
        </div>

        {/* The pivot, as one decisive narrative */}
        <div style={{padding:'28px 0',borderTop:`1px solid ${borderLight}`}}>
          <p style={{fontSize:14,lineHeight:1.8,color:deepBlue,margin:0,maxWidth:780}}>The List Manager was the strongest concept to come out of the HMW sprint: define a named value set once  -  blacklisted securities, licensed reps  -  and every rule referencing it stays current. But during the sprint I identified a hard constraint: the existing data architecture couldn't store list-level entities separate from rules, and the infrastructure work to support them wasn't resourced for this cycle. I pushed hard to understand exactly where the wall was, and once I confirmed the constraint was real, I stopped designing around it and started designing within it. A rule could still store its own value set  -  just not as a reusable, named list  -  so I redirected the design toward making the in-rule input experience dramatically better: structured input with bulk upload via CSV, paste, or manual entry, plus real-time validation. No more comma-separated text box. No more filename-matching ritual. It's not the List Manager, but it solves the most acute version of the problem and lays the foundation for when full list management becomes feasible.</p>
        </div>
      </div>
    </section>

    {/* LOFI EXPLORATION */}
    <section id="ch-lofi" style={sec('transparent')}>
      <div style={ct}>
        <StepLabel>Lofi Exploration</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>Mapping the End-to-End Workflow</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:720,marginBottom:48}}>With the direction set, I mapped the full workflow in low fidelity  -  how screens connect, where users enter and exit, and the overall shape of the experience before sweating any details. These wireframes anchored a cross-functional review with engineering and product, aligning us on feasibility and edge cases before zooming in.</p>
        <LofiFlow/>
      </div>
    </section>


    <section id="ch-design" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) 0`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Design</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>The Redesign</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:20}}>With the structure validated in lofi and cross-functional alignment in place, I refined the wireframes into a mid-high fidelity prototype  -  two interconnected workflows designed as a coherent system:</p>
        <ul style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:640,marginBottom:32,paddingLeft:20,display:'flex',flexDirection:'column',gap:6}}>
          <li><strong>Rules list</strong>  -  find, scan, and understand rules with real search and plain-language previews</li>
          <li><strong>Rule creation</strong>  -  a guided stepped flow replacing the blank, expert-only form</li>
          <li>Plain-language logic introduced in the list carries directly into creation  -  familiarity built intentionally</li>
        </ul>
        <p style={{fontSize:14,lineHeight:1.7,color:deepBlue,opacity:0.75,maxWidth:640,marginBottom:40}}>Explore both end to end in the prototype, or read the breakdown below.</p>

        <div style={{marginBottom:64}}>
          <PrototypeEmbed/>
        </div>

        {/* Divider */}
        <div style={{width:'100%',height:1,background:'rgba(184,103,87,0.12)',marginBottom:64}}/>

        {/* Part A  -  Rules List */}
        <div style={{marginBottom:64}}>
          <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:8}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:accent}}>Part A</span>
            <h3 style={{fontFamily:'var(--f-serif)',fontSize:22,fontWeight:400,color:accentDark,letterSpacing:'-0.2px',margin:0}}>Rules List</h3>
          </div>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:32}}>The legacy rules list had one job  -  display all rules  -  and did so, but without any ability to navigate, filter, or understand. The redesign turned a static table into a usable decision-making surface  -  with filtering, persistent rule detail, and plain-language logic all accessible from one view.</p>
          <BeforeAfterWipe/>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[{num:'01',title:'Two-panel layout with plain-language rule logic',body:'A rules list alongside a persistent right detail panel  -  showing rule logic rendered as human-readable sentences, not raw conditional strings. Status, applies-to scope, and a timeline summary are all visible without ever leaving the list. Compliance officers can field trader calls without digging through opaque syntax.'},{num:'02',title:'Find the right rule fast  -  filtering and inline preview',body:'Real search across rule names and metadata, combined with active/inactive status filtering and keyword filtering, replaced the old Ctrl+F workflow. Selecting any rule instantly surfaces its full logic in the detail panel  -  no navigation required, no losing your place in the list.'},{num:'03',title:'Rule details and quick actions, without leaving the list',body:"The detail panel surfaces everything you'd otherwise have to dig for  -  rule logic, applies-to scope, and modification history  -  alongside a Quick Edit shortcut and a direct link to full change history. No more navigating into a rule just to check a value or make a small correction."}].map(d=>(<div key={d.num} style={{display:'flex',gap:28,padding:'28px 0',borderTop:`1px solid ${borderLight}`}}><div style={{fontSize:32,fontWeight:800,color:accentDark,lineHeight:1,flexShrink:0,width:40}}>{d.num}</div><div><div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8}}>{d.title}</div><p style={{fontSize:13,lineHeight:1.65,color:deepBlue}}>{d.body}</p></div></div>))}
          </div>
        </div>

        {/* Divider */}
        <div style={{width:'100%',height:1,background:'rgba(184,103,87,0.12)',marginBottom:64}}/>

        {/* Part B  -  Rule Creation */}
        <div>
          <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:8}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:accent}}>Part B</span>
            <h3 style={{fontFamily:'var(--f-serif)',fontSize:22,fontWeight:400,color:accentDark,letterSpacing:'-0.2px',margin:0}}>Rule Creation</h3>
          </div>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:40}}>The legacy creation experience assumed expert knowledge. The redesign built that knowledge into the flow  -  replacing a blank form with a guided workflow. Core structural shift: from a single overwhelming page to a stepped flow.</p>
          <PartBFeatureTabs
            tabs={[
              {
                num:'01',
                title:'Search, preview, and select clauses',
                body:"The Add Clauses modal became a three-column layout: searchable clause list on the left, a preview panel in the center showing each clause's name, value type, and examples, and a selected clauses summary on the right. Users can preview a clause before committing  -  eliminating the trial-and-error loop.",
                afterVid:"/design-vid-b1.mov",
                beforeVid:"/legacy-vid-b1a.mov",
              },
              {
                num:'02',
                title:'Structured value input with inline validation',
                body:'The single free-text box for thousands of comma-separated values was replaced with a two-step flow: upload a CSV or paste values, then review the imported list row by row with inline editing and per-row removal. Users know before saving whether their values are correctly formed.',
                afterVid:"/design-vid-b2.mov",
                beforeVid:"/legacy-vid-b2.mov",
              },
              {
                num:'03',
                title:'Live plain-language rule preview throughout',
                body:'As users add clauses, the Rule Logic panel builds up a plain-English summary in real time  -  keyword, operator, and values rendered as a readable sentence. By the time they reach Review & Confirm, the full rule is visible in human-readable form, giving confidence before going live.',
                afterVid:"/design-vid-b3.mov",
                beforeImg:"/legacy-rule-creation.png",
              },
            ]}
          />
        </div>

      </div>
    </section>

    <section id="ch-validate" style={sec('transparent')}>
      <div style={ct}>
        <StepLabel>Validate</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>What Changed After Testing</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:40}}>With the mid-high fidelity prototype in hand, I brought it to user testing sessions with compliance officers. Each workflow step was mapped to a specific research question, with areas of highest uncertainty  -  clause selection, value input, and the add list flow  -  as the focus. Here's what I heard, and what changed as a result. You can also <a href="/rule-management-prototype-v2-updated.html" target="_blank" rel="noreferrer" style={{color:terracotta,fontWeight:600,textDecoration:'underline',textUnderlineOffset:3}}>explore the updated v2 prototype</a> with all post-testing changes applied.</p>
        {/* What worked well  -  compact */}
        <div style={{marginBottom:48}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:16,color:accent}}>What worked well</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {["Plain language rule preview that builds throughout the flow was a standout  -  users specifically called it out","General workflow described as intuitive, smooth, comfortable","Add Clause step: users liked the search, additional info, and flexibility of quick add vs. preview first"].map((item,i)=>(<div key={i} style={{fontSize:13,lineHeight:1.6,color:deepBlue,padding:'10px 14px',borderRadius:8,background:'rgba(184,103,87,0.07)',borderLeft:`3px solid ${accentMid}`}}>{item}</div>))}
          </div>
        </div>

        {/* What I iterated on  -  stacked cards with visuals + fullscreen overlay */}
        <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:24,color:terracotta}}>What I iterated on</div>
        <IterationCards/>
      </div>
    </section>

    {/* OUTCOMES */}
    <section id="ch-outcomes" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) 0`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Outcomes</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>From shipped to what's next</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:72}}>Both the rule management redesign and the rule creation workflow were user tested, iterated, and shipped. The work established patterns and groundwork for the next phase  -  edit rule, change history, and eventually the full List Manager.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:32}}>
          {[{title:'Guided creation over blank forms',body:'A guided workflow with clause preview replaced a single overwhelming page  -  reducing expert knowledge required to create a rule correctly.',icon:(<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#5a5a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="4" width="22" height="28" rx="2"/><path d="M13 12h12M13 17h9M13 22h6"/><circle cx="30" cy="30" r="8" fill="#ededee"/><circle cx="30" cy="30" r="6"/><path d="M30 27v1.5"/><circle cx="30" cy="31" r="0.1"/><path d="M30 32.5v0.5"/></svg>)},{title:'Findable, scannable rules list',body:'Real search, active/inactive filtering, keyword filtering, and plain-English rule preview replaced Ctrl+F and Excel workarounds.',icon:(<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#5a5a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="10"/><path d="M26 26l8 8"/><path d="M14 18h8M18 14v8"/></svg>)},{title:'Confidence before going live',body:'Live rule preview, inline value validation, and structured clause details give users assurance their rule will do what they intended.',icon:(<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#5a5a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="26" height="24" rx="2"/><path d="M6 13h26"/><path d="M15 20l3 3 6-6"/><circle cx="33" cy="30" r="8" fill="#ededee"/><circle cx="33" cy="30" r="6"/><path d="M33 27v4M33 33v1"/></svg>)}].map(card=>(<div key={card.title} style={{background:'white',border:'1px solid rgba(184,103,87,0.15)',borderRadius:12,padding:'28px 24px'}}><div style={{marginBottom:14}}>{card.icon}</div><div style={{fontSize:14,fontWeight:700,color:accentDark,marginBottom:8}}>{card.title}</div><p style={{fontSize:12,lineHeight:1.65,color:deepBlue}}>{card.body}</p></div>))}
        </div>
        <div style={{padding:32,background:accentLight,border:`1px solid ${accentMid}`,borderRadius:12}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:16}}>What's next  -  Phase 2</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
            {['Edit Rule flow  -  building on the creation patterns established in Phase 1','Rule Change History  -  surfacing the audit trail users currently track in Excel','List Manager  -  the most complex and most requested capability, now better scoped'].map(t=>(<div key={t} style={{padding:'14px 16px',background:'rgba(184,103,87,0.08)',borderRadius:8,fontSize:12,lineHeight:1.6,color:deepBlue}}>{t}</div>))}
          </div>
        </div>
      </div>
    </section>

    {/* REFLECTION */}
    <section id="ch-reflection" style={sec('transparent')}>
      <div style={ct}>
        <StepLabel>Reflection</StepLabel>
        <h2 style={{fontFamily:'var(--f-serif)',fontSize:'clamp(26px, 3.2vw, 38px)',fontWeight:300,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>What I carried forward</h2>
        <div style={{display:'flex',flexDirection:'column',gap:0}}>
          {[
            {
              label:'Measuring what shipped',
              body:'The usability signal was unusually strong  -  7 of 7 participants responded positively, which for this user group was genuinely surprising. But usability testing measures confidence before launch, not outcomes after. I still don\'t know if error rates dropped, if support tickets decreased, or if time-to-create-a-rule improved. That\'s the real gap: I didn\'t establish success metrics before launch, and it\'s something I now build into every project from the start  -  define the measurement plan during discovery, not after ship.'
            },
            {
              label:'Starting simple was the better strategy',
              body:'The List Manager was the concept we were most attached to—a powerful way to define lists once and reuse them across rules. But when we tested the simpler "add values within the rule" flow, compliance users were more excited by how much it reduced fragility with almost no extra learning curve. It made me more skeptical of big, system‑heavy ideas when a lighter, MVP solution solves the sharpest pain: start with the smallest thing that reduces risk and complexity, then earn your way to more ambitious patterns only if users actually need them.'
            },
            {
              label:'Designing patterns, not just screens',
              body:'The plain-language rule preview, the stepped creation flow, the structured value input  -  these weren\'t just solutions to individual problems. They became the interaction patterns that the rest of the compliance suite would build on. But I didn\'t make that explicit enough during the project. I should have documented the emerging pattern language more deliberately  -  creating shared artifacts that the broader team could reference as the product expanded. I\'ve learned that at a certain level of complexity, the system you leave behind matters as much as the feature you ship.'
            },
          ].map((item, i) => (
            <div key={item.label} style={{padding:'28px 0',borderTop:i===0?'none':`1px solid ${borderLight}`}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:10}}>{item.label}</div>
              <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,margin:0}}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Case study navigation */}
    <nav className="cs-case-nav" aria-label="Case study navigation">
      <a href="/case-study/order-management" className="cs-case-nav-item cs-case-nav-item--prev">
        <span className="cs-case-nav-dir">← Previous</span>
        <span className="cs-case-nav-title">Addition Through Subtraction</span>
      </a>
      <a href="/case-study/positions" className="cs-case-nav-item cs-case-nav-item--next">
        <span className="cs-case-nav-dir">Next →</span>
        <span className="cs-case-nav-title">Well-Positioned</span>
      </a>
    </nav>

    <footer style={{padding:`40px 0`,display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${borderLight}`,background:'transparent',maxWidth:contentW,margin:'0 auto',paddingLeft:sideP,paddingRight:sideP}}>
      <div style={{fontSize:13,fontWeight:700,color:accentDark}}>kristin<span style={{color:accent}}>.garza</span> · UX Designer</div>
      <div style={{display:'flex',gap:28}}>
        {[['LinkedIn','https://www.linkedin.com/in/kristin-garza'],['Email','mailto:kmkerney221@gmail.com'],['Resume','/resume.pdf']].map(([label,href])=>(<a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" style={{fontSize:13,fontWeight:500,color:accentDark,opacity:0.75,textDecoration:'none'}}>{label}</a>))}
      </div>
    </footer>

    </div>
    {/* End ambient gradient wrapper */}
  </div>)
}
