export const metadata = {
    title: 'Admin Dashboard - Mileage Car Rental',
    description: 'Admin management panel',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
        </div>
    );
}
