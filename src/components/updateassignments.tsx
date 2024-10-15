import React, { useEffect, useState } from 'react';
import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';
import useAssignments from '@/app/api/useAssignment';
import { error } from 'console';
import Createassignment from './createassignment';

import { useQuery } from 'react-query';

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
} from 'lucide-react';

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

import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function draftassignments() {
    const { assignmentData, a_notfound, a_found, a_loading, a_error } =
        useAssignments();

    // const { data: assignmentData, refetch } = useAssignments();
    // list/assign/
    if (assignmentData) {
        return (
            <div>
                {assignmentData.map(item => (
                    <p key={item.id}> {item.title}</p>
                ))}
            </div>
        );
    } else if (a_error) {
        console.log('errors found');
        return (
            <div className="flex flex-row">
                <Createassignment />
            </div>
        );
    }
}
