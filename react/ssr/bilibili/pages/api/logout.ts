import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "../../lib/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        delete req.session.user
        await req.session.save()
        res.status(200).json({ success: true })
    } else {
        res.status(405).end()
    }
}

export default withIronSessionApiRoute(handler, sessionOptions)