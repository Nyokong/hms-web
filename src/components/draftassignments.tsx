import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';
import useAssignments from '@/app/api/useAssignment';
import { error } from 'console';
import Createassignment from './createassignment';

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

    const calculateTotalCount = obj => {
        let totalCount = 0;

        const countValues = value => {
            if (Array.isArray(value)) {
                totalCount += value.length;
            } else if (typeof value === 'object' && value !== null) {
                Object.values(value).forEach(countValues);
            } else {
                totalCount += 1;
            }
        };

        countValues(obj);
        return totalCount;
    };

    const [total_count, setTotalCount] = useState(0);

    useEffect(() => {
        const count = calculateTotalCount(assignmentData);
        setTotalCount(count);
    }, []);

    // list/assign/
    if (assignmentData) {
        // Filter the array to only include active users
        const filteredArray = assignmentData.filter(
            data => data.status === 'draft',
        );
        return (
            <div>
                <TabsContent value="draft">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Assignments</CardTitle>
                            <CardDescription>
                                Manage your assignments and view their
                                performance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden w-[100px] sm:table-cell">
                                            <span className="sr-only">
                                                Image
                                            </span>
                                        </TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        {/* <TableHead>Price</TableHead> */}
                                        <TableHead className="hidden md:table-cell">
                                            Total Submissions
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Created at
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredArray.map(data => (
                                        <TableRow key={data.id}>
                                            <TableCell className="hidden sm:table-cell">
                                                {data.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {data.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {data.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {data.total_submissions}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {data.created_at}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Toggle menu
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>1-{total_count}</strong> of{' '}
                                <strong>{total_count}</strong> Assignments
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
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
