/*** BOOL ***/

let boolDisplayTime = true;

let startStopTimer = false;

let alarmONOFF = false;

let eventONOFF = false;

let boolClearAlarm = false;

let boolClearEvent = false;

let boolDoomsDay = false;

/*** NUMERIC ***/

let counter = 0;

let function1ClickCount = 0;

let totalSeconds = 0;

let alarmHour = 0;
let alarmMinute = 0;

let eventHour = 0;
let eventMinute = 0;

let eventMonth = 0;
let eventDay = 0;

let minHour = 0;
let minMinute = 0;

let minMonth = 1; // 0 = January
let minDay = 1; //
let minYear = 1970;

let maxHour = 23;
let maxMinute = 59;

let maxMonth = 12; // 11 = Deceneber
let numDays = 0; // Max Day
let maxYear = 2072;

let tempHour = 0;
let tempMinute = 0;

let tempMonth = 0;
let tempDay = 0;

let tempDate = new Date();

let tempYear = parseInt(tempDate.getFullYear());

let eventYear = tempYear;

/*** DATE ***/

let eventDate = new Date();

/*** STRING ***/

let currentFunction = "none";

let displayHours = "00";
let displayMinutes = "00";
let displaySeconds = "00";

/*** DOCUMENT ELEMENTS ***/

let alarmEventScreen = document.querySelector(".center");

let displayTimeScreen = document.querySelector(".home-screen");
let displayTimerScreen = document.querySelector(".timer-screen");

let displayTime = document.querySelector(".time-display");
let displayTimer = document.querySelector(".timer-display");

let functionScreen = document.querySelector(".function-screen");
let functionTitleContainer = document.querySelector(
	".function-title-container"
);
let functionTitle = document.querySelector(".function-title");

let dateInputScreen = document.querySelectorAll(".date-function");
let timeInputScreen = document.querySelectorAll(".time-function");

let internetScreen = document.querySelectorAll(".internet-screen");

let clearButton = document.querySelector(".clear-button-container");

let doomLabel = document.querySelector("#doom-label");

let leftButton = document.querySelector("#left-button");
let middleButton = document.querySelector("#middle-button");
let rightButton = document.querySelector("#right-button");

let functionButton1 = document.querySelector("#function1");
let functionButton2 = document.querySelector("#function2");
let functionButton3 = document.querySelector("#function3");

let submitClearButtons = document.querySelector(".btn-small");

/*** END OF DOCUMENT ELEMENTS ***/

/*** START OF FUNCTION BUTTONS ***/

function function1Click() {
	// SET BUTTON

	switch (currentFunction) {
		case "alarm":
			alarmONOFF = true;
			alarmHour = tempHour;
			alarmMinute = tempMinute;

			functionTitle.innerHTML = "ALARM SET";

			break;

		case "event":
			eventONOFF = true;
			eventHour = parseInt(tempHour);
			eventMinute = parseInt(tempMinute);
			eventMonth = parseInt(tempMonth - 1);
			eventDay = parseInt(tempDay);
			eventYear = parseInt(tempYear);

			functionTitle.innerHTML = "EVENT SET";

			break;

		case "timer":
			if (function1ClickCount === 0) {
				functionButton1.classList.remove("startTimer");
				functionButton1.classList.add("stopTimer");
				startStopTimer = true;
				function1ClickCount++;
			} else {
				functionButton1.classList.remove("stopTimer");
				functionButton1.classList.add("startTimer");
				startStopTimer = false;
				function1ClickCount = 0;
			}

			break;
	}
}

function function2Click() {
	// RESET/CLEAR BUTTON

	switch (currentFunction) {
		case "alarm":
			alarmONOFF = false;

			alarmHour = 0;
			alarmMinute = 0;

			tempHour = 0;
			tempMinute = 0;

			updateHour();
			updateMinute();

			functionTitle.innerHTML = "ALARM CLEARED";

			break;

		case "event":
			eventONOFF = false;

			eventHour = 0;
			eventMinute = 0;

			tempHour = 0;
			tempMinute = 0;

			updateHour();
			updateMinute();

			eventMonth = 0;
			eventDay = 0;
			eventYear = parseInt(tempDate.getFullYear());

			tempMonth = 0;
			tempDay = 0;
			tempYear = eventYear;

			updateMonth();
			updateDay();
			updateYear();

			functionTitle.innerHTML = "EVENT CLEARED";

			break;

		case "timer":
			resetTimer();

			displayTimer.innerHTML = "00:00:00";

			break;
	}
}

