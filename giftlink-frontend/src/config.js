// Backend base URL; override at build time with REACT_APP_BACKEND_URL
export const urlConfig = {
  backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3060',
};
