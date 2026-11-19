import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from './public-footer.js';
import '../../design-system/page-shell.css';
import './public-info-page.css';

import { PUBLIC_INFO_PAGES } from './pages/index.js';

export function mountPublicInfoPage({root,type}) {
  const page=PUBLIC_INFO_PAGES[type];
  if(!page) return;
  const sections=page.sections.map(([heading,copy])=>'<section class="public-info-section"><h2>'+heading+'</h2><p>'+copy+'</p></section>').join('');
  const header=renderPageHeader({brandHref:routeHref('home'),label:'PLUITS — halaman informasi',rightContent:'<a class="public-info-home-link" href="'+routeHref('home')+'">Beranda</a>'});
  root.innerHTML='<div class="pl-page-shell public-info-shell">'+header+'<main class="pl-page-main public-info-main"><article class="public-info-article"><span class="public-info-status">'+page.status+'</span><h1>'+page.title+'</h1><p class="public-info-intro">'+page.intro+'</p>'+sections+'<p class="public-info-updated">Informasi ini akan diperbarui mengikuti ketersediaan layanan dan kebijakan resmi PLUITS.</p></article></main>'+renderPublicFooter()+'</div>';
}
