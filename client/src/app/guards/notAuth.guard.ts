import { Injectable }     from '@angular/core';
import { CanActivate,Route ,ActivatedRouteSnapshot, RouterStateSnapshot, Router }    from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Injectable()
export class notAuthGuard implements CanActivate {

    constructor(
        private authService : AuthService,
        private router : Router
    ){}
  canActivate() {
    if(this.authService.loggedin()){
        this.router.navigate(['/']);
        return false;
    }else{
      return true;
    }
  }
}