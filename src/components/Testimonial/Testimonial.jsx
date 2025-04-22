import React from 'react';
import './testimonial.scss';
import { FaQuoteLeft, FaStar, FaPlane } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Frequent Traveler',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    comment: 'The booking process was seamless and the customer service was exceptional. I had a wonderful experience with my recent trip to Dubai.',
    tripType: 'International',
    date: 'March 2024'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Traveler',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
    comment: 'As someone who travels frequently for work, I appreciate the efficiency and reliability of this service. The flight options are great!',
    tripType: 'Business',
    date: 'February 2024'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Family Traveler',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 4,
    comment: 'Traveling with family can be stressful, but this service made it so much easier. The family-friendly options were perfect for us.',
    tripType: 'Family',
    date: 'January 2024'
  },
  {
    id: 4,
    name: 'David Brown',
    role: 'Adventure Seeker',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    rating: 5,
    comment: 'I\'ve used this service for multiple international trips and have never been disappointed. The prices are competitive and the service is top-notch.',
    tripType: 'Adventure',
    date: 'December 2023'
  },
  {
    id: 5,
    name: 'Aisha Khan',
    role: 'Hajj Pilgrim',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    rating: 5,
    comment: 'The Hajj package was well-organized and the support team was always available to help. Made my spiritual journey much more comfortable.',
    tripType: 'Hajj',
    date: 'November 2023'
  },
  {
    id: 6,
    name: 'Ahmed Hassan',
    role: 'Umrah Traveler',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    rating: 5,
    comment: 'The Umrah package exceeded my expectations. Everything was perfectly arranged, from flights to accommodation. Highly recommended!',
    tripType: 'Umrah',
    date: 'October 2023'
  }
];

const Testimonial = () => {
  return (
    <section className="testimonial section">
      <div className="overlay"></div>
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText">Testimonials</span>
          <h2>What Our Customers Say</h2>
          <p>Hear from our satisfied customers about their travel experiences with us</p>
        </div>

        <div className="testimonialContainer">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonialCard">
                  <div className="cardHeader">
                    <div className="tripType">
                      <FaPlane className="icon" />
                      <span>{testimonial.tripType}</span>
                    </div>
                    <div className="date">{testimonial.date}</div>
                  </div>
                  <div className="quoteIcon">
                    <FaQuoteLeft />
                  </div>
                  <div className="testimonialContent">
                    <p>{testimonial.comment}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={index < testimonial.rating ? 'filled' : 'empty'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="testimonialAuthor">
                    <div className="authorImage">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="authorInfo">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 