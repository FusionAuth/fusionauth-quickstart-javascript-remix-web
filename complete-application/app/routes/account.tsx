import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({request}) => {
    const email = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    return email;
}

export default function Account() {
    const email: string = useLoaderData<typeof loader>();
    return (
        <div id="page-container">
            <div id="page-header">
                <div id="logo-header">
                    <img src="https://fusionauth.io/cdn/samplethemes/changebank/changebank.svg" />
                    <div className="h-row">
                        <p className="header-email">{email}</p>
                        <Link to="/logout" className="button-lg">Logout</Link>
                    </div>
                </div>

                <div id="menu-bar" className="menu-bar">
                    <Link to="/change" className="menu-link inactive" >Make Change</Link>
                    <Link to="/account" className="menu-link" >Account</Link>
                </div>
            </div>

            <div style={{flex: '1'}}>
                <div className="column-container">
                    <div className="app-container">
                        <h3>Your balance</h3>
                        <div className="balance">$0.00</div>
                    </div>
                </div>
            </div>
        </div>
  );
}
