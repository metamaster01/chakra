import { redirect } from 'next/navigation';
import { createServer } from '@/lib/supabase-server';
import ProfileForm from '../../components/profile-form';
import OrdersList from '../../components/order-list';
import BookingsList from '../../components/booking-list';
import ReviewsList from '../../components/review-list';

export default async function AccountPage() {
const supabase = await createServer()
const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone, avatar_url, address, id')
    .eq('id', user.id).single();

  const { data: orders } = await supabase
    .from('orders')
    .select('id, status, created_at, subtotal_paise, order_items(id, name_snapshot, qty, total_paise)')
    .order('created_at', { ascending: false });

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, status, start_time, end_time, service_id, services(name)')
    .order('start_time', { ascending: false });

  const { data: reviews } = await supabase
    .from('product_reviews')
    .select('id, rating, title, body, status, created_at, product_id, products(name)')
    .eq('user_id', user.id).order('created_at', { ascending: false });

  // Map reviews to match Review type
  const mappedReviews = (reviews || []).map((review: any) => ({
    ...review,
    products: review.products && Array.isArray(review.products) && review.products.length > 0
      ? { name: review.products[0].name }
      : null,
  }));

  // Map bookings to match Booking type
  const mappedBookings = (bookings || []).map((booking: any) => ({
    ...booking,
    services: booking.services && booking.services.length > 0
      ? booking.services[0]
      : null,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-10">
      <header className="rounded-2xl p-6 md:p-8
        bg-gradient-to-r from-purple-900 to-purple-700 text-amber-100">
        <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
        <p className="text-amber-200/80 mt-1">Manage your profile, orders, bookings & reviews</p>
      </header>

      <section id="profile">
        <ProfileForm user={user} profile={profile} />
      </section>

      <section id="orders">
        <h2 className="text-xl font-semibold text-purple-900">Orders</h2>
        <OrdersList orders={orders || []} />
      </section>
        <ReviewsList reviews={mappedReviews} />
      <section id="services">
        <h2 className="text-xl font-semibold text-purple-900">Service History</h2>
        <BookingsList bookings={mappedBookings} />
      </section>

      <section id="reviews">
        <h2 className="text-xl font-semibold text-purple-900">My Reviews</h2>
        <ReviewsList reviews={mappedReviews} />
      </section>
    </div>
  );
}
