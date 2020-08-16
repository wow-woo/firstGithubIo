const name_form = document.querySelector("#name_form");
const inp_name = document.querySelector("#inp_name");

// user name
const nameHandler = (e) => {
  e.preventDefault();

  const yourName = inp_name.value;
  window.localStorage.setItem("yourName", yourName);

  inp_name.remove();
  const span = document.createElement("span");
  span.textContent = yourName;
  name_form.appendChild(span);
};

const checkName = (e) => {
  const name = window.localStorage.getItem("yourName");
  if (name) {
    inp_name.remove();
    const span = document.createElement("span");
    span.textContent = name;
    name_form.appendChild(span);
  } else {
    name_form.addEventListener("submit", nameHandler);
  }
};

// location
const getLocation = () => {
  const successFN = (GeolocationPosition) => {
    console.log(GeolocationPosition.coords);

    const obj = {
      latitude: GeolocationPosition.coords.latitude,
      longitude: GeolocationPosition.coords.longitude,
      timestamp: GeolocationPosition.timestamp,
    };
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

const loadHandler = (e) => {
  if (!window.sessionStorage.getItem("location")) {
    getLocation();
  }
  checkName();
};

window.addEventListener("load", loadHandler);
