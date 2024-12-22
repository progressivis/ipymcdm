import confetti from "https://esm.sh/canvas-confetti@1";
import { load } from "densitymaps";
import lz4 from "lz4js";

const dtypeToArray = {
    int8: Int8Array,
    int16: Int16Array,
    int32: Int32Array,
    uint8: Uint8Array,
    uint16: Uint16Array,
    uint32: Uint32Array,
    float32: Float32Array,
};


function decompress(data) {
  console.log(`Deserializing ${data}`);
  if (data == null) {
    console.log("Data is null");
    return null;
  }
  let dtype = data.dtype;
  let jstype = dtypeToArray[dtype];
  if (! jstype) {
    console.log("Data dtype is unknown");
    return null; // invalid data type
  }
  let shape = data.shape;
  let buffer = lz4.decompress(
    new Uint8Array(data.buffer.buffer)
  ).buffer;
  let array = new jstype(buffer);
  if (array.length != shape[0] * shape[1]) 
    throw Error(`Invalid data size ${array.length} instead of ${shape[0]*shape[1]}`);
  return {
    width: shape[0], // not sure?
    height: shape[1],
    data: array
  };
}

function initialize({ model }) {
    // Set up shared state or event handlers.
    return () => {
      // Optional: Called when the widget is destroyed.
    } ;
  }

/** @type {import("npm:@anywidget/types").Render<Model>} */
async function render({ model, el }) {
  let span = document.createElement("span");
  let randomStr =
    "mcdm-" +
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5);
  span.id = randomStr;
  console.log('hello from mcmd');
  el.classList.add("ipymcdm");
  el.appendChild(span);
  let array = model.get('array');
  let dataSource = decompress(array);
  if (dataSource != null) {
    load(dataSource, randomStr, 1).then((datamap) => {
      datamap.render();
    });
  }
  function on_data_change() {
    console.log('hello from on_data_change in mcmd');
    let array = model.get("array");
    let dataSource = decompress(array);
    if (dataSource != null) {
      load(dataSource, randomStr, 1).then((datamap) => {
        datamap.render();
      });
    }
  }
  model.on("change:array", on_data_change);
}

export default { render };
