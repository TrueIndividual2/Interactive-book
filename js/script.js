/*
 * @author       Sami Somero <ssomero@gmail.com>
 * @date         19.03.2019
 * @version      0.90
 * @framework    0.90
 *
 * @description  JavaScript tutorial for programmers - Interactive version. This file contains pure JavaScript without
 *               any libraries to produce interactivity to reader. Uses author's own created framework for interactive books.
 *               Most of the effects created could be moved to CSS file but because this book is about JavaScript, they are 
 *               mostly implemented with JavaScript for learning purposes.
 *
 * @license      Creative Commons License Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)
 *               http://creativecommons.org/licenses/by-nc-sa/3.0/
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * TODO:
 * - Finalize HTML skeleton file                                                                                      [DONE]
 * - Add favicon                                                                                                      [DONE]
 * - Finalize CSS skeleton file                                                                                       [DONE]
 * - Finalize help modal file                                                                                         [DONE]
 * - Finalize information modal file                                                                                  [DONE]
 * - Make code more readable using mutable objects (no more 5 level objects...) or renaming                           [DONE]
 * - Make code more readable using better naming rules (ie. handleCookies() -> Save settings)                         [DONE]
 * - Make test to check if javascript is enabled and give an error message if it's not and instructions to turn it on [DONE]
 * - Make test if cookies are enabled. If not, no need to save settings in cookies                                    [DONE]
 * - Cleanup unused files (mostly /images/)                                                                           [DONE]
 * - Check how to scroll with keyboard                                                                                [DONE]
 * - Go throught Chapter 1     [DONE]
 * - Go throught Chapter 2
 * - Go throught Chapter 3
 * - Go throught Chapter 4
 * - Go throught Chapter 5
 * - Go throught Chapter 6
 * - Go throught Chapter 7
 * - Go throught Chapter 8
 * - Go throught Chapter 9
 * - Go throught Chapter 10
 * - Go throught Chapter 11
 * - Go throught Chapter 12
 * - Try to get dimensions right.. CSS... UI... noooooo
 * - FIX: Using bottom navi does not show back to top button
 * - Learn github properly
 * - Write readme.md to github
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Required globals for Interactive Book Framework
var myAJAX = new XMLHttpRequest();
var IB = {
	'settings'            : {},
	'subChapters'         : [],
	'subChapterIndex'     : 0,
	'subChapterLastItems' : 0
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Settings object wrapper for interactive book framework. When creating new object instance, 
 * initializes itself automatically by values from these settings and creates interactive book
 * with conjunction of core functions and HTML and CSS files.
 *
 * @requires    HTML Framework format file
 * @requires    CSS Framework format file
 * @requires    Chapter and modal files in HTML and Framework format
 * @requires    Additional icons for UI
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function IB_Settings() {
	this.elements           = {};
	this.init           	= function() {
								// Fetch all IDs of Framework's HTML file
								let FW_IDs = document.querySelectorAll('[id]');

								for(let i = 0; i < FW_IDs.length; i++) {
									this.elements[FW_IDs[i].id] = FW_IDs[i];
								}
							};

	this.bookTitle          = 'About JavaScript tutorial for programmers - Interactive version';
	this.bookChapters       = { '1'         : 'About JavaScript tutorial for programmers',
					            '2'         : 'Introduction to JavaScript basics',
					            '3'         : 'Functions',
					            '4'         : 'Classes and Objects',
					            '5'         : 'HTML DOM (Document Object Model)',
					            '6'         : 'BOM (Browser Object Model)',
					            '7'         : 'AJAX and JSON',
					            '8'         : 'Extras (RegExp, Cookies...)',
					            '9'         : 'References' };

	this.chapterFilePrefix = 'chapter-';
	this.chapterPath       = './chapters/';
	this.iconPath          = './images/';
	this.modalPath         = './modals/';
	this.closeModalChr     = 'X';

	this.leftNavi          = {};
	this.leftNaviIDs       = ['book-contents', 'help', 'settings', 'information'];
	this.leftNaviIcons     = ['icon-contents.png', 'icon-question.png', 'icon-settings.png', 'icon-information.png'];
	this.leftNaviTooltips  = ['Show book chapters', 'Help, how to use interface', 'Settings for interactive book', 'Information about author and book'];

	this.settingsTitle     = "Settings";
	this.bookSettings      = { 'currentChapter'      : { 'title'         : 'Remember Chapter',
                                                         'value'         : 1,
                                                         'setting-value' : true,
                                                         'iconTrue'      : 'icon-toggle-on.png',
                                                         'iconFalse'     : 'icon-toggle-off.png',
                                                         'type'          : 'checkbox' },
                               'chapterScrollAmount' : { 'title'         : 'Remember position in Chapter',
                                                         'value'         : 0,
                                                         'setting-value' : true,
                                                         'iconTrue'      : 'icon-toggle-on.png',
                                   	                     'iconFalse'     : 'icon-toggle-off.png',
                                   	                     'type'          : 'checkbox' } };

	this.bottomNavi        = {};
	this.bottomNaviIDs     = ['left-disabled', 'right-disabled', 'left-enabled', 'right-enabled'];
	this.bottomNaviIcons   = ['icon-arrow-left-disabled-small.png', 'icon-arrow-right-disabled-small.png', 'icon-arrow-left-small.png','icon-arrow-right-small.png'];

	this.interfaceIcons    = ['icon-scroll-top.png'];
	this.cookieName        = "JS_Notebook";
	this.cookieSettings    = ';path=/Interactive-book/; expires=Mon, 20 Jan 2021 12:00:00UTC';
	this.enableCookiesTxt  = "To use settings, please enable cookies and reload page";
	this.wheelScrollAmount = 18;
	this.bottomNaviWidth   = 110;
	this.viewPortWidth     = 1920;
	this.viewPortHeight    = 1080;
	this.dynamicFonts      = { 'title'                 : 40,
							   'settings-header'       : 36,
							   'modal-full-screen'     : 36,
							   'modal'                 : 12,
							   'big-txt'               : 20,
					           'chapter-title'         : 40,
	                           'chapter-sub-title'     : 24, 
	                           'chapter-section-title' : 18, 
	                           'chapter-content'       : 16,
	                           'notice'                : 16,
	                           'quote'                 : 16,
	                           'quote-by'              : 15.36,
	                           'padding-horizontal'    : 16,	                           
	                           'previous-chapter'      : 16,
	                           'next-chapter'          : 16,
	                           'tooltip-text'          : 16 };
	this.init();
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Required functions to build interactive book framework based on settings. After DOM has finished
 * loading, use self-invoked function for automation.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


window.onload = function() {
	(function(){
		IB.settings = new IB_Settings();
		IB.settings.elements['close-full-screen-modal'].innerHTML = IB.settings.closeModalChr;
		createLeftNaviBar();
		createBookContent();
		window.addEventListener('resize', updateViewportSize);
		setInterval(checkJSEnabled, checkJSEnabled());
	})();
}


// Check if JavaScript is disabled during viewing the page
function checkJSEnabled() {
	var refreshElement = document.querySelector('meta[http-equiv="refresh"]');
	var refreshInterval = Number(refreshElement.getAttribute('content'));
	refreshElement.parentElement.removeChild(refreshElement);

	let headElement = document.getElementsByTagName('head')[0].appendChild(document.createElement('meta'));
	headElement.setAttribute('http-equiv', 'refresh');
	headElement.setAttribute('content', refreshInterval);
	return refreshInterval * 1000 - 1000;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Left navigation bar functions
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


function createLeftNaviBar() {
	for(let i = 0; i < IB.settings.leftNaviIDs.length; i++) {
		// Add Icons, actions and tooltips to build menubar
		let iconElement = IB.settings.elements['left-sidebar'].appendChild(document.createElement('img'));
		iconElement.addEventListener('click', showModal(IB.settings.leftNaviIDs[i]));
		iconElement.addEventListener('click', hideTooltips);
		iconElement.setAttribute("src", IB.settings.iconPath + IB.settings.leftNaviIcons[i]);
		iconElement.setAttribute("class", "icon");
		iconElement.onmouseover = handleTooltips(IB.settings.leftNaviIDs[i]);
		iconElement.onmouseout = hideTooltips(IB.settings.leftNaviIDs[i]);

		let tooltipElement = IB.settings.elements['tooltip-container'].appendChild(document.createElement('span'));
		tooltipElement.setAttribute("class", "tooltip-text");
		tooltipElement.setAttribute("id", IB.settings.leftNaviIDs[i]);
		tooltipElement.innerHTML = IB.settings.leftNaviTooltips[i];
		tooltipElement.style.top = ((iconElement.offsetHeight + iconElement.offsetHeight * i) - iconElement.offsetHeight / 2) + 'px';

		IB.settings.leftNavi[`${IB.settings.leftNaviIDs[i]}`] = 
											{ 'icon'            : IB.settings.leftNaviIcons[i],
											  'tooltip'         : IB.settings.leftNaviTooltips[i],
											  'icon-element'    : iconElement,
											  'tooltip-element' : tooltipElement };
	}
}

function handleTooltips(tooltip) {
	return function() {
		for(let i = 0; i < IB.settings.leftNaviIDs.length; i++) {
			if(tooltip == IB.settings.leftNaviIDs[i]) {
				IB.settings.leftNavi[tooltip]['tooltip-element'].style.display = "block";
			}
		}
	}
}

function hideTooltips() {
	return function() {
		for(let id in IB.settings.leftNaviIDs) {
			IB.settings.leftNavi[`${IB.settings.leftNaviIDs[id]}`]['tooltip-element'].style.display = "none";
		}
	}
}

function showModal(action) {
	return function() {
		switch(action) {
			case 'book-contents':
				for(let chapter in IB.settings.bookChapters) {
					IB.settings.elements['modal-full-screen'].innerHTML += '<span onclick="loadChapter(' + chapter + ', false)">' + IB.settings.bookChapters[chapter] + '</span>';
				}
				break;
			case 'help':
			case 'information':				
				loadModalContent(action);
				break;
			case 'settings':
				if(IB.settings.elements['left-sidebar-settings'].firstChild === null) {
					createSettings();
				} else {
					if(IB.settings.elements['left-sidebar-settings'].style.visibility == "hidden") {
		       			IB.settings.elements['left-sidebar-settings'].style.animation = "settings-open 0.7s linear";
					   	IB.settings.elements['left-sidebar-settings'].style.width = "25vw";
			       		IB.settings.elements['left-sidebar-settings'].style.opacity = 1;
						IB.settings.elements['left-sidebar-settings'].style.visibility = "visible";
					} else {
				    	IB.settings.elements['left-sidebar-settings'].style.animation = "settings-close 0.7s linear";
					   	IB.settings.elements['left-sidebar-settings'].style.width = 0;
					    IB.settings.elements['left-sidebar-settings'].style.opacity = 0;
			       		setTimeout(function() {
							IB.settings.elements['left-sidebar-settings'].style.visibility = "hidden";
						}, 1000);
					}
				}
				break;
		}
		
		if(action != 'settings') {
			IB.settings.elements['modal-full-screen'].style.display = "block";
    		IB.settings.elements['close-full-screen-modal'].style.display = "block";
    		IB.settings.elements['left-sidebar-settings'].style.visibility = "hidden";
    		IB.settings.elements['left-sidebar-settings'].style.animation = "settings-close 0.7s linear";
    		IB.settings.elements['left-sidebar-settings'].style.width = 0;
    		IB.settings.elements['left-sidebar-settings'].style.opacity = 0;
    	}

		if(action != 'help' && action != 'information')
			updateViewportSize();
	}
}

function loadModalContent(content) {
	myAJAX.onreadystatechange = function() {
		IB.settings.elements['modal'].style.display = 'block';
		IB.settings.elements['modal'].innerHTML = myAJAX.responseText;
		updateViewportSize();
	}
	myAJAX.open("POST", IB.settings.modalPath + content + '.html', false);
	myAJAX.send();
}

function createSettings() {
	let settingElement = IB.settings.elements['left-sidebar-settings'].appendChild(document.createElement("span"));
	settingElement.setAttribute("class", "chapter-title center");
	settingElement.setAttribute("id", "chapter-title");
	settingElement.style.display = "block";
	settingElement.style.fontWeight = "bold";
	settingElement.innerHTML = IB.settings.settingsTitle;

	if(navigator.cookieEnabled)
		handleSettings();

	for(setting in IB.settings.bookSettings) {
		let settingTextElement = IB.settings.elements['left-sidebar-settings'].appendChild(document.createElement("span"));
		settingTextElement.setAttribute("class", "chapter-sub-title clear-both left");
		settingTextElement.innerHTML = IB.settings.bookSettings[setting]['title'];

		let settingActionElement = IB.settings.elements['left-sidebar-settings'].appendChild(document.createElement("img"));
		switch(IB.settings.bookSettings[setting]['type']) {
			case 'checkbox':
				settingActionElement.src = (IB.settings.bookSettings[setting]['setting-value'] && navigator.cookieEnabled) ? IB.settings.iconPath + IB.settings.bookSettings[setting]['iconTrue'] : IB.settings.iconPath + IB.settings.bookSettings[setting]['iconFalse'];
				settingActionElement.setAttribute("class", "clear-both right icon");
				if(navigator.cookieEnabled)
					settingActionElement.onclick = handleCheckboxSetting(settingActionElement, setting, IB.settings.bookSettings[setting]['setting-value']);
				break;
		}
	}

	IB.settings.elements['left-sidebar-settings'].style.animation = "settings-open 0.7s linear";
   	IB.settings.elements['left-sidebar-settings'].style.width = "25vw";
   	IB.settings.elements['left-sidebar-settings'].style.opacity = 1;
	IB.settings.elements['left-sidebar-settings'].style.visibility = "visible";

	if(!navigator.cookieEnabled) {
		let cookiesEnabledElement = IB.settings.elements['left-sidebar-settings'].appendChild(document.createElement("span"));
		cookiesEnabledElement.setAttribute("class", "chapter-sub-title clear-both center");
		cookiesEnabledElement.innerHTML = IB.settings.enableCookiesTxt;
	}

}

function handleCheckboxSetting(element, setting, value) {
	return function() {
		IB.settings.bookSettings[setting]['setting-value'] = !IB.settings.bookSettings[setting]['setting-value'];
		element.src = IB.settings.bookSettings[setting]['setting-value'] ? IB.settings.iconPath + IB.settings.bookSettings[setting]['iconTrue'] : IB.settings.iconPath + IB.settings.bookSettings[setting]['iconFalse'];		
		handleSettings(true);
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Book content functions
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


function createBookContent() {
	IB.settings.elements['title'].innerHTML = IB.settings.bookTitle;

	handleSettings();
	createBottomNavi();
	loadChapter(IB.settings.bookSettings.currentChapter.value);

	IB.settings.elements['close-full-screen-modal'].addEventListener('click', closeModals);
	IB.settings.elements['main-container'].addEventListener('click', function() { 
		IB.settings.elements['left-sidebar-settings'].style.animation = "settings-close 0.7s linear";
		IB.settings.elements['left-sidebar-settings'].style.width = 0;
		IB.settings.elements['left-sidebar-settings'].style.opacity = 0;
		setTimeout(function() {
			IB.settings.elements['left-sidebar-settings'].style.visibility = "hidden";
		}, 1000);
	});
	IB.settings.elements['chapter-content'].addEventListener("wheel", scrollWithMouseWheel, {passive: true});
	document.addEventListener("keydown", (event) => { scrollWithKey(event); });
	IB.settings.elements['scroll-to-top'].addEventListener("click", scrollToTop);
}

function closeModals() {
		IB.settings.elements['modal-full-screen'].style.display = "none";
		IB.settings.elements['modal-full-screen'].innerHTML = "";
		IB.settings.elements['modal'].style.display = "none";
		IB.settings.elements['modal'].style.innerHTML = "none";
		IB.settings.elements['close-full-screen-modal'].style.display = "none";		
}

function createBottomNavi() {
	let i = 0, bottomNaviElement;
	for(i = 0; i < IB.settings.bottomNaviIDs.length; i++) {
		if(i % 2 == 0)
			bottomNaviElement = IB.settings.elements['main-container-footer-left'].appendChild(document.createElement('img'));
		else
			bottomNaviElement = IB.settings.elements['main-container-footer-right'].appendChild(document.createElement('img'));
		
		bottomNaviElement.setAttribute('src', IB.settings.iconPath + IB.settings.bottomNaviIcons[i]);
		bottomNaviElement.setAttribute('class', 'icon ' + IB.settings.bottomNaviIDs[i]);
		bottomNaviElement.style.display = 'none';
		

		if(!i)
			bottomNaviElement.style.display = "block";

		if(i % 2 == 0 && i > 2)
			bottomNaviElement.style.display = "block";

		if(IB.settings.bottomNaviIDs[i] == 'left-enabled' || IB.settings.bottomNaviIDs[i] == 'right-enabled')
			bottomNaviElement.onclick = bottomNavi(IB.settings.bottomNaviIDs[i]);

		IB.settings.bottomNavi[`${IB.settings.bottomNaviIDs[i]}`] = 
											{ 'icon'    : IB.settings.bottomNaviIcons[i],
											  'element' : bottomNaviElement };
	}
}

function initializeBottomNavi() {
	let index = 0, length = 0, subChapters;

	if(IB.subChapters.length > 0) {
		while(IB.settings.elements['main-container-footer-middle'].firstChild) {
			IB.settings.elements['main-container-footer-middle'].removeChild(IB.settings.elements['main-container-footer-middle'].firstChild);
		}
		IB.subChapterIndex = 0;
	}

	IB.subChapters = [];
	subChapters = document.getElementsByClassName('chapter-sub-title');

	while(index < subChapters.length) {
		bottomNaviElement = IB.settings.elements['main-container-footer-middle'].appendChild(document.createElement('span'));
		bottomNaviElement.onclick = scrollContent(subChapters[index].offsetTop + 100);
		bottomNaviElement.innerHTML = subChapters[index].textContent;
		bottomNaviElement.setAttribute("class", "left padding-horizontal");

		length += subChapters[index].innerText.length;

		if(length > IB.settings.bottomNaviWidth) {
			bottomNaviElement.style.display = "none";
			IB.settings.bottomNavi['right-enabled'].element.style.display = "block";
			if(IB.subChapterIndex == 0)
				IB.subChapterIndex = index;
		} else {
			IB.settings.bottomNavi['right-enabled'].element.style.display = "none";
			IB.settings.bottomNavi['right-disabled'].element.style.display = "block";
		}

		IB.subChapters.push(bottomNaviElement);
		index++;
	}

	IB.settings.bottomNavi['left-disabled'].element.style.display = "block";
	IB.settings.bottomNavi['left-enabled'].element.style.display = "none";
	if(IB.settings.bottomNavi['right-enabled'].element.style.display == "block" && length > IB.settings.bottomNaviWidth) {
		IB.settings.bottomNavi['right-disabled'].element.style.display = "none";
		IB.settings.bottomNavi['right-enabled'].element.style.display = "block";
	}
}

function bottomNavi(naviDirection = "right-enabled") {
	return function() {
		let counter = 0, continueIndex = 0;

		if(IB.subChapterIndex == IB.subChapters.length)
			IB.subChapterIndex = IB.subChapters.length - 1;
		switch(naviDirection) {
			case 'left-enabled':
				for(let i = 0; i < IB.subChapters.length; i++) {
					IB.subChapters[i].style.display = "none";
				}
				
				continueIndex = IB.subChapterIndex -= IB.subChapterLastItems;

				while(1) {
					counter += IB.subChapters[continueIndex].innerText.length;
					if(counter > IB.settings.bottomNaviWidth)
						break;
					IB.subChapters[continueIndex].style.display = "block";
					if(--continueIndex < 0) {
						continueIndex = 0;
						break;
					}
				}

				if(IB.subChapterIndex > 0) {
					IB.settings.bottomNavi['right-disabled'].element.style.display = "none";
					IB.settings.bottomNavi['right-enabled'].element.style.display = "block";					
				}

				if(continueIndex == 0){
					IB.settings.bottomNavi[`${naviDirection}`].element.style.display = "none";
					IB.settings.bottomNavi['left-disabled'].element.style.display = "block";
				}

				IB.subChapterIndex++;
				break;
			case 'right-enabled':
				let itemCount = 0;

				for(let i = 0; i < IB.subChapters.length; i++) {
					IB.subChapters[i].style.display = "none";
				}

				while(1) {
					if(IB.subChapterIndex == IB.subChapters.length) {
						IB.subChapterIndex--;
						break;
					}
					
					counter += IB.subChapters[IB.subChapterIndex].innerText.length;
					
					if(counter > IB.settings.bottomNaviWidth) {
						IB.subChapterIndex--;
						break;
					}
					
					IB.subChapters[IB.subChapterIndex++].style.display = "block";
					itemCount++;
				}


				if(IB.subChapterIndex + 1 == IB.subChapters.length) {
					IB.settings.bottomNavi[`${naviDirection}`].element.style.display = "none";
					IB.settings.bottomNavi['right-disabled'].element.style.display = "block";
				}

				IB.settings.bottomNavi['left-disabled'].element.style.display = "none";
				IB.settings.bottomNavi['left-enabled'].element.style.display = "block";
				IB.subChapterLastItems = itemCount;
				break;
		}
	}
}


var nextChapter = function nextChapterListener() {
   	IB.settings.elements['next-chapter'].removeEventListener("click", nextChapter);
	return loadChapter(Number(IB.settings.bookSettings.currentChapter.value) + 1, false);
}

var previousChapter = function previousChapterListener() {
	IB.settings.elements['previous-chapter'].removeEventListener("click", previousChapter);
    return loadChapter(Number(IB.settings.bookSettings.currentChapter.value) - 1, false);
}

function loadChapter(chapter, _continue_ = true) {
	myAJAX.onreadystatechange = function() {
		if(myAJAX.readyState == 4 && myAJAX.status == 200) {
			let naviElementHeight = 0;
			IB.settings.elements['chapter-content'].innerHTML = formatChapter(myAJAX.responseText);

		    if(IB.settings.bookSettings.currentChapter.value == 1 ) {
		    	IB.settings.elements['previous-chapter'].style.display = "none";
		    } else {
		    	IB.settings.elements['previous-chapter'].style.display = "block";
		    	IB.settings.elements['previous-chapter'].innerHTML = 'Chapter ' + (IB.settings.bookSettings.currentChapter.value - 1) + ': ' + IB.settings.bookChapters[IB.settings.bookSettings.currentChapter.value - 1];
		    	IB.settings.elements['previous-chapter'].addEventListener("click", previousChapter);
		    	naviElementHeight = IB.settings.elements['previous-chapter'].offsetHeight;
		    }

		    if(IB.settings.bookSettings.currentChapter.value == Object.keys(IB.settings.bookChapters).length) {
		    	IB.settings.elements['next-chapter'].style.display = "none";
		    } else {
		    	IB.settings.elements['next-chapter'].style.display = "block";
		    	IB.settings.elements['next-chapter'].innerHTML = 'Chapter ' + (IB.settings.bookSettings.currentChapter.value + 1) + ': ' + IB.settings.bookChapters[IB.settings.bookSettings.currentChapter.value + 1];
		    	IB.settings.elements['next-chapter'].addEventListener("click", nextChapter);
		    	naviElementHeight = IB.settings.elements['next-chapter'].offsetHeight;
		    }

			IB.settings.elements['change-chapter-container'].style.top = (IB.settings.elements['chapter-content'].scrollHeight == IB.settings.elements['chapter-content'].clientHeight) ? -naviElementHeight / 2 + 'px' : IB.settings.elements['chapter-content'].scrollHeight - IB.settings.elements['chapter-content'].clientHeight + 'px';

		    handleSettings(true);

			if(_continue_ && IB.settings.bookSettings.chapterScrollAmount.value)
				IB.settings.elements['chapter-container'].scrollTop = IB.settings.bookSettings.chapterScrollAmount.value;

			initializeBottomNavi();
			hideTooltips();
			updateViewportSize();
		}
	}
    
    IB.settings.bookSettings.currentChapter.value = (chapter == 0) ? 1 : chapter;
	
	myAJAX.open("POST", IB.settings.chapterPath + IB.settings.chapterFilePrefix + IB.settings.bookSettings.currentChapter.value + '.html', false);
	myAJAX.send();
    
    IB.settings.elements['modal-full-screen'].style.display = 'none';
    IB.settings.elements['modal-full-screen'].innerHTML = '';
    IB.settings.elements['close-full-screen-modal'].style.display = 'none';
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Miscallenaous functions. Settings are saved in cookies
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function replacer(match, matchesFound) {
	console.log(match + ' -> ' + matchesFound);
	return '<b>' + match + '</b>';
}

function formatChapter(chapterHTML) {
	chapterPattern = /Description:|Parameters:|Example usage:|Return value:/g;
	var myArray;
	var i = 0;
	var newStr = chapterHTML.replace(chapterPattern, replacer);
	return newStr;
//	var str = ;
//	while((myArray = chapterPattern.exec(chapterHTML)) !== null) {
//		console.log('Found "' + myArray[0] + '" at starting index: ' + (chapterPattern.lastIndex - myArray[0].length) + ' end index: ' + chapterPattern.lastIndex)
//	}

//	return chapterHTML;
}

function handleSettings(save = false) {
	if(!navigator.cookieEnabled)
		return 0;

	let saveSettings = {};

	for(let setting in IB.settings.bookSettings) {
			saveSettings[setting] = IB.settings.bookSettings[setting];
			saveSettings[setting]['setting-value'] = IB.settings.bookSettings[setting]['setting-value'];
			saveSettings[setting]['value'] = IB.settings.bookSettings[setting]['value'];
	}

	if(!document.cookie)
		save = true;

	if(save) {
		document.cookie = IB.settings.cookieName + '=' + JSON.stringify(saveSettings);
	} else {
		let cookies = document.cookie.split(';');

		for(let i = 0; i < cookies.length; i++) {
			if(IB.settings.cookieName === cookies[i].trim().split('=')[0]) {
				let saveSettings = JSON.parse(cookies[i].trim().split('=')[1]);

				for(let setting in IB.settings.bookSettings ) {
					if(IB.settings.bookSettings[setting]['setting-value'] = saveSettings[setting]['setting-value'])
						IB.settings.bookSettings[setting]['value'] = saveSettings[setting]['value'];
					else
						IB.settings.bookSettings[setting]['value'] = 0;
				}
			}
		}
	}
}


// Functions for scrolling book content with either mousewheel, keyboard keys, chapter sub sections or icon
function scrollWithMouseWheel(event) {
	// Are we scrolling up or down?
	if(event.deltaY < 0)
		IB.settings.elements['chapter-container'].scrollTop -= IB.settings.viewPortHeight / 100 * IB.settings.wheelScrollAmount;
	else
		IB.settings.elements['chapter-container'].scrollTop += IB.settings.viewPortHeight / 100 * IB.settings.wheelScrollAmount;
	
	if(IB.settings.elements['chapter-container'].scrollTop > 0)
		Object.assign(IB.settings.elements['scroll-to-top'].style, {visibility:'visible',opacity: 1});
	else
		Object.assign(IB.settings.elements['scroll-to-top'].style, {visibility:'hidden',opacity: 0});

	if(IB.settings.bookSettings.chapterScrollAmount['setting-value'])
		IB.settings.bookSettings.chapterScrollAmount.value = IB.settings.elements['chapter-container'].scrollTop;

	handleSettings(true);
}

function scrollWithKey(event) {
	switch(event.key) {
		case 'PageDown':
			IB.settings.elements['chapter-container'].scrollTop += 200;
			break;
		case 'PageUp':
			IB.settings.elements['chapter-container'].scrollTop -= 200;
			break;
		case 'ArrowDown':
			IB.settings.elements['chapter-container'].scrollTop += 20;
			break;
		case 'ArrowUp':
			IB.settings.elements['chapter-container'].scrollTop -= 20;
			break;
		case 'Home':
			IB.settings.elements['chapter-container'].scrollTop = 0;
			break;						
		case 'End':
			IB.settings.elements['chapter-container'].scrollTop = IB.settings.elements['chapter-container'].offsetHeight;
			break;
	}
	handleSettings(true);
}

function scrollContent(amount) {
	return function() {
		IB.settings.bookSettings['chapterScrollAmount'].value = amount;
		IB.settings.elements['chapter-container'].scrollTo({top: (amount-100), left: 0, behavior: "smooth"});
		handleSettings(true);
	}
}

function scrollToTop() {
	IB.settings.elements['chapter-container'].scrollTo({top:0,left:0,behavior:"smooth"});
	Object.assign(IB.settings.elements['scroll-to-top'].style, {visibility:'hidden',opacity: 0});
	handleSettings(true);
}


// Handle font sizes dynamically with JavaScript
function updateViewportSize() {	
	for(let element in IB.settings.dynamicFonts) {
		let classElements;

		classElements = document.getElementsByClassName(element);
		if(classElements.length > 0) {
			for(let i = 0; i < classElements.length; i++) {
				classElements[i].style.fontSize = (Number(IB.settings.dynamicFonts[element] / (IB.settings.viewPortWidth / window.innerWidth)) < IB.settings.dynamicFonts[element]) ? Number(IB.settings.dynamicFonts[element] / (IB.settings.viewPortWidth / window.innerWidth)) + 'px' : IB.settings.dynamicFonts[element];
				classElements[i].style.lineHeight = Number(IB.settings.dynamicFonts[element] / (IB.settings.viewPortWidth / window.innerWidth)) * 2 + 'px';
			}
		}
	}
}

/* * * * * * * * * * * * * * * *
 * Non framework functions     *
 * * * * * * * * * * * * * * * */