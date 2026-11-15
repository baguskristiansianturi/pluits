export function bindProfileImageFrameControls({
 documentRef=document,
 currentFrame={},
 readFrame,
 renderFrameCss
}={}){
 const form=documentRef.querySelector('#ua-profile-form');
 if(!form||typeof readFrame!=='function'||typeof renderFrameCss!=='function')return;
 const update=()=>{
  const frame=readFrame(form,currentFrame);
  ['avatar','card'].forEach(variant=>{
   const preview=form.querySelector('[data-image-frame-preview="'+variant+'"]');
   if(preview)preview.setAttribute('style',renderFrameCss(frame,variant));
  });
  form.querySelectorAll('[data-image-frame]').forEach(input=>{
   const output=form.querySelector('[data-frame-output="'+input.dataset.imageFrame+'"]');
   if(output)output.value=input.value;
  });
 };
 form.querySelectorAll('[data-image-frame]').forEach(input=>input.addEventListener('input',update));
 update();
}
