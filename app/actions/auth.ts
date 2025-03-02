'use server';

import { checkAdminCredentials } from '../utils/edge-config';

export async function verifyAdminCredentials(email: string, password: string) {
  return checkAdminCredentials(email, password);
} 