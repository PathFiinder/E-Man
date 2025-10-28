import { inject, Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence, sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { USER_COOKIES_NAME, UserData } from '@e-man/common';
import Cookies from "js-cookie";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth: Auth = inject(Auth);

  constructor() {
    this.setSessionStoragePersistence();
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((data) => {
      console.log(data)
      this.setUsersDataToLocalStorage({
        email,
        uid: data.user.uid,
        emailVerified: data.user.emailVerified,
        displayName: data.user.displayName,
        photoURL: data.user.photoURL
      })
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      sessionStorage.clear();
    });
    return from(promise);
  }

  isUserLogged(): boolean {
    const userData: string | undefined = Cookies.get(USER_COOKIES_NAME);
    if(userData !== undefined) {
      if(!(JSON.parse(userData) as UserData).emailVerified){
        window.alert('Verify Email before logging')
        return false;
      }
      return true;
    }
    return false;
  }

  sendVerificationMail() {
    const currentUser = this.firebaseAuth.currentUser;
    if(currentUser !== null) {
      sendEmailVerification(currentUser).then(
        (c: unknown) => {
          console.log(c)
        }
      )
    }
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  private setUsersDataToLocalStorage(user: UserData | null): void {
    if(user === null) {
      Cookies.remove(USER_COOKIES_NAME);
      return;
    }
    Cookies.set(USER_COOKIES_NAME, JSON.stringify(user))
  }


  // // Returns true when user is looged in and email is verified
  // get isUserLogged(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   if (user?.emailVerified === false) {
  //     window.alert('Verify Email before logging')
  //   }
  //   return user !== null && user.emailVerified !== false;
  // }
  //
  // signIn(email: string, password: string) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.setUserData(result.user);
  //       this.afAuth.authState.subscribe((user) => {
  //         if (user) {
  //           this.router.navigate(['dashboard']);
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       // const ref = this.dialogService.open(ErrorModalComponent,
  //       //   {
  //       //     closeOnEsc: true,
  //       //     closeOnBackdropClick: true
  //       //   });
  //       // ref.componentRef.setInput('errorMessage', error.message);
  //     });
  // }
  //
  // signUp(email: string, password: string) {
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.sendVerificationMail();
  //       this.setUserData(result.user);
  //     })
  //     .catch((error) => {
  //       // const ref = this.dialogService.open(ErrorModalComponent,
  //       //   {
  //       //     closeOnEsc: true,
  //       //     closeOnBackdropClick: true
  //       //   });
  //       // ref.componentRef.setInput('errorMessage', error.message);
  //     });
  // }
  //
  // updateProfile(newDisplayName: string) {
  //   return '';
  //   // return this.afAuth.currentUser
  //   //   .then((u: firebase.User) => u.updateProfile({displayName: newDisplayName}))
  // }
  //
  // sendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['login/verify-email-address']);
  //     });
  // }
  //
  // forgotPassword(passwordResetEmail: string) {
  //   return this.afAuth
  //     .sendPasswordResetEmail(passwordResetEmail)
  //     .then(() => {
  //       window.alert('Password reset email sent, check your inbox.');
  //     })
  //     .catch((error) => {
  //       // const ref = this.dialogService.open(ErrorModalComponent);
  //       // ref.componentRef.setInput('errorMessage', error.message);
  //     });
  // }
  //
  // logoutUser() {
  //   return this.afAuth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['login']);
  //   });
  // }
  //
  // private setUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   // const userData: User = {
  //   //   uid: user.uid,
  //   //   email: user.email,
  //   //   displayName: user.displayName,
  //   //   photoURL: user.photoURL,
  //   //   emailVerified: user.emailVerified,
  //   // };
  //   // return userRef.set(userData, {
  //   //   merge: true,
  //   // });
  // }

}
