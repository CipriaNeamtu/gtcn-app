'use server'

export const getBaseUrl = async () => {
  const url = process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.PRODUCTION_URL;
  return url;
}