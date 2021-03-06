// @js-ignore

/* eslint-disable no-undef */
const path = require('path')
const withSass = require('@zeit/next-sass')
const plugins = require('next-compose-plugins')
const images = require('next-images')
const videos = require('next-videos')
const fonts = require('next-fonts')
const reactSvg = require('next-react-svg')

const withTM = require('next-transpile-modules')(['@react-three/drei', 'three', 'postprocessing'])
const withPWA = require('next-pwa')

const nextConfig = {
  // target: 'serverless',
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })
    return config
  },
}

module.exports = plugins(
  [
    [images, { exclude: path.resolve(__dirname, 'src/assets/svg') }],
    [reactSvg, { include: path.resolve(__dirname, 'src/assets/svg') }],
    withSass,
    fonts,
    videos,
    withTM,
    [withPWA, { pwa: { disable: false, dest: 'public' } }],
  ],
  nextConfig
)
