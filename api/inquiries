import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('codeel_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { projectType, name, phone, features, budget } = req.body;
    if (!features || features.trim().length < 5)
      return res.status(400).json({ error: 'Please describe your project.' });

    const { error } = await supabase.from('codeel_inquiries').insert([{
      project_type: projectType || 'other',
      name: name?.trim() || '',
      phone: phone?.trim() || '',
      features: features.trim(),
      budget: budget || 0,
      created_at: new Date().toISOString()
    }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
