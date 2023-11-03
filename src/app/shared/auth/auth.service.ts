import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #firebaseAuth = inject(Auth);
  readonly #router = inject(Router);
  readonly user$ = user(this.#firebaseAuth)
  readonly user = toSignal(this.user$);
  readonly isAuthenticated = toSignal(
    this.user$.pipe(map((user) => !!user))
  );

  login() {
    signInWithPopup(this.#firebaseAuth, new GoogleAuthProvider())
      .then(() => {
        this.#router.navigate(['/']);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logout() {
    signOut(this.#firebaseAuth).then(() => {
      this.#router.navigate(['/login']);
    });
  }
}
