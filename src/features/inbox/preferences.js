const KEY='pluits:dm:preferences:v2';
const LEGACY_KEY='pluits:dm:preferences:v1';
const DEFAULTS=Object.freeze({theme:'light',fontSize:'normal',enterToSend:true,wallpaper:'none'});
const WALLPAPERS=['none','sand','mist','ocean','midnight'];
const valid={theme:['light','dark'],fontSize:['small','normal','large']};

export function getInboxPreferences(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem(LEGACY_KEY)||'{}');
    return {
      theme:valid.theme.includes(saved.theme)?saved.theme:DEFAULTS.theme,
      fontSize:valid.fontSize.includes(saved.fontSize)?saved.fontSize:DEFAULTS.fontSize,
      enterToSend:typeof saved.enterToSend==='boolean'?saved.enterToSend:DEFAULTS.enterToSend,
      wallpaper:WALLPAPERS.includes(saved.wallpaper)||String(saved.wallpaper||'').startsWith('data:image/')?saved.wallpaper:DEFAULTS.wallpaper
    };
  }catch{return {...DEFAULTS};}
}

export function saveInboxPreferences(patch={}){
  const current=getInboxPreferences();
  const next={...current,...patch};
  if(!valid.theme.includes(next.theme))next.theme=DEFAULTS.theme;
  if(!valid.fontSize.includes(next.fontSize))next.fontSize=DEFAULTS.fontSize;
  next.enterToSend=Boolean(next.enterToSend);
  if(!(WALLPAPERS.includes(next.wallpaper)||String(next.wallpaper||'').startsWith('data:image/')))next.wallpaper=DEFAULTS.wallpaper;
  if(String(next.wallpaper).startsWith('data:image/')&&String(next.wallpaper).length>1800000)next.wallpaper=DEFAULTS.wallpaper;
  try{localStorage.setItem(KEY,JSON.stringify(next));}catch{}
  return next;
}
