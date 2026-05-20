/**
 * Mengubah string menjadi format slug.
 * @param {string} text - String asli yang ingin diubah.
 * @returns {string} - String yang sudah menjadi slug.
 */
export function slugify(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Memisahkan huruf dari tanda aksennya (misal: é menjadi e + ´)
    .replace(/[\u0300-\u036f]/g, '') // Menghapus tanda aksen tersebut
    .replace(/[^a-z0-9 -]/g, '') // Menghapus karakter non-alphanumeric (kecuali spasi dan tanda hubung)
    .replace(/\s+/g, '-') // Mengganti satu atau lebih spasi menjadi satu tanda hubung
    .replace(/-+/g, '-') // Mengganti tanda hubung ganda menjadi satu tanda hubung
    .replace(/^-+|-+$/g, ''); // Menghapus tanda hubung di awal dan akhir string
}