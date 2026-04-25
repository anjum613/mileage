import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export default async function BlogPost({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const t = await useTranslations('Blog');
    const { slug } = await params;

    // Hardcoded content for the 3 posts
    const getPostContent = (slug: string) => {
        switch (slug) {
            case 'best-places-to-visit-al-ain':
                return {
                    id: 'one',
                    date: 'April 25, 2026',
                    readTime: '5 min read',
                    image: '/blog/jebel-hafeet.jpg',
                    content: (
                        <div className="space-y-8">
                            <p className="text-xl text-gray-800 font-medium">If you’ve got a car and a free afternoon in Al Ain, you’re in luck. Most people just see the mall, but the real soul of the city is in the spots you have to drive to.</p>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">1. The Jebel Hafeet Drive (Sunset is a must)</h3>
                                <p className="mb-4">It’s not just about the view at the top. The drive itself is one of the best in the UAE. But here’s a tip from us: don’t just race to the top. There are several "viewing spots" on the way up where you can pull over, have some tea, and watch the city lights come on. If you go on a weekend, it gets busy, so try a weekday if you want the road to yourself.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">2. Green Mubazzarah (Hot Springs)</h3>
                                <p className="mb-4">Right at the bottom of the mountain. It’s a huge green park with natural hot water springs. It’s the perfect spot for a BBQ. We always tell our customers to take a rental car here because carrying BBQ gear and chairs in a taxi is a nightmare. Plus, you can soak your feet in the warm water after the mountain drive.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">3. Al Ain Oasis (The Back Entrance)</h3>
                                <p className="mb-4">Everyone goes to the main gate near the museum. But if you have a car, drive around to the smaller gates. It’s much quieter, and you can see the real farming side of the oasis. It’s like stepping back in time—completely quiet, shaded by thousands of palms, and much cooler than the rest of the city.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">4. Qasr Al Muwaiji</h3>
                                <p className="mb-4">This is one of the most beautiful forts in the country. It’s where Sheikh Khalifa was born. It’s got a really cool glass-walled museum inside a historic fort. It’s right in the middle of the city, so it’s an easy 10-minute drive from almost anywhere.</p>
                            </section>

                            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-primary italic text-gray-700">
                                "Our favorite route? Start at the Oasis in the morning, grab lunch near Al Ain Mall, and finish the day at the top of Jebel Hafeet for the sunset."
                            </div>
                        </div>
                    )
                };
            case 'renting-vs-taxis-al-ain':
                return {
                    id: 'two',
                    date: 'April 20, 2026',
                    readTime: '4 min read',
                    image: '/blog/al-ain-fort.jpg',
                    content: (
                        <div className="space-y-8">
                            <p className="text-xl text-gray-800 font-medium">Let's be honest about taxis in Al Ain: they're great for a quick one-off trip, but if you're living here or visiting for more than a day, they'll eat your budget alive.</p>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">Doing the Math</h3>
                                <p className="mb-4">A typical trip from somewhere like **Zakher to Hili** can easily cost you 40-50 AED depending on traffic. If you do that twice a day, you’ve already spent 100 AED. At Mileage, you can rent a clean, reliable car for around **70-90 AED a day**. You save money, and you don’t have to wait outside in the 45-degree heat for a driver to show up.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">The "Family" Factor</h3>
                                <p className="mb-4">If you have kids, car seats, and shopping bags, taxis are a struggle. Having your own rental means you can leave the strollers in the trunk and go from the grocery store to the park without any stress. Plus, you control the AC—no more arguing about how cold the car should be!</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">Monthly Savings</h3>
                                <p className="mb-4">For residents, our monthly rates are even better. When you factor in the cost of insurance, maintenance, and registration of owning a car, renting monthly is often cheaper and much less headache. If the car has a problem, we just swap it for you. No garage visits, no paperwork.</p>
                            </section>

                            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 text-gray-700">
                                <strong>Bottom Line:</strong> If you're making more than two trips a day, stop calling taxis. Give us a message on WhatsApp and we'll get you a car that saves you money.
                            </div>
                        </div>
                    )
                };
            case 'al-ain-driving-guide':
                return {
                    id: 'three',
                    date: 'April 15, 2026',
                    readTime: '6 min read',
                    image: '/blog/al-ain-zoo.jpg',
                    content: (
                        <div className="space-y-8">
                            <p className="text-xl text-gray-800 font-medium">People say Al Ain is the "easiest" city to drive in the UAE, and they're right. But we have a few local quirks that catch people out. Here's how to drive like a local:</p>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">Mastering the Roundabouts</h3>
                                <p className="mb-4">Al Ain loves roundabouts. The big rule: if you're in the inner lane, you have the priority to exit, but please **use your indicators**. People here are generally polite, but at the Clock Tower or the busy Hili roundabouts, you need to be confident. If you miss your exit, just go around again—don't try to stop!</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">Speed Cameras (They're Everywhere)</h3>
                                <p className="mb-4">On roads like **Khalifa Bin Zayed St**, the cameras are very well hidden. In Al Ain, we don't have the "20km buffer" like some other emirates used to. If the sign says 80, stay at 80. Our rental cars are all calibrated to show your true speed, so trust the dashboard.</p>
                            </section>
                            
                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">Parking is Actually Free (Mostly)</h3>
                                <p className="mb-4">One of the best things about Al Ain is that parking is much easier to find than in Dubai. Most residential areas and small shops have free parking right in front. Just make sure you don't park in a way that blocks the sidewalk—the fines for that are surprisingly high.</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-primary mb-4">The "Flash" Rule</h3>
                                <p className="mb-4">If someone behind you flashes their high beams, they want to pass. Even if you're at the speed limit, the local custom is to safely move to the right lane and let them go. It keeps the traffic flowing and keeps everyone happy.</p>
                            </section>

                            <p className="text-gray-600 italic">Stay safe, enjoy the wide roads, and if you ever get lost, just look for Jebel Hafeet—it's the best landmark we've got!</p>
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
