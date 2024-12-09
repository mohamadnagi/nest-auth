import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {
private http = inject(HttpClient);

getUsers(): Observable<any> {
    return this.http.get( environment.apiUrl + `users`, );
}

}
