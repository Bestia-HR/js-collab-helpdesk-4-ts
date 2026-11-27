let zablokowane = false;

export function czyZablokowane() {
  return zablokowane;
}

function przelacz(element, wylaczony) {
  element.classList.toggle("opacity-50", wylaczony);
  element.classList.toggle("cursor-not-allowed", wylaczony);
}

export function ustawBlokadeInterfejsu(stan) {
  zablokowane = stan;

  const poleWyboruPliku = document.getElementById("input-import-plik");
  const etykietaPliku = document.getElementById("label-import-plik");
  const przyciskEksportu = document.getElementById("btn-eksport-json");
  const przyciskNowegoZgloszenia = document.getElementById("btn-nowe-zgloszenie");
  const przyciskZapisu = document.getElementById("btn-zapisz-formularz");

  poleWyboruPliku.disabled = stan;
  przyciskEksportu.disabled = stan;
  przyciskNowegoZgloszenia.disabled = stan;
  przyciskZapisu.disabled = stan;

  przelacz(etykietaPliku, stan);
  przelacz(przyciskEksportu, stan);
  przelacz(przyciskNowegoZgloszenia, stan);
  przelacz(przyciskZapisu, stan);

  const kontrolkiTabeli = document.querySelectorAll(
    "#tabela-cialo select, #tabela-cialo button",
  );
  for (let i = 0; i < kontrolkiTabeli.length; i++) {
    kontrolkiTabeli[i].disabled = stan;
    przelacz(kontrolkiTabeli[i], stan);
  }
}
