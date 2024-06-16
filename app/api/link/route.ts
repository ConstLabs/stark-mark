function extractTitleAndFavicon(url: string, htmlString: string) {
  // 正则表达式匹配title
  const titleRegex = /<title>(.*?)<\/title>/i;
  const titleMatch = htmlString.match(titleRegex);
  const title = titleMatch ? titleMatch[1] : null;

  // 正则表达式匹配favicon
  const faviconRegex = /<link rel="(?:icon|shortcut icon)".*?href="(.*?)".*?>/i;
  const faviconMatch = htmlString.match(faviconRegex);
  const favicon = faviconMatch ? faviconMatch[1] : "";

  const urlIns = new URL(url);

  const domain = urlIns.origin;

  return { title, favicon: favicon?.startsWith("http") ? favicon : domain + favicon };
}

export async function POST(request: Request) {
  const body = await request.json();
  const { url } = body;
  const res = await fetch(url);
  const data = await res.text();
  return Response.json({
    data: extractTitleAndFavicon(url, data)
  });
}
