import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ManagerService } from '../services/manager.service';

import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private service: ManagerService,
    ) {}
        
    
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const result = await this.service.getSessionDetailes();
        console.log(this.service.isloggedin);
        if (this.service.isloggedin) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        //, { queryParams: { returnUrl: state.url }}
        return false;
    }
}
