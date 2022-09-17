import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { IUser } from "lib/useUser";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<IUser | {}>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
    });
  } else {
    res.json({});
  }
}