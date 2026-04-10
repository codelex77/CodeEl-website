import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET — public: only approved testimonials
  if (req.method === 'GET') {
    const adminMode = req.query.admin === 'true';

    let query = supabase
      .from('codeel_testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!adminMode) query = query.eq('approved', true);

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // POST — public submission (unapproved by default)
  if (req.method === 'POST') {
    const { clientName, clientRole, message, rating } = req.body;

    if (!clientName || !message || message.trim().length < 10) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    const { error } = await supabase.from('codeel_testimonials').insert([{
      client_name: clientName.trim(),
      client_role: clientRole?.trim() || '',
      message: message.trim(),
      rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
      approved: false,
      created_at: new Date().toISOString()
    }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // PATCH — admin: approve/unapprove a testimonial
  if (req.method === 'PATCH') {
    const { id, approved } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const { error } = await supabase
      .from('codeel_testimonials')
      .update({ approved })
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // DELETE — admin: remove a testimonial
  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const { error } = await supabase
      .from('codeel_testimonials')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
