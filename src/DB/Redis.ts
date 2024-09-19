import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://content-shiner-56814.upstash.io',
  token:process.env.redistoken,
})
