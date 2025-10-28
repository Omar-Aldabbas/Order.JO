import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getRestaurantRatings } from '../../api/ratings';
import { Rating } from './components/Rating';
import { RatingSkeleton } from './skeletons/RatingSkeleton';
import { ReviewCard } from './components/ReviewCard';
import { ReviewCardSkeleton } from './skeletons/RestaurantReviewCardSkeleton';

export const RestaurantRating = ({ restaurantId }) => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRatings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRestaurantRatings(restaurantId);
      setRatings(data?.ratings?.data || []);
      setAverage(data?.average_rating || 0);
    } catch (err) {
      const message = err?.message || 'Failed to load ratings';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) fetchRatings();
  }, [restaurantId]);

  if (loading)
    return (
      <div className="space-y-6">
        <RatingSkeleton />
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 text-lg mt-4">
        Failed to load ratings: {error}
      </p>
    );

  return (
    <section className="mt-10 space-y-6">
      <Rating average={average} total={ratings.length} />
      <div className="grid md:grid-cols-2 gap-4">
        {ratings.length > 0 ? (
          ratings.map((r) => <ReviewCard key={r.id} review={r} />)
        ) : (
          <p className="text-center text-mute text-lg">
            No reviews yet. Average rating: 0.0
          </p>
        )}
      </div>
    </section>
  );
};
