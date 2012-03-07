(function() {
  var HTTP_INTERNAL_SERVER_ERROR   = 500;
  var NOTICE_MESSAGE               = 1;
  var ERROR_MESSAGE                = 2;
  var AUTOHIDE_MESSAGE_TIMEOUT     = 3000;
  var MIN_MESSAGE_DISPLAY_DURATION = 1000;

  var $openButton, $modalMessage, $modalMessageContents, lastModalDisplay;

  var init = function() {
    $openButton           = document.getElementById('open');
    $modalMessage         = document.getElementById('modalMessage');
    $modalMessageContents = document.getElementById('modalMessageContents');

    $openButton.onclick = function(ev) {
      displayMessage(NOTICE_MESSAGE, "Opening the gate...", false);
      openGate();
      return false;
    };
  };

  var displayMessage = function(level, message, autoHide) {
    $modalMessage.setAttribute('class', 'displayed');
    $modalMessageContents.textContent = message;
    lastModalDisplay = Date.now();

    if (autoHide) {
      setTimeout(hideMessage, AUTOHIDE_MESSAGE_TIMEOUT);
    }
  };

  var hideMessage = function() {
    var messageDisplayDuration = Date.now() - lastModalDisplay;
    var hideDelay = (messageDisplayDuration < MIN_MESSAGE_DISPLAY_DURATION) ? MIN_MESSAGE_DISPLAY_DURATION - messageDisplayDuration : 0;
    setTimeout(function() {
      $modalMessage.setAttribute('class', '');
    }, hideDelay);
  };

  var openGate = function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == HTTP_INTERNAL_SERVER_ERROR) {
          displayMessage(ERROR_MESSAGE, "The gate won't open :(", true);
        } else {
          hideMessage();
        }
      };
    };
    xmlhttp.open('GET', '/open');
    xmlhttp.send(null);
  };

  window.onload = init;
})();