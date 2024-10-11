'use client'

import React, { useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@components/ui/table'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@components/ui/pagination'

interface CustomTableProps {
    data: any
    columns: ColumnDef<any>[]
    onView: (row: Row<any>) => void
    totalRecords: number
    recordsPerPage: number
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const CustomTable = ({
    data,
    columns,
    onView,
    totalRecords,
    recordsPerPage,
    currentPage,
    setCurrentPage,
}: CustomTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const totalPages = Math.ceil(totalRecords / recordsPerPage) // Calculate total pages

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full overflow-auto">
            <Table className="table-auto">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {data?.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                onClick={() => {
                                    onView(row)
                                }}
                                className="cursor-pointer"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination className="justify-end mt-3">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            aria-disabled={currentPage <= 0}
                            tabIndex={currentPage <= 0 ? -1 : undefined}
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 0))
                            }
                            className={
                                currentPage <= 0
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                    {Array.from(
                        { length: totalPages > 5 ? 5 : totalPages },
                        (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    aria-disabled={currentPage === index}
                                    tabIndex={currentPage === index ? -1 : undefined}
                                    className={
                                        currentPage === index
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                    onClick={() => setCurrentPage(index)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    {/* Ellipsis for large numbers of pages */}
                    {totalPages > 5 && currentPage < totalPages - 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext
                            aria-disabled={currentPage + 1 >= totalPages}
                            tabIndex={currentPage + 1 >= totalPages ? -1 : undefined}
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages - 1)
                                )
                            }
                            className={
                                currentPage + 1 >= totalPages
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default CustomTable
