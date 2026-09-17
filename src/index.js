import * as H from './html.js';
import { handleCheckin, htmlHeaders } from './checkin.js';
import { handleEnroll } from './enroll.js';
import { handleAdmin } from './admin.js';
import { handlePoll } from './notify.js';
import { runWatcher } from './watch.js';

// Every unknown path returns this exact response, so probing for the check-in
// path can't be distinguished from any other miss.
const notFound = () => new Response(H.landing(), htmlHeaders(404));

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const seg = url.pathname.replace(/^\/+|\/+$/g, '').split('/');
    const head = seg[0] || '';

    try {
      if (head === '') {
        return new Response(H.landing(), htmlHeaders());
      }
      if (head === 'robots.txt') {
        return new Response('User-agent: *\nDisallow: /\n', {
          headers: { 'content-type': 'text/plain' },
        });
      }
      if (head === env.CHECKIN_PATH && seg.length === 1) {
        return await handleCheckin(request, env, ctx);
      }
      if (head === 'e' && seg[1]) {
        return await handleEnroll(request, env, seg[1]);
      }
      if (head === 'admin') {
        return await handleAdmin(request, env, seg[1]);
      }
      if (head === '_poll') {
        return await handlePoll(request, env);
      }
      return notFound();
    } catch (err) {
      // Never leak stack traces or error text to the client.
      console.error('handler error', err?.stack || String(err));
      return new Response(H.landing(), htmlHeaders(500));
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(runWatcher(env, ctx));
  },
};
