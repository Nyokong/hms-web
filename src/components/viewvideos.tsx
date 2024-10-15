import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import viewAssignment from '@/app/api/useAssignment';

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
import { Tabs, TabsContent } from './ui/tabs';

export default function viewvideo() {
    const { videodata, notfound, found, loading, error } = useVideoData();

    // list/assign/
    if (videodata) {
        return (
            <div>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all" className="max-lg:h-auto mt-7">
                        <div className="flex items-center">
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
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Videos</CardTitle>
                                    <CardDescription>
                                        View every video submission
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
                                                <TableHead>
                                                    description
                                                </TableHead>
                                                <TableHead>
                                                    watch link button
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {videodata &&
                                                videodata.map(video => (
                                                    <TableRow key={video.id}>
                                                        <TableCell className="hidden sm:table-cell">
                                                            {video.id}
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {video.title}
                                                        </TableCell>

                                                        <TableCell className="font-medium">
                                                            {video.description}{' '}
                                                            - watch video -
                                                            assignment
                                                        </TableCell>

                                                        <TableCell className="font-medium">
                                                            <Button className="mx-2 bg-black text-white ">
                                                                <Link
                                                                    href={`/videos/${video.id}`}
                                                                >
                                                                    watch
                                                                </Link>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="justify-center border-t p-4"></CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        );
    }
}
