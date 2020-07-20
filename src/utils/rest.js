const SITE_URL = 'https://backend-situ.herokuapp.com'
const SIVITAS_URL = 'http://si-sivitas.herokuapp.com/api'

const BACKEND = {
  ADD_USER: SITE_URL + '/user/add',
  EDIT_USER:  SITE_URL + '/user/update',
  DELETE_USER: SITE_URL + '/user/delete',
  ADD_PINJAMAN: SITE_URL + '/pinjaman/add',
  ADD_LOWONGAN: SITE_URL + '/lowongan/add',
  GET_ALL_USER: SITE_URL + '/user/viewall',
  AUTHENTICATE: SITE_URL + '/authenticate',
  EDIT_LOWONGAN: SITE_URL + '/lowongan/update',
  DELETE_LOWONGAN: SITE_URL + '/lowongan/delete',
  GET_DASHBOARD: SITE_URL + '/dashboard/viewall',
  ADD_JENIS_SURAT : SITE_URL + '/jenis-surat/add',
  GET_ALL_PINJAMAN: SITE_URL + '/pinjaman/viewall',
  GET_ALL_LOWONGAN: SITE_URL + '/lowongan/viewall',
  DELETE_JENIS_SURAT: SITE_URL + '/jenis-surat/delete',
  ADD_JENIS_LOWONGAN : SITE_URL + '/jenis-lowongan/add',
  GET_ALL_JENIS_SURAT: SITE_URL + '/jenis-surat/viewall',
  ADD_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/add',
  GET_PENGAJUAN_UUID: SITE_URL + '/pengajuan-surat/view',
  GET_ALL_PENGAJUAN: SITE_URL + '/pengajuan-surat/viewall',
  GET_JENIS_LOWONGAN: SITE_URL + '/lowongan/jenis/viewall',
  DELETE_JENIS_LOWONGAN: SITE_URL + '/jenis-lowongan/delete',
  EDIT_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/update',
  GET_ALL_JENIS_LOWONGAN: SITE_URL + '/jenis-lowongan/viewall',
  DELETE_PENGAJUAN_SURAT: SITE_URL + '/pengajuan-surat/delete',
}

const WEBSERVICE = {
  GET_PEGAWAI_SIVITAS: SIVITAS_URL + '/employees',
  GET_SISWA_SIVITAS: SIVITAS_URL + '/students',
  GET_GURU_SIVITAS: SIVITAS_URL + '/teachers'
}

export {
  BACKEND,
  SITE_URL,
  WEBSERVICE
}