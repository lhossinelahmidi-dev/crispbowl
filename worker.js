export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      try {
        const notFound = await env.ASSETS.fetch(new Request(new URL('/404.html', request.url), request));
        if (notFound.status === 200) {
          return new Response(notFound.body, {
            status: 404,
            headers: notFound.headers,
          });
        }
      } catch (e) {
        // fallback to original response
      }
    }
    return response;
  },
};
