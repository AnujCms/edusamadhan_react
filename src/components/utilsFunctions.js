exports.formatDate = (d)=> {
    //get the month
    var month = d.getMonth();
    //get the day
    var day = d.getDate();
    //get the year
    var year = d.getFullYear();

    //pull the last two digits of the year
    // year = year.toString().substr(2, 2);

    //increment month by 1 since it is 0 indexed
    month = month + 1;
    //converts month to a string
    month = month + "";

    //if month is 1-9 pad right with a 0 for two digits
    if (month.length == 1) {
        month = "0" + month;
    }

    //convert day to string
    day = day + "";

    //if day is between 1-9 pad right with a 0 for two digits
    if (day.length == 1) {
        day = "0" + day;
    }

    //return the string "MMddyy"
    return year + '-' + month + '-' + day;
}