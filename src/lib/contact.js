/**
 * Ponto único de verdade para números de contato do SECABC.
 * Nunca usar wa.me/tel: hardcoded fora daqui — a divergência entre o
 * site principal e /links (número sem o "55") foi causada exatamente
 * por isso.
 */

// Canal geral de WhatsApp (header, rodapé, botão flutuante, benefícios)
export const WHATSAPP_NUMBER = '5511933194304';

// Linha dedicada ao agendamento de homologação — número diferente de propósito, mantido à parte
export const WHATSAPP_HOMOLOGACAO_NUMBER = '5511953905032';

// Telefone fixo institucional
export const PHONE_TEL = '+551149921522';
export const PHONE_DISPLAY = '11-4992-1522';

export function buildWhatsappUrl(number, message) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
