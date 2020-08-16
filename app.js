const name_form = document.querySelector("#name_form");
const label_name = document.querySelector("#name_form > label");
const inp_name = document.querySelector("#inp_name");
const weatherSection = document.querySelector(".display-weather");
const locationDetail = document.querySelector(".location-detail");
const main = document.querySelector("main");
const bg_uri = "https://source.unsplash.com/1600x900/?beach,bikini";

let txt_state = {
  process: "🥇",
  complete: "🧩",
  delete: "🧨",
};
let weather_info = {
  ico: "",
  text: "",
  city: "",
  country: "",
};
const dateYear = document.querySelector(".year");
const dateMonth = document.querySelector(".month");
const dateDate = document.querySelector(".date");
const dateHours = document.querySelector(".hours");
const dateMinutes = document.querySelector(".minutes");
const dateSeconds = document.querySelector(".seconds");
let currentTime = "";

const to_do_form = document.querySelector("#to_do_form");
const inp_section = document.querySelector(".inp_section");
const inp_things = document.querySelector("#inp_things");
const to_do_section = document.querySelector(".to_do_section");
const be_done_section = document.querySelector(".be_done_section");
const to_do_list = document.querySelector(".to_do_list");
const be_done_list = document.querySelector(".be_done_list");

let thingsToDo = {
  to_do: [],
  be_done: [],
};

//to do list handler
// const contentHandler = (e) => {
// const newItem = document.createElement('input');
// e.currentTarget =
// }
const deleteHandler = (e) => {
  const target = e.currentTarget.parentNode;
  const targetMode = target.parentNode.dataset.mode;
  const content = target.parentNode.firstChild.textContent;
  let from = "";
  let to = "";

  target.remove();

  if (targetMode === "process") {
    from = "to_do";
    to = "be_done";
  } else {
    from = "be_done";
    to = "to_do";
  }

  const targetContent = thingsToDo[from].filter((item) => {
    return item[0] !== content;
  });

  thingsToDo[from] = targetContent;

  const thing = JSON.stringify(thingsToDo);
  window.localStorage.setItem("thingsToDo", thing);

  display(to_do_list, thingsToDo.to_do, txt_state.process);
  display(be_done_list, thingsToDo.be_done, txt_state.complete);
};

const switchMode = (e) => {
  let from = "";
  let to = "";
  let mode = "";
  const target = e.currentTarget.parentNode.parentNode;
  target.remove();

  console.log(target.dataset.mode);

  if (target.dataset.mode === "process") {
    from = "to_do";
    to = "be_done";
    mode = "complete";
  } else {
    from = "be_done";
    to = "to_do";
    mode = "process";
  }

  const content = target.firstChild.textContent;
  const targetContent = thingsToDo[from].filter((item) => {
    return item[0] !== content;
  });

  thingsToDo[from] = targetContent;
  thingsToDo[to].push([content, mode]);

  const thing = JSON.stringify(thingsToDo);
  window.localStorage.setItem("thingsToDo", thing);

  display(to_do_list, thingsToDo.to_do, txt_state.process);
  display(be_done_list, thingsToDo.be_done, txt_state.complete);
};

const generateItem = (content, switcherContent) => {
  const thingElement = document.createElement("div");
  const contentDiv = document.createElement("div");
  const btnDiv = document.createElement("div");
  const switcher = document.createElement("span");
  const deleter = document.createElement("span");

  const mode = content[1] || "process";
  thingElement.dataset.mode = mode;

  switcher.textContent = switcherContent;
  switcher.addEventListener("click", switchMode);
  deleter.textContent = txt_state.delete;
  deleter.addEventListener("click", deleteHandler);

  btnDiv.appendChild(deleter);
  btnDiv.appendChild(switcher);
  contentDiv.textContent = content[0];
  btnDiv.classList.add("btn-item");
  contentDiv.classList.add("content-item");
  //   contentDiv.addEventListener("click", contentHandler);
  thingElement.appendChild(contentDiv);
  thingElement.appendChild(btnDiv);

  return thingElement;
};

const display = (listName, content, switcherContent) => {
  //clear list
  listName.innerHTML = "";

  for (let i = 0; i < content.length; i++) {
    const thing = content[i];

    const thingElement = generateItem(thing, switcherContent);

    listName.appendChild(thingElement);
  }
};

