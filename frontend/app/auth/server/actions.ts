'use server';

import { post } from '@/app/shared/utils/fetch';
import { redirect } from 'next/navigation';
import { setAuthCookie, clearAuthCookie } from '../../shared/utils/cookies';

export async function loginAction(
  _state: { error?: string },
  formData: FormData,
) {
  const { response, error } = await post(
    'auth/login',
    Object.fromEntries(formData),
  );

  if (error) return { error };

  const setCookieHeader = response.headers.get('Set-Cookie');
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1];
    await setAuthCookie(token);
  }

  redirect('/');
}

export async function logoutAction() {
  await clearAuthCookie();
  redirect('/');
}
