// import dynamic from "next/dynamic";
import { Provider } from "./_components/provider/provider.component";
import Stepper from "./_components/stepper/stepper.component";

// const Stepper = dynamic(() => import('./_components/stepper/stepper.component'), { ssr: false })

export function SignUpDrawer() {
    return (
        <Provider>
            <Stepper />
        </Provider>
    )
}
