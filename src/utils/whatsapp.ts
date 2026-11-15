export const WHATSAPP_PHONE = '5515996788845';
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Tenho uma dúvida sobre o Viral Pack Pro e gostaria de ajuda.';

export function buildWhatsAppUrl(
  phone: string = WHATSAPP_PHONE,
  message: string = WHATSAPP_DEFAULT_MESSAGE
): string {
  const digits = phone.replace(/\D/g, '');
  const trimmedMessage = message.trim();
  const baseUrl = `https://wa.me/${digits}`;

  if (!trimmedMessage) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(trimmedMessage)}`;
}
