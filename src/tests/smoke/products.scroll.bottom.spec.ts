import login from '../../screens/login.screen';
import products from '../../screens/products.screen';
import { credentials } from '../../testdata/credentials';

const LAST_ITEM = 'Test.allTheThings() T-Shirt (Red)';

describe('Products - Smoke', () => {
  it('should scroll to bottom and verify last item is visible', async () => {
    await login.login(credentials.valid.username, credentials.valid.password);
    await products.waitForLoaded();

    await products.scrollToItemName(LAST_ITEM);
    await expect(await products.isItemNameVisible(LAST_ITEM)).toBe(true);
  });
});
