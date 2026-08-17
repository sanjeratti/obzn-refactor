import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({ rating, size = 14, showNumber = true, reviewCount, className = '' }: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const total = 5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, i) => {
          const isFull = i < full;
          const isHalf = i === full && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={
                isFull
                  ? 'fill-warning-400 text-warning-400'
                  : isHalf
                  ? 'fill-warning-200 text-warning-400'
                  : 'fill-neutral-200 text-neutral-200'
              }
            />
          );
        })}
      </div>
      {showNumber && <span className="text-sm font-semibold text-neutral-700">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-xs text-neutral-500">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
