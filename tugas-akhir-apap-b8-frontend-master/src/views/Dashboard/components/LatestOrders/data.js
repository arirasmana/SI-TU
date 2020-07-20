import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    nomor_surat: '1806269750',
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street'
    },
    email: 'Surat Izin Ikut Kegiatan',
    keterangan: '-',
    status: 'Menunggu persetujuan',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    nomor_surat: '1806269751',
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road'
    },
    email: 'Surat Izin Sakit',
    status: 'Disetujui',
    keterangan: '-',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    nomor_surat: '1806269752',
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive'
    },
    email: 'Surat Keterangan Lulus',
    keterangan: '-',
    status: 'Menunggu persetujuan',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    nomor_surat: '1806269753',
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street'
    },
    email: 'Surat Keterangan Lulus',
    status: 'Ditolak',
    keterangan: '-',
    createdAt: 1554930000000
  },
  {
    id: uuid(),
    nomor_surat: '1806269754',
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247'
    },
    email: 'Surat Rekomendasi Beasiswa',
    keterangan: '-',
    status: 'Disetujui',
    createdAt: 1554757200000
  },
  {
    id: uuid(),
    nomor_surat: '1806269754',
    address: {
      country: 'USA',
      state: 'California',
      city: 'Bakerfield',
      street: '317 Angus Road'
    },
    email: 'Surat Rekomendasi Beasiswa',
    keterangan: '-',
    status: 'Ditolak',
    createdAt: 1554670800000
  },
];
