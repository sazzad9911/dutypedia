const DateTime = {
  day: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
  month: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  year: () => {
    var max = new Date().getFullYear();
    var min = max - 100;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  },
};
export default DateTime;
