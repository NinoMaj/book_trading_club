// @flow

import React from 'react'
import CardItem from './card-item'

const Cards = () => (
  <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-4">
        <CardItem
          title="See our library"
          subtitle="There is over 5 books in our library :)"
          imgSrc="https://s3.eu-central-1.amazonaws.com/ninomajder.com/Book_Trading_Club/library.jpg"
          imgAlt="library"
          cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-4">
        <CardItem
          title="Catalogue your books"
          subtitle="Adding new books is super easy"
          imgSrc="https://www.prisonfellowship.org/site/wp-content/uploads/2016/07/Books_300x200.jpg"
          imgAlt="books"
          cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
        />
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-4">
          <CardItem
          title="Borrow books"
          subtitle="Borrow books from and to others"
          imgSrc="https://sackingtheboss.com/wp-content/uploads/2017/01/borrow-300x200.jpg"
          imgAlt="borrows"
          cardText="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio."
        />
        </div>
    </div>
  </div>
)

export default Cards
