function daysInMonth(month) {
    const year = new Date().getFullYear();
    const d = new Date(year, month + 1, 0);
    return d.getDate();
  }
  
  function firstDayOfMonth(month) {
    const year = new Date().getFullYear();
    const d = new Date(year, month, 1);
    return d.getDay();
  }
  
  const months = [
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
    "December"
  ];
  
  export { daysInMonth, firstDayOfMonth, months };
  