import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '@/lib/posts';
import { site } from '@/data/site';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({
    title: `${site.name} · Writing`,
    description: 'Notes on Laravel, system design and leading engineering teams.',
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}/` })),
  });
}
