import LoginScreen from '../../screens/LoginScreen';
import { credentials } from '../../testdata/credentials';

describe('Login - Negative', () => {
  it('should show an error message for invalid credentials', async () => {
    await LoginScreen.login(credentials.invalid.username, credentials.invalid.password);
    await expect(LoginScreen.errorMessage).toBeDisplayed();
  });
});
