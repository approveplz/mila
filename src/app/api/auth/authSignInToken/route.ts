import * as actions from "@/actions";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const result = await actions.authSignInToken(formData);

        return Response.json(result);
    } catch (error: any) {
        return new Response(`error: ${error?.message}`, {
            status: 400,
        })
    }
}
