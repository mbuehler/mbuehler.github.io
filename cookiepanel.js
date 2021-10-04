/*
Copyright (C) 2021 by Mark Buehler <markbuehler@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];

function gtag(){dataLayer.push(arguments);}

function deleteAllCookies() {
  delete_cookie("consentCookie");
  delete_cookie("consentStatus");
}

function set_cookie(name, value) {
  document.cookie = name +'='+ value +'; Path=/;';
}

function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function clearAndReload() {
    deleteAllCookies();
    location.reload();
}

if (document.cookie.replace(/(?:(?:^|.*;\s*)consentStatus\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "granted") {
  //alert('Google is watching you!');
  gtag('consent', 'update', {
    'ad_storage'        : 'granted',
    'analytics_storage' : 'granted'
  });
  dataLayer.push({
    'event': 'allow_consent'
  });
} else {
  //alert('No Analytics for you!');
  gtag('consent', 'default', {
    'ad_storage'        : 'denied',
    'analytics_storage' : 'denied'
  });
  dataLayer.push({
    'event': 'default_consent'
  });
} 

$(document).ready(function(){
  
  if (document.cookie.replace(/(?:(?:^|.*;\s*)consentCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {     
    $("#cookiePanel").slideDown("slow");
    $('#btnConsentGranted').click(function() {
      //alert('You have agreed');
      $("#cookiePanel").slideUp("slow");
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
      dataLayer.push({
        'event': 'update_consent'
      });
      set_cookie("consentCookie", "true");
      set_cookie("consentStatus", "granted");
      location.reload();
    });
    $('#btnConsentDenied').click(function() {
      //alert('You have denied consent');
      $("#cookiePanel").slideUp("slow");
      set_cookie("consentCookie", "true");
      set_cookie("consentStatus", "denied");
      location.reload();
    });
  }
  
});