function function3Click() {
	// BACK BUTTON

	switch (currentFunction) {
		case "alarm":
			removeAlarmIcons();

			hideAlarmDisplay();

			hideFunctionScreen();

			tempHour = 0;

			tempMinute = 0;

			functionTitle.innerHTML = "";

			boolDisplayTime = true;

			break;

		case "event":
			removeAlarmIcons();

			hideEventDisplay();

			hideFunctionScreen();

			tempHour = 0;
			tempMinute = 0;

			tempMonth = 0;
			tempDay = 0;
			tempYear = parseInt(tempDate.getFullYear());

			functionTitle.innerHTML = "";

			hideDoomsDay();

			boolDisplayTime = true;

			break;

		case "timer":
			removeTimerIcons();

			hideFunctionScreen();

			hideTimerDisplay();

			boolDisplayTime = true;

			break;

		case "internet":
			hideInternetScreen();

			hideFunctionScreen();

			boolDisplayTime = true;

			break;
	}

	currentFunction = "none";
}

/*** END OF FUNCTION BUTTONS ***/

/*** START OF TIME AND TIMER FUNCTIONS ***/

setInterval(getCurrentTime, 1000);

function getCurrentTime() {
	let date = new Date();

	let currentTime = date.toLocaleTimeString();

	// Delay for alarm and event reset
	if (!boolClearAlarm) {
		checkAlarm(date);
	}

	if (!boolClearEvent) {
		checkEvent(date);
	}

	displayTimeOrFunction(currentTime);
}

function displayTimeOrFunction(currentTime) {
	displayTime.innerHTML = currentTime;

	boolDisplayTime ? showTimeDisplay() : hideTimeDisplay();
}

let setTimer = setInterval(timer, 1000);

function othername() {
    var HR = document.getElementById("HR").value;
    sessionStorage.setItem("HR", HR);
    alert("HR Value is"+" "+HR);
    var PPG = document.getElementById("PPG").value;
    sessionStorage.setItem("PPG", PPG);
    alert("PPG Value is"+" "+PPG);    
    var EDA = document.getElementById("EDA").value;
    sessionStorage.setItem("EDA", EDA);
    alert("EDA Value is"+" "+EDA);
    redirect();
    
}

function redirect()
{
  location.replace(indexnew.html)
}

function timer() {
	if (startStopTimer) {
		totalSeconds++;

		let hours = Math.floor(totalSeconds / 3600);

		let minutes = Math.floor((totalSeconds - hours * 3600) / 60);

		let seconds = totalSeconds - (hours * 3600 + minutes * 60);

		if (hours < 10) {
			displayHours = "0" + hours;
		} else {
			displayHours = hours;
		}

		if (minutes < 10) {
			displayMinutes = "0" + minutes;
		} else {
			displayMinutes = minutes;
		}

		if (seconds < 10) {
			displaySeconds = "0" + seconds;
		} else {
			displaySeconds = seconds;
		}

		displayTimer.innerHTML =
			displayHours + ":" + displayMinutes + ":" + displaySeconds;
	}
}

function loadTimer() {
	// Sets the watch to the timer function

	boolDisplayTime = false;

	currentFunction = "timer";

	showFunctionScreen();

	addTimerIcons();

	if (totalSeconds < 1) {
		displayTimer.innerHTML = "00:00:00";
	}

	showTimerDisplay();
}

function resetTimer() {
	totalSeconds = 0;
}
/*** END OF TIME AND TIMER FUNCTIONS ***/

/*** START OF FUNCTION FEATURES ***/

let hourField = document.querySelector("#hour-field");
let minuteField = document.querySelector("#minute-field");

let monthField = document.querySelector("#month-field");
let dayField = document.querySelector("#day-field");
let yearField = document.querySelector("#year-field");

let doomSelect = document.querySelectorAll(".doom-select");
let doomCheckbox = document.querySelector("#doom-checkbox");

function setDoomsday() {
	doomCheckbox.checked ? (boolDoomsDay = true) : (boolDoomsDay = false);
}

function activateAlarm() {
	currentFunction = "alarm";

	boolDisplayTime = false;

	alarmEventScreen.classList.add("alarm");
	clearButton.classList.add("show");
}

