// Vercel Serverless Function para envio de e-mails via Resend
export default async function handler(req, res) {
  // Garantir cabeçalhos de CORS e método POST
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido.' });
  }

  try {
    const { nome, email, telefone, mensagem } = req.body;

    if (!nome || !email || !telefone || !mensagem) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos (nome, email, telefone, mensagem) são obrigatórios.'
      });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn('RESEND_API_KEY não configurada no ambiente.');
      return res.status(500).json({
        success: false,
        error: 'Chave API do Resend não está configurada neste servidor/Vercel.'
      });
    }

    // Chamada à API HTTP do Resend para evitar depender de dependência pesada no serverless
    const mailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Site ID Vertical <onboarding@resend.dev>',
        to: 'idverticalnh@gmail.com',
        subject: `Orcamento ID Vertical: ${nome}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h2 style="color: #D32F2F; border-bottom: 2px solid #D32F2F; padding-bottom: 10px;">ID Vertical - Nova Solicitação de Orçamento</h2>
            <p>Você recebeu uma consulta através do formulário de contato do site:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 120px;">Nome:</td>
                <td style="padding: 8px;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">E-mail:</td>
                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Telefone:</td>
                <td style="padding: 8px;"><a href="tel:${telefone}">${telefone}</a></td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #D32F2F; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold;">Mensagem:</p>
              <p style="margin-top: 10px; white-space: pre-wrap; line-height: 1.5; color: #333;">${mensagem}</p>
            </div>
            <footer style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px; text-align: center;">
              Este e-mail foi gerado automaticamente pelo formulário de contato da ID Vertical.
            </footer>
          </div>
        `
      })
    });

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text();
      console.error(`Erro no Resend Vercel: ${mailResponse.status} - ${errorText}`);
      return res.status(500).json({
        success: false,
        error: 'Erro retornado pela API do Resend ao enviar o e-mail.'
      });
    }

    const mailData = await mailResponse.json();
    return res.status(200).json({ success: true, id: mailData.id });

  } catch (err) {
    console.error('Erro na Vercel Serverless Function:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro interno ao processar a função serverless.'
    });
  }
}
