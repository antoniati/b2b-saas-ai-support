import { AdapterUser } from "next-auth/adapters";

/**
 * Tipos usados na função de callback de sessão.
 */
export type LinkAccountEvent = {
  user: AdapterUser & { id: string }; // garante que tenha id
  account?: any;
  profile?: any;
};
