import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { UsersService } from '../../services/users.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../models/auth.model';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { LogoutDialogComponent } from '../../../auth/components/logout-dialog/logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  providers:[
    UsersService
  ],
  imports: [MaterialModule ],
})
export class UsersListComponent implements OnInit {
  private userService = inject(UsersService);
  private authService = inject(AuthService);
  private store = inject<Store<{ auth: AuthState }>>(Store);
  private dialog = inject(MatDialog);
  users = [];
  displayedColumns: string[] = ['id', 'name', 'email','username','mobile_number'];

  ngOnInit() {
    this.userService.getUsers().subscribe(res =>{
      this.users = res;
    })
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.authService.logout();
      }
    });
  }
}
