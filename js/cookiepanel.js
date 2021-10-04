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

function set_cookie(name, value) {
  document.cookie = name +'='+ value +'; Path=/;';
}

function getCookie(c_name) {
    var c_value = document.cookie,
        c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) c_start = c_value.indexOf(c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function clear_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function clearAndReload() {
    clear_cookie("consentStatus");
    location.reload();
}

if (getCookie("consentStatus") === "granted") {
  alert('Tracking is on');
  gtag('consent', 'update', {
    'ad_storage'        : 'granted',
    'analytics_storage' : 'granted',
    'linkedin_insight'  : 'granted'
  });
  dataLayer.push({
    'event': 'allow_consent'
  });
} else {
  alert('Tracking is off');
  gtag('consent', 'default', {
    'ad_storage'        : 'denied',
    'analytics_storage' : 'denied',
    'linkedin_insight'  : 'denied'
  });
  dataLayer.push({
    'event': 'default_consent'
  });
} 

$(document).ready(function(){
  
  if (!getCookie('consentStatus')) {     
    $("#cookiePanel").slideDown("slow");
    $('#btnConsentGranted').click(function() {
      //alert('You have agreed');
      $("#cookiePanel").slideUp("slow");
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'linkedin_insight'  : 'granted'
      });
      dataLayer.push({
        'event': 'update_consent'
      });
      set_cookie("consentStatus", "granted");
      location.reload();
    });
    $('#btnConsentDenied').click(function() {
      //alert('You have denied consent');
      $("#cookiePanel").slideUp("slow");
      set_cookie("consentStatus", "denied");
      location.reload();
    });
  }
  
});
