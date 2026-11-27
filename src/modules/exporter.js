
import { walidujZgloszenia } from "./domain.js";

function dwieCyfry(liczba) {
  return String(liczba).padStart(2, "0");
}


export function nazwaPlikuEksportu(data) {
  const dzien = data.getFullYear() + "-" + dwieCyfry(data.getMonth() + 1) + "-" + dwieCyfry(data.getDate());
  const godzina = dwieCyfry(data.getHours()) + "-" + dwieCyfry(data.getMinutes());
  return "zgloszenia-" + dzien + "_" + godzina + ".json";
}

export function zbudujJson(lista) {
  const kopia = walidujZgloszenia(lista);
  return JSON.stringify(kopia, null, 2);
}


function pobierzJakoPlik(tekst, nazwaPliku) {
  const plik = new Blob([tekst], { type: "application/json" });
  const adresPliku = URL.createObjectURL(plik);

  const odnosnik = document.createElement("a");
  odnosnik.href = adresPliku;
  odnosnik.download = nazwaPliku;
  document.body.appendChild(odnosnik);
  odnosnik.click();
  odnosnik.remove();

  setTimeout(function () {
    URL.revokeObjectURL(adresPliku);
  }, 0);
}

export function eksportujDoJson(lista) {
  const tekst = zbudujJson(lista);
  const nazwaPliku = nazwaPlikuEksportu(new Date());
  pobierzJakoPlik(tekst, nazwaPliku);
  return { nazwaPliku: nazwaPliku, ile: lista.length };
}
