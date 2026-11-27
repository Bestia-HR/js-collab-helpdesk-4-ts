import { walidujZgloszenia } from "./domain.js";
import { pokazKomunikat } from "./messages.js";
import { czyZablokowane, ustawBlokadeInterfejsu } from "./lock.js";

export async function importujZ(wczytajTekst, zastapListe) {
  if (czyZablokowane()) {
    return;
  }

  const zgoda = confirm(
    "Czy na pewno chcesz zaimportować nowe zgłoszenia? Zastąpią one obecną listę.",
  );
  if (!zgoda) {
    pokazKomunikat("Import został anulowany przez użytkownika.", "info");
    return;
  }

  ustawBlokadeInterfejsu(true);
  pokazKomunikat("Trwa importowanie danych, proszę czekać...", "info");

  try {
    const tekst = await wczytajTekst();

    let suroweDane;
    try {
      suroweDane = JSON.parse(tekst);
    } catch (bladParsowania) {
      throw new Error("Plik nie jest poprawnym formatem JSON!");
    }

    const zwalidowanaLista = walidujZgloszenia(suroweDane);

    const zapisano = zastapListe(zwalidowanaLista);

    if (zapisano) {
      pokazKomunikat(
        "Import zakończony sukcesem! Załadowano zgłoszeń: " +
          zwalidowanaLista.length,
        "sukces",
      );
    }
  } catch (blad) {
    pokazKomunikat("Błąd importu: " + blad.message, "blad");
  } finally {
    ustawBlokadeInterfejsu(false);
  }
}

export async function pobierzTekstZPliku(plik) {
  const tekst = await plik.text();
  return tekst;
}
