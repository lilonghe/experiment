import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "../../lib/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = await req.body
        if (username && password) {
            // login success
            req.session.user = {
                id: '10000',
                username
            }
            await req.session.save()

            res.status(200).json({ success: true })
        } else {
            res.status(200).json({ success: false })
        }
    } else {
        res.status(405).end()
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)