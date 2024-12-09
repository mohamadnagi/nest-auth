import { environment } from "../../../environments/environment";

// cookie.service.ts
export class CookieService {
	setCookie(name: string, value: string, hours: number = environment.cookieExpiryHours) {
		const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
		document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure`;
	}

	getCookie(name: string): string | null {
		const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
		return match ? decodeURIComponent(match[2]) : null;
	}

	deleteCookie(name: string) {
		this.setCookie(name, '', -1);
	}
}
