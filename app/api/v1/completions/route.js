export async function POST(request) {
  return proxyRequest(request, '/v1/completions');
}

async function proxyRequest(request, targetPath) {
  const { search } = new URL(request.url);
  const targetUrl = 'https://integrate.api.nvidia.com' + targetPath + search;
  const headers = {};
  for (const [key, value] of request.headers.entries()) {
    const lk = key.toLowerCase();
    if (!['host', 'connection'].includes(lk)) {
      headers[key] = value;
    }
  }
  headers['Host'] = 'integrate.api.nvidia.com';
  const body = await request.text();
  try {
    const response = await fetch(targetUrl, { method: 'POST', headers, body });
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      if (!['transfer-encoding', 'connection'].includes(key.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });
    return new Response(response.body, { status: response.status, headers: responseHeaders });
  } catch (error) {
    return new Response(JSON.stringify({error: error.message}), { status: 502, headers: {'Content-Type': 'application/json'} });
  }
                                             }
