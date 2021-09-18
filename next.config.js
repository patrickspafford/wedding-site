/** @type {import('next').NextConfig} */
const { withPlaceholder, withPlaiceholder } = require('@plaiceholder/next')
module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'picsum.photos']
  }
})
