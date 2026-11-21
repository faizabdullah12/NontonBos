// Lapisan HTTP tunggal: fetch + penanganan error + cache memori sederhana (server state)
const cache = new Map();

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function getJson(url, { signal, useCache = true } = {}) {
  if (useCache && cache.has(url)) return cache.get(url);

  let res;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.', 0);
  }
  if (!res.ok) {
    const msg = res.status === 404 ? 'Data tidak ditemukan.' : res.status === 429
      ? 'Terlalu banyak permintaan, coba lagi sebentar.' : `Server error (${res.status}).`;
    throw new ApiError(msg, res.status);
  }
  const data = await res.json();
  if (useCache) cache.set(url, data);
  return data;
}
