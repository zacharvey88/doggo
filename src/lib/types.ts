export type Review = {
  airlines: any;
  accommodation: any;
  review_id: number;
  rating: number;
  review_text: string;
  created_at: string;
  profiles: {
    avatar_url: string;
    username: string;
  };
};

export type ReviewCardProps = {
  review: Review;
  reviews: Review[];
  setFilteredReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  filteredReviews: Review[];
  toggleModal: () => void;
  setExistingRating: (rating: number) => void;
  setExistingReviewText: (text: string) => void;
  table: string;
  setReviewId: (id: number) => void;
};
