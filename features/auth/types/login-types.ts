export interface LoginProps {
  email: string;
  password: string;
  callBackUrl?: string;
  code?: string;
  tenantSlug?: string;
}
