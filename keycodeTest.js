 function displayKeyCode(evt)
 {
	 
		 var textBox = getObject('keycodeTester');
		
		 var charCode = (evt.which) ? evt.which : event.keyCode
		 var keyStroke;
		 var keyStrokeXtra = '';
		 textBox.value = '';
		 
		 
		 
		 if (charCode == 8) { keyStroke = "backspace"; } 
		 if (charCode == 9) { keyStroke = "tab"; }
		 if (charCode == 13) { keyStroke = "enter"; } 
		 if (charCode == 16) { keyStroke = "shift"; }
		 if (charCode == 17) { keyStroke = "ctrl"; } 
		 if (charCode == 18) { keyStroke = "alt"; } 
		 if (charCode == 19) { keyStroke = "pause/break"; } 
		 if (charCode == 20) { keyStroke = "caps lock"; } 
		 if (charCode == 27) { keyStroke = "escape"; } 
		 if (charCode == 32) { keyStroke = "spacebar"; } 
		 if (charCode == 33) { keyStroke = "page up"; } 
		 if (charCode == 34) { keyStroke = "page down"; }
		 if (charCode == 35) { keyStroke = "end"; }
		 if (charCode == 36) { keyStroke = "home"; }
		 if (charCode == 37) { keyStroke = "left arrow"; }
		 if (charCode == 38) { keyStroke = "up arrow"; }
		 if (charCode == 39) { keyStroke = "right arrow"; }
		 if (charCode == 40) { keyStroke = "down arrow"; }
		 if (charCode == 45) { keyStroke = "insert"; }
		 if (charCode == 46) { keyStroke = "delete"; }
		 if (charCode == 59) { keyStroke = "semi-colon"; keyStrokeXtra = ' in Firefox [Note: semi-colon is 186 in other browsers]'}
		 if (charCode == 61) { keyStroke = "equals"; keyStrokeXtra = ' in Firefox [Note: the equals sign is 187 in other browsers]'; }
		 if (charCode == 91) { keyStroke = "left window"; }
		 if (charCode == 92) { keyStroke = "right window"; }
		 if (charCode == 93) { keyStroke = "select key"; }
		 if (charCode == 96) { keyStroke = "numpad 0"; }
		 if (charCode == 97) { keyStroke = "numpad 1"; }
		 if (charCode == 98) { keyStroke = "numpad 2"; }
		 if (charCode == 99) { keyStroke = "numpad 3"; }
		 if (charCode == 100) { keyStroke = "numpad 4"; }
		 if (charCode == 101) { keyStroke = "numpad 5"; }
		 if (charCode == 102) { keyStroke = "numpad 6"; }
		 if (charCode == 103) { keyStroke = "numpad 7"; } 
		 if (charCode == 104) { keyStroke = "numpad 8"; }
		 if (charCode == 105) { keyStroke = "numpad 9"; }
		 if (charCode == 106) { keyStroke = "multiply"; }
		 if (charCode == 107) { keyStroke = "add"; }
		 if (charCode == 109) { keyStroke = "subtract"; }
		 if (charCode == 110) { keyStroke = "decimal point"; }
		 if (charCode == 111) { keyStroke = "divide"; }
		 if (charCode == 112) { keyStroke = "F1"; }
		 if (charCode == 113) { keyStroke = "F2"; }
		 if (charCode == 114) { keyStroke = "F3"; }
		 if (charCode == 115) { keyStroke = "F4"; }
		 if (charCode == 116) { keyStroke = "F5"; }
		 if (charCode == 117) { keyStroke = "F6"; }
		 if (charCode == 118) { keyStroke = "F7"; }
		 if (charCode == 119) { keyStroke = "F8"; }
		 if (charCode == 120) { keyStroke = "F9"; }
		 if (charCode == 121) { keyStroke = "F10"; }
		 if (charCode == 122) { keyStroke = "F11"; }
		 if (charCode == 123) { keyStroke = "F12"; }
		 if (charCode == 124) { keyStroke = "F13"; }
		 if (charCode == 125) { keyStroke = "F14"; }
		 if (charCode == 126) { keyStroke = "F15"; }
		 if (charCode == 127) { keyStroke = "F16"; }
		 if (charCode == 128) { keyStroke = "F17"; }
		 if (charCode == 129) { keyStroke = "F18"; }
		 if (charCode == 130) { keyStroke = "F19"; }
		 if (charCode == 144) { keyStroke = "num lock"; }
		 if (charCode == 145) { keyStroke = "scroll lock"; }
		 if (charCode == 173) { keyStroke = "dash"; keyStrokeXtra = " in Firefox [Note: the dash is 189 in other browsers]"; }
		 if (charCode == 186) { keyStroke = "semi-colon"; keyStrokeXtra = " [Note: In Firefox semi-colon is 59]"; }
		 if (charCode == 187) { keyStroke = "equals"; keyStrokeXtra = " [Note: In Firefox the equals sign is 61]"; }
		 if (charCode == 188) { keyStroke = "comma"; }
		 if (charCode == 189) { keyStroke = "dash"; keyStrokeXtra = " [Note: In Firefox dash is 173]"; }
		 if (charCode == 190) { keyStroke = "period"; }
		 if (charCode == 191) { keyStroke = "forward slash"; }
		 if (charCode == 192) { keyStroke = "grave accent"; }
		 if (charCode == 219) { keyStroke = "left bracket"; }
		 if (charCode == 220) { keyStroke = "backslash"; }
		 if (charCode == 221) { keyStroke = "right bracket"; }
		 if (charCode == 222) { keyStroke = "single quote"; }
		if (keyStroke) {
			setTimeout(function () {
				textBox.value = keyStroke;
			}, 0);
		} else {
			keyStroke = String.fromCharCode(charCode);
		}
		 var lblCharCode = getObject('displayCode');
		lblCharCode.innerHTML =  '<strong>Keycode:</strong> ' + charCode + ' (you pressed ' + keyStroke + keyStrokeXtra + ')';
		
		// This value was added to allow for shift tab, because I was having
		// a hard time getting this script to detect shift + tab together. 
		var secret = getObject('hiddenValue').innerHTML;
		
		 if (charCode == 9) {
			 // put focus on the form if shift + tab are used; this requires the user to 
			 // lift the hand off the shift key, then press shift + tab. If the user
			 // holds the shift + tab key down and keeps it down, this script won't work,
			 // so it needs to be fixed
			 if (secret == 'shift') {
				// $("#keycodeForm").focus();
			}
			else {
				// allow the user to exit out of the form element
				reverseIt(evt);
				//$("#displayCode").focus();
			}
		 }
		
		 var hiddenValue = getObject('hiddenValue');
		hiddenValue.innerHTML = keyStroke;
		 
		 return;
 }
 function getObject(obj)
  {
	  var theObj;
	  if (document.all) {
		  if (typeof obj=='string') {
			  return document.all(obj);
		  } else {
			  return obj.style;
		  }
	  }
	  if (document.getElementById) {
		  if (typeof obj=='string') {
			  return document.getElementById(obj);
		  } else {
			  return obj.style;
		  }
	  }
	  return null;
  }
