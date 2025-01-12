import axios from 'axios';
import { NextAuthOptions, } from 'next-auth';
import { LoginType, } from '@/modules/member/libraries/constants';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getClientIP, } from '@/modules/general/store/api/general-api';
import { AdvancedUser, } from '@/modules/general/libraries/general-types';
import { SIGN_IN_PAGE, SIGN_OUT_PAGE, } from '@/modules/general/libraries/urls';
import { addMinutes, convertStringToDate, } from '@/modules/general/libraries/date';
import {
  loginWithMobile, loginWithUsername,
  refreshAccessToken,
} from '@/modules/member/libraries/login';
import {
  API_KEY, ACCESS_TOKEN_VALIDITY_LOCAL_IN_MINUTES,
  API_DOMAIN, HTTP_CLIENT_IP_HEADER, API_VERSION,
  LOGIN_INFO_VERBOSE, WEBSITE_DEFAULT_LOCALE,
  ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES,
} from '@modules/general/libraries/constants';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      async authorize(credentials: any) {
        try {
          let user: AdvancedUser | null = {} as AdvancedUser;
          if (`${credentials.loginType}` === `${LoginType.mobile}`) {
            user = await loginWithMobile(credentials);
            return user;
          } else if (`${credentials.loginType}` === `${LoginType.email}`) {
            user = await loginWithUsername(credentials);
            return user;
          } else if (`${credentials.loginType}` === `${LoginType.updateProfile}`) {
            user = {
              id: credentials.id,
              name: credentials.name,
              firstName: credentials.firstName,
              lastName: credentials.lastName,
              email: credentials.email,
              mobile: credentials.mobile,
              image: credentials.image,
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
              expires: credentials.expires,
            };

            return user;
          }
        } catch (error: any) {
          if (error) {
            throw new Error(error);
          }
        }
        return null;
      },
      credentials: {},
    }),
  ],
  secret: 'fbAX7ujLC7BS4HtVdnZ1BeOrlMC/IUNMbZ5u6LMFknM=',
  session: {
    strategy: 'jwt',
    maxAge: ACCESS_TOKEN_VALIDITY_LOCAL_IN_MINUTES * 60,
  },

  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },

  jwt: { secret: process.env.JWT_SECRET, },

  pages: {
    signIn: SIGN_IN_PAGE,
    error: SIGN_IN_PAGE,
    signOut: SIGN_OUT_PAGE,
  },

  debug: false,

  events: {
    async signOut(message) {
      const logoutUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/authentication/logout`;
      const refreshToken = { refresh_token: message.token.refreshToken, };
      const clientIP: string = await getClientIP();
      await axios.post<any>(logoutUrl, JSON.stringify(refreshToken), {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          Authorization: `Bearer ${message.token.accessToken}`,
          [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
        },
      });
    },

    // async signIn(message) {
    //   console.log('signIn event', message);
    // },
    // async createUser(message) {
    //   console.log('createUser event', message);
    // },
    // async updateUser(message) {
    //   console.log('updateUser event', message);
    // },
    // async linkAccount(message) {
    //   console.log('linkAccount event', message);
    // },
    // async session(message) {
    //   console.log('session event', message);
    // },
  },

  callbacks: {
    async signIn({
      user,
      // account, profile, email, credentials,
    }) {
      if (LOGIN_INFO_VERBOSE) {
        console.log('\x1b[35m%s\x1b[0m', 'SignIn Called!');
      }
      if (user) {
        return true;
      }
      return false;
    },
    async session({
      session,
      token,
      // user
    }: any) {
      if (LOGIN_INFO_VERBOSE) {
        console.log('\x1b[35m%s\x1b[0m', 'Session Called!');
      }
      session.user = {
        ...session.user,
        ...token.user,
      };
      session.accessToken = token.accessToken || '';
      session.refreshToken = token.refreshToken || '';
      session.error = token.error || '';
      session.expires = token.accessTokenExpires || null;
      return session;
    },
    async jwt({
      token,
      user,
      trigger,
      // account, profile,
    }: any) {
      if (LOGIN_INFO_VERBOSE) {
        console.log('\x1b[35m%s\x1b[0m', 'JWT Called!');
      }
      if (trigger === "update") {
        console.log('\x1b[35m%s\x1b[0m', 'Update Triggered!');
      }

      if (user) {
        const {
          accessToken, refreshToken, ...rest
        } = user;
        token.accessToken = accessToken;
        token.accessTokenExpires = addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES).toUTCString();
        token.refreshToken = refreshToken;
        token.user = rest;
      }

      if (token.accessTokenExpires && new Date() < new Date(token.accessTokenExpires)) {
        if (LOGIN_INFO_VERBOSE) {
          console.log('\x1b[32m%s\x1b[0m', 'Return Valid Token {');
          console.log('\x1b[36m%s\x1b[0m', '  Expire date: ', convertStringToDate(token.accessTokenExpires));
          console.log('\x1b[36m%s\x1b[0m', '  Refresh Token: ', token.refreshToken);
          console.log('\x1b[36m%s\x1b[0m', '  Access Token: ', token.accessToken);
          console.log('\x1b[32m%s\x1b[0m', '}');
        }
        return token;
      }

      // Refresh Access Token
      if (LOGIN_INFO_VERBOSE) {
        console.log('\x1b[31m%s\x1b[0m', 'Refresh Token {');
        console.log('\x1b[33m%s\x1b[0m', '   Start Refresh Date:', convertStringToDate(`${new Date()}`));
      }
      const newToken = await refreshAccessToken(token);
      // if (!newToken.error) {
      //   newToken.user.expires = addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_IN_MINUTES).toUTCString();
      //   newToken.expires = addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_IN_MINUTES).toUTCString();
      // }
      if (LOGIN_INFO_VERBOSE) {
        console.log('\x1b[31m%s\x1b[0m', '}');
      }
      return newToken;
    },
  },
};