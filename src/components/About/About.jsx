import React from 'react';
import './about.scss';
import PlaneWing from '../../Assets/aeroplane.jpg'; // Replace with your actual image
import PlaneCabin from '../../Assets/about.jpg'; // Replace with your actual image

const About = () => {
      
  return (
    <div className="about-section">
      <div className="images">
        <img className="bg-image" src={PlaneWing} alt="Plane Cabin" />
        <img className="main-image" src={PlaneCabin  } alt="Plane Wing" />
      </div>
      <div className="content">
        <small>GET TO KNOW US</small>
        <h2>Work Together for a<br />Business Success</h2>
        <p>
            At New Alghani Travels & Tours, we strive to provide our customers with the very best service in the
            aviation and travel industry. With unmatched passion and dedication, we ensure a smooth
            and memorable experience, whether you're flying for business or leisure.
            </p>
            <p>
            Our greatest satisfaction comes in serving a growing number of satisfied clients who have
            discovered the joys and inspiration of global travel. We believe that every journey
            should be enriching and stress-free.
            </p>
            <p>
            Ever New Alghani Travels & Tours since our company was founded, we’ve consistently adapted to new challenges and
            opportunities, staying ahead of the curve and delivering exceptional value to our clients.
            Dunya Aviation is your trusted partner in every journey.
     </p>
      </div>
    </div>
  );
};

export default About;
