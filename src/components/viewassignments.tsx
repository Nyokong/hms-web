// import useVideoData from '@/app/api/useVideoData';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
// import viewAssignment from '@/app/api/useAssignment';
import useAssignments from '@/app/api/useAssignment';
// import Createassignment from './createassignment';
// import updateassignments from './updateassignments';
import ReactPaginate from 'react-paginate';

import {
    File,
    // Home,
    // LineChart,
    ListFilter,
    MoreHorizontal,
    // Package,
    // Package2,
    // PanelLeft,
    PlusCircle,
    // Search,
    // Settings,
    // ShoppingCart,
    // Users2,
    X,
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

// import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';

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

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from '@/components/ui/popover';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useDelete from '@/app/api/useDelete';
import Createassignment from './createassignment';
import Updateassignments from './updateassignments';
import { Label } from './ui/label';

export default function viewassignments() {
    const { assignmentData, a_loading, a_error } = useAssignments();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isCreate, setIsCreateOpen] = useState(false);

    // const [total_count, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentId, setCurrentId] = useState(null);

    const rowsPerPage = 10;

    const { deleteItem, isDeleting, delErr } = useDelete(
        'http://localhost:8000/api/assign/delete',
    );

    const handleDelete = (id: number) => {
        console.log(`Deleted ${id}`);
        deleteItem(id);
    };

    const handlePageClick = event => {
        setCurrentPage(event.selected);
    };

    const handleOpenOverlay = id => {
        setCurrentId(id);
        setIsOverlayOpen(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        setCurrentId(null);
    };

    const handleOpenCreate = () => {
        setIsCreateOpen(true);
    };

    const handleCloseCreate = () => {
        setIsCreateOpen(false);
    };

    if (assignmentData) {
        // const filteredArray = assignmentData.filter(
        //     data => data.status === 'active',
        // );
        const currentRows = assignmentData.slice(
            currentPage * rowsPerPage,
            (currentPage + 1) * rowsPerPage,
        );

        return (
            <div className="relative">
                {isOverlayOpen && (
                    <div className="relative w-full">
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black w-full">
                            <div className="bg-white p-8 rounded shadow-lg relative sm:w-[400px] sm:mx-[5%]">
                                <button
                                    onClick={handleCloseOverlay}
                                    className="absolute top-2 right-2"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <Updateassignments id={currentId} />
                            </div>
                        </div>
                    </div>
                )}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all" className="max-lg:h-auto mt-4">
                        <div className="flex items-center ">
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

                                {isCreate && (
                                    <div className="relative w-full">
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black w-full">
                                            <div className="bg-white p-8 rounded shadow-lg relative sm:w-[400px] sm:mx-[5%]">
                                                <button
                                                    onClick={handleCloseCreate}
                                                    className="absolute top-2 right-2"
                                                >
                                                    <X className="h-6 w-6" />
                                                </button>
                                                <Createassignment />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Button
                                    size="sm"
                                    className="h-7 gap-1"
                                    onClick={handleOpenCreate}
                                >
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
                                            {currentRows.map(item => (
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
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleOpenOverlay(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                >
                                                                    {' '}
                                                                    {isDeleting
                                                                        ? 'Deleting...'
                                                                        : 'Delete'}
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(
                                            assignmentData.length / rowsPerPage,
                                        )}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </CardContent>
                                <CardFooter className="justify-center border-t p-4">
                                    <Label>End</Label>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        );
    }
}
