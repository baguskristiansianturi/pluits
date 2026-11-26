const ICONS = {
 chat:'<path d="M20.5 11.5a8.5 8.5 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 20l1-4.1a8.1 8.1 0 0 1-1-4.4A8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 8.5 8.5Z"/><path d="M8 11h8M8 15h5"/>',
 story:'<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><path d="M17.5 6.8h.01"/>',
 contacts:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 7h5m-2.5-2.5v5"/>',
 call:'<path d="M7.2 3.5 4.5 5.1c-.9.6-1.1 1.8-.7 2.8 2.5 5.5 6.8 9.8 12.3 12.3 1 .4 2.2.2 2.8-.7l1.6-2.7-4.1-3.1-2.5 2a15.3 15.3 0 0 1-5.2-5.2l2-2.5-3.5-4.5Z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 more:'<circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none"/>',
 search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
 attach:'<path d="m8 12.5 6.7-6.7a3.5 3.5 0 0 1 5 5L10 20.5a5 5 0 0 1-7-7L13 3.5"/>',
 image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
 send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
 close:'<path d="m6 6 12 12M18 6 6 18"/>',
};
export function fluidsIcon(name, className=''){const path=ICONS[name];return path?'<span class="fluids-icon '+className+'" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+path+'</svg></span>':'';}
