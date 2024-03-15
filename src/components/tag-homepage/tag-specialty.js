import React from 'react';
import "./tag-specialty.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TagSpecialty = ({ date, description, imageSrc }) => {
  return (
    <div className="tag-specialty">
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
        </div>
      </section >
    </div >
  );
};

export default TagSpecialty;