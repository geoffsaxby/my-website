import type { Config } from '@netlify/functions'
import { getStore } from '@netlify/blobs'

export default async () => {
  const store = getStore('visitors')

  const raw = await store.get('count')
  const previous = raw ? parseInt(raw, 10) : 110
  const count = previous + 1
  await store.set('count', count.toString())

  return new Response(JSON.stringify({ count }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export const config: Config = {
  path: '/api/visit',
}
