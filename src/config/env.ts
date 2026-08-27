import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Не задана переменная окружения ${name}`);
  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
  apiUrl: process.env.API_URL ?? 'https://api.practicesoftwaretesting.com',
  customer: { email: required('CUSTOMER_EMAIL'), password: required('CUSTOMER_PASSWORD') },
  admin: { email: required('ADMIN_EMAIL'), password: required('ADMIN_PASSWORD') },
  storage: {
    customer: '.auth/customer.json',
    admin: '.auth/admin.json',
  },
} as const;
