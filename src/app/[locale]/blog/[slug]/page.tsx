import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const t = await getTranslations('Blog');
    const { slug } = await params;

    const postsMap: Record<string, string> = {
        'best-places-to-visit-al-ain': 'one',
        'renting-vs-taxis-al-ain': 'two',
        'al-ain-driving-guide': 'three'
    };

    const postId = postsMap[slug];

    if (!postId) {
        return (
            <div className="py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Button asChild variant="outline">
                    <Link href="/blog">Back to Blog</Link>
                </Button>
            </div>
        );
    }

    // Helper to get image based on postId
    const postImage = postId === 'one' ? '/blog/jebel-hafeet.jpg' : 
                    postId === 'two' ? '/blog/al-ain-fort.jpg' : 
                    '/blog/al-ain-zoo.jpg';

    const postDate = postId === 'one' ? 'April 25, 2026' : 
                    postId === 'two' ? 'April 20, 2026' : 
                    'April 15, 2026';

    const readTime = postId === 'one' ? '5 min read' : 
                    postId === 'two' ? '4 min read' : 
                    '6 min read';

    return (
        <article className="bg-background pb-24 pt-32">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Link - MORE PROMINENT */}
                <Button asChild variant="ghost" className="mb-8 -ml-4 text-primary hover:text-primary/80 group">
                    <Link href="/blog">
                        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        {t('back_to_blog')}
                    </Link>
                </Button>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {postDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                        {t(`posts.${postId}.title`)}
                    </h1>
                    <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                        <Image
                            src={postImage}
                            alt="Blog cover"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg prose-blue max-w-none text-gray-700 dark:text-gray-300">
                    <p className="text-xl text-gray-800 dark:text-gray-100 font-medium mb-10 leading-relaxed">
                        {t(`posts.${postId}.intro`)}
                    </p>
                    
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold text-primary mb-4">{t(`posts.${postId}.section1_title`)}</h3>
                        <p className="mb-4 leading-relaxed">{t(`posts.${postId}.section1_text`)}</p>
                    </section>
                    
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold text-primary mb-4">{t(`posts.${postId}.section2_title`)}</h3>
                        <p className="mb-4 leading-relaxed">{t(`posts.${postId}.section2_text`)}</p>
                    </section>
                    
                    <section className="mb-10">
                        <h3 className="text-2xl font-bold text-primary mb-4">{t(`posts.${postId}.section3_title`)}</h3>
                        <p className="mb-4 leading-relaxed">{t(`posts.${postId}.section3_text`)}</p>
                    </section>

                    {/* Conditional Section 4 or Quote/Footer */}
                    {postId === 'one' && (
                        <>
                            <section className="mb-10">
                                <h3 className="text-2xl font-bold text-primary mb-4">{t(`posts.one.section4_title`)}</h3>
                                <p className="mb-4 leading-relaxed">{t(`posts.one.section4_text`)}</p>
                            </section>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-primary italic text-gray-700 dark:text-gray-300 my-10">
                                "{t('posts.one.quote')}"
                            </div>
                        </>
                    )}

                    {postId === 'two' && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border-l-4 border-green-600 text-gray-700 dark:text-gray-300 my-10 font-bold">
                            {t('posts.two.footer')}
                        </div>
                    )}

                    {postId === 'three' && (
                        <>
                            <section className="mb-10">
                                <h3 className="text-2xl font-bold text-primary mb-4">{t(`posts.three.section4_title`)}</h3>
                                <p className="mb-4 leading-relaxed">{t(`posts.three.section4_text`)}</p>
                            </section>
                            <p className="text-gray-600 dark:text-gray-400 italic mt-10">
                                {t('posts.three.footer')}
                            </p>
                        </>
                    )}
                </div>

                {/* Footer CTA */}
                <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-full" title={t('share_title')}>
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium text-gray-500">{t('share')}</span>
                    </div>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 font-bold text-white shadow-lg shadow-primary/20">
                        <Link href="/#fleet">
                            {t('rent_now')}
                        </Link>
                    </Button>
                </footer>
            </div>
        </article>
    );
}
