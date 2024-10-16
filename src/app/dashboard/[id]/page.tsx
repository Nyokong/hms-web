'use client';

import React, { Suspense, useEffect, useState } from 'react';
import useAuth from '@/app/api/useAuth';
import { useRouter } from 'next/navigation';

// components
import Logout from '@/components/logout';
import { Label } from '@/components/ui/label';
import ProfileDestNav from '../../../components/profileDestNav';
import Viewassignments from '../../../components/viewassignments';
import Usertab from '@/components/usertab';

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
    X,
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
import useCheckToken from '@/app/api/useCheckToken';

// video component
import Viewvideo from '@/components/viewvideos';

import Updateuserdata from '../../../components/updateuserdata';
import Viewstudents from '../../../components/viewstudents';
import Viewsubmissions from '@/components/viewsubmissions';

export default function profile() {
    const { user, error } = useAuth();

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const router = useRouter();

    const online = useCookieChecker('access_token');

    const accessToken = getCookie('access_token');

    if (!accessToken) {
        // If there's no access token, do nothing
        return router.push('/');
    }
    if (!getCookie('loggedin')) {
        const logged = setTimeout(() => {
            if (!getCookie('loggedin')) {
                const logged = setTimeout(() => {
                    return router.push('/');
                }, 1000);
            }
        }, 5000);
    }

    if (user) {
        // console.log(user);
        return (
            <div className="flex flex-col min-h-screen w-[100%] ">
                {/* desktop nav */}
                <ProfileDestNav />

                <div className="container">
                    <Usertab />

                    {/* assignment */}
                    <Viewassignments />

                    {/* submissions and graded */}
                    <Viewsubmissions />

                    {/* video view */}
                    <Viewvideo />

                    {/* student */}
                    <Viewstudents />
                </div>
            </div>
        );
    }
}
