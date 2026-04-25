import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export default function BlogPost({ params }: { params: { slug: string, locale: string } }) {
    const t = useTranslations('Blog');
    const nt = useTranslations('Navigation');
    const { slug } = params;

    // Hardcoded content for the 3 posts
    const getPostContent = (slug: string) => {
        switch (slug) {
            case 'best-places-to-visit-al-ain':
                return {
                    id: 'one',
                    date: 'April 25, 2026',
                    readTime: '5 min read',
                    image: '/al-ain.jpg',
                    content: (
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed">Al Ain, known as the "Garden City," is full of hidden gems that are best explored with the freedom of a rental car. Here are the top 5 spots you shouldn't miss:</p>
                            
                            <h3 className="text-2xl font-bold mt-8">1. Jebel Hafeet</h3>
                            <p>Drive up the second highest peak in the UAE. The winding roads are a driver's dream, and the sunset from the top is unforgettable.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">2. Al Ain Oasis</h3>
                            <p>A UNESCO World Heritage site. Park your car and walk through the ancient falaj irrigation system under thousands of date palms.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">3. Qasr Al Muwaiji</h3>
                            <p>Discover the birthplace of HH Sheikh Khalifa bin Zayed Al Nahyan. This historic fort is a beautiful piece of architectural history.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">4. Al Ain Zoo</h3>
                            <p>Perfect for families. It's one of the largest in the region and offers a great safari experience.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">5. Green Mubazzarah</h3>
                            <p>Located at the base of Jebel Hafeet, these hot springs are the perfect place to relax after a long day of exploring.</p>
                        </div>
                    )
                };
            case 'renting-vs-taxis-al-ain':
                return {
                    id: 'two',
                    date: 'April 20, 2026',
                    readTime: '4 min read',
                    image: '/cars/sunny.jpg',
                    content: (
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed">Many visitors and new residents wonder: should I rely on taxis or rent a car? In Al Ain, the answer is almost always to rent. Here's why:</p>
                            
                            <h3 className="text-2xl font-bold mt-8">The Cost Factor</h3>
                            <p>A single taxi trip across Al Ain can cost AED 30-50. For that same price, you can often rent a car for an entire day! If you make more than two trips a day, a rental car pays for itself.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">Freedom of Movement</h3>
                            <p>Public transport in Al Ain is improving, but many of the best spots (like Jebel Hafeet or the hidden desert cafes) are only reachable by car. With a rental, you don't have to wait 20 minutes for a taxi in the heat.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">Comfort and AC</h3>
                            <p>In the UAE summer, having your own car with the AC already running is a luxury you can't put a price on.</p>
                        </div>
                    )
                };
            case 'al-ain-driving-guide':
                return {
                    id: 'three',
                    date: 'April 15, 2026',
                    readTime: '6 min read',
                    image: '/cars/yaris.jpg',
                    content: (
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed">Driving in Al Ain is generally smoother than in Dubai or Abu Dhabi, but there are local rules you must follow to stay safe and avoid fines.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">1. Respect the Roundabouts</h3>
                            <p>Al Ain is famous for its roundabouts. Remember: vehicles inside the roundabout have the right of way. Always use your indicators when exiting.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">2. Watch for Speed Cameras</h3>
                            <p>Speed limits are strictly enforced. In most of Al Ain, there is no "grace margin"—the speed on the sign is the speed you must stay under.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">3. Pedestrian Crossings</h3>
                            <p>Always stop for pedestrians at designated crossings. Fines for not stopping are very high in the UAE.</p>
                            
                            <h3 className="text-2xl font-bold mt-8">4. No Phone While Driving</h3>
                            <p>Even holding your phone at a red light can result in a fine. Use a hands-free system or Bluetooth.</p>
                        </div>
                    )
                };
            default:
                return null;
        }
    };

    const post = getPostContent(slug);

    if (!post) {
        return <div className="py-24 text-center">Post not found</div>;
    }

    return (
        <article className="bg-background pb-24 pt-32">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                        {t(`posts.${post.id}.title`)}
                    </h1>
                    <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                        <Image
                            src={post.image}
                            alt="Blog cover"
                            fill
                            className="object-cover"
                        />
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg prose-blue max-w-none text-gray-700">
                    {post.content}
                </div>

                {/* Footer CTA */}
                <footer className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium text-gray-500">Share this article</span>
                    </div>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/#fleet">
                            Rent a Car Now
                        </Link>
                    </Button>
                </footer>
            </div>
        </article>
    );
}
