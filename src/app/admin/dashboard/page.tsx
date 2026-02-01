import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import { Home } from "lucide-react";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Fetch cars from DB (will fail if DB not connected, but code is correct)
    let cars: any[] = [];
    try {
        cars = await prisma.car.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {
        console.error("Failed to fetch cars:", e);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    {/* Mobile layout: home icon left, title center, buttons right */}
                    <div className="flex sm:hidden items-center justify-center relative mb-4">
                        <Button asChild variant="ghost" size="sm" className="absolute left-0">
                            <Link href="/">
                                <Home className="w-5 h-5" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>

                    {/* Desktop layout: normal flow */}
                    <div className="hidden sm:flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/">
                                    <Home className="w-5 h-5" />
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        </div>
                        <div className="flex gap-4">
                            <Button asChild>
                                <Link href="/admin/cars/new">Add New Car</Link>
                            </Button>
                            <SignOutButton />
                        </div>
                    </div>

                    {/* Mobile buttons row */}
                    <div className="flex sm:hidden gap-4 justify-end">
                        <Button asChild>
                            <Link href="/admin/cars/new">Add New Car</Link>
                        </Button>
                        <SignOutButton />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Daily)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cars.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No cars found. Add one to get started!
                                    </td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative h-12 w-20">
                                                <Image src={car.img} alt={car.name} fill className="object-cover rounded" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{car.name}</div>
                                            <div className="text-sm text-gray-500">{car.model}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {car.dailyPrice} AED
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {car.discountPrice ? (
                                                <span className="text-green-600 font-bold">{car.discountPrice} AED</span>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link href={`/admin/cars/${car.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                            {/* Delete button will be a Server Action component */}
                                            <span className="text-red-600 cursor-pointer hover:text-red-900">Delete</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
