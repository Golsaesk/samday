import NextAuth from 'next-auth';
import { authOptions, } from '@/modules/member/libraries/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, };
