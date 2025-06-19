import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nghị Quyết 68 - Tổng hợp tin tức mới nhất',
    short_name: 'Nghị Quyết 68',
    description: 'Website tổng hợp thông tin, tin tức mới nhất xung quanh Nghị quyết 68 về phát triển kinh tế tư nhân do Bộ Chính trị ban hành.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFAF6',
    theme_color: '#B90D2B',
    icons: [
      {
        src: '/img/logo-anax.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/logo-anax.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 