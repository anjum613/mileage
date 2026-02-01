'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Copy, Loader2 } from 'lucide-react';
import NextLink from 'next/link';
import { updateCar, createCar } from '@/app/actions/car';

interface Car {
    id: number;
    name: string;
    model: string;
    year: number;
    price: number;
    dailyPrice: number;
    discountPrice?: number | null;
    offerTag?: string | null;
    img: string;
    desc: string;
    features: string[];
    transmission: string;
    seats: number;
    fuelType: string;
    isOriginal: boolean;
    isAvailable: boolean;
}

const FEATURE_LIST = [
    "AC", "Cruise Control", "Power Steering",
    "Leather Seats", "5-Seater", "7-Seater",
    "Bluetooth", "Apple CarPlay", "Android Auto",
    "Sunroof", "Reverse Camera", "Parking Sensors",
    "GPS Navigation", "USB", "AUX"
];

export default function EditCarForm({ car }: { car: Car }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        ...car,
        discountPrice: car.discountPrice || '',
        offerTag: car.offerTag || '',
        isOriginal: car.isOriginal || false,
        isAvailable: car.isAvailable !== false, // Default to true if undefined
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureToggle = (feature: string) => {
        setFormData(prev => {
            const features = prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features };
        });
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Ensure price matches dailyPrice if not explicitly handled
            const finalData = { ...formData, price: formData.dailyPrice };
            // Update existing car
            await updateCar(car.id, finalData);
        } catch (error) {
            console.error("Submission Error:", error);
            // Ignore redirects, alert only on actual error string
            if (!(error as Error).message.includes('NEXT_REDIRECT')) {
                alert("Failed to update car");
                setIsLoading(false);
            }
        }
    };

    const handleSaveAsNew = async () => {
        setIsLoading(true);
        try {
            const finalData = { ...formData, price: formData.dailyPrice };
            const result = await createCar(finalData);
            if (result && result.success) {
                alert("New version created successfully!");
                // Optionally redirect to the new car or dashboard
                router.push('/admin/dashboard');
            }
        } catch (error) {
            console.error("Creation Error:", error);
            if (!(error as Error).message.includes('NEXT_REDIRECT')) {
                alert("Failed to create new version");
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <NextLink href="/admin/dashboard" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </NextLink>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Car: {car.name}</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-8">

                    {/* Control Flags */}
                    <div className="flex gap-6 p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isAvailable"
                                checked={formData.isAvailable}
                                onCheckedChange={(checked: boolean) => handleCheckboxChange('isAvailable', checked)}
                            />
                            <Label htmlFor="isAvailable" className="cursor-pointer font-bold">Enabled / Visible on Site</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isOriginal"
                                checked={formData.isOriginal}
                                onCheckedChange={(checked: boolean) => handleCheckboxChange('isOriginal', checked)}
                            />
                            <Label htmlFor="isOriginal" className="cursor-pointer font-bold">Mark as "Original / Clean" Version</Label>
                        </div>
                    </div>

                    {/* Basic Info Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Vehicle Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Car Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="model">Model Specification</Label>
                                <Input id="model" name="model" value={formData.model} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seats">Seats</Label>
                                <Input id="seats" name="seats" type="number" value={formData.seats} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transmission">Transmission</Label>
                                <Select name="transmission" value={formData.transmission} onValueChange={(val) => handleSelectChange('transmission', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Auto">Automatic</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fuelType">Fuel Type</Label>
                                <Select name="fuelType" value={formData.fuelType} onValueChange={(val) => handleSelectChange('fuelType', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Petrol">Petrol</SelectItem>
                                        <SelectItem value="Diesel">Diesel</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        <SelectItem value="Electric">Electric</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Offers Section */}
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-4">
                        <h2 className="text-xl font-semibold text-blue-900 border-b border-blue-200 pb-2">Pricing & Special Offers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="dailyPrice">Standard Daily Price (AED)</Label>
                                <Input id="dailyPrice" name="dailyPrice" type="number" value={formData.dailyPrice} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                {/* Hidden base price field to avoid errors if needed, but we typically use dailyPrice */}
                                <Input type="hidden" name="price" value={formData.dailyPrice} />
                            </div>

                            {/* Discount Logic */}
                            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-blue-200">
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice" className="text-green-700 font-bold">Discounted Price (AED)</Label>
                                    <p className="text-xs text-gray-500">Old price will be crossed out. Leave empty to remove discount.</p>
                                    <Input
                                        id="discountPrice"
                                        name="discountPrice"
                                        type="number"
                                        className="border-green-200 focus:border-green-500 bg-green-50/30"
                                        placeholder="e.g. 150"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="offerTag" className="text-purple-700 font-bold">Special Offer Tag</Label>
                                    <p className="text-xs text-gray-500">Reason for offer (e.g. "Eid Special", "Winter Deal")</p>
                                    <Input
                                        id="offerTag"
                                        name="offerTag"
                                        className="border-purple-200 focus:border-purple-500 bg-purple-50/30"
                                        placeholder="e.g. Eid Offer"
                                        value={formData.offerTag}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Features</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {FEATURE_LIST.map((feature) => (
                                <div key={feature} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`feature-${feature}`}
                                        checked={formData.features.includes(feature)}
                                        onCheckedChange={() => handleFeatureToggle(feature)}
                                    />
                                    <Label htmlFor={`feature-${feature}`} className="cursor-pointer font-normal">{feature}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description & Media */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Details & Media</h2>
                        <div className="space-y-2">
                            <Label htmlFor="img">Image URL</Label>
                            <Input id="img" name="img" value={formData.img} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea id="desc" name="desc" className="min-h-[100px]" value={formData.desc} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <Button type="button" variant="secondary" onClick={handleSaveAsNew} disabled={isLoading}>
                            <Copy className="w-4 h-4 mr-2" />
                            Save as New Version
                        </Button>
                        <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
