import { jwtDecode } from "jwt-decode";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { OAuth2Strategy, OAuth2StrategyOptions } from "remix-auth-oauth2";

type User = string;
export let authenticator = new Authenticator<User>(sessionStorage);

const authOptions: OAuth2StrategyOptions = {
    authorizationURL: `${process.env.AUTH_URL}/authorize`,
    tokenURL: `${process.env.AUTH_URL}/token`,
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.AUTH_CALLBACK_URL!,
    useBasicAuthenticationHeader: false, // defaults to false
};

const authStrategy = new OAuth2Strategy(
    authOptions,
    async ({accessToken, refreshToken, extraParams, profile, context, request}) => {
        type Token = { email: string }
        const token: Token = jwtDecode(accessToken);
        return token.email;
    }
);

authenticator.use(
    authStrategy,
    "FusionAuth"
);
