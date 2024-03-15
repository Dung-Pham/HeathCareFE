import React from 'react';
import "./tag-clinic.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

const TagSpecialty = ({ date, description, imageSrc }) => {
  return (
    <div className="tag-clinic">
      <section className="masked-doctor-image">
        <div className='img-black'>
        <FontAwesomeIcon 
            className="icon-specialty"
            icon={faStethoscope} 
            size="xs" />
        </div>
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
        </div>
      </section >
    </div >
  );
};

export default TagSpecialty;