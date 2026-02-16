import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export async function getAuthToken() {
  return (await cookies()).get('Authentication')?.value ?? null;
}

export async function isAuthenticated() {
  return !!(await getAuthToken());
}

export async function setAuthCookie(token: string) {
  (await cookies()).set({
    name: 'Authentication',
    value: token,
    httpOnly: true,
    secure: true,
    expires: new Date(jwtDecode(token).exp! * 1000),
  });
}

export async function clearAuthCookie() {
  (await cookies()).delete('Authentication');
}
