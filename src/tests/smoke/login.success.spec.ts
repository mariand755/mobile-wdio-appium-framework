import LoginScreen from '../../screens/login.screen';
import ProductsScreen from '../../screens/products.screen';
import { credentials } from '../../testdata/credentials';

describe('Login - Smoke', () => {
  it('should login successfully and land on product list', async () => {
    await LoginScreen.login(credentials.valid.username, credentials.valid.password);
    await ProductsScreen.waitForLoaded();
  });
});
