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

console.log(date); // 2003-04-24T00:03:04.567Z

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
console.log(today); // 2018-11-19T23:34:03.177Z

today.setHours(0, 0, 0, 0);
// still today, now 00:00:00 sharp
console.log(today); // 2018-11-19T23:00:00.000Z

//------------------------------------------------------------------------------------------------------------------------------------------

// Autocorrection
