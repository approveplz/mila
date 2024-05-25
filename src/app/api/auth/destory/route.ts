import { NextApiRequest, NextApiResponse } from "next"
import { auth, signOut } from "@/auth"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth(req, res)
}