import { walidujZgloszenia } from "./domain.js";
import { pokazKomunikat } from "./messages.js";

const KLUCZ_PAMIECI = "school_helpdesk_tickets";

export function wczytajZgloszeniaNaStart() {
  try {
    const surowyTekst = localStorage.getItem(KLUCZ_PAMIECI);

    if (surowyTekst === null) {
      return [];
    }

    const odczytaneDane = JSON.parse(surowyTekst);
    const poprawne = walidujZgloszenia(odczytaneDane);
    return poprawne;
  } catch (blad) {
    pokazKomunikat("Błąd odczytu danych z localStorage: " + blad.message, "blad");
    return [];
  }
}

export function zapiszZgloszenia(lista) {
  try {
    const tekstJson = JSON.stringify(lista);
    localStorage.setItem(KLUCZ_PAMIECI, tekstJson);
    return true;
  } catch (blad) {
    pokazKomunikat(
      "Błąd zapisu do localStorage (np. brak miejsca lub blokada): " +
        blad.message,
      "blad",
    );
    return false;
  }
}
