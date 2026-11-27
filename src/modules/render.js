import { DOZWOLONE_STATUSY } from "./domain.js";
import { czyZablokowane } from "./lock.js";

export function wyswietlZgloszenia(zgloszenia, akcje) {
  const cialoTabeli = document.getElementById("tabela-cialo");
  cialoTabeli.innerHTML = "";

  let ileOtwarte = 0;
  let ileWToku = 0;
  let ileRozwiazane = 0;

  const filtr = document.getElementById("filtr-statusu").value;
  const zablokowane = czyZablokowane();

  for (let i = 0; i < zgloszenia.length; i++) {
    const zgloszenie = zgloszenia[i];

    if (zgloszenie.status === "Otwarte") ileOtwarte++;
    if (zgloszenie.status === "W toku") ileWToku++;
    if (zgloszenie.status === "Rozwiązane") ileRozwiazane++;

    if (filtr !== "Wszystkie" && zgloszenie.status !== filtr) {
      continue;
    }

    let kolorStatusu = "bg-slate-100 text-slate-800";
    if (zgloszenie.status === "W toku") kolorStatusu = "bg-amber-100 text-amber-800";
    if (zgloszenie.status === "Rozwiązane")
      kolorStatusu = "bg-emerald-100 text-emerald-800";

    let kolorPriorytetu = "text-slate-600";
    if (zgloszenie.priorytet === "Średni")
      kolorPriorytetu = "text-amber-600 font-medium";
    if (zgloszenie.priorytet === "Wysoki")
      kolorPriorytetu = "text-orange-600 font-medium";
    if (zgloszenie.priorytet === "Krytyczny") kolorPriorytetu = "text-red-600 font-bold";

    const wiersz = document.createElement("tr");
    wiersz.className = "hover:bg-slate-50";

    const komorkaId = document.createElement("td");
    komorkaId.className = "p-4 font-medium text-indigo-600";
    komorkaId.textContent = zgloszenie.id;

    const komorkaTemat = document.createElement("td");
    komorkaTemat.className = "p-4";
    komorkaTemat.textContent = zgloszenie.temat;

    const komorkaKlient = document.createElement("td");
    komorkaKlient.className = "p-4 text-slate-600";
    komorkaKlient.textContent = zgloszenie.klient;

    const komorkaStatus = document.createElement("td");
    komorkaStatus.className = "p-4";

    const wyborStatusu = document.createElement("select");
    wyborStatusu.className =
      kolorStatusu + " text-xs px-2.5 py-1 rounded-full font-medium";
    wyborStatusu.disabled = zablokowane;
    if (zablokowane) {
      wyborStatusu.classList.add("opacity-50", "cursor-not-allowed");
    }

    for (let s = 0; s < DOZWOLONE_STATUSY.length; s++) {
      const opcja = document.createElement("option");
      opcja.value = DOZWOLONE_STATUSY[s];
      opcja.textContent = DOZWOLONE_STATUSY[s];
      if (DOZWOLONE_STATUSY[s] === zgloszenie.status) {
        opcja.selected = true;
      }
      wyborStatusu.appendChild(opcja);
    }

    const idZgloszenia = zgloszenie.id;
    wyborStatusu.addEventListener("change", function () {
      akcje.zmienStatus(idZgloszenia, wyborStatusu.value);
    });

    komorkaStatus.appendChild(wyborStatusu);

    const komorkaPriorytet = document.createElement("td");
    komorkaPriorytet.className = "p-4 " + kolorPriorytetu;
    komorkaPriorytet.textContent = zgloszenie.priorytet;

    const komorkaAkcje = document.createElement("td");
    komorkaAkcje.className = "p-4";

    const przyciskUsun = document.createElement("button");
    przyciskUsun.className =
      "bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium";
    przyciskUsun.textContent = "Usuń";
    przyciskUsun.disabled = zablokowane;
    if (zablokowane) {
      przyciskUsun.classList.add("opacity-50", "cursor-not-allowed");
    }

    przyciskUsun.addEventListener("click", function () {
      akcje.usun(idZgloszenia);
    });

    komorkaAkcje.appendChild(przyciskUsun);

    wiersz.appendChild(komorkaId);
    wiersz.appendChild(komorkaTemat);
    wiersz.appendChild(komorkaKlient);
    wiersz.appendChild(komorkaStatus);
    wiersz.appendChild(komorkaPriorytet);
    wiersz.appendChild(komorkaAkcje);

    cialoTabeli.appendChild(wiersz);
  }

  document.getElementById("licznik-otwarte").innerText = ileOtwarte;
  document.getElementById("licznik-w-toku").innerText = ileWToku;
  document.getElementById("licznik-rozwiazane").innerText = ileRozwiazane;
}
