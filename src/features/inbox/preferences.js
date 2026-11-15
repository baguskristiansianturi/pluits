const KEY='pluits:dm:preferences:v1';
const DEFAULTS=Object.freeze({theme:'light',fontSize:'normal',enterToSend:true});
const valid={theme:['light','dark'],fontSize:['small','normal','large']};

export function getInboxPreferences(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
    return {
      theme:valid.theme.includes(saved.theme)?saved.theme:DEFAULTS.theme,
      fontSize:valid.fontSize.includes(saved.fontSize)?saved.fontSize:DEFAULTS.fontSize,
      enterToSend:typeof saved.enterToSend==='boolean'?saved.enterToSend:DEFAULTS.enterToSend
    };
  }catch{return {...DEFAULTS};}
}

export function saveInboxPreferences(patch={}){
  const current=getInboxPreferences();
  const next={...current,...patch};
  if(!valid.theme.includes(next.theme))next.theme=DEFAULTS.theme;
  if(!valid.fontSize.includes(next.fontSize))next.fontSize=DEFAULTS.fontSize;
  next.enterToSend=Boolean(next.enterToSend);
  try{localStorage.setItem(KEY,JSON.stringify(next));}catch{}
  return next;
}
