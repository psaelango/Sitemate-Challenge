async function openModal() {
  const modal = new Modal(
    "Are you sure you want to continue",
    "Yes", 
    "Cancel"
  );
  try {
      const modalResponse = await modal.popup();
      document.getElementById('modal-selection').innerHTML = `You Just Clicked "${modalResponse}"`
  } catch (err) {
      console.log(err);
  }
}