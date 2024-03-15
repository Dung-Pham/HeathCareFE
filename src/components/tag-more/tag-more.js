import React from 'react';
import "./tag-more.scss";

const TagMore = ({ date, description, imageSrc }) => {
  return (
      <div className="tag-more">
          <div className="date">{date}</div>
        <section className="dude-youre-getting-container">
          <p className="blank-line">&nbsp;</p>
          <p className="title-content">
            {description}          
          </p>
        </section>
        <section className="masked-image">
        <img
            className="img-content"
            loading="lazy"
            alt=""
            src={imageSrc}
          />
          <div className="container-content"></div>
        </section>
      </div>
  );
};

export default TagMore;