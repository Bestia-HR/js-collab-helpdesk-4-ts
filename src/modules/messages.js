const WSZYSTKIE_KOLORY = [
  "bg-red-100",
  "text-red-800",
  "border-red-300",
  "bg-emerald-100",
  "text-emerald-800",
  "border-emerald-300",
  "bg-amber-100",
  "text-amber-800",
  "border-amber-300",
];

export function pokazKomunikat(tekst, typ) {
  const ramka = document.getElementById("komunikat-box");
  ramka.innerText = tekst;
  ramka.classList.remove("hidden", ...WSZYSTKIE_KOLORY);

  if (typ === "blad") {
    ramka.classList.add("bg-red-100", "text-red-800", "border-red-300");
  } else if (typ === "sukces") {
    ramka.classList.add(
      "bg-emerald-100",
      "text-emerald-800",
      "border-emerald-300",
    );
  } else {
    ramka.classList.add("bg-amber-100", "text-amber-800", "border-amber-300");
  }
}
