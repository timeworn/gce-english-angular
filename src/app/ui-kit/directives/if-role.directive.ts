import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { DecodedToken, Role } from '../../core/models/auth';

@Directive({
  selector: '[appIfRole]'
})
export class IfRoleDirective implements OnDestroy {

  unsubscribeAll: Subject<any> = new Subject<any>();

  roles;

  @Input() set appIfRole(roles: Role[]) {
    this.roles = roles;
    this.checkRole();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.tokenChanged$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => {
      this.checkRole();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private checkRole() {
    this.authService.decodeToken().then((token: DecodedToken) => {
      if (!token) {
        return;
      }
      this.viewContainer.clear();
      if (!this.roles) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        if (this.roles.indexOf(token.role) > -1) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }

}