function activateEvent() {
	currentFunction = "event";

	boolDisplayTime = false;

	boolDoomsDay
		? alarmEventScreen.classList.add("doomsDay")
		: alarmEventScreen.classList.add("celebration");

	clearButton.classList.add("show");
}

function checkAlarm(date) {
	if (alarmONOFF) {
		let thisHour = date.getHours();
		let thisMinute = date.getMinutes();

		if (thisHour == alarmHour && thisMinute == alarmMinute) {
			activateAlarm();
		}
	}
}
function checkEvent(date) {
	if (eventONOFF) {
		let thisMonth = date.getMonth();
		let thisDay = date.getDate();
		let thisYear = date.getFullYear();

		let thisHour = date.getHours();
		let thisMinute = date.getMinutes();

		if (
			thisMonth == eventMonth &&
			thisDay == eventDay &&
			thisYear == eventYear &&
			thisHour == eventHour &&
			thisMinute == eventMinute
		) {
			activateEvent();
		}
	}
}

function clearAlarmEvent() {
	switch (currentFunction) {
		case "alarm":
			boolClearAlarm = true;

			alarmEventScreen.classList.remove("alarm");

			// Disable alarm check for 1 minute

			setTimeout(function () {
				boolClearAlarm = false;
			}, 60000);

			break;

		case "event":
			boolClearEvent = true;

			if (boolDoomsDay) {
				alarmEventScreen.classList.remove("doomsDay");
			} else {
				alarmEventScreen.classList.remove("celebration");
			}

			// Disable event check for 1 minute
			setTimeout(function () {
				boolClearEvent = false;
			}, 60000);

			break;
	}

	currentFunction = "none";

	boolDisplayTime = true;

	clearButton.classList.remove("show");
	clearButton.classList.add("hide");
}

function setAlarm() {
	currentFunction = "alarm";

	boolDisplayTime = false;

	functionTitle.innerHTML = "ALARM";

	closeSideNav();

	addAlarmIcons();

	showAlarmDisplay();

	tempHour = alarmHour;
	tempMinute = alarmMinute;
}

function setEvent() {
	currentFunction = "event";

	boolDisplayTime = false;

	functionTitle.innerHTML = "EVENT";

	closeSideNav();

	addAlarmIcons();

	showEventDisplay();

	showDoomsDay();

	tempHour = eventHour;
	tempMinute = eventMinute;

	if (eventMonth > 0 && eventDay > 0) {
		tempMonth = eventMonth + 1; // SET MONTH TO 1 - 12 FROM 0 - 11
	}

	tempDay = eventDay;
	tempYear = parseInt(eventYear);
}

function launchInternet() {
	currentFunction = "internet";

	boolDisplayTime = false;

	hideButtons();

	addInternetIcons();

	showFunctionButtons();

	showInternetScreen();

	showFunctionScreen();
}

function getNumberOfDays(currentMonth, currentYear) {
	/* 0 = Jan, 1 = Feb, 2 = March, 3 = April, 4 = May, 5 = June, 6 = July, 7 = August, 8 = Sep, 9 = Oct,
	 10 = Nov, 11 = Dec; */

	let days = 0;

	let month = currentMonth - 1;

	switch (month) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			days = 31;

			break;

		case 3:
		case 5:
		case 8:
		case 10:
			days = 30;

			break;

		case 1:
			let leap = checkLeapYear(currentYear);

			if (leap) {
				days = 29;
			} else {
				days = 28;
			}

			break;
	}

	return days;
}

function checkLeapYear(currentYear) {
	return true
		? (currentYear % 100 === 0 || currentYear % 400 !== 0) && currentYear % 4 == 0
		: false;
}

function checkDay() {
	if (tempDay > numDays) {
		tempDay = numDays;
		updateDay();
	}
}

/* INCREMENT/DECREMENT BUTTONS */

/* TIME */

function decreaseHour() {
	if (tempHour > minHour) {
		tempHour--;
	} else {
		tempHour = maxHour;
	}
	updateHour();
}

function increaseHour() {
	if (tempHour < maxHour) {
		tempHour++;
	} else {
		tempHour = minHour;
	}
	updateHour();
}

function decreaseMinute() {
	if (tempMinute > minMinute) {
		tempMinute--;
	} else {
		tempMinute = maxMinute;
	}
	updateMinute();
}

function increaseMinute() {
	if (tempMinute < maxMinute) {
		tempMinute++;
	} else {
		tempMinute = minMinute;
	}

	updateMinute();
}

/* DATE */

