import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse body payload
  app.use(express.json());

  // API Route first
  app.post("/api/send-email", async (req, res) => {
    try {
      const { nome, email, telefone, mensagem } = req.body;

      if (!nome || !email || !telefone || !mensagem) {
        return res.status(400).json({ 
          success: false, 
          error: "Por favor, preencha todos os campos do formulário." 
        });
      }

      console.log(`[Contato ID Vertical] Recebido: Nome: ${nome}, E-mail: ${email}, Tel: ${telefone}`);

      const apiKey = process.env.RESEND_API_KEY;

      if (!apiKey) {
        console.warn("⚠️ RESEND_API_KEY não configurada no ambiente. Simulando envio de e-mail.");
        console.log(`\n--- SIMULAÇÃO DE E-MAIL ---\nPara: idverticalnh@gmail.com\nAssunto: Novo Orçamento Site - ${nome}\nPayload:\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}\n---------------------------\n`);
        return res.json({ 
          success: true, 
          simulated: true,
          message: "Contato processado com sucesso em modo de simulação (Chave Resend não configurada)." 
        });
      }

      // Execute real fetch to Resend API
      const mailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: "Site ID Vertical <onboarding@resend.dev>",
          to: "idverticalnh@gmail.com",
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
        console.error(`Erro no Resend: ${mailResponse.status} - ${errorText}`);
        return res.status(500).json({ 
          success: false, 
          error: "Ocorreu um erro ao processar o disparo do e-mail. Por favor, tente novamente." 
        });
      }

      const mailData = await mailResponse.json();
      console.log("Sucesso ao enviar e-mail via Resend:", mailData);
      return res.json({ success: true, data: mailData });

    } catch (error: any) {
      console.error("Erro interno no formulário de contato:", error);
      return res.status(550).json({ 
        success: false, 
        error: "Erro do servidor ao encaminhar a requisição de e-mail." 
      });
    }
  });

  // Vite middleware in dev; standard static server in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port http://0.0.0.0:${PORT}`);
  });
}

startServer();
