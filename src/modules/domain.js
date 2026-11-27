//finalna wersja wrzutka by Adam
export const DOZWOLONE_STATUSY = ["Otwarte", "W toku", "Rozwiązane"];
export const DOZWOLONE_PRIORYTETY = ["Niski", "Średni", "Wysoki", "Krytyczny"];
export const MAKS_ZGLOSZEN = 100;

export function walidujZgloszenia(dane) {
  if (!Array.isArray(dane)) {
    throw new Error("Dane muszą być tablicą (listą)!");
  }

  if (dane.length > MAKS_ZGLOSZEN) {
    throw new Error("Za dużo zgłoszeń! Maksymalnie może być: " + MAKS_ZGLOSZEN);
  }

  const nowaLista = [];
  const uzyteId = new Set();

  for (let i = 0; i < dane.length; i++) {
    const rekord = dane[i];
    const numerWiersza = i + 1;

    if (typeof rekord !== "object" || rekord === null || Array.isArray(rekord)) {
      throw new Error("Błąd w rekordzie nr " + numerWiersza + ": to nie jest poprawny obiekt.");
    }

    if (typeof rekord.id !== "string" || rekord.id.trim() === "") {
      throw new Error("Błąd w rekordzie nr " + numerWiersza + ": brak poprawnego ID.");
    }

    const czysteId = rekord.id.trim();

    if (uzyteId.has(czysteId)) {
      throw new Error("Duplikat ID w rekordzie nr " + numerWiersza + ": " + czysteId);
    }
    uzyteId.add(czysteId);

    if (typeof rekord.temat !== "string" || rekord.temat.trim() === "") {
      throw new Error("Błąd w rekordzie nr " + numerWiersza + ": pusty temat.");
    }

    if (typeof rekord.klient !== "string" || rekord.klient.trim() === "") {
      throw new Error("Błąd w rekordzie nr " + numerWiersza + ": brak klienta.");
    }

    let poprawnyStatus = false;
    for (let s = 0; s < DOZWOLONE_STATUSY.length; s++) {
      if (DOZWOLONE_STATUSY[s] === rekord.status) {
        poprawnyStatus = true;
      }
    }
    if (!poprawnyStatus) {
      throw new Error("Błąd w rekordzie nr " + numerWiersza + ": nieznany status '" + rekord.status + "'.");
    }

    let poprawnyPriorytet = false;
    for (let p = 0; p < DOZWOLONE_PRIORYTETY.length; p++) {
      if (DOZWOLONE_PRIORYTETY[p] === rekord.priorytet) {
        poprawnyPriorytet = true;
      }
    }
    if (!poprawnyPriorytet) {
      throw new Error("Błąd w rekordzie nr " + numerWiersza + ": nieznany priorytet '" + rekord.priorytet + "'.");
    }

    const czystyObiekt = {
      id: czysteId,
      temat: rekord.temat.trim(),
      klient: rekord.klient.trim(),
      status: rekord.status,
      priorytet: rekord.priorytet
    };

    nowaLista.push(czystyObiekt);
  }

  return nowaLista;
}

export function utworzNoweZgloszenie(listaIstniejacych, temat, klient, status, priorytet) {
  const czystyTemat = temat.trim();
  const czystyKlient = klient.trim();

  if (czystyTemat === "" || czystyKlient === "") {
    throw new Error("Wypełnij temat i klienta!");
  }

  if (listaIstniejacych.length >= MAKS_ZGLOSZEN) {
    throw new Error("Osiągnięto maksymalną liczbę zgłoszeń!");
  }

  let poprawnyStatus = false;
  for (let s = 0; s < DOZWOLONE_STATUSY.length; s++) {
    if (DOZWOLONE_STATUSY[s] === status) {
      poprawnyStatus = true;
    }
  }
  if (!poprawnyStatus) {
    throw new Error("Nieznany status: " + status);
  }

  let poprawnyPriorytet = false;
  for (let p = 0; p < DOZWOLONE_PRIORYTETY.length; p++) {
    if (DOZWOLONE_PRIORYTETY[p] === priorytet) {
      poprawnyPriorytet = true;
    }
  }
  if (!poprawnyPriorytet) {
    throw new Error("Nieznany priorytet: " + priorytet);
  }

  let numer = 1091 + listaIstniejacych.length;
  let noweId = "#TK-" + numer;

  let czyIstnieje = true;
  while (czyIstnieje) {
    czyIstnieje = false;
    for (let i = 0; i < listaIstniejacych.length; i++) {
      if (listaIstniejacych[i].id === noweId) {
        czyIstnieje = true;
        numer = numer + 1;
        noweId = "#TK-" + numer;
        break;
      }
    }
  }

  return {
    id: noweId,
    temat: czystyTemat,
    klient: czystyKlient,
    status: status,
    priorytet: priorytet
  };
}