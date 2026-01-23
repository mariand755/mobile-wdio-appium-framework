import { BaseScreen } from '../core/BaseScreen';

/**
 * LoginScreen wraps the login UI and exposes “business actions” instead of raw selectors.
 * This keeps tests readable (login(username, password)) and isolates locator changes to this file.
 */
class LoginScreen extends BaseScreen {
  // The Sauce Labs sample app uses stable accessibility IDs for these controls.
  // WDIO’s "~" selector targets accessibility id.
  get usernameField() {
    return $('~test-Username');
  }
  get passwordField() {
    return $('~test-Password');
  }
  get loginButton() {
    return $('~test-LOGIN');
  }

  // Error message element for negative login validations.
  get errorMessage() {
    return $('~test-Error message');
  }

  async login(username: string, password: string) {
    await this.type(this.usernameField, username);
    await this.type(this.passwordField, password);
    await this.tap(this.loginButton);
  }
}

export default new LoginScreen();
