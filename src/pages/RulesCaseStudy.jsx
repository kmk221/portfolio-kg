import { useState, useEffect, useRef } from 'react'
import Nav from '../components/Nav.jsx'
import './case-study-shared.css'

const accent='#5F7A9A',accentDark='#2C3B55',accentMid='rgba(196,207,223,0.5)',accentLight='rgba(196,207,223,0.28)',accentPale='#E6ECF2',textLight='#edeef0',warmGray='#372B0B',deepBlue='#2C3B55',cream='#F6F6F1',pageBg='#FFFFFC',borderLight='rgba(196,207,223,0.3)',terracotta='#B86757'
const sideP='clamp(20px, 5vw, 80px)',contentW='1200px'
const sec=(bg)=>({width:'100%',padding:`clamp(60px, 10vw, 140px) ${sideP}`,background:bg})
const ct={maxWidth:contentW,width:'100%',margin:'0 auto'}

// Chapter list for the sticky scrollspy rail. Each `id` matches a section's
// id below; matching the OM pattern this case study has 11 chapters mapped
// to the 7-step process plus tl;dr / framing / outcomes / reflection.
const CHAPTERS = [
  { id: 'ch-tldr',           label: 'tl;dr' },
  { id: 'ch-framing',        label: 'Framing' },
  { id: 'ch-discovery',      label: 'Discovery' },
  { id: 'ch-design-sprint',  label: 'Design Sprint' },
  { id: 'ch-prioritization', label: 'Prioritization' },
  { id: 'ch-lofi',           label: 'Lofi' },
  { id: 'ch-closer-look',    label: 'A Closer Look' },
  { id: 'ch-design',         label: 'Design' },
  { id: 'ch-validate',       label: 'Validate' },
  { id: 'ch-outcomes',       label: 'Outcomes' },
  { id: 'ch-reflection',     label: 'Reflection' },
]

function StepLabel({children,light}){
  // Reads styling from .cs-page .step-label in case-study-shared.css so OM,
  // Rules, and Positions all share one rule. The trailing rule line is
  // produced by the CSS ::after, not a span here.
  return <div className={light ? 'step-label light' : 'step-label'}>{children}</div>
}

function Callout({icon,title,body,style:s}){
  return <div style={{marginTop:64,padding:'28px 36px',background:accentLight,border:'1px solid rgba(125,145,165,0.2)',borderRadius:12,display:'flex',gap:16,alignItems:'flex-start',...s}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>{icon}</span><div><p style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:accentDark,marginBottom:6}}>{title}</p><p style={{fontSize:14,lineHeight:1.65,color:accentDark}}>{body}</p></div></div>
}

function ImgFrame({label,children,stretch}){
  return <div style={stretch?{display:'flex',flexDirection:'column',height:'100%'}:{}}><p style={{fontSize:11,fontWeight:600,color:deepBlue,letterSpacing:'0.03em',marginBottom:12,opacity:0.75,textTransform:'uppercase'}}>{label}</p><div style={stretch?{flex:1,display:'flex',flexDirection:'column'}:{}}>{children}</div></div>
}

function Placeholder({h=200,label,warm}){
  return <div style={{background:warm?'linear-gradient(135deg,#f5f0eb,#ede8e3)':'linear-gradient(135deg,#ededee,#dde1e5)',border:`1px solid ${warm?'rgba(177,124,93,0.2)':'rgba(125,145,165,0.2)'}`,borderRadius:10,height:h,display:'flex',alignItems:'center',justifyContent:'center',color:warm?terracotta:accent,fontSize:12,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',textAlign:'center',padding:'0 20px'}}>{label}</div>
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
      style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.8)',color:'#1a1a1a',border:'1px solid rgba(255,255,255,0.55)',height:44,minWidth:44,padding:'0 18px 0 14px',borderRadius:999,fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',cursor:'pointer',boxShadow:'0 6px 24px rgba(55,43,11,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',fontFamily:'inherit',flexShrink:0}}
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
    {/* Fullscreen lightbox — dark bg, floating cards */}
    {open&&(
      <div onClick={()=>setOpen(false)} id="lofi-lightbox" style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(212, 221, 231, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',justifyContent:'center',padding:'88px 0 40px'}}>
        <style>{`
          #lofi-lightbox-scroll::-webkit-scrollbar{height:6px}
          #lofi-lightbox-scroll::-webkit-scrollbar-track{background:transparent}
          #lofi-lightbox-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:100px}
          #lofi-lightbox-scroll::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.28)}
          #lofi-lightbox-scroll{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.15) transparent}
        `}</style>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 28px',flexShrink:0}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(44, 59, 85, 0.55)'}}>Lofi Wireframe Flow</span>
          <FullscreenCloseBtn onClose={()=>setOpen(false)}/>
        </div>
        <div id="lofi-lightbox-scroll" onClick={e=>e.stopPropagation()} style={{overflowX:'auto',padding:'0 48px 16px',flex:1,display:'flex',alignItems:'center'}}>
          <div style={{transform:'scale(3.2)',transformOrigin:'center left',padding:'0 0 0 40px',minWidth:'max-content'}}>
            <LofiFlowStrip/>
          </div>
        </div>
        <div style={{textAlign:'center',fontSize:11,color:'rgba(44, 59, 85, 0.4)',letterSpacing:'0.06em',flexShrink:0}}>Scroll to explore · Press Esc to close</div>
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
  const arrow=<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,width:24,height:cardH}}><svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 6h12m0 0l-3.5-3.5m3.5 3.5l-3.5 3.5" stroke="rgba(125,145,165,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  const lbl=(text)=>(<div style={{fontSize:7,fontWeight:600,color:deepBlue,textAlign:'center',marginTop:6,letterSpacing:'0.02em',opacity:0.65}}>{text}</div>)
  const sh={fontSize:3.5,fontWeight:700,color:'rgba(0,0,0,0.45)',marginBottom:2}

  return(
    <div>
      <div style={{display:'inline-flex',alignItems:'flex-start',gap:0}}>

        {/* 1 — Rule Management */}
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

        {/* 2 — Keywords */}
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

        {/* 3 — Rule Logic */}
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

        {/* 4 — Order Placed By */}
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

        {/* 5 — Rule Outcome */}
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

        {/* 6 — Review & Confirm */}
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
  {id:1,label:'Cluster 01',title:'Rules list lacks searchability',stickies:[{c:'g',t:"inactive rules take up space — nice to filter off ones you don't need"},{c:'o',t:'finding rule use ctrl + F — use separate Excel to track changes'},{c:'p',t:'search on rules list could be better — do ctrl+F for rules with a criteria'},{c:'y',t:'smart search for keywords — on metadata like a book catalog'}]},
  {id:2,label:'Cluster 02',title:'Keyword selection is opaque and error-prone',stickies:[{c:'g',t:'would be helpful to have keyword definition info where you are selecting it'},{c:'y',t:'only know what keyword means by trial and error — select and click next'},{c:'b',t:'cumbersome to figure out what keywords apply — call NFS, trial and error'},{c:'y',t:'today email CSM to ask what a keyword does if not familiar with it'}]},
  {id:3,label:'Cluster 03',title:'Difficult to build a rule without tribal knowledge',stickies:[{c:'g',t:'linear box for long entries — not easy to enter or jump to end of 60 entries'},{c:'b',t:'hard to know where to find help — not intuitive to click the question mark'},{c:'y',t:'formatting long list of symbols to put in the system'},{c:'y',t:'took a couple years to really understand who this would impact'}]},
  {id:4,label:'Cluster 04',title:'Insufficient documentation and audit tracking',span2:true,stickies:[{c:'o',t:'rule creation free form — put the list into Excel and concatenate'},{c:'y',t:'list of rules — have to go into each rule, copy to Excel to search'},{c:'o',t:'track in SharePoint — reason for creating the rule, rationale when trader calls'},{c:'b',t:'rules change log would be helpful — in platform, not a separate Excel'},{c:'g',t:'hard to see what changed — which column to look at'},{c:'o',t:'jumping back and forth — lose my place, creates room for error'},{c:'g',t:'free form personal notes — tracking why rule was created, changed'},{c:'b',t:'ask for a reason when someone makes a change — optional or required'}]},
  {id:5,label:'Cluster 05',title:'Help content not accessible',stickies:[{c:'g',t:'never seen help content — too far away'},{c:'p',t:'apply to managed acct advisor and super trader — not super descriptive'},{c:'b',t:"doesn't know help content exists — didn't know that was here, that's cool"},{c:'y',t:'hover to see keyword meaning would be too much — needs a dedicated button'}]},
  {id:6,label:'Cluster 06',title:'Triggered rules lack visibility',span2:true,stickies:[{c:'b',tall:true,t:'no plain-language explanation of why a rule blocked a trade — just the rule name'},{c:'b',tall:true,t:'rule conditions may have changed since it triggered — no way to know without digging'},{c:'o',t:'no paper trail connecting a triggered rule to what the conditions were at that moment'},{c:'g',t:'compliance user has to manually reconstruct what happened when a trader calls'},{c:'y',t:'rule name alone is not enough context — need to see what criteria matched'}]},
]

function PrototypeEmbed(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  return(<>
    <button onClick={()=>setOpen(true)} className="cs-cta-primary" style={{display:'inline-flex',alignItems:'center',gap:10,fontSize:13,fontWeight:600,padding:'10px 22px',letterSpacing:'0.2px'}}>
      <span style={{width:18,height:18,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9}}>▶</span>
      Meet the redesign
    </button>
    {open&&(
      <div style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(212, 221, 231, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',paddingTop:80}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',background:'rgba(255,255,255,0.6)',borderBottom:'1px solid rgba(125,145,165,0.25)',flexShrink:0}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accentDark}}>Interactive Prototype — Rule Management Redesign</div>
            <div style={{fontSize:10,color:'rgba(44, 59, 85, 0.5)',fontStyle:'italic',marginTop:2}}>Press Esc or click × to close</div>
          </div>
          <FullscreenCloseBtn onClose={()=>setOpen(false)}/>
        </div>
        <iframe src="/rule-management-prototype-v1.html" style={{flex:1,width:'100%',border:'none'}} title="Rule Management Prototype — V1"/>
      </div>
    )}
  </>)
}

