'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCar(formData: FormData) {
    try {
        const rawData = Object.fromEntries(formData.entries());

        // Process comma-separated features
        const featuresList = (rawData.features as string)
            .split(',')
            .map(f => f.trim())
            .filter(f => f.length > 0);

        const price = parseFloat(rawData.price as string) || 0; // Legacy field
        const dailyPrice = parseFloat(rawData.dailyPrice as string);
        // Explicitly handle discountPrice: if it's "0" or empty, treat as null or store as is if needed.
        // However, coercing "0" or "" to null is creating cleaner DB data.
        const discountPriceInput = rawData.discountPrice as string;
        const discountPrice = discountPriceInput && parseFloat(discountPriceInput) > 0
            ? parseFloat(discountPriceInput)
            : null;

        await prisma.car.create({
            data: {
                name: rawData.name as string,
                model: rawData.model as string,
                year: parseInt(rawData.year as string),
                price: price || dailyPrice, // Fallback
                dailyPrice: dailyPrice,
                discountPrice: discountPrice,
                desc: rawData.desc as string,
                img: rawData.img as string,
                transmission: rawData.transmission as string,
                fuelType: rawData.fuelType as string,
                seats: parseInt(rawData.seats as string),
                features: featuresList,
            }
        });

        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Failed to create car:", error);
        return { error: "Failed to create car. Database might be down." };
    }
}
