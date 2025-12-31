
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = false;

  if (isLoggedIn) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