function AffinityMap(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{const h=(e)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open])
  return(<>
    <div onClick={()=>setOpen(true)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setOpen(true)} style={{background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(212, 221, 231, 0.55)',borderRadius:20,padding:'28px 28px 22px',cursor:'pointer',boxShadow:'0 4px 24px rgba(44,59,85,0.08)',border:'1px solid rgba(125,145,165,0.22)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accentDark}}>FigJam — Synthesis Board</span>
        <span style={{fontSize:11,fontWeight:600,color:accentDark,background:'rgba(255,255,255,0.55)',border:'1px solid rgba(125,145,165,0.3)',borderRadius:20,padding:'5px 14px'}}>⛶ Explore board</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
        {thumbClusters.map(cl=>(
          <div key={cl.id} style={{gridColumn:cl.span2?'span 2':undefined,background:'rgba(255,255,255,0.5)',border:'1px solid rgba(125,145,165,0.25)',borderRadius:10,padding:12}}>
            <div style={{fontSize:8.5,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.3}}>{cl.title}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{cl.blobs.map(([c,w],i)=><div key={i} style={{height:18,width:w,borderRadius:3,background:blobColors[c],opacity:0.85}}/>)}</div>
          </div>
        ))}
      </div>
    </div>
    {open&&(
      <div style={{position:'fixed',inset:0,zIndex:9000,background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 28px 28px, rgba(212, 221, 231, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',paddingTop:24}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 28px',background:'rgba(255,255,255,0.5)',borderBottom:'1px solid rgba(125,145,165,0.25)',flexShrink:0}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:accentDark}}>Synthesis Board — FigJam</div>
            <div style={{fontSize:10,color:'rgba(44, 59, 85, 0.55)',fontStyle:'italic',marginTop:3}}>Simplified for portfolio — representative stickies shown, not all verbatims included</div>
          </div>
          <FullscreenCloseBtn onClose={()=>setOpen(false)}/>
        </div>
        <div style={{flex:1,overflowX:'auto',overflowY:'hidden',padding:'32px 40px 24px'}}>
          <div style={{display:'flex',flexDirection:'row',gap:16,alignItems:'flex-start',minWidth:'max-content'}}>
            {fullClusters.map(cl=>(
              <div key={cl.id} style={{width:cl.span2?520:320,flexShrink:0,background:'rgba(255,255,255,0.45)',border:'1px solid rgba(125,145,165,0.25)',borderRadius:14,padding:'18px 16px 16px'}}>
                <div style={{paddingBottom:12,borderBottom:'1px solid rgba(125,145,165,0.2)',marginBottom:10}}>
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

// Shared dark mockup frame wrapper
const MockFrame = ({label, children}) => (
  <div style={{background:'#252d3d',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
    <div style={{background:'#1d2433',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
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
       <span style={{fontSize:10,fontWeight:600,padding:'2px 10px',borderRadius:20,background:'rgba(155,165,175,0.2)',border:'1px solid rgba(155,165,175,0.5)',color:'rgba(155,165,175,0.9)'}}>Active</span>
       <span style={{fontSize:10,padding:'2px 10px',borderRadius:20,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.45)'}}>All channels</span>
     </div>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1px 180px',gap:'0 0',alignItems:'stretch'}}>
       <div style={{paddingRight:12}}>
         <div style={{display:'grid',gridTemplateColumns:'1fr 60px',gap:'0 8px',borderBottom:'1px solid rgba(255,255,255,0.08)',paddingBottom:5,marginBottom:6}}>
           {['RULE NAME','STATUS'].map(h=><span key={h} style={{fontSize:8,fontWeight:700,letterSpacing:'0.08em',color:'rgba(255,255,255,0.25)'}}>{h}</span>)}
         </div>
         <div style={{display:'grid',gridTemplateColumns:'1fr 60px',gap:'0 8px',alignItems:'center',padding:'7px 8px',background:'rgba(155,165,175,0.1)',borderRadius:4,borderLeft:'2px solid rgba(155,165,175,0.6)',marginBottom:4}}>
           <span style={{fontSize:11,color:'rgba(255,255,255,0.9)',fontWeight:600}}>Review high dollar tech stock</span>
           <span style={{fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:10,background:'rgba(155,165,175,0.2)',color:'rgba(155,165,175,0.9)',textAlign:'center'}}>Active</span>
         </div>
         {[['Crypto ETF Blacklist','Active'],['Rep Account Monitor','Inactive']].map(([n,s],i)=>(
           <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 60px',gap:'0 8px',alignItems:'center',padding:'6px 8px',borderRadius:4,marginBottom:3,background:'rgba(255,255,255,0.03)'}}>
             <span style={{fontSize:10,color:'rgba(89,80,74,0.5)'}}>{n}</span>
             <span style={{fontSize:9,padding:'1px 6px',borderRadius:10,background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.3)',textAlign:'center'}}>{s}</span>
           </div>
         ))}
         <div style={{marginTop:8,fontSize:10,fontStyle:'italic',color:'rgba(155,165,175,0.6)'}}>1 result for "AAP"</div>
       </div>
       <div style={{background:'rgba(255,255,255,0.08)',margin:'0 0'}}/>
       <div style={{paddingLeft:12}}>
         <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.08em',color:'rgba(255,255,255,0.25)',marginBottom:8,textTransform:'uppercase'}}>Rule Logic</div>
         {[
           {text:<>If Security = <span style={{background:'rgba(155,165,175,0.3)',color:'rgba(155,165,175,1)',fontWeight:700,padding:'0 2px 0 3px',borderRadius:2}}>AAP</span>L, AMZN…</>,bg:'rgba(106,129,178,0.15)',bl:'rgba(180,200,255,0.5)',tc:'rgba(220,230,255,0.9)'},
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
          <button key={i} onClick={()=>setTab(i)} style={{padding:'6px 14px',fontSize:10,fontWeight:i===tab?700:600,cursor:'pointer',borderRadius:6,background:i===tab?accentDark:'transparent',border:`1px solid ${i===tab?accentDark:'rgba(125,145,165,0.35)'}`,color:i===tab?'#fff':'rgba(89,80,74,0.6)',transition:'all 0.15s',fontFamily:'Inter,sans-serif',boxShadow:i===tab?'0 2px 6px rgba(44,59,85,0.15)':'none'}}>
            {label}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}

const sBg4={g:'#8a9aaa',y:'#f5c842',b:'#5bb8e8',o:'#f07a5a'}
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
        <div style={{background:'#252d3d',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#1d2433',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Keyword selector':'Keyword assistant'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:0}}>
                <div style={{borderRight:'1px solid rgba(255,255,255,0.08)',paddingRight:10}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.25)',marginBottom:10,textTransform:'uppercase'}}>Keywords</div>
                  {[80,55,70,null,40,65,50,80,45].map((w,i)=>w===null
                    ?<div key={i} style={{height:32,background:'rgba(155,165,175,0.12)',borderLeft:'2px solid rgba(155,165,175,0.7)',paddingLeft:8,display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:3,borderRadius:'0 4px 4px 0'}}><span style={{fontSize:11,color:'rgba(155,165,175,0.9)',fontWeight:600}}>Security Type</span><span style={{fontSize:10,color:'rgba(155,165,175,0.6)'}}>›</span></div>
                    :<div key={i} style={{height:8,background:'rgba(255,255,255,0.1)',borderRadius:2,marginBottom:8,width:`${w}%`}}/>
                  )}
                </div>
                <div style={{paddingLeft:12}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(155,165,175,0.7)',marginBottom:6,textTransform:'uppercase'}}>Keyword Detail</div>
                  <div style={{fontSize:14,fontWeight:700,color:'rgba(255,255,255,0.9)',marginBottom:8,lineHeight:1.2}}>Security Type</div>
                  <div style={{fontSize:10,color:'rgba(89,80,74,0.5)',lineHeight:1.55,marginBottom:10}}>Filters orders based on the type of security being traded.</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',marginBottom:4}}>Accepted values</div>
                  <div style={{fontSize:10,color:'rgba(155,165,175,0.8)',lineHeight:1.6,marginBottom:12}}>Equity, Fixed Income, ETF, Mutual Fund…</div>
                  <div style={{background:'rgba(155,165,175,0.15)',border:'1px solid rgba(155,165,175,0.35)',borderRadius:5,padding:'7px 12px',textAlign:'center',fontSize:11,fontWeight:600,color:'rgba(155,165,175,0.9)'}}>+ Add to rule</div>
                </div>
              </div>
              <div style={{...annStyle,marginTop:10}}><span style={annArr}>↑</span><span style={annTxt}>click keyword to preview details before adding</span></div>
            </>):(<>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:8}}>
                <div style={{background:'rgba(66,125,219,0.25)',borderRadius:'10px 10px 10px 2px',padding:'8px 10px',maxWidth:'90%'}}><div style={{fontSize:10,color:'rgba(255,255,255,0.8)',lineHeight:1.5}}>Hi! Describe the rule you're trying to build and I'll suggest the right keywords.</div></div>
                <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'10px 10px 2px 10px',padding:'8px 10px',marginLeft:'auto',maxWidth:'85%'}}><div style={{fontSize:10,color:'rgba(255,255,255,0.75)',lineHeight:1.5}}>I want to restrict trades on specific stocks for certain account types</div></div>
                <div style={{background:'rgba(66,125,219,0.25)',borderRadius:'10px 10px 10px 2px',padding:'8px 10px',maxWidth:'95%'}}>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.8)',marginBottom:6}}>Try these keywords:</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:5}}>{['Security Type','Account Class','CUSIP / Symbol'].map(k=><span key={k} style={{fontSize:9,fontWeight:600,padding:'3px 8px',borderRadius:10,background:'rgba(155,165,175,0.2)',border:'1px solid rgba(155,165,175,0.4)',color:'rgba(155,165,175,0.9)'}}>{k}</span>)}</div>
                </div>
                <div style={{background:'rgba(125,145,165,0.2)',borderRadius:'10px 10px 10px 2px',padding:'7px 10px',maxWidth:'95%'}}><div style={{fontSize:10,color:'rgba(255,255,255,0.6)'}}>Still stuck? <span style={{color:'rgba(155,165,175,0.8)',textDecoration:'underline'}}>Send transcript to support →</span></div></div>
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <div style={{flex:1,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,padding:'6px 10px',fontSize:10,color:'rgba(255,255,255,0.25)',fontStyle:'italic'}}>Ask about a keyword…</div>
                <div style={{width:28,height:28,borderRadius:6,background:'rgba(155,165,175,0.3)',border:'1px solid rgba(155,165,175,0.5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'rgba(155,165,175,0.9)',flexShrink:0}}>↑</div>
              </div>
              <div style={{...annStyle,marginTop:8}}><span style={annArr}>↑</span><span style={annTxt}>available on landing page + within create rule flow</span></div>
            </>)}
          </div>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:12}}>Sketch ideas</div>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
            {stickies[tab].map((s,i)=>(
              <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderTop:i===0?'none':'1px solid rgba(125,145,165,0.18)'}}>
                <span aria-hidden="true" style={{flexShrink:0,marginTop:6,width:6,height:6,borderRadius:'50%',background:accent}}/>
                <span style={{fontSize:13,lineHeight:1.55,color:deepBlue,fontWeight:500}}>{s.t}</span>
              </li>
            ))}
          </ul>
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
        <div style={{background:'#252d3d',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#1d2433',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Help icon in-page':'Step-by-step instructions per clause'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.85)'}}>Add clause — Rule Logic</span>
                <div style={{width:26,height:26,borderRadius:'50%',background:'rgba(155,165,175,0.2)',border:'1px solid rgba(155,165,175,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'rgba(155,165,175,0.9)',fontWeight:700,flexShrink:0}}>?</div>
              </div>
              <div style={{background:'rgba(125,145,165,0.15)',border:'1px solid rgba(155,165,175,0.25)',borderRadius:6,padding:'10px 12px',marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.85)',marginBottom:5}}>Keyword help</div>
                <div style={{fontSize:10,color:'rgba(89,80,74,0.5)',lineHeight:1.55,marginBottom:8}}>Each clause filters orders by a specific condition. Select a keyword to see accepted values.</div>
                <div style={{fontSize:10,color:'rgba(155,165,175,0.8)',textDecoration:'underline'}}>View full keyword guide →</div>
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
                <div style={{flex:1,padding:'7px 12px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,textAlign:'center',fontSize:11,color:'rgba(89,80,74,0.5)'}}>Cancel</div>
                <div style={{flex:1,padding:'7px 12px',background:'rgba(155,165,175,0.2)',border:'1px solid rgba(155,165,175,0.4)',borderRadius:5,textAlign:'center',fontSize:11,fontWeight:600,color:'rgba(155,165,175,0.9)'}}>Add clause</div>
              </div>
              <div style={{...annStyle,marginTop:10}}><span style={annArr}>↑</span><span style={annTxt}>help icon links directly to keyword + rule help content</span></div>
            </>):(<>
              <div style={{display:'flex',gap:4,marginBottom:12}}>{[1,1,1,0,0].map((f,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:f?'rgba(155,165,175,0.7)':'rgba(255,255,255,0.12)'}}/>)}</div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.1em',color:'rgba(155,165,175,0.7)',marginBottom:6,textTransform:'uppercase'}}>Step 3 of 5 — Rule Logic</div>
              <div style={{fontSize:15,fontWeight:600,color:'rgba(255,255,255,0.9)',marginBottom:12,lineHeight:1.3}}>Define your rule conditions</div>
              <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderLeft:'3px solid rgba(155,165,175,0.5)',borderRadius:5,padding:'10px 12px',marginBottom:16}}>
                <div style={{fontSize:10,color:'rgba(89,80,74,0.5)',lineHeight:1.6}}>Each clause narrows which orders this rule applies to. Select a keyword, choose an operator, then enter the values to match against.</div>
              </div>
              <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:5,padding:'8px 12px',marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>If</span>
                <div style={{height:5,background:'rgba(255,255,255,0.15)',borderRadius:2,flex:1}}/>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>is</span>
                <div style={{height:5,background:'rgba(255,255,255,0.12)',borderRadius:2,width:80}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{padding:'6px 14px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,fontSize:11,color:'rgba(89,80,74,0.5)'}}>← Back</div>
                <div style={{padding:'6px 14px',background:'rgba(155,165,175,0.2)',border:'1px solid rgba(155,165,175,0.4)',borderRadius:5,fontSize:11,fontWeight:600,color:'rgba(155,165,175,0.9)'}}>Next →</div>
              </div>
              <div style={{...annStyle,marginTop:10}}><span style={annArr}>↑</span><span style={annTxt}>instructions provided at each step of the create rule flow</span></div>
            </>)}
          </div>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:12}}>Sketch ideas</div>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
            {stickies[tab].map((s,i)=>(
              <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderTop:i===0?'none':'1px solid rgba(125,145,165,0.18)'}}>
                <span aria-hidden="true" style={{flexShrink:0,marginTop:6,width:6,height:6,borderRadius:'50%',background:accent}}/>
                <span style={{fontSize:13,lineHeight:1.55,color:deepBlue,fontWeight:500}}>{s.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CarouselShell>
  )
}





function HMW04Visual(){
  const [tab, setTab] = useState(0)
  const tabs=['Concept 1 — Rule builder','Concept 2 — List manager']
  const stickies = [
    [{c:'g',t:"Rule builder breaks down each clause into an intuitive step"},{c:'b',t:"More intuitive form controls to match input value types — e.g. bulk import vs. pasting a comma-separated list into a simple input box"},{c:'o',t:"Validate format on input — account numbers vs. security symbols have different formats"},{c:'y',t:"Decision tree / guided workflow — give users somewhere to start (not pictured)"}],
    [{c:'g',t:"Define a list once, reuse it across many rules"},{c:'b',t:"Edit list values in one place — all rules using it update automatically"},{c:'y',t:"Rule builder — better controls shown in Concept 1"}],
  ]
  return (
    <CarouselShell tabs={tabs} tab={tab} setTab={setTab}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div style={{background:'#252d3d',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#1d2433',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
            <span style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginLeft:6,fontStyle:'italic'}}>{tab===0?'Rule builder — better controls':'List manager'}</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            {tab===0 ? (<>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1px 1fr',gap:0,alignItems:'stretch'}}>
                <div style={{paddingRight:16}}>
                  <div style={{fontSize:8,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.25)',marginBottom:8,textTransform:'uppercase'}}>Rule Conditions</div>
                  <div style={{fontSize:10,fontStyle:'italic',color:'rgba(255,255,255,0.35)',marginBottom:10}}>Review orders where...</div>
                  <div style={{background:'rgba(155,165,175,0.12)',border:'1px solid rgba(155,165,175,0.35)',borderRadius:5,padding:'8px 10px',marginBottom:6}}>
                    <div style={{fontSize:10,lineHeight:1.5,color:'rgba(255,255,255,0.85)'}}>IF <span style={{color:'rgba(155,165,175,0.9)',fontWeight:700}}>CUSIP / Symbol / SEDOL</span> equals one of the following <span style={{color:'rgba(155,165,175,0.9)',fontWeight:700}}>2,806 values</span></div>
                  </div>
                  {[1,2].map(i=><div key={i} style={{height:32,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:5,marginBottom:6}}/>)}
                  <div style={{marginTop:8,display:'inline-flex',alignItems:'center',gap:6,padding:'6px 12px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,fontSize:10,color:'rgba(89,80,74,0.5)'}}>+ Add clause</div>
                </div>
                <div style={{background:'rgba(255,255,255,0.08)'}}/>
                <div style={{paddingLeft:16}}>
                  <div style={{fontSize:14,fontWeight:600,color:'rgba(155,165,175,0.9)',marginBottom:4}}>CUSIP / Symbol</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',marginBottom:10}}>Operator: <span style={{color:'rgba(89,80,74,0.5)'}}>equals one of</span></div>
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
                  <div style={{border:'1.5px dashed rgba(155,165,175,0.4)',borderRadius:5,padding:'10px 12px',background:'rgba(155,165,175,0.05)',textAlign:'center'}}>
                    <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.8)',marginBottom:3}}>↑ Upload CSV</div>
                    <div style={{fontSize:9,color:'rgba(255,255,255,0.4)',marginBottom:8}}>or paste values</div>
                    <div style={{display:'flex',gap:6,justifyContent:'center'}}>
                      <div style={{padding:'5px 10px',background:'rgba(155,165,175,0.2)',border:'1px solid rgba(155,165,175,0.4)',borderRadius:4,fontSize:10,fontWeight:600,color:'rgba(155,165,175,0.9)'}}>Add to List</div>
                      <div style={{padding:'5px 10px',border:'1px solid rgba(255,255,255,0.15)',borderRadius:4,fontSize:10,color:'rgba(255,255,255,0.4)'}}>Cancel</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={annStyle}><span style={annTxt}>input type matches the data — no more comma-separated guesswork</span><span style={annArr}>↑</span></div>
            </>) : (<>
              <div style={{fontSize:10,fontStyle:'italic',color:'rgba(255,255,255,0.35)',marginBottom:12}}>Saved lists — reusable across rules</div>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
                {[{name:'High-risk securities',items:'42 items',rules:'3 rules',color:'rgba(155,165,175,0.8)'},{name:'Exempt accounts',items:'18 items',rules:'1 rule',color:'rgba(106,129,178,0.8)'},{empty:true}].map((r,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8}}>
                    {r.empty?<><div style={{width:8,height:8,borderRadius:'50%',background:'rgba(255,255,255,0.15)',flexShrink:0}}/><div style={{height:5,background:'rgba(255,255,255,0.1)',borderRadius:2,width:140}}/></>:<>
                      <div style={{width:8,height:8,borderRadius:'50%',background:r.color,flexShrink:0}}/>
                      <span style={{fontSize:13,fontWeight:500,color:'rgba(255,255,255,0.85)',flex:1}}>{r.name}</span>
                      <span style={{fontSize:11,color:'rgba(255,255,255,0.35)',marginRight:8}}>{r.items}</span>
                      <span style={{fontSize:10,fontWeight:600,padding:'2px 10px',borderRadius:20,background:'rgba(155,165,175,0.12)',border:'1px solid rgba(155,165,175,0.3)',color:'rgba(155,165,175,0.8)'}}>{r.rules}</span>
                    </>}
                  </div>
                ))}
              </div>
              <div style={{fontSize:13,color:'rgba(155,165,175,0.6)',marginBottom:12}}>+ Create new list</div>
              <div style={annStyle}><span style={annArr}>↑</span><span style={annTxt}>define once, reuse across many rules</span></div>
            </>)}
          </div>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:12}}>Sketch ideas</div>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
            {stickies[tab].map((s,i)=>(
              <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderTop:i===0?'none':'1px solid rgba(125,145,165,0.18)'}}>
                <span aria-hidden="true" style={{flexShrink:0,marginTop:6,width:6,height:6,borderRadius:'50%',background:accent}}/>
                <span style={{fontSize:13,lineHeight:1.55,color:deepBlue,fontWeight:500}}>{s.t}</span>
              </li>
            ))}
          </ul>
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
    {label:'Modified',color:'rgba(155,165,175,0.9)',border:'rgba(155,165,175,0.45)',bg:'rgba(155,165,175,0.12)',dot:'#8a9aaa',name:'K.D.',detail:'Added 3 account values',time:'Today 9:41am'},
    {label:'Activated',color:'rgba(245,200,66,0.95)',border:'rgba(245,200,66,0.4)',bg:'rgba(245,200,66,0.1)',dot:'#c8a800',name:'S.R.',detail:'Rule set to active',time:'Mar 2, 2:15pm'},
    {label:'Created',color:'rgba(91,184,232,0.9)',border:'rgba(91,184,232,0.4)',bg:'rgba(91,184,232,0.1)',dot:'#5bb8e8',name:'K.D.',detail:'Rule created',time:'Feb 28, 10:00am'},
  ]
  return (
    <CarouselShell tabs={tabs} tab={tab} setTab={setTab}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24,alignItems:'start'}}>
        <div style={{background:'#252d3d',borderRadius:12,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',fontFamily:'Inter,sans-serif'}}>
          <div style={{background:'#1d2433',padding:'7px 12px',display:'flex',alignItems:'center',gap:5,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
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
        <div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:12}}>Sketch ideas</div>
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
            {stickies[tab].map((s,i)=>(
              <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderTop:i===0?'none':'1px solid rgba(125,145,165,0.18)'}}>
                <span aria-hidden="true" style={{flexShrink:0,marginTop:6,width:6,height:6,borderRadius:'50%',background:accent}}/>
                <span style={{fontSize:13,lineHeight:1.55,color:deepBlue,fontWeight:500}}>{s.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CarouselShell>
  )
}

function HMWExplorer(){
  const [active,setActive]=useState(1)
  const item=hmwItems.find(h=>h.id===active)
  return(
    <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:0,alignItems:'stretch'}}>
      {/* Left sidebar */}
      <div style={{borderRight:'1px solid rgba(125,145,165,0.2)',paddingRight:24}}>
        {hmwItems.map((h,i)=>(
          <button key={h.id} onClick={()=>setActive(h.id)} style={{display:'flex',flexDirection:'column',gap:4,width:'100%',background:'transparent',border:'none',padding:'14px 16px',cursor:'pointer',fontFamily:'Inter,sans-serif',textAlign:'left',borderRadius:10,marginBottom:4,transition:'all 0.2s',background:active===h.id?'rgba(125,145,165,0.2)':'transparent',borderLeft:active===h.id?`2px solid ${accent}`:'2px solid transparent'}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:active===h.id?accent:'rgba(44, 59, 85, 0.6)'}}>{h.pill}</span>
            <span style={{fontSize:12,fontWeight:active===h.id?700:500,color:active===h.id?warmGray:'rgba(44, 59, 85, 0.7)',lineHeight:1.35}}>{h.pillText}</span>
          </button>
        ))}
      </div>
      {/* Right content */}
      {item&&(
        <div style={{paddingLeft:32}}>
          <div style={{display:'grid',gridTemplateColumns:item.stickies.length===0?'1fr':'2fr 1fr',gap:24,alignItems:'start'}}>
            <div>{item.visual}</div>
            {item.stickies.length>0&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:12}}>Sketch ideas</div>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {item.stickies.map((s,i)=>(
                    <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderTop:i===0?'none':'1px solid rgba(125,145,165,0.18)'}}>
                      <span aria-hidden="true" style={{flexShrink:0,marginTop:6,width:6,height:6,borderRadius:'50%',background:accent}}/>
                      <span style={{fontSize:13,lineHeight:1.55,color:deepBlue,fontWeight:500}}>{s.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
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
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(212, 221, 231, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 40px 40px'}}>
      <div style={{position:'absolute',top:80,right:16,zIndex:2}} onClick={e=>e.stopPropagation()}>
        <FullscreenCloseBtn onClose={onClose}/>
      </div>
      <div onClick={e=>e.stopPropagation()} style={{position:'relative',maxWidth:'90vw',maxHeight:'85vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={src} style={{maxWidth:'100%',maxHeight:'85vh',borderRadius:10,boxShadow:'0 8px 60px rgba(44,59,85,0.18)',display:'block'}}/>
      </div>
      <div style={{position:'absolute',bottom:24,fontSize:11,color:'rgba(44, 59, 85, 0.5)',letterSpacing:'0.08em'}}>Press Esc or click outside to close</div>
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
            padding:'14px 24px',cursor:'pointer',fontFamily:'Inter,sans-serif',
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
              background:showBefore?accentLight:'rgba(202,213,226,0.15)',
              border:`1px solid ${showBefore?'rgba(66,125,219,0.35)':'rgba(202,213,226,0.4)'}`,
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

      {/* Video / image area — full width */}
      <div style={{position:'relative',borderRadius:12,overflow:'hidden',background:'#f7f8fa',border:`1px solid ${borderLight}`}}>
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
        <div style={{background:'#f7f8fa',display:'flex',alignItems:'center',justifyContent:'center',padding:24,position:'relative',minHeight:240}}>
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
              border:`1px solid ${showBefore?'rgba(66,125,219,0.35)':'rgba(202,213,226,0.4)'}`,
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
        background:showBefore?accentLight:'rgba(202,213,226,0.15)',
        border:`1px solid ${showBefore?'rgba(66,125,219,0.35)':'rgba(202,213,226,0.4)'}`,
        color:showBefore?accentDark:warmGray,
        transition:'all 0.2s',outline:'none',
      }}
    >
      <span style={{fontSize:12}}>⇄</span>
      {showBefore ? 'See redesign' : 'Compare to Legacy'}
    </button>
  )

  const imageBlock = (abs) => (
    <div style={{position:'relative',borderRadius:12,overflow:'hidden',border:'1px solid rgba(202,213,226,0.3)', ...(abs ? {maxWidth:'90vw',maxHeight:'85vh'} : {})}}>
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
          {showBefore ? 'Before — Legacy Rules List' : 'After — Redesigned Rule Management'}
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
        <div onClick={() => setExpanded(false)} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(212, 221, 231, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 40px 40px'}}>
          <div style={{position:'absolute',top:80,right:16,zIndex:2}} onClick={e=>e.stopPropagation()}>
            <FullscreenCloseBtn onClose={() => setExpanded(false)}/>
          </div>
          <div onClick={e => e.stopPropagation()} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,maxWidth:'90vw'}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accentDark}}>
                {showBefore ? 'Before — Legacy Rules List' : 'After — Redesigned Rule Management'}
              </div>
              {toggleBtn}
            </div>
            {imageBlock(true)}
          </div>
          <div style={{position:'absolute',bottom:24,fontSize:11,color:'rgba(44, 59, 85, 0.5)',letterSpacing:'0.08em'}}>Press Esc or click outside to close</div>
        </div>
      )}
    </div>
  )
}

/* ── Iteration cards with fullscreen overlay ── */
const iterationCards = [
  {
    id:1,
    feedback:'Clause preview felt editable — users tried to interact with the form fields in the preview panel. In v2, we removed the form representation entirely and replaced it with a read-only summary, making the distinction between preview and configuration unambiguous.',
    v1Label:'V1 — Form fields in preview',
    v2Label:'V2 — Read-only summary',
    v1:{type:'video',src:'/iter-1v1.mov'},
    v2:{type:'video',src:'/iter-1v2.mov'},
  },
  {
    id:2,
    feedback:'Bulk value entry surface was not intuitive — users were thrown off by the basic text input with "Add Value" and "Add List of Values" options side by side. There was no structure, no validation feedback, and no format guidance for file uploads.',
    changed:'Replaced the flat input with a structured values grid showing each entry with inline validation status. Added a dedicated "Upload a List" action with format guidance and a sample template.',
    v1Label:'V1 — Flat input with no structure',
    v2Label:'V2 — Structured values grid + upload',
    v1:{type:'video',src:'/iter-2v1.mov'},
    v2:{type:'video',src:'/iter-2v2.mov'},
  },
  {
    id:3,
    feedback:'Users wondered what would happen if an invalid value was added — a validation gap we hadn\'t fully considered. This led to the editable review grid with per-row validation icons and counts, so users can catch and fix errors before saving.',
    v1Label:'V1 — No inline validation',
    v2Label:'V2 — Inline validation per row',
    v1:{type:'video',src:'/iter-3v1.mov'},
    v2:{type:'video',src:'/iter-3v2.mov'},
  },
  {
    id:4,
    feedback:'Order Placed By step lacked the contextual definitions users loved on Order Outcome — an inconsistency they noticed immediately. V2 added role descriptions to match the pattern established elsewhere in the flow.',
    v1Label:'V1 — No role descriptions',
    v2Label:'V2 — Contextual role definitions added',
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
    return(<button onClick={(e)=>{e.stopPropagation();setIdx(i=>isLeft?i-1:i+1)}} disabled={disabled} style={{width:44,height:44,borderRadius:'50%',background:disabled?'rgba(255,255,255,0.35)':'rgba(255,255,255,0.65)',border:`1px solid ${disabled?'rgba(125,145,165,0.18)':'rgba(125,145,165,0.35)'}`,color:disabled?'rgba(44,59,85,0.25)':accentDark,fontSize:20,cursor:disabled?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>{isLeft?'‹':'›'}</button>)
  }
  const renderMedia=(item,abs)=>{
    const s={width:'100%',display:'block',borderRadius:8,...(abs?{maxHeight:'65vh',objectFit:'contain'}:{})}
    return item.type==='video'
      ?<video src={item.src} autoPlay loop muted playsInline style={s}/>
      :<img src={item.src} alt="" style={s}/>
  }
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(212, 221, 231, 0.92)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',display:'flex',flexDirection:'column',paddingTop:80}}>
      {/* Header */}
      <div onClick={e=>e.stopPropagation()} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 32px',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(44, 59, 85, 0.55)'}}>Iteration {idx+1} of {cards.length}</span>
          {/* v1/v2/both toggle */}
          <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.5)',border:'1px solid rgba(125,145,165,0.25)',borderRadius:20,padding:3}}>
            {['v1','both','v2'].map(v=>(
              <button key={v} onClick={()=>setVersion(v)} style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'4px 12px',borderRadius:16,border:'none',cursor:'pointer',transition:'all 0.2s',background:version===v?accentDark:'transparent',color:version===v?'#fff':'rgba(44, 59, 85, 0.6)'}}>{v==='both'?'Side by side':v.toUpperCase()}</button>
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
          <div style={{background:'rgba(255,255,255,0.55)',border:'1px solid rgba(125,145,165,0.2)',borderRadius:10,padding:'16px 24px',maxWidth:800,width:'100%'}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:terracotta,marginBottom:6}}>Feedback</div>
            <p style={{fontSize:13,lineHeight:1.7,color:accentDark,margin:0}}>{c.feedback}</p>
            {c.changed&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(44, 59, 85, 0.55)',marginTop:10,marginBottom:4}}>What changed</div><p style={{fontSize:12,lineHeight:1.6,color:deepBlue,margin:0}}>{c.changed}</p></>}
          </div>
          {/* Visuals */}
          <div style={{display:'grid',gridTemplateColumns:version==='both'?'1fr 1fr':'1fr',gap:16,width:'100%'}}>
            {(version==='v1'||version==='both')&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(44, 59, 85, 0.6)',marginBottom:8}}>{c.v1Label}</div>
                <div style={{borderRadius:8,overflow:'hidden',border:'1px solid rgba(125,145,165,0.25)'}}>{renderMedia(c.v1,true)}</div>
              </div>
            )}
            {(version==='v2'||version==='both')&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(44, 59, 85, 0.6)',marginBottom:8}}>{c.v2Label}</div>
                <div style={{borderRadius:8,overflow:'hidden',border:'1px solid rgba(125,145,165,0.25)'}}>{renderMedia(c.v2,true)}</div>
              </div>
            )}
          </div>
        </div>
        {navBtn('right')}
      </div>
      {/* Footer */}
      <div style={{textAlign:'center',fontSize:11,color:'rgba(255,255,255,0.2)',letterSpacing:'0.06em',padding:'16px 0',flexShrink:0}}>← → to navigate · Esc to close</div>
    </div>
  )
}

function IterationCards(){
  const [expandIdx,setExpandIdx]=useState(-1)
  const cardStyle={background:'#faf7f4',borderRadius:12,border:'1px solid rgba(177,124,93,0.15)',overflow:'hidden',cursor:'pointer',position:'relative'}
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

export default function RulesCaseStudy(){
  const chapterBarRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id)
  const [navVisible, setNavVisible] = useState(false)

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

  return(<div className="rules-cs-page cs-page rules-page" style={{fontFamily:'Inter,sans-serif',fontSize:16,lineHeight:1.5,color:accentDark,background:cream,overflowX:'hidden'}}>
    <Nav/>
    {/* Sticky chapter nav — left rail at ≥1440px viewport */}
    <aside
      className={`om-chapter-nav${navVisible ? ' is-visible' : ''}`}
      aria-label="Case study chapters"
    >
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
    {/* Floating word bar — mid-viewport fallback (768–1439px) */}
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

    {/* Home-style ambient radial-gradient wrapper — same 11-orb wash used on
        home and OM, cycling steel-blue → gold → terracotta down the full page. */}
    <div style={{
      background: `
        radial-gradient(1200px circle at 15% 2%, rgba(196, 207, 223, 0.42) 0%, transparent 35%),
        radial-gradient(1100px circle at 92% 8%, rgba(221, 179, 101, 0.34) 0%, transparent 32%),
        radial-gradient(1000px circle at 6% 18%, rgba(184, 103, 87, 0.26) 0%, transparent 30%),
        radial-gradient(1200px circle at 88% 26%, rgba(196, 207, 223, 0.30) 0%, transparent 32%),
        radial-gradient(950px circle at 18% 36%, rgba(221, 179, 101, 0.28) 0%, transparent 30%),
        radial-gradient(1100px circle at 82% 46%, rgba(184, 103, 87, 0.22) 0%, transparent 32%),
        radial-gradient(1000px circle at 8% 56%, rgba(196, 207, 223, 0.32) 0%, transparent 30%),
        radial-gradient(1150px circle at 92% 66%, rgba(221, 179, 101, 0.28) 0%, transparent 32%),
        radial-gradient(1050px circle at 12% 76%, rgba(184, 103, 87, 0.22) 0%, transparent 30%),
        radial-gradient(1100px circle at 88% 86%, rgba(196, 207, 223, 0.26) 0%, transparent 32%),
        radial-gradient(980px circle at 30% 96%, rgba(221, 179, 101, 0.24) 0%, transparent 28%),
        var(--cream)
      `,
    }}>

    {/* HERO */}
    <section style={{
      background:`
        radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 28px 28px,
        rgba(212, 221, 231, 0.55)
      `,
      backdropFilter:'blur(10px)',
      WebkitBackdropFilter:'blur(10px)',
      minHeight:'100vh',
      paddingTop:'clamp(60px, 10vw, 140px)',paddingBottom:0,paddingLeft:sideP,paddingRight:sideP,overflow:'hidden',position:'relative',display:'flex',flexDirection:'column'
    }}>
      <div style={ct}>
        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:20,opacity:0,animation:'fadeUp 0.7s ease 0.1s forwards'}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(55,43,11,0.6)'}}>UX Case Study</span>
          <span style={{width:1,height:12,background:'rgba(55,43,11,0.25)'}}/>
          {['Research','Strategy','Product Design','Testing'].map(tag=>(<span key={tag} style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:'rgba(245,232,211,0.4)',color:accentDark}}>{tag}</span>))}
          <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:'rgba(245,232,211,0.55)',color:accentDark,border:'1px solid rgba(55,43,11,0.18)'}}>Shipped ✓</span>
        </div>
        <h1 style={{fontSize:42,fontWeight:700,lineHeight:1.25,letterSpacing:'-0.5px',color:'#372B0B',maxWidth:780,marginBottom:16,opacity:0,animation:'fadeUp 0.7s ease 0.25s forwards'}}>Inside the Rule Engine — Compliance, Redesigned for Enterprise Trading</h1>
        <p style={{fontSize:18,fontWeight:400,fontStyle:'italic',color:'rgba(55,43,11,0.7)',marginBottom:60,opacity:0,animation:'fadeUp 0.7s ease 0.4s forwards'}}>From research landscape to shipped product — navigating complexity, prioritizing impact</p>
      </div>
      <div style={{...ct,marginTop:48,overflow:'hidden',paddingBottom:0,opacity:0,animation:'fadeUp 0.7s ease 0.55s forwards'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'center',gap:32,paddingTop:48}}>
          {/* Screen 1 */}
          <div style={{width:520,height:340,background:'rgba(22,38,62,0.88)',borderRadius:'10px 10px 0 0',backdropFilter:'blur(12px)',boxShadow:'0 8px 32px rgba(46,74,107,0.18)',border:'1px solid rgba(125,145,165,0.18)',overflow:'hidden',flexShrink:0,marginBottom:60}}>
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
                <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:4}}><div style={{width:8,height:8,borderRadius:2,background:'rgba(155,165,175,0.6)'}}/><span style={{fontSize:8,color:'rgba(89,80,74,0.6)'}}>Active</span></div>
                <div style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:8,height:8,borderRadius:2,background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.2)'}}/><span style={{fontSize:8,color:'rgba(255,255,255,0.4)'}}>Inactive</span></div>
              </div>
              <div style={{flex:1,overflow:'hidden'}}>
                <div style={{padding:'6px 10px',borderBottom:'1px solid rgba(255,255,255,0.1)',display:'flex',gap:8}}>{['STATUS','RULE NAME'].map(h=><span key={h} style={{fontSize:7,fontWeight:700,color:'rgba(89,80,74,0.5)'}}>{h}</span>)}</div>
                {['Crypto ETF Blacklist','PIP Whitelist — Inv. Prof','Suitability Check — IRA','Large Cap Growth Block','Fixed Income — Restrict'].map(n=>(<div key={n} style={{padding:'7px 10px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:8}}><div style={{padding:'2px 8px',borderRadius:8,background:'rgba(155,165,175,0.2)',fontSize:9,fontWeight:700,color:'rgba(155,165,175,0.9)',flexShrink:0}}>Active</div><span style={{fontSize:10,color:'rgba(255,255,255,0.75)',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{n}</span></div>))}
              </div>
              <div style={{width:160,borderLeft:'1px solid rgba(255,255,255,0.1)',padding:14,flexShrink:0}}>
                <div style={{fontSize:7,fontWeight:700,color:'rgba(255,255,255,0.45)',marginBottom:8}}>RULE LOGIC</div>
                <div style={{fontSize:7.5,lineHeight:1.55,color:'rgba(89,80,74,0.6)'}}>
                  <span style={{color:'rgba(144,180,255,0.8)',fontWeight:600}}>If</span> Account Number is one of…
                  <div style={{margin:'4px 0',padding:'3px 6px',background:'rgba(255,255,255,0.08)',borderRadius:3,fontSize:7}}>• XXXXXXX <span style={{color:'rgba(155,165,175,0.7)'}}>+2 more</span></div>
                  <span style={{color:'rgba(144,180,255,0.6)',fontSize:7}}>and</span> Action is Buy<br/><br/>
                  <span style={{color:'rgba(255,200,100,0.9)',fontWeight:700,fontSize:7}}>→ REJECTED</span>
                </div>
              </div>
            </div>
          </div>
          {/* Screen 2 */}
          <div style={{width:360,height:300,background:'rgba(22,38,62,0.88)',borderRadius:'10px 10px 0 0',backdropFilter:'blur(12px)',boxShadow:'0 8px 32px rgba(46,74,107,0.18)',border:'1px solid rgba(125,145,165,0.18)',overflow:'hidden',flexShrink:0,alignSelf:'flex-end',marginBottom:60}}>
            <div style={{background:'rgba(255,255,255,0.1)',borderBottom:'1px solid rgba(255,255,255,0.1)',padding:'8px 14px',display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'rgba(255,255,255,0.3)',display:'inline-block'}}/>
              <span style={{fontSize:9,color:'rgba(255,255,255,0.6)',fontWeight:600,marginLeft:6}}>Create New Rule</span>
            </div>
            <div style={{padding:10}}>
              <div style={{display:'flex',gap:4,marginBottom:10}}>{[1,1,0,0,0].map((f,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:f?'rgba(155,165,175,0.7)':'rgba(255,255,255,0.15)'}}/>)}</div>
              <div style={{fontSize:8,fontWeight:700,color:'rgba(89,80,74,0.5)',letterSpacing:'0.1em',marginBottom:8,textTransform:'uppercase'}}>Add Clause</div>
              {[{n:'Account Number',s:true},{n:'Ticker Symbol',s:false},{n:'Action Type',s:false}].map(item=>(<div key={item.n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 8px',marginBottom:5,background:item.s?'rgba(155,165,175,0.15)':'rgba(255,255,255,0.06)',borderRadius:5,border:`1px solid ${item.s?'rgba(155,165,175,0.3)':'rgba(255,255,255,0.08)'}`}}><span style={{fontSize:8,color:'rgba(255,255,255,0.8)'}}>{item.n}</span><span style={{fontSize:7,padding:'1px 6px',borderRadius:6,background:item.s?'rgba(155,165,175,0.25)':'rgba(255,255,255,0.12)',color:item.s?'rgba(155,165,175,0.9)':'rgba(255,255,255,0.5)',fontWeight:600}}>{item.s?'Selected':'Select'}</span></div>))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TL;DR */}
    <section id="ch-tldr" style={sec('transparent')}>
      <div style={ct}>
        <h2 style={{fontSize:72,fontWeight:800,color:accentDark,lineHeight:1,marginBottom:40}}>tl;dr</h2>
        <p style={{fontSize:20,fontWeight:500,lineHeight:1.65,letterSpacing:'-0.3px',color:'#7a4f35',maxWidth:820,marginBottom:72}}>Across a suite of compliance tools on an enterprise investing platform, we identified where to focus design effort — then redesigned the rule management and creation experience from the ground up. The result: a shipped, user-tested redesign that replaced tribal knowledge with guided workflows and shadow spreadsheets with built-in documentation.</p>
        <div className="meta-pills">
          <span className="hero-pill hero-pill--blue">Lead UX Designer — Trading</span>
          <span className="hero-pill hero-pill--gold">Q1–Q4 2025</span>
          <span className="hero-pill hero-pill--warm">Design · Product · Engineering · Business</span>
          <span className="hero-pill hero-pill--gold">Shipped ✓</span>
        </div>
      </div>
    </section>

    {/* FRAMING */}
    <section id="ch-framing" style={sec('transparent')}>
      <div style={ct}>
        <h2 style={{fontSize:28,fontWeight:900,color:accentDark,lineHeight:1.3,marginBottom:36,letterSpacing:'-0.3px'}}>finding the right problem <span style={{fontWeight:300}}>before designing the right solution</span></h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:760,marginBottom:28}}>This wasn't a project that started with a design brief. It started with two questions: across a complex, sprawling ecosystem of aging compliance tools — where do we even begin? How do we make an impact?</p>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:760}}>I led the team through a structured discovery and sprint process — analyzing user interviews, synthesizing research, and facilitating design thinking workshops — before a single pixel was touched. The decision about <em>what</em> to design was as deliberate as the design itself.</p>
      </div>
    </section>

    {/* DISCOVERY */}
    <section id="ch-discovery" style={{...sec('transparent'),paddingTop:160,paddingBottom:160}}>
      <div style={ct}>
        <StepLabel>Step 01 — Discovery</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28,maxWidth:760}}>Surveying the Compliance Landscape</h2>
        <p style={{fontSize:16,lineHeight:1.8,color:deepBlue,maxWidth:640,marginBottom:100}}>We surfaced existing user interviews that had never been acted on — bringing product, engineering, and business together to synthesize themes and align on the problem space.</p>

        <div style={{marginBottom:56}}>
          <StepLabel>The existing experience</StepLabel>
          <h3 style={{fontSize:19,fontWeight:700,color:accentDark,marginBottom:10}}>What users were working with</h3>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:620,marginBottom:32}}>Before anything else, it helps to see the starting point. The legacy rules management experience was functional — but barely. See what we mean below.</p>
          <div>
              {/* Rules table preview — matches actual legacy UI */}
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
                        {id:'U019',name:'Concentration Limit — Equity',active:'No',ip:true,maa:true,inv:true,st:false,detail:'REVIEW, If Position Concentration > [ 20.00 %], If Asset Class =[ EQ], If Account Type =[ IRA, ROTH, … ]'},
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
              <a href="/legacy-rules-annotated.html" target="_blank" rel="noreferrer" className="cs-cta-primary" style={{display:'inline-flex',alignItems:'center',gap:10,fontSize:13,fontWeight:600,padding:'10px 22px',letterSpacing:'0.2px'}}>
                <span style={{width:18,height:18,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9}}>▶</span>
                Meet the legacy system
              </a>
          </div>
        </div>

        <div style={{marginTop:72,marginBottom:24}}>
          <StepLabel>Synthesis</StepLabel>
          <h3 style={{fontSize:17,fontWeight:700,color:accentDark,marginBottom:8}}>Five problem areas emerged</h3>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:32}}>Synthesized user feedback surfaced five distinct problem areas our users faced.</p>

          <AffinityMap/>
        </div>

        <div style={{marginTop:56}}>
          <div className="rules-problem-cards" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(460px, 1fr))',gap:20}}>

            {/* 01 — Findability */}
            <div style={{display:'flex',flexDirection:'column',background:'white',borderRadius:14,border:`1px solid rgba(202,213,226,0.35)`,overflow:'hidden',boxShadow:'0 1px 10px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'36px 28px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',position:'relative',background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(212, 221, 231, 0.55)',overflow:'hidden',minHeight:220}}>
                <div style={{fontFamily:'Arial,Helvetica,sans-serif',width:300,transform:'scale(1.55)',transformOrigin:'center center',border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',fontSize:9,boxShadow:'2px 2px 6px rgba(0,0,0,0.1)',opacity:0.9}}>
                  <div style={{background:'#d4e0ec',borderBottom:'1px solid #a0b8cc',padding:'4px 8px',fontWeight:700,fontSize:10,color:'#1a1a1a'}}>Rules</div>
                  <div style={{display:'grid',gridTemplateColumns:'28px 82px 22px 1fr',background:'#e8e8e8',borderBottom:'1px solid #ccc'}}>
                    {['ID','Rule Name','Act.','Detail'].map(h=><div key={h} style={{padding:'3px 6px',fontSize:7.5,fontWeight:700,color:'#333',borderRight:'1px solid #ccc'}}>{h}</div>)}
                  </div>
                  {[
                    ['U021','Equity Watch List','Yes','REJECT, If Symbol = [AAPL, MSFT, AMZN, TSLA, GOOG…',true],
                    ['U022','Rep Account Monitor','No','REVIEW, If Accepting Rep = [033000086, 04400012…',false],
                    ['U023','Branch Hold Flag','Yes','REJECT, If Branch = [123, 124, 125, 126, 127, 128…',false],
                    ['U024','Commission Threshold','No','REJECT, If Commission Variance > 2.50%',false],
                    ['U025','Low Dollar Order Cap','Yes','REVIEW, If Account Number = [033370983, 044000…',false],
                  ].map(([id,name,a,d,highlight],i)=>(
                    <div key={id} style={{display:'grid',gridTemplateColumns:'28px 82px 22px 1fr',background:highlight?'#fffbcc':i%2===0?'#fff':'#fafafa',borderBottom:'1px solid #f0f0f0'}}>
                      <div style={{padding:'3px 6px',fontSize:8,color:'#2563eb',fontWeight:600,borderRight:'1px solid #eee'}}>{id}</div>
                      <div style={{padding:'3px 6px',fontSize:8,color:'#333',fontWeight:highlight?700:400,borderRight:'1px solid #eee'}}>
                        {highlight?<><span style={{background:'#fdee73',borderRadius:1}}>Equity</span>{' Watch List'}</>:name}
                      </div>
                      <div style={{padding:'3px 6px',fontSize:7.5,color:'#555',borderRight:'1px solid #eee'}}>{a}</div>
                      <div style={{padding:'3px 6px',fontSize:8,color:'#888',fontStyle:'italic',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{d}</div>
                    </div>
                  ))}
                  <div style={{padding:'3px 8px',fontSize:7.5,color:'#aaa',fontStyle:'italic',borderTop:'1px solid #eee'}}>… 55 more rules</div>
                </div>
                {/* Ctrl+F callout */}
                <div style={{position:'absolute',top:16,right:16,background:'#f1f3f4',border:'1px solid #ccc',borderRadius:4,padding:'7px 12px',fontFamily:'Arial,sans-serif',display:'flex',alignItems:'center',gap:8,boxShadow:'0 2px 8px rgba(0,0,0,0.18)',color:'#333'}}>
                  <span style={{fontSize:12,fontWeight:600}}>Find:</span>
                  <div style={{background:'white',border:'1px solid #bbb',borderRadius:2,padding:'3px 8px',fontSize:12,color:'#555',width:80}}>equity</div>
                  <span style={{fontSize:12,color:'#888'}}>1 of 60</span>
                </div>
                <div style={{position:'absolute',bottom:22,left:'50%',transform:'translateX(-50%)',background:'white',border:'1px solid rgba(74,111,165,0.3)',borderRadius:8,padding:'8px 16px',fontSize:11,fontFamily:'Inter,sans-serif',color:'#4A6FA5',fontWeight:600,whiteSpace:'nowrap',letterSpacing:'0.01em',boxShadow:'0 2px 10px rgba(74,111,165,0.1)'}}>Only searchable with Ctrl+F which cannot locate data in truncated portion</div>
              </div>
              <div style={{padding:'24px 28px 28px'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>01</div>
                <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.35}}>Users can't manage what they can't find</div>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Have to use ctrl+F to find rules and some cutoff logic is unsearchable so I have to keep a separate spreadsheet to simply track down a rule"</p>
              </div>
            </div>

            {/* 02 — Keywords opaque */}
            <div style={{display:'flex',flexDirection:'column',background:'white',borderRadius:14,border:`1px solid rgba(202,213,226,0.35)`,overflow:'hidden',boxShadow:'0 1px 10px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'36px 28px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',position:'relative',background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(212, 221, 231, 0.55)',overflow:'hidden',minHeight:220}}>
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
                <div style={{position:'absolute',bottom:22,left:'50%',transform:'translateX(-50%)',background:'white',border:'1px solid rgba(74,111,165,0.3)',borderRadius:8,padding:'8px 16px',fontSize:11,fontFamily:'Inter,sans-serif',color:'#4A6FA5',fontWeight:600,whiteSpace:'nowrap',letterSpacing:'0.01em',boxShadow:'0 2px 10px rgba(74,111,165,0.1)'}}>100+ keywords — no descriptions or context provided</div>
              </div>
              <div style={{padding:'24px 28px 28px'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>02</div>
                <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.35}}>Guesswork shouldn't be part of building a compliance rule</div>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Only know what a keyword means by trial and error — select it and click next, then go back and search again for another keyword"</p>
              </div>
            </div>

            {/* 03 — Rule creation */}
            <div style={{display:'flex',flexDirection:'column',background:'white',borderRadius:14,border:`1px solid rgba(202,213,226,0.35)`,overflow:'hidden',boxShadow:'0 1px 10px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'36px 28px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(212, 221, 231, 0.55)',position:'relative',overflow:'hidden',minHeight:220}}>
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
                <div style={{position:'absolute',bottom:22,left:'50%',transform:'translateX(-50%)',background:'white',border:'1px solid rgba(74,111,165,0.3)',borderRadius:8,padding:'8px 16px',fontSize:11,fontFamily:'Inter,sans-serif',color:'#4A6FA5',fontWeight:600,whiteSpace:'nowrap',letterSpacing:'0.01em',boxShadow:'0 2px 10px rgba(74,111,165,0.1)'}}>Free text — up to 20,000 comma-separated values</div>
              </div>
              <div style={{padding:'24px 28px 28px'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>03</div>
                <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.35}}>The system expects expertise it never provides</div>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"One-line box for 600 ticker symbols — impossible to jump to the end of that list"</p>
              </div>
            </div>

            {/* 04 — Shadow systems */}
            <div style={{display:'flex',flexDirection:'column',background:'white',borderRadius:14,border:`1px solid rgba(202,213,226,0.35)`,overflow:'hidden',boxShadow:'0 1px 10px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'36px 28px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(212, 221, 231, 0.55)',position:'relative',overflow:'hidden',minHeight:220}}>
                <div style={{transform:'scale(1.55)',transformOrigin:'center center'}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>

                  {/* Platform window */}
                  <div style={{border:'1px solid #b8b8b8',borderRadius:3,background:'white',overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)',width:138}}>
                    <div style={{padding:'3px 6px',fontSize:7.5,fontWeight:700,background:'#d4e0ec',borderBottom:'1px solid rgba(0,0,0,0.1)',color:'#1a1a1a'}}>Platform — Rules</div>
                    {['U023 — Equity Buy Cap','U030 — NF Training Hold','U058 — Reject Order Flag'].map(r=>(
                      <div key={r} style={{padding:'2px 6px',fontSize:7.5,color:'#555',borderBottom:'1px solid #f0f0f0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r}</div>
                    ))}
                    <div style={{padding:'2px 6px',fontSize:7,color:'#aaa',fontStyle:'italic'}}>+ 58 more…</div>
                  </div>

                  {/* Arrow */}
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,color:'#9ba8b8',fontSize:14,fontWeight:400,lineHeight:1}}>⇄</div>

                  {/* Excel window */}
                  <div style={{border:'1px solid #b0b0b0',borderRadius:3,background:'white',overflow:'hidden',fontFamily:'Arial',boxShadow:'2px 2px 5px rgba(0,0,0,0.1)',width:152}}>
                    {/* Title bar */}
                    <div style={{background:'#1d6b38',padding:'3px 6px',display:'flex',alignItems:'center',gap:4}}>
                      <span style={{fontSize:7,color:'white',fontWeight:600,letterSpacing:'0.01em'}}>rules_tracker.xlsx</span>
                    </div>
                    {/* Formula bar */}
                    <div style={{background:'#f5f5f5',borderBottom:'1px solid #ddd',padding:'2px 5px',display:'flex',alignItems:'center',gap:4}}>
                      <span style={{fontSize:6.5,color:'#777',fontWeight:600,borderRight:'1px solid #ddd',paddingRight:4}}>A2</span>
                      <span style={{fontSize:6.5,color:'#555'}}>U023</span>
                    </div>
                    {/* Column headers */}
                    <div style={{display:'grid',gridTemplateColumns:'18px 36px 56px 36px',background:'#e8e8e8',borderBottom:'1px solid #bbb'}}>
                      {['','Rule','Rationale','Updated'].map(h=>(
                        <div key={h} style={{padding:'2px 3px',fontSize:6.5,fontWeight:700,color:'#444',borderRight:'1px solid #ccc',textAlign:'center'}}>{h}</div>
                      ))}
                    </div>
                    {/* Data rows */}
                    {[
                      ['1','U023','Equity res…','Mar 2'],
                      ['2','U030','Training ID…','Feb 28'],
                      ['3','U058','Order flag…','Mar 10'],
                    ].map(([n,id,rat,date],i)=>(
                      <div key={n} style={{display:'grid',gridTemplateColumns:'18px 36px 56px 36px',background:i%2===0?'#fff':'#f7f7f7',borderBottom:'1px solid #eee'}}>
                        <div style={{padding:'2px 3px',fontSize:6.5,color:'#999',background:'#f0f0f0',borderRight:'1px solid #ddd',textAlign:'center'}}>{n}</div>
                        <div style={{padding:'2px 3px',fontSize:7,color:'#2563eb',borderRight:'1px solid #eee'}}>{id}</div>
                        <div style={{padding:'2px 3px',fontSize:7,color:'#555',borderRight:'1px solid #eee',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{rat}</div>
                        <div style={{padding:'2px 3px',fontSize:6.5,color:'#888'}}>{date}</div>
                      </div>
                    ))}
                    <div style={{padding:'2px 5px',fontSize:6.5,color:'#aaa',fontStyle:'italic',borderTop:'1px solid #eee'}}>+ 58 more rows…</div>
                    {/* Sheet tab */}
                    <div style={{background:'#e8e8e8',borderTop:'1px solid #ccc',padding:'2px 6px',display:'flex',gap:4}}>
                      <span style={{fontSize:6.5,background:'white',border:'1px solid #bbb',borderBottom:'none',padding:'1px 5px',borderRadius:'2px 2px 0 0',color:'#333',fontWeight:600}}>Rules Tracker</span>
                    </div>
                  </div>

                </div>
                </div>
                <div style={{position:'absolute',bottom:22,left:'50%',transform:'translateX(-50%)',background:'white',border:'1px solid rgba(74,111,165,0.3)',borderRadius:8,padding:'8px 16px',fontSize:11,fontFamily:'Inter,sans-serif',color:'#4A6FA5',fontWeight:600,whiteSpace:'nowrap',letterSpacing:'0.01em',boxShadow:'0 2px 10px rgba(74,111,165,0.1)'}}>Manual copy &amp; paste between systems</div>
              </div>
              <div style={{padding:'24px 28px 28px'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>04</div>
                <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.35}}>Users forced outside the platform for context</div>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Jumping back and forth loses my place — and if I forget to update the spreadsheet, it's hard to know the single source of truth. In compliance, that gap can mean a costly trading error."</p>
              </div>
            </div>

            {/* 05 — Help buried */}
            <div style={{display:'flex',flexDirection:'column',background:'white',borderRadius:14,border:`1px solid rgba(202,213,226,0.35)`,overflow:'hidden',boxShadow:'0 1px 10px rgba(0,0,0,0.05)'}}>
              <div style={{padding:'36px 28px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',background:'radial-gradient(rgba(55,43,11,0.10) 1px, transparent 1px) 0 0 / 22px 22px, rgba(212, 221, 231, 0.55)',position:'relative',overflow:'hidden',minHeight:220}}>
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
                <div style={{position:'absolute',bottom:22,left:'50%',transform:'translateX(-50%)',background:'white',border:'1px solid rgba(74,111,165,0.3)',borderRadius:8,padding:'8px 16px',fontSize:11,fontFamily:'Inter,sans-serif',color:'#4A6FA5',fontWeight:600,whiteSpace:'nowrap',letterSpacing:'0.01em',boxShadow:'0 2px 10px rgba(74,111,165,0.1)'}}>Help buried in top-right nav — rarely discovered</div>
              </div>
              <div style={{padding:'24px 28px 28px'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:8}}>05</div>
                <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8,lineHeight:1.35}}>Help exists — users just never find it</div>
                <p style={{fontSize:13,fontStyle:'italic',color:accentDark,paddingLeft:12,borderLeft:`2px solid ${accentMid}`,lineHeight:1.55}}>"Didn't know that was here, that's cool"</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* DESIGN SPRINT */}
    <section id="ch-design-sprint" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) ${sideP}`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Step 02 — Design Sprint</StepLabel>
        <h2 style={{fontSize:28,fontWeight:600,color:accentDark,marginBottom:8,display:'flex',alignItems:'center',flexWrap:'wrap',gap:14}}>
          <span>Insights</span>
          <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true" style={{flexShrink:0,color:accent}}>
            <path d="M1 7 H25 M19 1 L25 7 L19 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>How Might We</span>
          <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true" style={{flexShrink:0,color:accent}}>
            <path d="M1 7 H25 M19 1 L25 7 L19 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Concept Sketches</span>
        </h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:720,marginBottom:16}}>With five problem areas defined, I convinced key players from our product team to join me in a design thinking sprint. The goal was shared ownership of the direction, not just the deliverable.</p>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:720,marginBottom:48}}>And it worked. This isn't like redesigning a weather app — one misconfigured rule can instantaneously affect thousands of trades firm-wide. Having engineering constraints and business logic in the room while sketching made the ideas sharper and compressed weeks of back-and-forth into a single sprint.</p>
        <div style={{width:40,height:3,background:accentMid,borderRadius:2,marginBottom:32}}/>
        <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent}}>How Might We — Six Opportunity Areas</p>
        </div>
        <p style={{fontSize:12,color:deepBlue,opacity:0.7,marginBottom:16,fontStyle:'italic'}}>Select a prompt to see the concept sketches and ideas it generated.</p>
        <div style={{marginBottom:24}}>
          <a href="https://www.figma.com/board/fOKBJ0Tc2lHQtjQiUKUugr/HMW-and-Concepts?node-id=0-1&t=xeVKVgdQRSJCUicq-1" target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:8,background:accentLight,border:`1px solid ${accentMid}`,borderRadius:8,padding:'8px 16px',fontSize:12,fontWeight:600,color:accentDark,textDecoration:'none',letterSpacing:'0.02em',transition:'all 0.2s'}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 1H3a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V3a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.25"/><path d="M5 9l4-4M9 9V5H5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            View Original Sketches in FigJam
          </a>
        </div>
        <HMWExplorer/>
      </div>
    </section>

    {/* PRIORITIZATION */}
    <section id="ch-prioritization" style={sec('transparent')}>
      <div style={ct}>
        <StepLabel>Step 03 — Prioritization</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>Deciding Where to Start</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:32}}>With 6 HMW areas and related concepts generated, the team assessed impact vs. effort — keeping in mind business, tech, and other environmental constraints.</p>

        {/* Effort vs Impact Matrix */}
        <div style={{background:`radial-gradient(rgba(55,43,11,0.06) 1px, transparent 1px) 0 0 / 28px 28px, rgba(244,239,227,0.8)`,border:'1px solid rgba(55,43,11,0.12)',borderRadius:14,padding:'24px 32px 16px 44px',marginBottom:4,position:'relative'}}>
          {/* Y axis label — rotated, pinned to left inside box */}
          <div style={{position:'absolute',left:0,top:0,bottom:0,width:28,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{transform:'rotate(-90deg)',fontSize:8,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#3d3530',whiteSpace:'nowrap'}}>↓ LOWER IMPACT · HIGHER IMPACT ↑</div>
          </div>
          {/* Matrix grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,position:'relative',marginBottom:0}}>
            {/* Quadrant TL */}
            <div style={{borderRight:'1px solid rgba(125,145,165,0.15)',borderBottom:'1px solid rgba(125,145,165,0.15)',padding:'14px 16px 20px 20px',minHeight:200,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>HIGH IMPACT · LOW EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 04',title:'More intuitive form controls',phase:'Phase 2',bg:'#dce8f5',border:'rgba(58,95,138,0.2)',pillBg:'rgba(58,95,138,0.12)',pillColor:'#4a5f72'},
                {hmw:'HMW 03',title:'Surface help where it\'s needed — contextual guidance',phase:'Phase 2',bg:'#dce8f5',border:'rgba(58,95,138,0.2)',pillBg:'rgba(58,95,138,0.12)',pillColor:'#4a5f72'},
                {hmw:'HMW 01',title:'Find & manage rules — search and filter on metadata + plain language rule preview',phase:'Phase 1',bg:'#d4edda',border:'rgba(74,124,93,0.25)',pillBg:'rgba(74,124,93,0.15)',pillColor:'#2d5c3a'},
                {hmw:'HMW 05',title:'Intuitive rule builder — split panel, plain language preview builds as details are added',phase:'Phase 2',bg:'#dce8f5',border:'rgba(58,95,138,0.2)',pillBg:'rgba(58,95,138,0.12)',pillColor:'#4a5f72'},
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
            <div style={{borderBottom:'1px solid rgba(125,145,165,0.15)',padding:'14px 16px 20px 16px',minHeight:200,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>HIGH IMPACT · HIGH EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 02',title:'Keyword assistant — view keyword descriptions on selection surface',phase:'Phase 2',bg:'#dce8f5',border:'rgba(58,95,138,0.2)',pillBg:'rgba(58,95,138,0.12)',pillColor:'#4a5f72'},
                {hmw:'HMW 06',title:'Documentation & audit trail — change history',phase:'Phase 3',bg:'#ede8f5',border:'rgba(120,90,160,0.2)',pillBg:'rgba(120,90,160,0.12)',pillColor:'#6b4f9e'},
                {hmw:'HMW 04',title:'List Manager — bulk editing, inheritance, validation',phase:'Deferred',bg:'#fdf0dc',border:'rgba(176,122,48,0.2)',pillBg:'rgba(176,122,48,0.12)',pillColor:'#b07a30'},
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
            <div style={{borderRight:'1px solid rgba(125,145,165,0.15)',padding:'14px 16px 20px 20px',minHeight:160,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>LOW IMPACT · LOW EFFORT</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {[
                {hmw:'HMW 01',title:'Bulk actions',phase:'Deprioritized',bg:'#fde8e8',border:'rgba(180,60,60,0.22)',pillBg:'rgba(180,60,60,0.12)',pillColor:'#b04040'},
                {hmw:'HMW 01',title:'Custom rule description',phase:'Deprioritized',bg:'#fde8e8',border:'rgba(180,60,60,0.22)',pillBg:'rgba(180,60,60,0.12)',pillColor:'#b04040'},
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
                {hmw:'HMW 04',title:'Rule Wizard',phase:'Deprioritized',bg:'#fde8e8',border:'rgba(180,60,60,0.22)',pillBg:'rgba(180,60,60,0.12)',pillColor:'#b04040'},
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
          {/* X axis label — inside, bottom center */}
          <div style={{textAlign:'center',paddingTop:12,fontSize:9,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#3d3530'}}>← LOWER EFFORT · HIGHER EFFORT →</div>
        </div>

        <h3 style={{fontSize:16,fontWeight:700,color:accentDark,letterSpacing:'-0.2px',marginTop:56,marginBottom:28}}>The resulting phased approach</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            {pill:'✓ Phase 1',title:'Rules List',body:'Users need to find and understand existing rules before anything else. Real search, filtering, and a plain language rule preview accomplish this. The layout of this page — and getting users familiar with the plain language format — made it easier to build rules in Phase 2, which reused the same pattern.',bg:'#d4edda',border:'rgba(74,124,93,0.25)',pillBg:'rgba(74,124,93,0.15)',pillColor:'#2d5c3a'},
            {pill:'→ Phase 2',title:'Rule Creation',body:'Getting new rules into the system cleanly — with guided input, contextual keyword help, and confidence before going live — was the most consequential workflow. It also laid the groundwork for edit rule, which could follow the same pattern with minimal additional mapping.',bg:'#dce8f5',border:'rgba(58,95,138,0.2)',pillBg:'rgba(58,95,138,0.12)',pillColor:'#4a5f72'},
            {pill:'→ Phase 3',title:'Edit Rule + Change History',body:'Editing and viewing change history depends on users having a solid mental model of rules first. Sequencing this after creation and list work made the later problem easier to solve.',bg:'#ede8f5',border:'rgba(120,90,160,0.2)',pillBg:'rgba(120,90,160,0.12)',pillColor:'#6b4f9e'},
            {pill:'→ Deferred',title:'List Manager',body:null,bg:'#fdf0dc',border:'rgba(176,122,48,0.2)',pillBg:'rgba(176,122,48,0.12)',pillColor:'#b07a30'},
          ].map(card=>(
            <div key={card.title} style={{borderRadius:12,padding:'28px 32px',background:card.bg,border:`1px solid ${card.border}`}}>
              <div style={{display:'inline-flex',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14,background:card.pillBg,color:card.pillColor}}>{card.pill}</div>
              <div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8}}>{card.title}</div>
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

    {/* LOFI EXPLORATION */}
    <section id="ch-lofi" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) ${sideP}`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Step 04 — Lofi Exploration</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>Mapping the End-to-End Workflow</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:720,marginBottom:48}}>With our priorities set, I started in low fidelity to map the full workflow end to end — how screens connect, where users enter and exit, and what the overall shape of the experience looks like before sweating any details. These wireframes became the centerpiece of a cross-functional review with engineering and product, where we stress-tested feasibility, flagged edge cases, and aligned on the bigger puzzle pieces before zooming in.</p>
        <LofiFlow/>
      </div>
    </section>

    {/* ASIDE — List Manager / Tech Constraint */}
    <section id="ch-closer-look" style={{...sec('transparent'),paddingTop:72,paddingBottom:80}}>
      <div style={ct}>
        <StepLabel>Step 05 — A Closer Look</StepLabel>
        {/* Aside header */}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
          <div style={{width:3,height:36,background:'#b07a30',borderRadius:2,flexShrink:0}}/>
          <div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'#b07a30',marginBottom:3}}>Zooming in on the details</div>
            <div style={{fontSize:18,fontWeight:800,color:accentDark,letterSpacing:'-0.2px'}}>Small Decisions, Big Impact</div>
          </div>
        </div>

        <p style={{fontSize:14,lineHeight:1.75,color:deepBlue,maxWidth:760,marginBottom:40}}>With the end-to-end flow mapped, we also had to zoom in on many fine details that would make a big impact on the experience. One of the most significant was the input mechanism for keywords and clauses — how compliance teams actually get values into a rule. This is a good example of how a seemingly small interaction can carry enormous weight. During the HMW sprint, one of the strongest concepts was a dedicated List Manager — a way to define, store, and reuse named value sets across multiple rules. But a hard infrastructure constraint forced a pivot. To understand why this detail mattered so much, it helps to see what the legacy process actually looked like.</p>

        {/* Two-step annotated visual */}
        <div style={{background:'#f7f6f2',border:'1px solid rgba(202,213,226,0.35)',borderRadius:14,padding:'32px 36px',marginBottom:36}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(144,161,185,0.7)',marginBottom:24}}>Legacy workflow — uploading a securities list to a rule</div>

          {/* Step 1 */}
          <div style={{marginBottom:32}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:'#b07a30',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:'white'}}>1</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:accentDark,letterSpacing:'0.01em'}}>Leave rule creation — navigate to a separate import page via main nav</div>
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
            <div style={{marginTop:16,padding:'14px 18px',background:'rgba(176,122,48,0.08)',border:'1px solid rgba(176,122,48,0.2)',borderRadius:8,display:'flex',gap:10,alignItems:'flex-start'}}>
              <span style={{fontSize:14,flexShrink:0}}>⚠️</span>
              <p style={{fontSize:12,lineHeight:1.65,color:'#7a5020',margin:0}}>And the master lists themselves? Always managed <em>outside</em> the platform entirely — in Excel or shared drives — because the system couldn't store them. Two potential sources of truth, with no reconciliation mechanism.</p>
            </div>
          </div>


          {/* Step 2 */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:'#b07a30',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:10,fontWeight:800,color:'white'}}>2</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:accentDark,letterSpacing:'0.01em'}}>Back in rule creation — set keyword to "Securities Upload," then match rule name exactly to the CSV filename</div>
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
              <div style={{width:200,flexShrink:0,background:'#f5c542',borderRadius:6,padding:'12px 14px',boxShadow:'2px 3px 10px rgba(0,0,0,0.15)',position:'relative',top:8}}>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3d2800',fontWeight:500,marginBottom:8}}>Rule name has to match the .csv filename exactly.</div>
                <div style={{fontSize:11,lineHeight:1.55,color:'#3d2800',fontWeight:500}}>No in-product guidance tells you this. Unclear how they're linked.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Concept vs. Shipped — side by side */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:40,alignItems:'stretch'}}>
          <ImgFrame label="HMW Concept — Standalone List Manager" stretch>
          <div style={{borderRadius:12,overflow:'hidden',background:'#23283a',padding:'18px 20px',fontFamily:"'Inter',-apple-system,sans-serif",display:'flex',flexDirection:'column',height:'100%',boxSizing:'border-box'}}>
            {/* Window chrome */}
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:16}}>
              <div style={{width:11,height:11,borderRadius:'50%',background:'#ff5f57'}}/>
              <div style={{width:11,height:11,borderRadius:'50%',background:'#febc2e'}}/>
              <div style={{width:11,height:11,borderRadius:'50%',background:'#28c840'}}/>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginLeft:8,letterSpacing:'0.02em'}}>List manager</span>
            </div>
            {/* Subtitle */}
            <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginBottom:14,letterSpacing:'0.01em'}}>Saved lists — reusable across rules</div>
            {/* List items */}
            {[{name:'High-risk securities',items:42,rules:3},{name:'Exempt accounts',items:18,rules:1},{name:'Licensed reps — Series 7',items:134,rules:2},{name:'Restricted entities',items:27,rules:4},{name:'Emerging market issuers',items:61,rules:1}].map((l,i)=>(
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
          <ImgFrame label="Pivoted Direction — Bulk Upload Within the Rule" stretch>
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

        {/* Narrative: what we wanted, what blocked us, what we shipped */}
        <div style={{display:'flex',flexDirection:'column',gap:0}}>
          {[
            {
              label:'What we wanted to build',
              body:'User interviews surfaced a clear opportunity: a dedicated List Manager — a way for compliance teams to define named value sets once and reuse them across rules. When a security gets blacklisted or a rep changes licensing status, you\'d update one list and every rule referencing it would stay current. It was the strongest concept to come out of our HMW sprint.'
            },
            {
              label:'Why we had to pivot',
              body:'The constraint surfaced during the sprint itself: the existing data architecture couldn\'t store list-level entities separate from rules. Supporting that would\'ve required infrastructure work that wasn\'t resourced for this cycle. We pushed hard to understand exactly where the wall was, and once it was confirmed, we stopped designing around it and started designing within it.'
            },
            {
              label:'Where we pivoted to',
              body:'The rule itself could still store its own value set — just not as a reusable, named list. So we redirected the design toward making the in-rule input experience dramatically better: structured input with bulk upload via CSV, paste, or manual entry — plus real-time validation. No more comma-separated text box. No more filename-matching ritual. This is the kind of detail that\'s easy to overlook in a wireframe, but makes or breaks the day-to-day experience for compliance teams managing hundreds of values. It\'s not the List Manager, but it solves the most acute version of the problem and lays the foundation for when full list management becomes feasible.'
            },
          ].map((item, i, arr) => (
            <div key={item.label} style={{padding:'28px 0',borderTop:`1px solid ${borderLight}`}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#b07a30',marginBottom:10}}>{item.label}</div>
              <p style={{fontSize:13,lineHeight:1.75,color:deepBlue,margin:0}}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="ch-design" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) ${sideP}`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Step 06 — Design</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>The Redesign</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:20}}>With the structure validated in lofi and cross-functional alignment in place, I refined the wireframes into a mid-high fidelity prototype — two interconnected workflows designed as a coherent system:</p>
        <ul style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:640,marginBottom:32,paddingLeft:20,display:'flex',flexDirection:'column',gap:6}}>
          <li><strong>Rules list</strong> — find, scan, and understand rules with real search and plain-language previews</li>
          <li><strong>Rule creation</strong> — a guided stepped flow replacing the blank, expert-only form</li>
          <li>Plain-language logic introduced in the list carries directly into creation — familiarity built intentionally</li>
        </ul>
        <p style={{fontSize:14,lineHeight:1.7,color:deepBlue,opacity:0.75,maxWidth:640,marginBottom:40}}>Explore both end to end in the prototype, or read the breakdown below.</p>

        <div style={{marginBottom:64}}>
          <PrototypeEmbed/>
        </div>

        {/* Divider */}
        <div style={{width:'100%',height:1,background:'rgba(66,125,219,0.12)',marginBottom:64}}/>

        {/* Part A — Rules List */}
        <div style={{marginBottom:64}}>
          <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:8}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:accent}}>Part A</span>
            <h3 style={{fontSize:22,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',margin:0}}>Rules List</h3>
          </div>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:32}}>The legacy rules list had one job — display all rules — and did so, but without any ability to navigate, filter, or understand. The redesign turned a static table into a usable decision-making surface — with filtering, persistent rule detail, and plain-language logic all accessible from one view.</p>
          <BeforeAfterWipe/>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[{num:'01',title:'Two-panel layout with plain-language rule logic',body:'A rules list alongside a persistent right detail panel — showing rule logic rendered as human-readable sentences, not raw conditional strings. Status, applies-to scope, and a timeline summary are all visible without ever leaving the list. Compliance officers can field trader calls without digging through opaque syntax.'},{num:'02',title:'Find the right rule fast — filtering and inline preview',body:'Real search across rule names and metadata, combined with active/inactive status filtering and keyword filtering, replaced the old Ctrl+F workflow. Selecting any rule instantly surfaces its full logic in the detail panel — no navigation required, no losing your place in the list.'},{num:'03',title:'Rule details and quick actions, without leaving the list',body:"The detail panel surfaces everything you'd otherwise have to dig for — rule logic, applies-to scope, and modification history — alongside a Quick Edit shortcut and a direct link to full change history. No more navigating into a rule just to check a value or make a small correction."}].map(d=>(<div key={d.num} style={{display:'flex',gap:28,padding:'28px 0',borderTop:`1px solid ${borderLight}`}}><div style={{fontSize:32,fontWeight:800,color:accentDark,lineHeight:1,flexShrink:0,width:40}}>{d.num}</div><div><div style={{fontSize:15,fontWeight:700,color:accentDark,marginBottom:8}}>{d.title}</div><p style={{fontSize:13,lineHeight:1.65,color:deepBlue}}>{d.body}</p></div></div>))}
          </div>
        </div>

        {/* Divider */}
        <div style={{width:'100%',height:1,background:'rgba(66,125,219,0.12)',marginBottom:64}}/>

        {/* Part B — Rule Creation */}
        <div>
          <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:8}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:accent}}>Part B</span>
            <h3 style={{fontSize:22,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',margin:0}}>Rule Creation</h3>
          </div>
          <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:700,marginBottom:40}}>The legacy creation experience assumed expert knowledge. The redesign built that knowledge into the flow — replacing a blank form with a guided workflow. Core structural shift: from a single overwhelming page to a stepped flow.</p>
          <PartBFeatureTabs
            tabs={[
              {
                num:'01',
                title:'Search, preview, and select clauses',
                body:"The Add Clauses modal became a three-column layout: searchable clause list on the left, a preview panel in the center showing each clause's name, value type, and examples, and a selected clauses summary on the right. Users can preview a clause before committing — eliminating the trial-and-error loop.",
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
                body:'As users add clauses, the Rule Logic panel builds up a plain-English summary in real time — keyword, operator, and values rendered as a readable sentence. By the time they reach Review & Confirm, the full rule is visible in human-readable form, giving confidence before going live.',
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
        <StepLabel>Step 07 — Validate</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>What Changed After Testing</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:40}}>With the mid-high fidelity prototype in hand, I brought it to user testing sessions with compliance officers. Each workflow step was mapped to a specific research question, with areas of highest uncertainty — clause selection, value input, and the add list flow — as the focus. Here's what we heard, and what changed as a result. You can also <a href="/rule-management-prototype-v2-updated.html" target="_blank" rel="noreferrer" style={{color:terracotta,fontWeight:600,textDecoration:'underline',textUnderlineOffset:3}}>explore the updated v2 prototype</a> with all post-testing changes applied.</p>
        {/* What worked well — compact */}
        <div style={{marginBottom:48}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:16,color:accent}}>What worked well</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {["Rule Management screen improved — filtering helpful, rule preview on the right landed well","General workflow described as intuitive, smooth, comfortable — looks great and a lot easier to use","Add Clause step: users liked the search, additional info, and flexibility of quick add vs. preview first","Plain language rule preview that builds throughout the flow was a standout — users specifically called it out","Upload pattern felt familiar and seamless","Review & Confirm: users loved the rule preview at the end"].map((item,i)=>(<div key={i} style={{fontSize:13,lineHeight:1.6,color:deepBlue,padding:'10px 14px',borderRadius:8,background:'rgba(66,125,219,0.07)',borderLeft:`3px solid ${accentMid}`}}>{item}</div>))}
          </div>
        </div>

        {/* What we iterated on — stacked cards with visuals + fullscreen overlay */}
        <div style={{fontSize:13,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:24,color:terracotta}}>What we iterated on</div>
        <IterationCards/>
      </div>
    </section>

    {/* OUTCOMES */}
    <section id="ch-outcomes" className="om-gold" style={{width:'100%',padding:`clamp(60px, 10vw, 140px) ${sideP}`}}>
      <div className="om-gold-dots" aria-hidden="true"></div>
      <div className="om-gold-glow-a" aria-hidden="true"></div>
      <div className="om-gold-glow-b" aria-hidden="true"></div>
      <div style={{...ct,position:'relative',zIndex:1}}>
        <StepLabel>Outcomes</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>From shipped to what's next</h2>
        <p style={{fontSize:15,lineHeight:1.75,color:deepBlue,maxWidth:680,marginBottom:72}}>Both the rule management redesign and the rule creation workflow were user tested, iterated, and shipped. The work established patterns and groundwork for the next phase — edit rule, change history, and eventually the full List Manager.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:32}}>
          {[{title:'Guided creation over blank forms',body:'A guided workflow with clause preview replaced a single overwhelming page — reducing expert knowledge required to create a rule correctly.',icon:(<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#5a5a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="4" width="22" height="28" rx="2"/><path d="M13 12h12M13 17h9M13 22h6"/><circle cx="30" cy="30" r="8" fill="#ededee"/><circle cx="30" cy="30" r="6"/><path d="M30 27v1.5"/><circle cx="30" cy="31" r="0.1"/><path d="M30 32.5v0.5"/></svg>)},{title:'Findable, scannable rules list',body:'Real search, active/inactive filtering, keyword filtering, and plain-English rule preview replaced Ctrl+F and Excel workarounds.',icon:(<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#5a5a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="10"/><path d="M26 26l8 8"/><path d="M14 18h8M18 14v8"/></svg>)},{title:'Confidence before going live',body:'Live rule preview, inline value validation, and structured clause details give users assurance their rule will do what they intended.',icon:(<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#5a5a42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="26" height="24" rx="2"/><path d="M6 13h26"/><path d="M15 20l3 3 6-6"/><circle cx="33" cy="30" r="8" fill="#ededee"/><circle cx="33" cy="30" r="6"/><path d="M33 27v4M33 33v1"/></svg>)}].map(card=>(<div key={card.title} style={{background:'white',border:'1px solid rgba(125,145,165,0.15)',borderRadius:12,padding:'28px 24px'}}><div style={{marginBottom:14}}>{card.icon}</div><div style={{fontSize:14,fontWeight:700,color:accentDark,marginBottom:8}}>{card.title}</div><p style={{fontSize:12,lineHeight:1.65,color:deepBlue}}>{card.body}</p></div>))}
        </div>
        <div style={{padding:32,background:accentLight,border:`1px solid ${accentMid}`,borderRadius:12}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:accent,marginBottom:16}}>What's next — Phase 2</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
            {['Edit Rule flow — building on the creation patterns established in Phase 1','Rule Change History — surfacing the audit trail users currently track in Excel','List Manager — the most complex and most requested capability, now better scoped'].map(t=>(<div key={t} style={{padding:'14px 16px',background:'rgba(125,145,165,0.08)',borderRadius:8,fontSize:12,lineHeight:1.6,color:deepBlue}}>{t}</div>))}
          </div>
        </div>
      </div>
    </section>

    {/* REFLECTION */}
    <section id="ch-reflection" style={sec('transparent')}>
      <div style={ct}>
        <StepLabel>Reflection</StepLabel>
        <h2 style={{fontSize:28,fontWeight:800,color:accentDark,letterSpacing:'-0.3px',marginBottom:28}}>What I carried forward</h2>
        <div style={{display:'flex',flexDirection:'column',gap:0}}>
          {[
            {
              label:'Measuring what shipped',
              body:'This project shipped two complete workflows — rule management and rule creation — and the qualitative signal was strong: testing validated the core patterns, and the compliance team adopted the new flows without the kind of pushback that usually accompanies enterprise redesigns. But I didn\'t establish success metrics before launch. I should have partnered with product to define what "better" looked like quantitatively — whether that was time-to-create-a-rule, support ticket volume, or error rates on value entry. The absence of hard numbers is the biggest gap in this work, and it\'s something I now build into every project from the start: define the measurement plan during discovery, not after ship.'
            },
            {
              label:'Influencing the roadmap, not just the interface',
              body:'The List Manager pivot is the moment in this project I think about most. We identified a clear, high-impact solution — and then hit an infrastructure wall that meant it couldn\'t ship in this cycle. I\'m proud of how quickly we redirected into a strong alternative. But looking back, I could have pushed harder to frame the List Manager as a multi-phase investment rather than accepting the deferral as binary. If I\'d built a clearer case for the incremental data architecture work — partnering with engineering to scope a minimal foundation in Phase 1 — we might have gotten closer to the full vision sooner. That\'s an instinct I\'ve since sharpened: shaping the roadmap conditions, not just designing within them.'
            },
            {
              label:'Designing patterns, not just screens',
              body:'The plain-language rule preview, the stepped creation flow, the structured value input — these weren\'t just solutions to individual problems. They became the interaction patterns that the rest of the compliance suite would build on. But I didn\'t make that explicit enough during the project. I should have documented the emerging pattern language more deliberately — creating shared artifacts that the broader team could reference as the product expanded. I\'ve learned that at a certain level of complexity, the system you leave behind matters as much as the feature you ship.'
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

    <footer style={{padding:`40px ${sideP}`,display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${borderLight}`,background:'transparent'}}>
      <div style={{fontSize:13,fontWeight:700,color:accentDark}}>kristin<span style={{color:accent}}>.garza</span> · UX Designer</div>
      <div style={{display:'flex',gap:28}}>
        {[['LinkedIn','https://www.linkedin.com/in/kristin-garza'],['Email','mailto:kmkerney221@gmail.com'],['Resume','/resume.pdf']].map(([label,href])=>(<a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" style={{fontSize:13,fontWeight:500,color:accentDark,opacity:0.75,textDecoration:'none'}}>{label}</a>))}
      </div>
    </footer>

    </div>
    {/* End ambient gradient wrapper */}
  </div>)
}