function decreaseMonth() {
	if (tempMonth > minMonth) {
		tempMonth--;
	} else {
		tempMonth = maxMonth;
	}
	updateMonth();

	numDays = getNumberOfDays(tempMonth);

	checkDay();
}

function increaseMonth() {
	if (tempMonth < maxMonth) {
		tempMonth++;
	} else {
		tempMonth = minMonth;
	}

	updateMonth();

	numDays = getNumberOfDays(tempMonth, tempYear);

	checkDay();
}

function decreaseDay() {
	if (tempDay > minDay) {
		tempDay--;
	} else {
		tempDay = numDays;
	}
	updateDay();
}

function increaseDay() {
	if (tempDay < numDays) {
		tempDay++;
	} else {
		tempDay = minDay;
	}
	updateDay();
}

function decreaseYear() {
	if (tempYear > minYear) {
		tempYear--;
	} else {
		tempYear = parseInt(maxYear);
	}
	updateYear();
}

function increaseYear() {
	if (tempYear < maxYear) {
		tempYear++;
	} else {
		tempYear = pasreInt(minYear);
	}
	updateYear();
}

/* END OF INCREMENT/DECREMENT DATA */

/* UPDATE FIELD DATA */

/* TIME */

function updateHour() {
	let value = "";

	tempHour < 10 ? (value = "0" + tempHour) : (value = tempHour);

	hourField.innerHTML = value;
}

function updateMinute() {
	let value = "";

	tempMinute < 10 ? (value = "0" + tempMinute) : (value = tempMinute);

	minuteField.innerHTML = value;
}

/* DATE */

function updateMonth() {
	let value = "";

	tempMonth < 10 ? (value = "0" + tempMonth) : (value = tempMonth);

	monthField.innerHTML = value;
}

function updateDay() {
	let value = "";

	tempDay < 10 ? (value = "0" + tempDay) : (value = tempDay);

	dayField.innerHTML = value;
}

function updateYear() {
	yearField.innerHTML = tempYear;
}

/*** END OF FUNCTION FEATURES ***/

/*** NAVIGATION ***/

function openSideNav() {
	// Adds the display navigation menu class to sideBarNav

	sideNav = document.getElementById("sideNav");

	sideNav.style.display = "block";

	sideNav.classList.remove("sideNavBarHide");
	sideNav.classList.add("sideNavBarDisplay");
}

function closeSideNav() {
	// Adds the hide navigation menu class to sideNavBar
	sideNav = document.getElementById("sideNav");

	sideNav.classList.remove("sideNavBarDisplay");
	sideNav.classList.add("sideNavBarHide");
}

/*** DISPLAY ***/

/* TIME */
function hideTimeDisplay() {
	displayTimeScreen.classList.remove("show");
	displayTimeScreen.classList.add("hide");
}

function showTimeDisplay() {
	displayTimeScreen.classList.remove("hide");
	displayTimeScreen.classList.add("show");
}

/* TIMER */
function hideTimerDisplay() {
	displayTimerScreen.classList.remove("show");
	displayTimerScreen.classList.add("hide");

	displayTimer.classList.remove("show");
	displayTimer.classList.add("hide");
}

function showTimerDisplay() {
	displayTimerScreen.classList.remove("hide");
	displayTimerScreen.classList.add("show");

	displayTimer.classList.remove("hide");
	displayTimer.classList.add("show");
}

/* ALARM */
function hideAlarmDisplay() {
	hideFunctionScreen();

	functionTitle.classList.remove("center-display");

	timeInputScreen.forEach(function (inputItem) {
		inputItem.classList.remove("show");
		inputItem.classList.add("hide");
	});

	hourField.innerHTML = "";
	minuteField.innerHTML = "";
}

function showAlarmDisplay() {
	showFunctionScreen();

	functionTitle.classList.add("center-display");

	timeInputScreen.forEach(function (inputItem) {
		inputItem.classList.remove("hide");
		inputItem.classList.add("show");
	});

	if (alarmHour == 0 && alarmMinute == 0) {
		hourField.innerHTML = "HH";
		minuteField.innerHTML = "MM";
	}
}

/* EVENT */

function hideEventDisplay() {
	hideFunctionScreen();
	hideDoomsDay();

	dateInputScreen.forEach(function (inputItem) {
		inputItem.classList.remove("show");
		inputItem.classList.add("hide");
	});

	timeInputScreen.forEach(function (inputItem) {
		inputItem.classList.remove("show");
		inputItem.classList.add("hide");
	});

	/*hourField.innerHTML = "";
	minuteField.innerHTML = "";

	monthField.innerHTML = "";
	dayField.innerHTML = "";
	yearField.innerHTML = "";*/
}

