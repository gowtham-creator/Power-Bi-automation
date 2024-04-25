const usernameInputSelector = 'input[name="loginfmt"]';
const passwordInputSelector = "input#i0118";
const nextButtonSelector = 'input[value="Next"]';
const signInButtonSelector = 'input[value="Sign in"]';
const YesButtonSelector = 'input[value="Yes"]';
const addAnotherAccountButtonSelector = '#otherTile'; // Selector for "Use another account" button

const waitForElement = (selector, callback, timeout = 100) => {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => waitForElement(selector, callback, timeout), timeout); // Check every `timeout` ms
  }
};

console.log("Script loaded hehe");

const clickAddAnotherAccountIfAvailable = () => {
  const addAnotherAccountButton = document.querySelector(addAnotherAccountButtonSelector);
  if (addAnotherAccountButton) {
    addAnotherAccountButton.click();
  }
};

clickAddAnotherAccountIfAvailable();

waitForElement(usernameInputSelector, (usernameInput) => {
  const savedUsername = "powerbi1@patilgroup0.onmicrosoft.com";

  const typeText = (element, text) => {
    if (element) {
      element.focus();
      element.value = text;
      element.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      console.error("Element not found.");
    }
  };

  typeText(usernameInput, savedUsername);
  waitForElement(passwordInputSelector, (passwordInput) => {
    const savedPassword = "Patil@2024";

    typeText(passwordInput, savedPassword);

    // Wait for the "Next" button to load
    waitForElement(nextButtonSelector, (nextButton) => {
      // Click the "Next" button
      nextButton.click();
      waitForElement(
        signInButtonSelector,
        (signInButton) => {
          setTimeout(() => {
            signInButton.click();
          });
        },
        1000
      );
    });
  });
});

waitForElement(YesButtonSelector, (YesButton) => {
  setTimeout(() => {
    YesButton.click();
  }, 1000);
});
