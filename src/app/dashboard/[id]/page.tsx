'use client';

import React, { Suspense } from 'react';
import useAuth from '@/app/api/useAuth';
import { useRouter } from 'next/navigation';

// components
import Logout from '@/components/logout';
import { Label } from '@/components/ui/label';
import ProfileDestNav from '../../../components/profileDestNav';
import Viewassignments from '../../../components/viewassignments';

// icons
import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
    User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

// api hooks
import useCookieChecker from '@/app/api/useCookie';
import Loading from './loading';

import Link from 'next/link';
import { getCookie } from 'cookies-next';

// assugnment components
import Activeassignments from '@/components/activeassignment';
import Draftassignments from '@/components/updateassignments';
import useDelete from '@/app/api/useDelete';

// video component
import Viewvideo from '@/components/viewvideos';

export default function profile() {
    const { user, loggedIn, offline, error } = useAuth();

    const router = useRouter();

    const online = useCookieChecker('access_token');

    const accessToken = getCookie('access_token');

    if (!accessToken) {
        // If there's no access token, do nothing
        return router.push('/');
    }

    if (user) {
        // console.log(user);
        return (
            <div className="flex flex-col min-h-screen w-[100%] ">
                {/* desktop nav */}
                <ProfileDestNav />

                <Tabs>name</Tabs>

                {/* assignment */}
                <Viewassignments />

                {/* video view */}
                <Viewvideo />
            </div>
        );
    }
}
