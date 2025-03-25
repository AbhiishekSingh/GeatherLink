import React, { useState, useEffect } from "react";
import { MapPin, Clock, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";

const EventCard = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    console.log("Event ID from URL:", id); // Check if ID is received

    if (!id) {
      console.log("Event ID is missing!");
      return;
    }

    const fetchEvent = async () => {
      try {
        console.log("Attempting to fetch event details...");
        const response = await axios.get(`http://localhost:5000/eventdetails/${id}`);
        console.log("Fetched event data:", response.data); // Check fetched data
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [id]);



  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Event Banner Image */}
      <div className="event-banner-container">
        <img src={event.image} alt={event.title} className="event-banner" />
      </div>

      {/* Main Event Card */}
      <div className="event-card">
        <div className="event-header">
          <div>
            <h2 className="event-title">{event.title}</h2>
            <p className="event-details"> {event.eventctg} | {event.language} | {event.agelimit}+ | {event.duration} Minutes
            </p>

          </div>
          <Link to={`/booking/${event._id}`}>
            <button className="book-button">Book</button>
          </Link>

        </div>

        <hr className="divider" />

        <div className="event-info">
          <div className="event-time">
            <Clock className="icon" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="event-location">
            <MapPin className="icon" />
            <span>{event.location}</span>
          </div>
          <p className="event-price">
            ₹ {event.price} <span className="price-small">onwards</span>
          </p>
        </div>
      </div>

      {/* Share & Interest Section */}



      <div className="share-interest-container">
        {/* Share Box */}
        <div className="share-box">
          <h3>Share this event</h3>
          <div className="social-icons">
            <div className="social-icon">
              <Link to="https://x.com/i_beinghr">  <img src="https://img.icons8.com/ios11/512/facebook-new.png" alt="Facebook" /></Link>
            </div>
            <div className="social-icon">
              <Link to="https://x.com/i_beinghr">  <img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" alt="Twitter" /> </Link>
            </div>
          </div>
        </div>

        {/* Interest Box */}
        <div className="interest-box">
          <h3>Click on Interested to stay updated about this event.</h3>
          <div className="interest-container">
            <div className="interest-info">
              <ThumbsUp className="thumbs-up" />
              <span>11</span>
            </div>
            <p className="Content-interested-Section">People have shown interest recently</p>
            <button className="interested-button">Interested?</button>
          </div>
        </div>




        {/* YAHA TEXT BOx VALA SHOW KRNA HAI */}

        <div className="events-aboutus-container">

          {/* Yaha se Niche ka pura code hata de Till Line no. 167 TAK */}

          {/* Event Description */}
          <p className="event-description" dangerouslySetInnerHTML={{ __html: event.description }} />

          <hr className="events-aboutus-divider" />
          <h2 className="events-aboutus-title">You may also like</h2>
          <div className="events-aboutus-card-container">
            <div className="events-aboutus-card">
              <img src="/path-to-image1.jpg" alt="AVI SMART PARK" className="events-aboutus-card-image" />
              <p className="events-aboutus-card-text">AVI SMART PARK</p>
            </div>
            <div className="events-aboutus-card">
              <img src="/path-to-image2.jpg" alt="Funky Monkeys Play Center" className="events-aboutus-card-image" />
              <p className="events-aboutus-card-text">Funky Monkeys Play Center</p>
            </div>
            <div className="events-aboutus-card">
              <img src="/path-to-image3.jpg" alt="Tickets: Museum of..." className="events-aboutus-card-image" />
              <p className="events-aboutus-card-text">Tickets: Museum of...</p>
            </div>
            <div className="events-aboutus-card">
              <img src="/path-to-image4.jpg" alt="Sip and Tie - A T-shirt" className="events-aboutus-card-image" />
              <p className="events-aboutus-card-text">Sip and Tie - A T-shirt</p>
            </div>
          </div>


          {/* Yaha Tak ka code hata de pura or Jo text box mai save kiya tha uska details yaha show krna */}

        </div>

      </div>


    </div>
  );
};

export default EventCard;
