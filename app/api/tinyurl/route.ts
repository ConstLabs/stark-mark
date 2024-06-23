const TOKEN = "5YU9otRyvx4BOWFOiykXQFYcZ2RPKni4Kff0Mzl6s8MqJgoNa32QuIWDw8de";

const TINY_API = `https://api.tinyurl.com/create?api_token=${TOKEN}`;

export async function POST(request: Request) {
  const body = await request.json();
  const { url } = body;

  const data = {
    url: url,
    domain: "tinyurl.com",
    description: "stark mark"
  };
  console.log(data, "dd");
  const res = await fetch(TINY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  return Response.json(result);
}
