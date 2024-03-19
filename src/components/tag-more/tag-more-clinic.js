import React from 'react';
import "./tag-more-clinic.scss";

const TagMoreClinic = ({ date, description, imageSrc }) => {
  return (
    <div className="tag-more-clinic">
      <section className="masked-doctor-image">
        <img
          className="img-doctor-content"
          loading="lazy"
          alt=""
          src={imageSrc}
        />
      </section>
      <section className='tag-more-clinic-container'>
        <div className='content-container'>
        <p className="txt-content name-content  ">
          {description}
        </p>
        </div>
      </section >
    </div >
  );
};

export default TagMoreClinic;