
const convertLocalDateToUTCDate = (date) => {
      /*  Convierte hora local a UTC */
      date = new Date(date);
      var localOffset = 21600000;
      var localTime = date.getTime();
      date = localTime - localOffset;
      date = new Date(date);
      return date;
}

module.exports = {
    convertLocalDateToUTCDate
}