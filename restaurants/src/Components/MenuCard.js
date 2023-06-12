import React from "react";

const MenuCard = ({ Data }) => {
  return (
    <section className='main-card--container'>
      {Data.map((ele) => {
        const { id, image, name, category, price, description } = ele;
        return (
          <div className='card-container' key={id}>
            <div className='card'>
              <div className='card-body'>
                <span className='card-number card-circle subtitle'>{id}</span>
                <span className='card-author card-circle subtitle'>
                  {category}
                </span>
                <h2 className='card-title'>{name}</h2>
                <h3>Price: {price}&#8377;</h3>
                <span className='card-description subtitle'>{description}</span>
                <div className='card-read'>Read</div>
                <img src={image} alt={"image" + id} className='card-image' />
                <span className='card-tag btn btn-primary'>Order Now</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MenuCard;
