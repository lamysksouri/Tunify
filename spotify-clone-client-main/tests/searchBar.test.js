import { Builder, By, Key, until } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';
import assert from 'assert';

(async function testSearchBar() {
  const options = new edge.Options();
  options.addArguments('--inprivate');
  options.addArguments('--guest');

  let driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .build();

  try {
    // Navigate to your application
    await driver.get('http://localhost:5173'); // Replace with your application's URL

    // Wait for the search bar to be present
    let searchBar = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);

    // Verify the search bar is visible
    assert(await searchBar.isDisplayed(), 'Search bar is not visible');

    // Type in the search bar
    await searchBar.sendKeys('s'); // Replace with a term that yields results

    // Verify the input value
    let value = await searchBar.getAttribute('value');
    assert.strictEqual(value, 's', 'Search bar input value is incorrect');

    // Submit the search form
    await searchBar.sendKeys(Key.RETURN);

    // Wait for the search results to load (adjust the selector and timeout as needed)
    await driver.wait(until.elementLocated(By.css('.flex.flex-wrap.gap-10')), 20000); // Increased timeout to 20000ms

    // Verify the search results are displayed
    let results = await driver.findElement(By.css('.flex.flex-wrap.gap-10'));
    assert(await results.isDisplayed(), 'Search results are not displayed');

    // Log success message
    console.log('The searchBar is working without any problems');

    // Add a delay before closing the browser
    await new Promise(resolve => setTimeout(resolve, 2000)); // 5 seconds delay
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await driver.quit();
  }
})();