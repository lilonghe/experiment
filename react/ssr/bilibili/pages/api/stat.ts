// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ua = req.headers['user-agent'] || ''
  const data  = await fetch('https://api.bilibili.com/x/web-interface/online', { headers: { 'User-Agent': ua } }).then(data => data.json());
  res.status(200).json(data?.data)
}
