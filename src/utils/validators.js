// Validasi form review -> mengembalikan objek { field: pesanError }
export function validateReview({ showId, author, rating, text }) {
  const errors = {};
  if (!showId) errors.showId = 'Pilih judul yang ingin direview.';
  if (!author.trim()) errors.author = 'Nama wajib diisi.';
  else if (author.trim().length < 3) errors.author = 'Nama minimal 3 karakter.';
  if (!rating) errors.rating = 'Berikan rating 1–5 bintang.';
  if (!text.trim()) errors.text = 'Komentar wajib diisi.';
  else if (text.trim().length < 20) errors.text = `Komentar minimal 20 karakter (kurang ${20 - text.trim().length}).`;
  else if (text.length > 300) errors.text = 'Komentar maksimal 300 karakter.';
  return errors;
}
