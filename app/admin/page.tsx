
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Login Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Ad Settings Schema
const adSettingsSchema = z.object({
  ezoicKey: z.string().optional(),
  adsenseKey: z.string().optional(),
  adSlotId: z.string().optional(),
});

const ADMIN_EMAIL = 'syedjeelan006@gmail.com';
const ADMIN_PASSWORD = 'Jeddah@newspaper007';
const AUTH_KEY = 'latestnews9-admin-auth';
const EZOIC_KEY_STORAGE = 'latestnews9-ezoic-key';
const ADSENSE_KEY_STORAGE = 'latestnews9-adsense-key';
const ADSLOT_ID_STORAGE = 'latestnews9-adslot-id';

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof adSettingsSchema>>({
    resolver: zodResolver(adSettingsSchema),
    defaultValues: {
      ezoicKey: '',
      adsenseKey: 'ca-pub-4135832301482741',
      adSlotId: '',
    },
  });
  
  useEffect(() => {
    try {
      const ezoicKey = localStorage.getItem(EZOIC_KEY_STORAGE) || '';
      const adsenseKey = localStorage.getItem(ADSENSE_KEY_STORAGE) || 'ca-pub-4135832301482741';
      const adSlotId = localStorage.getItem(ADSLOT_ID_STORAGE) || '';
      form.reset({ ezoicKey, adsenseKey, adSlotId });
    } catch (error) {
      console.warn('Could not read ad settings from localStorage.');
    }
  }, [form]);


  function onSubmit(values: z.infer<typeof adSettingsSchema>) {
     try {
      localStorage.setItem(EZOIC_KEY_STORAGE, values.ezoicKey || '');
      localStorage.setItem(ADSENSE_KEY_STORAGE, values.adsenseKey || '');
      localStorage.setItem(ADSLOT_ID_STORAGE, values.adSlotId || '');
      toast({
        title: 'Settings Saved',
        description: 'Your ad settings have been saved locally.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'Could not save settings. Please enable localStorage.',
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Ad Settings</CardTitle>
            <CardDescription className="pt-1">Manage your ad integration keys here.</CardDescription>
          </div>
          <Button variant="outline" onClick={onLogout}>Logout</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="ezoicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ezoic Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Ezoic key" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Ezoic integration key.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adsenseKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google AdSense Publisher ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ca-pub-xxxxxxxxxxxxxxxx" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Google AdSense client ID.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adSlotId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google AdSense Ad Slot ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Ad Slot ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    The ID of the specific ad unit to display (e.g., 1234567890).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      try {
        localStorage.setItem(AUTH_KEY, 'true');
        onLoginSuccess();
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin panel.',
        });
      } catch (error) {
         toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Could not save session. Please enable cookies/localStorage.',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password.',
      });
    }
  }

  return (
     <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription className="pt-1">Enter your credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.warn('Could not read from localStorage. This is expected on the server.');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
     try {
        localStorage.removeItem(AUTH_KEY);
     } catch(error) {
        console.warn('Could not remove item from localStorage.');
     }
    setIsAuthenticated(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-headline font-bold mb-6 text-center">Admin Panel</h1>
        {isAuthenticated ? (
          <AdminPanel onLogout={handleLogout} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
    </div>
  );
}
