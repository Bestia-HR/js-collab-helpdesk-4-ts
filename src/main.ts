// import { DOZWOLONE_STATUSY, utworzNoweZgloszenie } from "./modules/domain.js";
// import { pokazKomunikat } from "./modules/messages.js";
// import { wczytajZgloszeniaNaStart, zapiszZgloszenia } from "./modules/storage.js";
// import { czyZablokowane } from "./modules/lock.js";
// import { wyswietlZgloszenia } from "./modules/render.js";
// import { importujZ, pobierzTekstZPliku } from "./modules/importer.js";
// import { eksportujDoJson } from "./modules/exporter.js";

// let zgloszenia = [];

// function odswiezWidok() {
//   wyswietlZgloszenia(zgloszenia, { zmienStatus: zmienStatus, usun: usunZgloszenie });
// }

// function zastapListe(nowaLista) {
//   zgloszenia = nowaLista;
//   const zapisano = zapiszZgloszenia(zgloszenia);
//   odswiezWidok();
//   return zapisano;
// }

// function znajdzIndeksPoId(id) {
//   for (let i = 0; i < zgloszenia.length; i++) {
//     if (zgloszenia[i].id === id) {
//       return i;
//     }
//   }
//   return -1;
// }

// function zmienStatus(id, nowyStatus) {
//   if (czyZablokowane()) return;

//   let poprawnyStatus = false;
//   for (let s = 0; s < DOZWOLONE_STATUSY.length; s++) {
//     if (DOZWOLONE_STATUSY[s] === nowyStatus) {
//       poprawnyStatus = true;
//     }
//   }
//   if (!poprawnyStatus) {
//     pokazKomunikat("Nieznany status: " + nowyStatus, "blad");
//     odswiezWidok();
//     return;
//   }

//   const indeks = znajdzIndeksPoId(id);
//   if (indeks === -1) {
//     pokazKomunikat("Nie znaleziono zgłoszenia o ID: " + id, "blad");
//     return;
//   }

//   zgloszenia[indeks].status = nowyStatus;
//   zapiszZgloszenia(zgloszenia);
//   odswiezWidok();
// }

// function usunZgloszenie(id) {
//   if (czyZablokowane()) return;

//   const indeks = znajdzIndeksPoId(id);
//   if (indeks === -1) {
//     pokazKomunikat("Nie znaleziono zgłoszenia o ID: " + id, "blad");
//     return;
//   }

//   zgloszenia.splice(indeks, 1);
//   zapiszZgloszenia(zgloszenia);
//   odswiezWidok();
// }

// function otworzFormularz() {
//   if (czyZablokowane()) return;
//   document.getElementById("panel-dodawania").classList.remove("hidden");
// }

// function zamknijFormularz() {
//   document.getElementById("panel-dodawania").classList.add("hidden");
// }

// function dodajZgloszenie() {
//   if (czyZablokowane()) return;

//   const temat = document.getElementById("input-temat").value;
//   const klient = document.getElementById("input-klient").value;
//   const status = document.getElementById("input-status").value;
//   const priorytet = document.getElementById("input-priorytet").value;

//   try {
//     const nowe = utworzNoweZgloszenie(
//       zgloszenia,
//       temat,
//       klient,
//       status,
//       priorytet,
//     );
//     zgloszenia.unshift(nowe);
//     const zapisano = zapiszZgloszenia(zgloszenia);
//     odswiezWidok();

//     document.getElementById("input-temat").value = "";
//     document.getElementById("input-klient").value = "";
//     zamknijFormularz();

//     if (zapisano) {
//       pokazKomunikat("Dodano nowe zgłoszenie: " + nowe.id, "sukces");
//     }
//   } catch (blad) {
//     alert(blad.message);
//   }
// }

// function eksportujZgloszenia() {
//   if (czyZablokowane()) return;

//   if (zgloszenia.length === 0) {
//     pokazKomunikat("Lista jest pusta – nie ma czego eksportować.", "info");
//     return;
//   }

//   try {
//     const wynik = eksportujDoJson(zgloszenia);
//     pokazKomunikat(
//       "Wyeksportowano zgłoszeń: " + wynik.ile + " do pliku " + wynik.nazwaPliku,
//       "sukces",
//     );
//   } catch (blad) {
//     pokazKomunikat("Błąd eksportu: " + blad.message, "blad");
//   }
// }

// window.addEventListener("DOMContentLoaded", function () {
//   zgloszenia = wczytajZgloszeniaNaStart();
//   odswiezWidok();
//   lucide.createIcons();

//   document
//     .getElementById("btn-nowe-zgloszenie")
//     .addEventListener("click", otworzFormularz);
//   document
//     .getElementById("btn-anuluj-formularz")
//     .addEventListener("click", zamknijFormularz);
//   document
//     .getElementById("btn-zapisz-formularz")
//     .addEventListener("click", dodajZgloszenie);
//   document
//     .getElementById("filtr-statusu")
//     .addEventListener("change", odswiezWidok);
//   document
//     .getElementById("btn-eksport-json")
//     .addEventListener("click", eksportujZgloszenia);

//   document
//     .getElementById("input-import-plik")
//     .addEventListener("change", function (zdarzenie) {
//       const pliki = zdarzenie.target.files;
//       if (!pliki || pliki.length === 0) {
//         return;
//       }

//       const wybranyPlik = pliki[0];
//       zdarzenie.target.value = "";

//       importujZ(function () {
//         return pobierzTekstZPliku(wybranyPlik);
//       }, zastapListe);
//     });
// });