function showEventDisplay() {
	showFunctionScreen();

	showDoomsDay();

	dateInputScreen.forEach(function (inputItem) {
		inputItem.classList.remove("hide");
		inputItem.classList.add("show");
	});

	timeInputScreen.forEach(function (inputItem) {
		inputItem.classList.remove("hide");
		inputItem.classList.add("show");
	});

	if (eventHour == 0 && eventMinute == 0) {
		hourField.innerHTML = "HH";
		minuteField.innerHTML = "MM";
	}

	if (eventMonth == 0 && eventDay == 0) {
		monthField.innerHTML = "MM";
		dayField.innerHTML = "DD";
	}

	yearField.innerHTML = tempYear;
}

/* INTERNET */

function hideInternetScreen() {
	internetScreen.forEach(function (inputItem) {
		inputItem.classList.remove("show");
		inputItem.classList.add("hide");
	});
}

function showInternetScreen() {
	internetScreen.forEach(function (inputItem) {
		inputItem.classList.remove("hide");
		inputItem.classList.add("show");
	});
}

/* FUNCTION SCREEN */

function hideFunctionScreen() {
	functionScreen.classList.remove("show");
	functionScreen.classList.add("hide");

	functionTitle.classList.remove("show");
	functionTitle.classList.add("hide");

	hideFunctionButtons();

	showButtons();

	showTimeDisplay();
}

function showFunctionScreen() {
	hideTimeDisplay();

	functionScreen.classList.remove("hide");
	functionScreen.classList.add("show");

	functionTitle.classList.remove("hide");
	functionTitle.classList.add("show");

	hideButtons();

	showFunctionButtons();
}

/* BUTTONS */

function hideButtons() {
	leftButton.classList.remove("show");
	middleButton.classList.remove("show");
	rightButton.classList.remove("show");

	leftButton.classList.add("hide");
	middleButton.classList.add("hide");
	rightButton.classList.add("hide");
}

function showButtons() {
	leftButton.classList.remove("hide");
	middleButton.classList.remove("hide");
	rightButton.classList.remove("hide");

	leftButton.classList.add("show");
	middleButton.classList.add("show");
	rightButton.classList.add("show");
}

function hideFunctionButtons() {
	functionButton1.classList.remove("show");
	functionButton2.classList.remove("show");
	functionButton3.classList.remove("show");

	functionButton1.classList.add("hide");
	functionButton2.classList.add("hide");
	functionButton3.classList.add("hide");
}

function showFunctionButtons() {
	functionButton1.classList.remove("hide");
	functionButton2.classList.remove("hide");
	functionButton3.classList.remove("hide");

	functionButton1.classList.add("show");
	functionButton2.classList.add("show");
	functionButton3.classList.add("show");
}

function addTimerIcons() {
	functionButton1.classList.add("startTimer");
	functionButton2.classList.add("resetTimer");
	functionButton3.classList.add("back");
}

function removeTimerIcons() {
	functionButton1.classList.remove("startTimer");
	functionButton2.classList.remove("resetTimer");
	functionButton3.classList.remove("back");
}

function addAlarmIcons() {
	functionButton1.classList.add("set");
	functionButton1.innerHTML = "SET";
	functionButton2.classList.add("cancel");
	functionButton2.innerHTML = "X";
	functionButton3.classList.add("back");
}

function removeAlarmIcons() {
	functionButton1.classList.remove("set");
	functionButton1.innerHTML = "";
	functionButton2.classList.remove("cancel");
	functionButton2.innerHTML = "";
	functionButton3.classList.remove("back");
}

function addInternetIcons() {
	functionButton3.classList.add("back");
}

function removeInternetIcons() {
	functionButton3.classList.remove("back");
}

function hideDoomsDay() {
	doomSelect.forEach(function (inputItem) {
		inputItem.classList.remove("show");
		inputItem.classList.add("hide");
	});
}

function showDoomsDay() {
	doomSelect.forEach(function (inputItem) {
		inputItem.classList.remove("hide");
		inputItem.classList.add("show");
	});
}

/*** END OF DISPLAY ***/

/*** ACKNOWLEDGEMENTS ***/

/* W3SCHOOLS */
