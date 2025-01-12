'use client';
import React, { useEffect, } from 'react';
import { signIn, useSession, } from 'next-auth/react';
import { checkLogin, } from '@modules/general/libraries/utils';
import { AdvancedSession, } from '@modules/general/libraries/general-types';

const Auth = ({ children, }: any) => {
  const {
    data: clientSession,
    status: sessionStatus,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  const session = clientSession as AdvancedSession;
  const hasUser = !!session?.user;

  useEffect(() => {
    if (sessionStatus === 'loading') return; // Do nothing while loading
    if (!hasUser || !checkLogin(session, sessionStatus, true)) {
      console.log('Expired ...');
      signIn(); // If not authenticated, force login
    }
  }, [status, hasUser, ]);

  useEffect(() => {
    update();
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(); // If not authenticated, force login
    }
  }, [session, ]);

  if (hasUser) {
    return children;
  }
  return <></>;
};

export default Auth;
