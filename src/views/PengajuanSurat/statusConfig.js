const defaultStatus = [
  {
    id: 0,
    name: "Menunggu persetujuan",
    color: "warning"
  },
  {
    id: 1,
    name: "Ditolak",
    color: "danger"
  },
  {
    id: 2,
    name: "Disetujui",
    color: "success"
  },
  {
    id: 3,
    name: "Diproses",
    color: "info"
  },
  {
    id: 4,
    name: "Selesai",
    color: "primary"
  },
]


const principalStatus = [
  {
    id: 1,
    name: "Ditolak",
    color: "danger"
  },
  {
    id: 2,
    name: "Disetujui",
    color: "success"
  }
]

const adminStatus = [
  {
    id: 3,
    name: "Diproses",
    color: "info"
  },
  {
    id: 4,
    name: "Selesai",
    color: "primary"
  },
]

export default {
  adminStatus,
  defaultStatus,
  principalStatus,
}