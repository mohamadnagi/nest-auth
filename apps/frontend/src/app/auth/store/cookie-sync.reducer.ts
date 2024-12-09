// cookie-sync.reducer.ts
import { ActionReducer } from '@ngrx/store';
import { CookieService } from '../../core/services/cookie.service';

const COOKIE_KEYS = ['auth'];

export function cookieSyncMetaReducer(
	reducer: ActionReducer<any>
): ActionReducer<any> {
	const cookieService = new CookieService();

	return (state, action) => {
		const nextState = reducer(state, action);

		// Sync state to cookies
		COOKIE_KEYS.forEach((key) => {
			if (nextState[key]) {
				const value = nextState[key];
				cookieService.setCookie(key, value);
			}
		});

		return nextState;
	};
}
