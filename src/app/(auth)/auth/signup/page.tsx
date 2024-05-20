import { Provider } from "./components/provider/provider.component";
import { Stepper } from "./components/stepper/stepper.component";

export default function page() {
    return (
        <Provider>
            <Stepper />
        </Provider>
    )
}