import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    'docs/content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        'sepia-skin': {
          '50': '#f8f5f2',
          '100': '#ece3d9',
          '200': '#d7c5b0',
          '300': '#c2a487',
          '400': '#b48b6b',
          '500': '#a77559',
          '600': '#935f4c',
          '700': '#7b4c42',
          '800': '#663f3a',
          '900': '#553632',
          '950': '#2f1b19',
        },
      }
    }
  }
}