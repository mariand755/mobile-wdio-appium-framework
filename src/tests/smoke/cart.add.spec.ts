import login from '../../screens/login.screen';
import products from '../../screens/products.screen';
import cart from '../../screens/cart.screen';
import { credentials } from '../../testdata/credentials';

const ITEM_NAME = 'Sauce Labs Backpack'; // First item in default sort order

describe('Cart - Smoke', () => {
  it('should add an item to cart and show it in cart', async () => {
    await login.login(credentials.valid.username, credentials.valid.password);
    await products.waitForLoaded();

    // Select and add first item to cart
    await products.addFirstItemToCart();

    await products.openCart();
    await cart.waitForLoaded();

    // Verify item is in cart
    await cart.assertItemInCart(ITEM_NAME);
  });
});
