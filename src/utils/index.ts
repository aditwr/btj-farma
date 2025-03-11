export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  // Opsi formatting untuk zona waktu Jakarta
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Menghasilkan string dalam format "10 Maret 2025, 15:37"
  let formatted = new Intl.DateTimeFormat("id-ID", options).format(date);
  // Ganti tanda titik dua (:) dengan titik (.) dan tambahkan " WIB" di akhir
  formatted = formatted.replace(":", ".") + " WIB";
  return formatted;
}
