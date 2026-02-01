'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Define Zod schema for car data
const carSchema = z.object({
    name: z.string(),
    model: z.string(),
    year: z.coerce.number().int(),
    price: z.coerce.number(),
    dailyPrice: z.coerce.number(),
    discountPrice: z.union([z.coerce.number(), z.literal(''), z.null(), z.undefined()]).transform(val => {
        if (val === '' || val === null || val === undefined) return null;
        return Number(val);
    }),
    offerTag: z.union([z.string(), z.null(), z.undefined()]).transform(val => {
        if (!val || val.trim() === '') return null;
        return val;
    }),
    features: z.preprocess((val) => {
        if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
        if (Array.isArray(val)) return val.map(String);
        return [];
    }, z.array(z.string())),
    transmission: z.string(),
    seats: z.coerce.number().int(),
    fuelType: z.string(),
    img: z.string(),
    desc: z.string(),
    isOriginal: z.coerce.boolean(),
    isAvailable: z.coerce.boolean(),
});

export async function getCar(id: number) {
    const car = await prisma.car.findUnique({
        where: { id },
    });
    return car;
}

export async function createCar(data: any) {
    console.log("Creating car raw payload:", JSON.stringify(data, null, 2));
    try {
        const parsedData = carSchema.parse(data);
        console.log("Zod Parsed Data:", JSON.stringify(parsedData, null, 2));

        const newCar = await prisma.car.create({
            data: parsedData
        });
        console.log("Create success:", newCar.id);

        revalidatePath('/admin/dashboard');
        revalidatePath('/');
        return { success: true, id: newCar.id };
    } catch (e) {
        console.error("Create failed:", e);
        if (e instanceof z.ZodError) {
            console.error("Validation Errors:", (e as any).errors);
            throw new Error("Validation failed: " + (e as any).errors.map((err: any) => `${err.path}: ${err.message}`).join(', '));
        }
        throw new Error("Failed to create car: " + (e as Error).message);
    }
}

export async function updateCar(id: number, data: any) {
    console.log("Updating car raw payload:", id, JSON.stringify(data, null, 2));

    try {
        const carId = Number(id);
        if (isNaN(carId)) throw new Error("Invalid ID");

        const parsedData = carSchema.parse(data);
        console.log("Zod Parsed Data:", JSON.stringify(parsedData, null, 2));

        await prisma.car.update({
            where: { id: carId },
            data: parsedData,
        });
        console.log("Update success");
    } catch (e) {
        console.error("Update failed:", e);
        if (e instanceof z.ZodError) {
            console.error("Validation Errors:", (e as any).errors);
            throw new Error("Validation failed: " + (e as any).errors.map((err: any) => `${err.path}: ${err.message}`).join(', '));
        }
        throw new Error("Failed to update car: " + (e as Error).message);
    }

    revalidatePath('/admin/dashboard');
    revalidatePath(`/admin/cars/${id}/edit`);
    revalidatePath('/');
    redirect('/admin/dashboard');
}
