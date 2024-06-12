import { auth } from "@/auth";
import Form from "./components/form/form.component";
import Header from "./components/header/header.component";

export default async function Account() {

    const session = await auth();
    const isLoggedIn = !!session;


    return (
        <div className="mb-12">
            {isLoggedIn && <Header />}
            <Form session={session} />
        </div>
    )
}
