'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Filter,
  Mail,
  Heart,
  ShoppingCart,
  Bell,
  Users,
  Calendar,
  Pencil,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import template1 from './data/template1.json';
import template2 from './data/template2.json';
import template3 from './data/template3.json';
import template4 from './data/template4.json';
import template5 from './data/template5.json';
import template6 from './data/template6.json';
import template7 from './data/template7.json';
import template8 from './data/template8.json';

const navigationItems = [
  { id: 'templates', name: 'All Templates', icon: Mail, href: '/' },
];

const emailTemplates = [
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7,
  template8,
];

export default function Component() {
  const pathname = usePathname();

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Left Sidebar Navigation */}
      <div className='w-64 bg-white border-r border-gray-200 flex flex-col'>
        <div className='p-6'>
          <h1 className='text-xl font-semibold text-gray-900 mb-6'>Email Templates</h1>

          {/* Navigation Links */}
          <div className='space-y-1'>
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                >
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mr-3 ${
                        isActive ? 'text-blue-700' : 'text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Main Content Area */}
      <div className='flex-1 flex flex-col'>
        {/* Template Grid */}
        <div className='flex-1 overflow-auto p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {emailTemplates.map((template, index) => (
              <Card
                key={index}
                className='hover:shadow-lg transition-all duration-200 cursor-pointer group'
              >
                <CardHeader className='pb-3'>
                  <div className='aspect-[4/5] bg-gray-100 rounded-md mb-3 overflow-hidden relative'>
                    <img
                      src={template.thumbnail || '/placeholder.svg'}
                      className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200'
                    />
                  </div>
                  <div className='space-y-1'></div>
                </CardHeader>
                <CardContent className='pt-0 relative'>
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>By EasyEmailPro</span>
                  </div>
                  <div className='absolute bottom-4 right-4 transition-opacity'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size='sm'
                          variant='secondary'
                          className='h-8 w-8 p-0 cursor-pointer'
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        side='right'
                      >
                        <DropdownMenuItem>
                          <Link href={`/editor?id=${index + 1}`}>
                            Open Source Version
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <Link
                            href={`https://demo.easyemail.pro/template?id=${template.cid}`}
                          >
                            Commercial Version
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {emailTemplates.length === 0 && (
            <div className='text-center py-12'>
              <Mail className='w-12 h-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No matching templates found
              </h3>
              <p className='text-gray-500'>
                Try adjusting your search criteria or create a new template
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
