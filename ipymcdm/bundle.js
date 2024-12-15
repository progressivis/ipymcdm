// src/index.js
import confetti from "https://esm.sh/canvas-confetti@1";
function render({ model, el }) {
  let btn = document.createElement("button");
  btn.innerHTML = `count is ${model.get("value")}`;
  btn.addEventListener("click", () => {
    model.set("value", model.get("value") + 1);
    model.save_changes();
  });
  model.on("change:value", () => {
    confetti();
    btn.innerHTML = `count is ${model.get("value")}`;
  });
  el.classList.add("ipymcdm");
  el.appendChild(btn);
}
var src_default = { render };
export {
  src_default as default
};
