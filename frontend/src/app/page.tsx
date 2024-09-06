'use client'
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { postDataMethod } from './services/api';
import { generateObjectId } from './helpers';

export default function Home() {
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session) { 
      const userData = {
        userId: session.user?.id,
        email: session.user?.email || '',
        firstName: session.user?.name?.split(' ')[0] || 'DefaultFirstName',
        lastName: session.user?.name?.split(' ')[1] || 'DefaultLastName',
      };

      postDataMethod('http://localhost:8080/api/auth/login', userData)
        .then((data) => {
          window.location.href = "/client";
        })
        .catch((error) => {
          console.error('Error saving user:', error);
        });
    }
    console.log(session?.user);
  }, [session]);

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  );
}
