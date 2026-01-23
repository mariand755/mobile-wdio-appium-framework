import login from '../../screens/login.screen';
import products from '../../screens/products.screen';
import cart from '../../screens/cart.screen';
import { credentials } from '../../testdata/credentials';

const ITEM_NAME = 'Sauce Labs Backpack'; // common first item, adjust if needed

describe('Cart - Smoke', () => {
  it('should add an item to cart and show it in cart', async () => {
    await login.login(credentials.valid.username, credentials.valid.password);
    await products.waitForLoaded();

    // Option 1 (simple): click first "ADD TO CART"
    await products.addFirstItemToCart();

    await products.openCart();
    await cart.waitForLoaded();

    // If your build doesn’t expose exact text as accessibility, swap this to a more robust selector.
    await cart.assertItemInCart(ITEM_NAME);
  });
});
