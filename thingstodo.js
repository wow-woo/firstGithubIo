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

const deleteHandler = (e) => {
  const target = e.currentTarget.parentNode;
  const targetMode = e.currentTarget.parentNode.dataset.mode;
  const content = target.firstChild.textContent;
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

  display(to_do_list, thingsToDo.to_do, "done");
  display(be_done_list, thingsToDo.be_done, "re check");
};

const switchMode = (e) => {
  let from = "";
  let to = "";
  let mode = "";
  const target = e.currentTarget.parentNode;
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

  display(to_do_list, thingsToDo.to_do, "done");
  display(be_done_list, thingsToDo.be_done, "re check");
};

const generateItem = (content, switcherContent) => {
  const thingElement = document.createElement("div");
  const switcher = document.createElement("span");
  const deleter = document.createElement("span");

  const mode = content[1] || "process";
  thingElement.dataset.mode = mode;

  switcher.textContent = switcherContent;
  switcher.addEventListener("click", switchMode);
  deleter.textContent = "delete";
  deleter.addEventListener("click", deleteHandler);

  thingElement.textContent = content[0];
  thingElement.appendChild(deleter);
  thingElement.appendChild(switcher);

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

  display(to_do_list, thingsToDo.to_do, "done");
};
to_do_form.addEventListener("submit", toDoHandler);

const loadHandler = (e) => {
  thingsToDo = JSON.parse(window.localStorage.getItem("thingsToDo"));

  display(to_do_list, thingsToDo.to_do, "done");
  display(be_done_list, thingsToDo.be_done, "re check");
};
window.addEventListener("DOMContentLoaded", loadHandler);
