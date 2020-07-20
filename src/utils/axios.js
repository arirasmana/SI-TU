const axiosInstance = (path, token) => {
  return {
    url: path,
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json, text/plain, */*",
      'Content-Type': 'application/json'
    }
  }
}

export default axiosInstance;