const toDoHandler = (e) => {
  e.preventDefault();

  const thing = [inp_things.value, "process"];
  thingsToDo.to_do.push(thing);
  const strThings = JSON.stringify(thingsToDo);
  window.localStorage.setItem("thingsToDo", strThings);

  inp_things.value = "";

  display(to_do_list, thingsToDo.to_do, txt_state.process);
};
to_do_form.addEventListener("submit", toDoHandler);

const configList = async () => {
  const currentThings = await JSON.parse(
    window.localStorage.getItem("thingsToDo")
  );

  if (currentThings) {
    thingsToDo = currentThings;
  }

  display(to_do_list, thingsToDo.to_do, txt_state.process);
  display(be_done_list, thingsToDo.be_done, txt_state.complete);
};

//time control
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

  if (
    preTime.year !== currentTime.year ||
    preTime.month !== currentTime.month ||
    preTime.date !== currentTime.date ||
    preTime.hours !== currentTime.hours ||
    preTime.minutes !== currentTime.minutes ||
    preTime.seconds !== currentTime.seconds
  ) {
    currentTime = preTime;

    dateYear.textContent = year;
    dateMonth.textContent = month;
    dateDate.textContent = date;
    dateHours.textContent = hours;
    dateMinutes.textContent = minutes;
    dateSeconds.textContent = seconds;
  }

  requestAnimationFrame(() => requestAnimationFrame(getCurrentTime));
};

// user name
const nameHandler = (e) => {
  e.preventDefault();

  const yourName = inp_name.value;
  window.localStorage.setItem("yourName", yourName);

  inp_name.remove();
  const span = document.createElement("span");
  label_name.textContent = "Hi!";
  span.textContent = yourName;
  name_form.appendChild(span);
};

const checkName = (e) => {
  const name = window.localStorage.getItem("yourName");
  if (name) {
    label_name.textContent = "Hi!";

    inp_name.remove();
    const span = document.createElement("span");
    span.textContent = name;
    name_form.appendChild(span);
  } else {
    name_form.addEventListener("submit", nameHandler);
  }
};

const getWeather = async (location_info) => {
  const address = `http://api.openweathermap.org/data/2.5/weather?lat=${
    location_info.latitude
  }&lon=${location_info.longitude}&appid=${"b9dd8aa3b4163a97b55a677d647a75b6"}`;

  try {
    const res = await fetch(address);
    const data = await res.json();

    weather_info.ico = data.weather[0].icon;
    weather_info.text = data.weather[0].description;
    weather_info.city = data.name;
    weather_info.country = data.sys.country;
  } catch (error) {
    console.log(error);
  }

  const address_ico_weather = `http://openweathermap.org/img/wn/${weather_info.ico}@2x.png`;
  const img = document.createElement("img");
  const div = document.createElement("div");

  img.src = address_ico_weather;
  div.textContent = weather_info.text;

  weatherSection.appendChild(img);
  weatherSection.appendChild(div);

  displayLocation();
};

const displayLocation = () => {
  const city_name = weather_info.city;
  const country_name = weather_info.country;
  locationDetail.textContent = `${city_name} ${country_name}`;
};
// location
const getLocation = () => {
  const successFN = (GeolocationPosition) => {
    const obj = {
      latitude: GeolocationPosition.coords.latitude,
      longitude: GeolocationPosition.coords.longitude,
      timestamp: GeolocationPosition.timestamp,
    };

    getWeather(obj);

    const strPos = JSON.stringify(obj);

    return window.sessionStorage.setItem("location", strPos);
  };
  const errFN = (GeolocationPositionError) => {
    return console.log(GeolocationPositionError.message);
  };
  const positionOPT = {
    //enhance accuracy of location
    enableHightAccuracy: true,
    //try to retrieve for 10s
    timeout: 10000,
    //retain location info
    maximumAge: 0,
  };
  window.navigator.geolocation.getCurrentPosition(
    successFN,
    errFN,
    positionOPT
  );
};

//random background image
const paintBackground = async (e) => {
  const res = await fetch(bg_uri);

  main.style.backgroundImage = `url(${res.url})`;
};

const loadHandler = (e) => {
  paintBackground();
  getLocation();
  checkName();
  getCurrentTime();
  configList();
};

window.addEventListener("load", loadHandler);
