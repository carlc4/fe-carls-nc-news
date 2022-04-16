export default function convertTime(inputDate) {

let timeStr = inputDate;
let date = new Date(timeStr);
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let time = date.toLocaleTimeString()
let dateStr = day + "/" + month + "/" + year + " at " + time;

return dateStr;
}