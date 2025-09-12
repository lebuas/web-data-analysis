// prettier-ignore
export function showModal(idModal:string) {
  const dialog = document.getElementById(idModal) as HTMLDialogElement;
// Usamos el método showModal() para mostrar el diálogo
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.show();
  }
return dialog;
}
