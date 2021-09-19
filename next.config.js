/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require('@plaiceholder/next')
module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'picsum.photos']
  },
  env: {
    apiKey: 'AIzaSyATsifSy14qmKKc79gsx0tQnkTbUEM5aDY'
  }
})
