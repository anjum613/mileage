import { notFound } from 'next/navigation';
import { getCar } from '@/app/actions/car';
import EditCarForm from './form';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const carId = parseInt(id);

    if (isNaN(carId)) {
        notFound();
    }

    const car = await getCar(carId);

    if (!car) {
        notFound();
    }

    return <EditCarForm car={car} />;
}
