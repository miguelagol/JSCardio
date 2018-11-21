// new Date()
// Without arguments - create a Date object for the current date and time
let now = new Date();
console.log(now); // 2018-11-19T16:02:02.480Z

//--------------------------------------------------------------------------------------

// new Date(miliseconds)
// Create a Date object with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.
let Jan_01_1970 = new Date(0);

console.log(Jan_01_1970); // 1970-01-01T00:00:00.000Z

// now add 24 hours, get 02.01.1970 UTC+0
let Jan_02_1970 = new Date(24 * 3600 * 1000);

console.log(Jan_02_1970); // 1970-01-02T00:00:00.000Z

//--------------------REMEMBER--------------------
// The number of milliseconds that has passed since the beginning of 1970 is called a timestamp.

//--------------------------------------------------------------------------------------

// new Date(datestring)
// If there is a single argument, and it’s a string, then it is parsed with the Date.parse algorithm
let date = new Date('2018-08-18');

console.log(date); // 2018-08-18T00:00:00.000Z

//--------------------------------------------------------------------------------------

// new Date(year, month, date, hours, minutes, seconds, ms)
// Create the date with the given components in the local time zone. Only two first arguments are obligatory.
/*  -   The date parameter is actually the day of month, if absent then 1 is assumed
    -   If hours/minutes/seconds/ms is absent, they are assumed to be equal 0
*/
let date = new Date(2003, 3, 24, 2, 3, 4, 567);

console.log(date); // 2003-04-24T02:03:04.567Z

//------------------------------------------------------------------------------------------------------------------------------------------

// Access date components
let current = new Date(); // 2018-11-19T17:55:35.715Z

//get the year - 4 digits
console.log(current.getFullYear()); // 2018

// The month count starts with 0 (Jan), up to 11 (Dec)
console.log(current.getMonth()); // 10

// Get the day of month, from 1 to 31
console.log(current.getDate()); // 19

console.log(current.getHours()); // 18
// the hour in UTC+0 time zone (London time without daylight savings)
console.log(current.getUTCHours()); // 17

console.log(current.getMinutes()); // 55
console.log(current.getSeconds()); // 35
console.log(current.getMilliseconds()); // 715

// Get the day of week, from 0 (Sunday) to 6 (Saturday)
console.log(current.getDay()); // 1

// Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.
console.log(current.getTime()); // 1542722204617

// Returns the difference between the local time zone and UTC, in minutes:
console.log(new Date().getTimezoneOffset()); // -60   -> timezone UTC-1

//------------------------------------------------------------------------------------------------------------------------------------------

// Setting date components
/*  setFullYear(year [, month, date])
    setMonth(month [, date])
    setDate(date)
    setHours(hour [, min, sec, ms])
    setMinutes(min [, sec, ms])
    setSeconds(sec [, ms])
    setMilliseconds(ms)
    setTime(milliseconds)

Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().
*/
let today = new Date();

today.setHours(0);
// still today, but the hour is changed to 0
console.log(today); // 2018-11-19T00:34:03.177Z

today.setHours(0, 0, 0, 0);
// still today, now 00:00:00 sharp
console.log(today); // 2018-11-19T00:00:00.000Z

//------------------------------------------------------------------------------------------------------------------------------------------

// Autocorrection
// The autocorrection is a very handy feature of Date objects. We can set out-of-range values, and it will auto-adjust itself.
let date = new Date(2016, 0, 32); // 32 Jan 2013??

console.log(date); // 2016-02-01T00:00:00.000Z

let date2 = new Date(2016, 1, 28);

console.log(date2); // 2016-02-28T00:00:00.000Z

date2.setDate(date2.getDate() + 2);

console.log(date2); // 2016-03-01T00:00:00.000Z

let date3 = new Date();
date3.setSeconds(date3.getSeconds() + 70);

console.log(new Date()); // 2018-11-21T13:59:16.054Z
console.log(date3); // 2018-11-21T14:00:26.057Z

//------------------------------------------------------------------------------------------------------------------------------------------

// Date to number
// When a Date object is converted to number, it becomes the timestamp same as date.getTime()
let date = new Date();

console.log(+date); // 1542819370869
console.log(date.getTime()); // 1542819370869

// That can be used for time measurements
let start = new Date();

for (let i = 0; i < 100000; i++) {
   let doSomething = i * i * i;
}

let end = new Date();

console.log(`The loop took ${end - start} ms`); // The loop took 4 ms

// If we only want to measure the difference, There’s a special method Date.now() that returns the current timestamp.
let start = Date.now(); // milliseconds count from 1 Jan 1970

