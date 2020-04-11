

// export var StorageManager = function () {
//  function setLocalStorage() {
//     console.log("setLocalStorage console log");
//   }
  

// };

export function setValue(key, value) {
  localStorage.setItem(key, value);
}

export function getValue(value) {
  localStorage.getItem(value);
}

export function removeValue(value) {
  localStorage.removeItem(value);
}
