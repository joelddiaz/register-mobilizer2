"use strict";

/*
This is the page for which we want to rewrite the URL.
*/
var theregisterPage = "http://*.theregister.co.uk/*";

function rewriteURL(requestDetails) {
  //console.log("Loading: " + requestDetails.url);
  var nonMobilePattern = RegExp("^http://w*\.?theregister");
  var res = nonMobilePattern.test(requestDetails.url);
  if (res) {
    //console.log("Non-mobile detected!!!");
    var newURL = requestDetails.url.replace(/http:\/\/w*\.?theregister.co.uk/, "http://m.theregister.co.uk");
    //console.log("new url: " + newURL);
    return { redirectUrl : newURL};
  }
}

/*
Add rewriteURL as a listener to onBeforeRequest,
only for the target page.

Make it "blocking" so we can do a rewrite.
*/
chrome.webRequest.onBeforeRequest.addListener(rewriteURL,
					{urls: [theregisterPage]},
					["blocking"]
					);
