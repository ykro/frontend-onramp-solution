// Este módulo pertenece solo al servidor. Nunca lo importes desde un componente de cliente.
export const API_SECRET_KEY = "sk_live_solo_en_servidor_no_exponer";
export const LIMITE_RESULTADOS = 5;

export function construirCabeceraPrivada(): Record<string, string> {
  return {
    Authorization: `Bearer ${API_SECRET_KEY}`,
  };
}
