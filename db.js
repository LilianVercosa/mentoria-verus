const SB_URL = 'https://bmywcotwrsrrebgapzwl.supabase.co';
const SB_KEY = 'sb_publishable_U254aN-HoTqubWihBhwksA_t_IkEF7w';
const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SB_KEY,
  'Authorization': 'Bearer ' + SB_KEY
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const r = await fetch(SB_URL + '/rest/v1/app_data?id=eq.main&select=data', { headers: HEADERS });
    const rows = await r.json();
    const data = rows && rows[0] ? rows[0].data : null;
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const body = req.body;
    await fetch(SB_URL + '/rest/v1/app_data?id=eq.main', {
      method: 'PATCH',
      headers: { ...HEADERS, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ data: body, updated_at: new Date().toISOString() })
    });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
