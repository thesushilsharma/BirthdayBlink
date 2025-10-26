const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const countdown = document.getElementById('countdown');
const birthdayTime = document.getElementById('birthdayTime');
const dateyear = document.getElementById('dateyear');
const yearold = document.getElementById('yearold');
const message = document.getElementById('message');

// Configuration constants
const BIRTH_YEAR = 1999;
const BIRTH_MONTH = 4; // April (1-indexed)
const BIRTH_DAY = 10;
const BIRTH_HOUR = 0;
const BIRTH_MINUTE = 0;
const BIRTH_SECOND = 0;

// Time constants
const TIME_UNITS = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24
};

// Current date info
const currentYear = new Date().getFullYear();

// Function to update date year display
function updateDateYearDisplay(targetYear) {
  if (dateyear) {
    if (targetYear === currentYear) {
      dateyear.innerText = `🎯 Upcoming ${currentYear} 🎯`;
    } else {
      dateyear.innerText = `🔮 Next Year ${targetYear} 🔮`;
    }
  }
}

let timerId;

// Helper functions
function formatTimeUnit(value) {
  return value < 10 ? `0${value}` : value;
}

function calculateAge(year) {
  return year - BIRTH_YEAR;
}

function getTargetBirthday() {
  const now = new Date();
  const thisYearBirthday = new Date(currentYear, BIRTH_MONTH - 1, BIRTH_DAY, BIRTH_HOUR, BIRTH_MINUTE, BIRTH_SECOND);

  if (now > thisYearBirthday) {
    return {
      date: new Date(currentYear + 1, BIRTH_MONTH - 1, BIRTH_DAY, BIRTH_HOUR, BIRTH_MINUTE, BIRTH_SECOND),
      age: calculateAge(currentYear + 1),
      year: currentYear + 1
    };
  }

  return {
    date: thisYearBirthday,
    age: calculateAge(currentYear),
    year: currentYear
  };
}

function isBirthdayToday() {
  const now = new Date();
  return now.getMonth() === BIRTH_MONTH - 1 && now.getDate() === BIRTH_DAY;
}

function showBirthdayMessage() {
  console.log('🎉 Happy Birthday Sushil Sharma! 🎂');

  if (dateyear) dateyear.innerText = `🎉 TODAY ${currentYear} 🎉`;

  if (message) {
    message.innerHTML = `
      <div class="text-center space-y-4">
        <h2 class="text-5xl">🎉 IT'S MY BIRTHDAY! 🎂</h2>
        <p class="text-2xl">Hey everyone! Today marks another amazing year of life!</p>
        <p class="text-xl">Thank you for being part of this incredible journey.</p>
        <p class="text-lg">Here's to making more memories and celebrating life! 🥳</p>
      </div>
    `;
  }

  if (countdown) countdown.style.display = "none";
  if (birthdayTime) birthdayTime.style.display = "none";
  if (yearold) yearold.innerText = `🎈 ${calculateAge(currentYear)} Years Young! 🎈`;

  clearInterval(timerId);
}

function updateCountdownDisplay(timeSpan, targetAge) {
  const day = Math.floor(timeSpan / TIME_UNITS.DAY);
  const hour = Math.floor((timeSpan % TIME_UNITS.DAY) / TIME_UNITS.HOUR);
  const minute = Math.floor((timeSpan % TIME_UNITS.HOUR) / TIME_UNITS.MINUTE);
  const second = Math.floor((timeSpan % TIME_UNITS.MINUTE) / TIME_UNITS.SECOND);

  if (days) days.innerHTML = day;
  if (hours) hours.innerHTML = formatTimeUnit(hour);
  if (minutes) minutes.innerHTML = formatTimeUnit(minute);
  if (seconds) seconds.innerHTML = formatTimeUnit(second);
  if (yearold) yearold.innerText = `${targetAge}th Birthday!`;
}

// Main countdown function
function updateCountdown() {
  if (isBirthdayToday()) {
    showBirthdayMessage();
    return;
  }

  const now = new Date();
  const target = getTargetBirthday();
  const timeSpan = target.date - now;

  // Update the date year display based on target year
  updateDateYearDisplay(target.year);

  updateCountdownDisplay(timeSpan, target.age);
}

// Run every second
timerId = setInterval(updateCountdown, 1000);