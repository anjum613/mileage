'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createCar } from '@/app/actions/car';
import { useUploadThing } from '@/lib/uploadthing';
import Image from 'next/image';

const carSchema = z.object({
    name: z.string().min(1, "Name is required"),
    model: z.string().min(1, "Model is required"),
    year: z.coerce.number().min(2000),
    // price removed from form input, will map from dailyPrice
    dailyPrice: z.coerce.number().min(0),
    discountPrice: z.coerce.number().optional(),
    desc: z.string().min(1, "Description is required"),
    features: z.string(),
    transmission: z.enum(["Auto", "Manual"]),
    seats: z.coerce.number().min(1),
    fuelType: z.enum(["Petrol", "Diesel", "Hybrid"]),
    img: z.string().min(1, "Image URL is required (Temporary until upload is fixed)"),
});

type CarFormValues = z.infer<typeof carSchema>;

export default function AddCarPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
    const [imagePreview, setImagePreview] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    const { startUpload } = useUploadThing("imageUploader");

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(carSchema),
        defaultValues: {
            transmission: "Auto" as const, // Fix literal type
            fuelType: "Petrol" as const,
            seats: 5,
            year: 2024,
        }
    });

    const imgValue = watch('img');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const res = await startUpload([file]);
            if (res && res[0]) {
                setValue('img', res[0].url);
                setImagePreview(res[0].url);
            }
        } catch (err) {
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: CarFormValues) => {
        setLoading(true);
        setError('');

        try {
            // Prepare data object for server action
            const carData = {
                ...data,
                price: data.dailyPrice, // mirror daily price
                features: data.features.split(',').map(f => f.trim()).filter(f => f.length > 0), // Convert string to array
                isOriginal: true,
                isAvailable: true,
            };

            const result = await createCar(carData);
            if (result && result.success) {
                router.push('/admin/dashboard');
            } else {
                setError("Failed to create car (unknown error)");
            }
        } catch (e) {
            setError("Failed to create car");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="mb-6 flex items-center justify-center relative">
                    <Button variant="ghost" size="sm" onClick={() => router.push('/admin/dashboard')} className="absolute left-0">
                        ← Dashboard
                    </Button>
                    <h1 className="text-2xl font-bold">Add New Car</h1>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Name (e.g., Toyota Camry)</Label>
                            <Input {...register('name')} className="mt-1" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label>Model (e.g., Camry 2024 - Full Option)</Label>
                            <Input {...register('model')} className="mt-1" />
                            {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label>Year</Label>
                            <Input type="number" {...register('year')} className="mt-1" />
                            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                        </div>
                        <div>
                            <Label>Daily Price (Standard)</Label>
                            <Input type="number" {...register('dailyPrice')} className="mt-1" />
                            {errors.dailyPrice && <p className="text-red-500 text-sm">{errors.dailyPrice.message}</p>}
                        </div>
                        <div>
                            <Label>Discount Price (Optional)</Label>
                            <Input type="number" {...register('discountPrice')} className="mt-1" placeholder="Leave empty if none" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label>Car Image</Label>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant={uploadMethod === 'url' ? 'default' : 'outline'}
                                    onClick={() => setUploadMethod('url')}
                                >
                                    URL
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant={uploadMethod === 'upload' ? 'default' : 'outline'}
                                    onClick={() => setUploadMethod('upload')}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>

                        {uploadMethod === 'url' ? (
                            <>
                                <Input
                                    {...register('img')}
                                    className="mt-1"
                                    placeholder="https://example.com/car-image.jpg"
                                    onChange={(e) => setImagePreview(e.target.value)}
                                />
                                {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
                            </>
                        ) : (
                            <>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="mt-1"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
                                {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
                            </>
                        )}

                        {(imgValue || imagePreview) && (
                            <div className="mt-4 relative h-48 w-full border rounded">
                                <Image
                                    src={imgValue || imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea {...register('desc')} className="mt-1" />
                        {errors.desc && <p className="text-red-500 text-sm">{errors.desc.message}</p>}
                    </div>

                    <div>
                        <Label>Features (Comma separated)</Label>
                        <Input {...register('features')} className="mt-1" placeholder="AC, Cruise Control, Bluetooth" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label>Transmission</Label>
                            <select {...register('transmission')} className="w-full mt-1 border rounded p-2 text-sm bg-background">
                                <option value="Auto">Auto</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </div>
                        <div>
                            <Label>Fuel Type</Label>
                            <select {...register('fuelType')} className="w-full mt-1 border rounded p-2 text-sm bg-background">
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div>
                            <Label>Seats</Label>
                            <Input type="number" {...register('seats')} className="mt-1" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create Car'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
