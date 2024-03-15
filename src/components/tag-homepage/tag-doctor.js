import React from 'react';
import "./tag-doctor.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

const TagDoctor = ({ date, description, imageSrc }) => {
  return (
    <div className="tag-doctor">
      <section className="masked-doctor-image">
        <img
          className="img-doctor-content"
          loading="lazy"
          alt=""
          src={imageSrc}
        />
      </section>
      <section className='container'>
        <div className='content-container'>
        <p className="txt-content name-content  ">
          {description}
        </p>
        <p className=" txt-content position-content  ">
          {/* {description}           */}
          Thạc sĩ
        </p>
        <p className="txt-content description-content ">
          {/* {description}  */}
          I am an ambitious workaholic, but apart from that, pretty simple person.
        </p>
        <div className='btn-container'>
          <button className="btn" >
            <FontAwesomeIcon
              className='icon'
              icon={faCalendarCheck}
              // style={{ color: "#74C0FC", }}
              flip="horizontal"
              size="2xs"
            />
            <p className='btn-txt'>Hẹn khám</p>
          </button>
          <button className="btn chat-btn" >
            <FontAwesomeIcon
              className='icon'
              icon={faRocketchat}
              size="2xs"
              // style={{ color: "#74C0FC", }}
            />
            <p className='btn-txt'>Tư vấn</p>
          </button>
        </div>
        </div>
      </section >
    </div >
  );
};

export default TagDoctor;