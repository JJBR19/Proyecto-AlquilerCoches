function checkVehicleType(selectElement) {
  if (selectElement.value === "todos") {
    openDialog();
  }
}

function openDialog() {
  const dialog = document.getElementById("vehicleDialog");
  dialog.showModal();
}

function closeDialog() {
  const dialog = document.getElementById("vehicleDialog");
  dialog.close();
}

function selectAll(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = true);
}