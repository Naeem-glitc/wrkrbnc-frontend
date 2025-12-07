
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://wrkrbnc-backend.vercel.app/'  
  : 'http://localhost:3001';               

export default API_BASE_URL;