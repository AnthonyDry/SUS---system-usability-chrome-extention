var notActive = true;
chrome.browserAction.onClicked.addListener(function(tab) {
  if(notActive)
  {
    chrome.tabs.executeScript(null, { code: "$('.SUS_platform_ext').addClass('SUS_active');" });
    notActive = false;
  }
  else{
    chrome.tabs.executeScript(null, { code: "$('.SUS_platform_ext').removeClass('SUS_active');" });
    notActive = true;
  }

});