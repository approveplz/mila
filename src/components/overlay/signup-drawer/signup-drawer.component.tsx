import { auth } from "@/auth";
import { Provider } from "./_components/provider/provider.component";
import Stepper from "./_components/stepper/stepper.component";

export async function SignUpDrawer() {
    const session = await auth();

    return (
        <Provider>
            <Stepper session={session} />
        </Provider>
    )
}
