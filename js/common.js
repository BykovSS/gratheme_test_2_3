'use strict';

window.addEventListener('load', function () {

	var br_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var br_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	br_height = br_height - document.getElementsByTagName('h3')[0].offsetHeight;
	var koef_w = 1,
	    koef_h = 1;
	document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width - 17) + ', ' + (br_height - 17));
	var button_side = br_width * 0.2;
	var marg_w = br_width * 0.1;
	var buttons = [{ id: "b01", x: marg_w, side: button_side, src: "audio/track01.mp3", play: false }, { id: "b02", x: marg_w * 2 + button_side, side: button_side, src: "audio/track02.mp3", play: false }, { id: "b03", x: marg_w * 3 + button_side * 2, side: button_side, src: "audio/track03.mp3", play: false }];

	function RenderButton(button) {
		var icon = void 0,
		    color = void 0;
		if (!button.play) {
			icon = '<g class="icon"><line class=' + button.id + ' x1=' + (button.x + button.side * 0.3) * koef_w + ' y1=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.2 * koef_w) + ' x2=' + (button.x + button.side * 0.8) * koef_w + ' y2=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.5 * koef_w) + ' stroke=white stroke-width=' + button.side * 0.15 * koef_w + ' stroke-linecap=round />\n\t\t\t\t\t<line class=' + button.id + ' x1=' + (button.x + button.side * 0.8) * koef_w + ' y1=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.5 * koef_w) + ' x2=' + (button.x + button.side * 0.3) * koef_w + ' y2=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.8 * koef_w) + ' stroke=white stroke-width=' + button.side * 0.15 * koef_w + ' stroke-linecap=round />\n\t\t\t\t\t<line class=' + button.id + ' x1=' + (button.x + button.side * 0.3) * koef_w + ' y1=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.8 * koef_w) + ' x2=' + (button.x + button.side * 0.3) * koef_w + ' y2=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.2 * koef_w) + ' stroke=white stroke-width=' + button.side * 0.15 * koef_w + ' stroke-linecap=round />\n\t\t\t\t\t<polygon class=' + button.id + ' points="' + (button.x + button.side * 0.3) * koef_w + ',' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.2 * koef_w) + ' ' + (button.x + button.side * 0.8) * koef_w + ',' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.5 * koef_w) + ' ' + (button.x + button.side * 0.3) * koef_w + ',' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.8 * koef_w) + '" fill=white /></g>';
			color = "blue";
		} else {
			icon = '<g class="icon"><line class=' + button.id + ' x1=' + (button.x + button.side * 0.2) * koef_w + ' y1=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.3 * koef_w) + ' x2=' + (button.x + button.side * 0.8) * koef_w + ' y2=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.3 * koef_w) + ' stroke=white stroke-width=' + button.side * 0.15 * koef_w + ' stroke-linecap=round />\n\t\t\t\t\t<line class=' + button.id + ' x1=' + (button.x + button.side * 0.2) * koef_W + ' y1=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.7 * koef_w) + ' x2=' + (button.x + button.side * 0.8) * koef_w + ' y2=' + ((br_height * koef_h - button.side * koef_w) * 0.5 + button.side * 0.7 * koef_w) + ' stroke=white stroke-width=' + button.side * 0.15 * koef_w + ' stroke-linecap=round /></g>';
			color = "green";
		}
		var t_button = document.getElementById(button.id);
		if (t_button) {
			t_button.removeChild(t_button.getElementsByClassName('icon')[0]);
			t_button.innerHTML += icon;
			var child_button = t_button.firstElementChild;
			child_button.setAttribute('fill', color);
			child_button.setAttribute('x', button.x * koef_w);
			child_button.setAttribute('y', (br_height * koef_h - button.side * koef_w) * 0.5);
			child_button.setAttribute('rx', button.side * koef_w * 0.15);
			child_button.setAttribute('width', button.side * koef_w);
			child_button.setAttribute('height', button.side * koef_w);
		} else {
			var temp_button = '<g id=' + button.id + ' class="button" data-sound=' + button.src + '><rect x=' + button.x + ' y=' + (br_height - button.side) * 0.5 + ' rx=' + button.side * 0.15 + ' width=' + button.side + ' height=' + button.side + ' fill=' + color + ' />';
			temp_button += icon;
			temp_button += '</g>';
			document.getElementsByTagName('svg')[0].innerHTML += temp_button;
		}
	}

	var context = new (window.AudioContext || window.webkitAudioContext)();

	for (var i = 0; i < buttons.length; i++) {
		RenderButton(buttons[i]);
	}

	[].forEach.call(document.getElementsByClassName('button'), function (button) {
		addAudioProperties(button);
		button.addEventListener('touchstart', function (event) {
			onTouch(button);
			event.preventDefault();
		});
	});

	var audio = [];

	function onTouch(button) {
		for (var _i = 0; _i < buttons.length; _i++) {
			if (buttons[_i].id == button.id) {
				if (buttons[_i].play == false) {
					buttons[_i].play = true;
					audio[_i] = button.play();
				} else {
					buttons[_i].play = false;
					button.stop(audio[_i]);
				}
				RenderButton(buttons[_i]);
			}
		}
	}

	function loadAudio(object, url) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function () {
			context.decodeAudioData(request.response, function (buffer) {
				object.buffer = buffer;
			});
		};
		request.send();
	}

	function addAudioProperties(object) {
		object.source = document.getElementById('' + object.id).getAttribute('data-sound');
		loadAudio(object, object.source);
		object.play = function () {
			var s = context.createBufferSource();
			s.buffer = object.buffer;
			s.connect(context.destination);
			s.start(0);
			return s;
		};
		object.stop = function (set) {
			set.stop();
		};
	}

	window.addEventListener('resize', function () {
		var br_width_n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var br_height_n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		br_height_n = br_height_n - document.getElementsByTagName('h3')[0].offsetHeight;
		koef_w = br_width_n / br_width;
		koef_h = br_height_n / br_height;
		document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width_n - 17) + ', ' + (br_height_n - 17));
		for (var _i2 = 0; _i2 < buttons.length; _i2++) {
			RenderButton(buttons[_i2]);
		}
	});
});