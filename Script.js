const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function calculateAge() {
    let todayDate = new Date();
    let inputDate = new Date(document.getElementById("input_date").value);
    
    if (isNaN(inputDate)) {
        alert("Invalid Date");
        return displayDOB("-", "-", "-");
    }

    let birthDate = inputDate.getDate();
    let birthMonth = inputDate.getMonth();
    let birthYear = inputDate.getFullYear();
    
    let currentYear = todayDate.getFullYear();
    let currentMonth = todayDate.getMonth();
    let currentDate = todayDate.getDate();

    checkLeapYear(currentYear);

    // Apply validation on date
    if(birthYear > currentYear || 
       (birthMonth > currentMonth && birthYear == currentYear) || 
       (birthDate > currentDate && birthMonth == currentMonth && birthYear == currentYear)) {
        alert("Not Yet Born");
        return displayDOB("-", "-", "-");
    }

    let totalYears = currentYear - birthYear;
    let totalMonth, totalDays;

    if (currentMonth >= birthMonth) {
        totalMonth = currentMonth - birthMonth;
    } else {
        totalYears--;
        totalMonth = 12 + currentMonth - birthMonth;
    }

    if (currentDate >= birthDate) {
        totalDays = currentDate - birthDate;
    } else {
        totalMonth--;
        let daysInPreviousMonth = currentMonth - 1 >= 0 ? months[currentMonth - 1] : months[11];
        totalDays = daysInPreviousMonth + currentDate - birthDate;

        if (totalMonth < 0) {
            totalMonth = 11;
            totalYears--;
        }
    }

    displayDOB(totalDays, totalMonth, totalYears);
}

function checkLeapYear(year) {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}

function displayDOB(days, months, years) {
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
}
