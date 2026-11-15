import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Discovery filter controls receive state and rerender through an explicit page contract',async()=>{
 const feature=await readFile(new URL('../../src/features/discovery/explore-filters.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export function bindExploreFilters/);
 for(const key of ['getContentType','setContentType','getFilter','setFilter','setCategory','rerender'])assert.ok(feature.includes(key));
 assert.ok(account.includes("import {bindExploreFilters} from '../../features/discovery/explore-filters.js'"));
 assert.ok(account.includes("rerender:()=>mountAccount('explore')"));
 assert.doesNotMatch(feature,/supabase|mountAccount|from ['"].*pages/);
});