for (let i = 0; i < 100000; i++) {
   let doSomething = i * i * i;
}

let end = Date.now();

// subtract numbers, not dates
console.log(`The loop took ${end - start} ms`); // The loop took 5 ms

//--------------------------------------------------------------------------------------

// Benchmarking
function diffSubtract(date1, date2) {
   return date2 - date1;
}

function diffGetTime(date1, date2) {
   return date2.getTime() - date1.getTime();
}

function bench(f) {
   let date1 = new Date(0);
   let date2 = new Date();

   let start = Date.now();
   for (let i = 0; i < 100000; i++) f(date1, date2);
   return Date.now() - start;
}

console.log('Time of diffSubtract: ' + bench(diffSubtract) + 'ms'); // Time of diffSubtract: 36ms
console.log('Time of diffGetTime: ' + bench(diffGetTime) + 'ms'); // Time of diffGetTime: 7ms

// Using getTime() is so much faster! That’s because there’s no type conversion, it is much easier for engines to optimize.

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 1 - Create a Date object for the date: Feb 20, 2012, 3:12am. The time zone is local
let date = new Date(2012, 1, 20, 3, 12);

console.log(date); // 2012-02-20T03:12:00.000Z

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 2 - Write a function getWeekDay(date) to show the weekday in short format: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’
function getWeekDay(date) {
   let day = date.getDay();
   return day === 0
      ? 'SU'
      : day === 1
         ? 'MO'
         : day === 2
            ? 'TU'
            : day === 3
               ? 'WE'
               : day === 4
                  ? 'TH'
                  : day === 5
                     ? 'FR'
                     : 'SA';
}

let date = new Date(2012, 0, 3);

console.log(getWeekDay(date)); // TU

// or
function getWeekDay2(date) {
   let day = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
   return day[date.getDay()];
}

console.log(getWeekDay2(date)); // TU

let date2 = new Date(2014, 0, 3); // 3 Jan 2014

console.log(getWeekDay(date2)); // FR

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 3 - Write a function getLocalDay(date) that returns the “European” day of week for date
function getLocalDay(date) {
   let day = [7, 1, 2, 3, 4, 5, 6];
   return day[date.getDay()];
}

let date = new Date(2012, 0, 3);

console.log(getLocalDay(date)); // 2

// or
function getLocalDay2(date) {
   let day = date.getDay();
   if (day === 0) {
      day = 7;
   }
   return day;
}

console.log(getLocalDay2(date)); // 2

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 4 - Create a function getDateAgo(date, days) to return the day of month days ago from the date
function getDateAgo(date, days) {
   let date2 = new Date(date);
   date2.setDate(date.getDate() - days);
   return date2.getDate();
}

let date = new Date(2015, 0, 2);

console.log(getDateAgo(date, 1)); // 1
console.log(getDateAgo(date, 2)); // 31
console.log(getDateAgo(date, 365)); // 2

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 5 - Write a function getLastDayOfMonth(year, month) that returns the last day of month
function getLastDayOfMonth(year, month) {
   let date = new Date(year, month + 1);
   date.setDate(date.getDate() - 1);
   return date.getDate();
}

console.log(getLastDayOfMonth(2012, 1)); // 29
console.log(getLastDayOfMonth(2019, 1)); // 28
console.log(getLastDayOfMonth(2015, 4)); // 31

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 6 - Write a function getSecondsToday() that returns the number of seconds from the beginning of today
function getSecondsToday(date) {}

let date = new Date();
date.setHours(0, 0, 0, 0);

console.log(getSecondsToday(date)); // 36000

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 7 - Create a function getSecondsToTomorrow() that returns the number of seconds till tomorrow
function getSecondsToTomorrow(date) {}

let date = new Date();
date.setHours(23, 0, 0, 0);

console.log(getSecondsToday(date)); // 3600

//---------------------------------------------------------------------------------------------------------------------------------------------------------

// TASK 8 - Write a function formatDate(date) that should format date as follows:
/*  - If since date passed less than 1 second, then "right now".
    - Otherwise, if since date passed less than 1 minute, then "n sec. ago".
    - Otherwise, if less than an hour, then "m min. ago".
    - Otherwise, the full date in the format "DD.MM.YY HH:mm". That is: "day.month.year hours:minutes", all in 2-digit format, e.g. 31.12.16 10:00.
*/
function formatDate(date) {}

console.log(formatDate(new Date(new Date() - 1))); // "right now"
console.log(formatDate(new Date(new Date() - 30 * 1000))); // "30 sec. ago"
console.log(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. ago"
// yesterday's date
console.log(formatDate(new Date(new Date() - 86400 * 1000)));
