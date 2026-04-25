import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRight, Clock } from 'lucide-react';

export default function BlogPage() {
    const t = useTranslations('Blog');
    const nt = useTranslations('Navigation');

    const posts = [
        {
            id: 'one',
            slug: 'best-places-to-visit-al-ain',
            image: '/blog/jebel-hafeet.jpg',
            date: 'April 25, 2026',
            readTime: '5 min read'
        },
        {
            id: 'two',
            slug: 'renting-vs-taxis-al-ain',
            image: '/blog/al-ain-fort.jpg',
            date: 'April 20, 2026',
            readTime: '4 min read'
        },
        {
            id: 'three',
            slug: 'al-ain-driving-guide',
            image: '/blog/al-ain-zoo.jpg',
            date: 'April 15, 2026',
            readTime: '6 min read'
        }
    ];

    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="bg-primary py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-blue-50/30">
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={t(`posts.${post.id}.title`)}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                                        {t(`posts.${post.id}.title`)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {t(`posts.${post.id}.excerpt`)}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0 pb-6">
                                    <Button asChild variant="link" className="p-0 h-auto font-bold text-primary flex items-center gap-1 group/btn">
                                        <Link href={`/blog/${post.slug}`}>
                                            {t('read_more')}
                                            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-secondary/10 py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Need a car to explore these places?</h2>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/#fleet">
                            {nt('fleet')}
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
