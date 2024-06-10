'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from './components/ui/button';

export default function Home() {
  const session = useSession();
  return (
    <div className='flex w-full h-screen flex-col jusitfy-center items-center mt-52'>
      {
        session.data?.user
          ? <div>
            {session.data.user.name}
            <Button className='w-[350px]' variant='secondary' onClick={() => signOut()}>Signout</Button>
          </div>
          : null
      }
      Home page
    </div>
  );
}