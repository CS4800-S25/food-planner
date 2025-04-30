
import { AccountProvider } from "./AccountContext";
import CreateAccount from "./CreateAccount";

export default function Page() {
    return (
        <AccountProvider>
            <CreateAccount />
        </AccountProvider>
    );
}