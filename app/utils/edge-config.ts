'use server';

import { get } from '@vercel/edge-config';
import { hash, compare } from 'bcryptjs';

interface AdminUser {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export async function getAdminCredentials(): Promise<AdminUser | null> {
  try {
    const admin = await get('admin');
    return admin || null;
  } catch (error) {
    console.error('Error fetching admin credentials:', error);
    return null;
  }
}

export async function checkAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const admin = await getAdminCredentials();
    if (!admin) return false;
    return admin.email === email && admin.password === password;
  } catch (error) {
    console.error('Error checking admin credentials:', error);
    return false;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await get('users');
    return users || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> {
  try {
    const users = await getAllUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(userData.password, 10);
    
    const newUser: User = {
      id: crypto.randomUUID(),
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Add new user to the list
    const updatedUsers = [...users, newUser];
    await get('users').set(updatedUsers);

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  try {
    const users = await getAllUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) return null;

    const isValid = await compare(password, user.password);
    return isValid ? user : null;
  } catch (error) {
    console.error('Error validating user:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const users = await getAllUsers();
    const user = users.find(u => u.email === email);
    return user || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
} 