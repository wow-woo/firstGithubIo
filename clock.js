const dateYear = document.querySelector(".year");
const dateMonth = document.querySelector(".month");
const dateDate = document.querySelector(".date");
const dateHours = document.querySelector(".hours");
const dateMinutes = document.querySelector(".minutes");
const dateSeconds = document.querySelector(".seconds");
let currentTime = "";

const getCurrentTime = (e) => {
  const dateHere = new Date();

  const year = dateHere.getFullYear();
  const month = dateHere.getMonth() + 1;
  const date = dateHere.getDate();
  const hours = dateHere.getHours();
  const minutes = dateHere.getMinutes();
  const seconds = dateHere.getSeconds();

  const preTime = {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
  };

  if (currentTime !== preTime) {
    currentTime = preTime;
  }

  dateYear.textContent = year;
  dateMonth.textContent = month;
  dateDate.textContent = date;
  dateHours.textContent = hours;
  dateMinutes.textContent = minutes;
  dateSeconds.textContent = seconds;

  requestAnimationFrame(getCurrentTime);
};
getCurrentTime();
