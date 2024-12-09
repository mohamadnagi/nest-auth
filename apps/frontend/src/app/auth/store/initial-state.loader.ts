import { CookieService } from "../../core/services/cookie.service";

export function loadInitialState(): any {
  const cookieService = new CookieService();
  const auth = cookieService.getCookie('auth');
  return {auth: auth};
}
