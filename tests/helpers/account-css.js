import {readFileSync} from 'node:fs';

const files=[
 '01-account-shell-and-settings.css',
 '02-profile-and-social-controls.css',
 '03-feed-and-media-layout.css',
 '04-profile-and-post-overrides.css',
 '05-creation-studio.css',
 '06-circle-home-discovery.css',
 '07-top-ten-and-content-shelves.css',
 '08-nearby-and-feed-overrides.css'
];

export function readAccountCss(){
 return files.map(name=>readFileSync(new URL('../../src/pages/account/styles/'+name,import.meta.url),'utf8')).join(String.fromCharCode(10));
}
