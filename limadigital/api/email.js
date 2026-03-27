import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { nome, telefone, email, empresa, mensagem } = req.body;

  try {
    await resend.emails.send({
      from: 'Lima Digital <onboarding@resend.dev>',
      to: 'raphaellima.digital@gmail.com',
      subject: 'Novo contato do site',
      html: `
        <h2>Novo contato</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${empresa}</p>
        <p><b>Mensagem:</b> ${mensagem}</p>
      `,
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar email' });
  }
}