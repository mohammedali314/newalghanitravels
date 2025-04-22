import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './team.scss';
import CEO from '../../Assets/CEO.png'

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Tasawar Hussain ',
      role: 'CEO & Founder',
      image: CEO,
      description: 'Passionate about creating unforgettable travel experiences',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#'
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Travel Consultant',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      description: 'Expert in crafting personalized travel itineraries',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Tour Guide',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      description: 'Local expert with deep knowledge of hidden gems',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Customer Support',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      description: 'Dedicated to ensuring your travel experience is seamless',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    }
  ];

  return (
    <section className="team">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText">Our Team</span>
          <h2>Meet Our Experts</h2>
          <p>Get to know the passionate individuals who make your travel dreams come true</p>
        </div>

        <div className="teamContainer">
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
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="teamCard">
                  <div className="cardFront">
                    <div className="memberImage">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="memberInfo">
                      <h3>{member.name}</h3>
                      <p className="role">{member.role}</p>
                    </div>
                  </div>
                  <div className="cardBack">
                    <div className="backContent">
                      <h3>{member.name}</h3>
                      <p className="role">{member.role}</p>
                      <p className="description">{member.description}</p>
                      <div className="socialLinks">
                        <a href={member.social.linkedin} className="socialIcon">
                          <FaLinkedin />
                        </a>
                        <a href={member.social.twitter} className="socialIcon">
                          <FaTwitter />
                        </a>
                        <a href={member.social.instagram} className="socialIcon">
                          <FaInstagram />
                        </a>
                      </div>
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

export default Team; 