import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    // console.log(this.authService.getCurrentUser().admin);
    if(this.authService.getCurrentUser().admin) {
      // console.log('hehi');
      return true;
    }
    this.router.navigate(['/no-access']);
    return false;
  }
}


