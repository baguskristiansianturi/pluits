import {readAccountCss} from '../helpers/account-css.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('all app icon references resolve to the one public canonical PLUITS SVG',async()=>{
 const [brand,index,manifest,logo,registry,oldSvg]=await Promise.all([
  readFile(new URL('../../src/components/common/brand.js',import.meta.url),'utf8'),
  readFile(new URL('../../index.html',import.meta.url),'utf8'),
  readFile(new URL('../../public/manifest.webmanifest',import.meta.url),'utf8'),
  readFile(new URL('../../public/assets/brand/pluits-logo.svg',import.meta.url),'utf8'),
  readFile(new URL('../../src/design-system/assets/logo-registry.js',import.meta.url),'utf8'),
  readFile(new URL('../../assets/brand/pluits-logo.svg',import.meta.url),'utf8').catch(()=>null)
 ]);
 assert.match(brand,/getLogoAsset\('logo-mark'\)\.src/);
 assert.match(registry,/id:'logo-mark', src:'\/pluits\/assets\/brand\/pluits-logo\.svg'/);
 assert.match(brand,/width="40" height="40"/);
 assert.doesNotMatch(brand,/size\s*=\s*40|size\s*=/,'The shared renderer must not allow page-specific logo sizing.');
 assert.match(index,/rel="icon"[^>]+\/pluits\/assets\/brand\/pluits-logo\.svg/);
 assert.match(manifest,/"src": "\/pluits\/assets\/brand\/pluits-logo\.svg"/);
 assert.match(logo,/<svg[\s\S]*#18c8b5[\s\S]*<path[\s\S]*<\/svg>/);
 assert.equal(oldSvg,null,'The old root-level logo copy must not remain in the repository.');
});

test('profile settings menu is rendered as a direct child of each profile card',async()=>{
 const source=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 const profilePage=await readFile(new URL('../../src/features/profile/profile-page.js',import.meta.url),'utf8');
 const css=readAccountCss();
 assert.match(source,/function profileMenuMarkup\(\)/);
 assert.ok((profilePage.match(/\$\{profileMenuMarkup\(\)\}/g)||[]).length>=2,'Both profile and preview must render the shared menu.');
 assert.match(source,/href="#\/account\/settings"/);
 assert.match(source,/href="#\/account\/profile\/edit"/);
 assert.match(css,/\.ua-profile-card>\.ua-profile-menu\{position:absolute/);
 assert.match(css,/\.ua-profile-card>\.ua-profile-menu \.pl-social-menu-panel\[hidden\]\{display:none!important\}/);
});
