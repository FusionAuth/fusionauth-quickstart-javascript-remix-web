import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node"
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({request}) => {
  let user = await authenticator.isAuthenticated(request, {
      successRedirect: "/account",
  });
  return user;
}

export default function Index() {
  return (
    <div id="page-container">
      <div id="page-header">
        <div id="logo-header">
          <img src="https://fusionauth.io/cdn/samplethemes/changebank/changebank.svg" />
          <Link to="/login" className="button-lg">Login</Link>
        </div>

        <div id="menu-bar" className="menu-bar">
          <a className="menu-link">About</a>
          <a className="menu-link">Services</a>
          <a className="menu-link">Products</a>
          <a className="menu-link" style={{textDecorationLine: 'underline'}}>Home</a>
        </div>
      </div>

      <div style={{flex: '1'}}>
        <div className="column-container">
          <div className="content-container">
            <div style={{marginBottom: '100px'}}>
              <h1>Welcome to Changebank</h1>
              <p>To get started, <Link to="/login" >log in or create a new account</Link>.</p>
            </div>
          </div>
          <div style={{flex: '0'}}>
            <img src="/money.jpg" style={{maxWidth: '800px'}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
