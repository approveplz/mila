import { auth } from "@/auth";
import Stepper from "./_components/stepper/stepper.component";

export async function SignUpDrawer() {
    const session = await auth();

    return <Stepper session={session} />
}
