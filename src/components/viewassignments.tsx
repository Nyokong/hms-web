// import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
// import viewAssignment from '@/app/api/useAssignment';
import useAssignments from '@/app/api/useAssignment';
// import Createassignment from './createassignment';

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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useDelete from '@/app/api/useDelete';
import Createassignment from './createassignment';

export default function viewassignments() {
    const { assignmentData, a_loading, a_error } = useAssignments();

    const [total_count, setTotalCount] = useState(0);

    const { deleteItem, isDeleting, delErr } = useDelete(
        'http://localhost:8000/api/assign/delete',
    );

    const handleDelete = (id: number) => {
        console.log(`Deleted ${id}`);
        deleteItem(id);
    };

    if (assignmentData) {
        // const filteredArray = assignmentData.filter(
        //     data => data.status === 'active',
        // );

        return (
            <div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all" className="max-lg:h-auto mt-4">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="draft">Draft</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1"
                                        >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Filter by
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Draft
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 gap-1"
                                >
                                    <Link
                                        href={`http://localhost:8000/api/download/csv`}
                                        className="flex shrink-0 items-center justify-center gap-2 text-white md:text-base hover:text-black"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[14px]">
                                            Export CSV
                                        </span>
                                    </Link>
                                </Button>
                                <Button size="sm" className="h-7 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[13px]">
                                        Add Assignment
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="all">
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
                                            {assignmentData.map(item => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {item.id}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {item.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {item.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {item.total_submissions}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {item.created_at}
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
                                                                        Toggle
                                                                        menu
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
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                item.id,
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isDeleting
                                                                        }
                                                                        className="text-black"
                                                                    >
                                                                        {' '}
                                                                        {isDeleting
                                                                            ? 'Deleting...'
                                                                            : 'Delete'}
                                                                    </Button>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="justify-center border-t p-4">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="gap-1"
                                            >
                                                <PlusCircle className="h-3.5 w-3.5" />
                                                Add Assignments
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            {/* Place content for the popover here. */}
                                            <Createassignment />
                                        </PopoverContent>
                                    </Popover>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        {/*<TabsContent value="active">
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
                                               <TableHead>Price</TableHead> 
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
                                                                        Toggle
                                                                        menu
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
                                <CardFooter className="justify-center border-t p-4">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="gap-1"
                                    >
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        Add Assignments
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
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
                                                <TableHead>Price</TableHead> 
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
                                                                        Toggle
                                                                        menu
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

                                <CardFooter className="justify-center border-t p-4">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="gap-1"
                                    >
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        Add Assignments
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent> */}
                    </Tabs>
                </main>
            </div>
        );
    }
}
