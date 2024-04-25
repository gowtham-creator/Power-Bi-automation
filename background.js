links = {
  "sales analysis dashboard":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/f73b73b9-c753-40ba-8028-6738f6b38729/ReportSection894b4fe078e1be54c94b?experience=power-bi",
  "sales quantity dashboard":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/f73b73b9-c753-40ba-8028-6738f6b38729/ReportSectione70c6c202db95050e447?experience=power-bi",
  "average price dashboard":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/f73b73b9-c753-40ba-8028-6738f6b38729/ReportSectionaba9e1aad9b0dcc7b288?experience=power-bi",
  "race dashboard":
    "https://app.powerbi.com/groups/a82309c9-654e-4ad7-8018-6eb1cd4d106f/reports/bb74fa8d-655b-4634-be81-79b2e36d74ae/ReportSection?experience=power-bi",
  "working capital":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/5f492623-74ff-4269-8be1-6c60dd80d402/ReportSectionfacbf716a45b08450548?experience=power-bi",
  "working capital comparision":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/5f492623-74ff-4269-8be1-6c60dd80d402/ReportSection7e3654482cbb0a6409ae?experience=power-bi",
  "sales comparision":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/f73b73b9-c753-40ba-8028-6738f6b38729/ReportSection195988f415ad2435470c?experience=power-bi",
  "customer sales analysis":
    "https://app.powerbi.com/groups/ebc63852-ab78-44cb-ba4b-d298223d5e62/reports/f73b73b9-c753-40ba-8028-6738f6b38729/ReportSectiona4fca748395366918a76?experience=power-bi",
  
  };

function getLinks(name) {
for (const key in links){
  if(name.includes(key)){
    return links[key];
  }
}
return null;
}


let ctr = 0; // Move ctr outside the message listener to retain its value

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("https://creedycrunch.vercel.app/")) {
    chrome.tabs.create({ url: "https://creedycrunch.vercel.app/" });
    chrome.tts.speak("Click on the extension icon to get started");
    return;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      files: ["content.js"],
    });
  });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let link = "";
  

  if (request && request.text) {
    link = getLinks(request.text.toLowerCase());
    if (link) {
      ctr++;
      console.log(`Sent ${ctr}: "${request.text}"`);
      chrome.tabs.create({ url: link });
      link = `Opening ${request.text}`;
    
    if(ctr>=1){
      alert(ctr)
      link = getLinks(request.text.toLowerCase());
      chrome.tabs.update({ url: link });
      link = `Redirecting to the Dashboard ${request.text}`;}

    }
    else {
      link = "Sorry, I didn't get that";
    }
  }
  sendResponse({ message: link });
  return true;
});



