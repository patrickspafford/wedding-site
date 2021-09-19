/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require('@plaiceholder/next')
module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'picsum.photos']
  },
})
