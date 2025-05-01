import CreateAccount from "@/app/create-account/CreateAccount";
import { AccountProvider } from "@/app/create-account/AccountContext";

export default function Page() {
    return (
        <AccountProvider>
            <CreateAccount />
        </AccountProvider>
    );
}