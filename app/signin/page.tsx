'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Authbox from '@/app/components/AuthBox';
import Link from 'next/link';
import { signIn } from 'next-auth/react';


const formSchema = z.object({
  email: z.string().min(3).max(50),
  password: z.string().min(8).max(16)
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/'
    });
  }

  return (
    <Authbox title='Signin'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='[&>*]:my-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between items-center'>
            <Button type='submit'>Signin</Button>
            <Link href='/signup' className='underline text-sm'>Don&apos;t have an account?</Link>
          </div>
        </form>
      </Form>
    </Authbox>
  );
}