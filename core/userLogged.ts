const keyUserLogged = "user";

export class UserLogged {
  static get(): string | undefined {
    return localStorage.getItem(keyUserLogged) || undefined;
  }

  static set(user: string): void {
    return localStorage.setItem(keyUserLogged, user);
  }

  static logout(): void {
    localStorage.removeItem(keyUserLogged);
  }
}
