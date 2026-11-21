import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('public PLUITS homepage routes each discovery copy to its ecosystem destination',async()=>{
 const home=await readFile(new URL('../src/features/home/business-home-page.js',import.meta.url),'utf8');
 for(const route of ['accommodation','venueProvider','venue','discover','marketplace','social']) assert.ok(home.includes("routeHref('"+route+"')"),'missing homepage destination '+route);
 for(const section of ['id="jelajahi"','id="komunitas"','id="untuk-bisnis"']) assert.ok(home.includes(section),'missing homepage section '+section);
 for(const copy of ['Accommodation','Restaurant & Café','Hangout','Places','Marketplace']) assert.ok(home.includes(copy),'missing discovery copy '+copy);
 assert.match(home,/business-discovery-card[^\n]*href=/);
 assert.match(home,/routeHref\('home'\)/);
});

test('public homepage app store availability remains informational and responsive',async()=>{
 const [home,css]=await Promise.all([
  readFile(new URL('../src/features/home/business-home-page.js',import.meta.url),'utf8'),
  readFile(new URL('../src/features/home/business-home.css',import.meta.url),'utf8')
 ]);
 assert.match(home,/role="img" aria-label="Google Play untuk Android — segera hadir"/);
 assert.match(home,/role="img" aria-label="Apple App Store untuk iOS — segera hadir"/);
 assert.match(home,/Coming Soon/);
 assert.match(css,/@media\(max-width:767px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
