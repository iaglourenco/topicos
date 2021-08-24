function clearVisor() {
  document.getElementById("visor").value = "";
}

const regex = /[a-zA-Z'(){}]/im;

function setVisor(str) {
  let currentVisor = document.getElementById("visor").value;

  if (str == "=") {
    if (currentVisor.length == 0) return;
    document.getElementById("visor").value = currentVisor.match(regex)
      ? "Error"
      : eval(currentVisor);
  } else if (
    (currentVisor.length == 0 && !["/", "*", "-", "+"].includes(str)) ||
    (currentVisor.length != 0 &&
      ["/", "*", "-", "+"].includes(currentVisor[currentVisor.length - 1]) &&
      !["/", "*", "-", "+"].includes(str)) ||
    (currentVisor.length != 0 &&
      !["/", "*", "-", "+"].includes(currentVisor[currentVisor.length - 1]))
  ) {
    document.getElementById("visor").value =
      document.getElementById("visor").value + str;
  }
}

