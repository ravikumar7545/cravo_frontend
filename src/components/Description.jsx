import React from 'react';
import '../scss/description.scss';
import TypeWriter from 'typewriter-effect';

const Description = () => {
  return (
    <div className="descrption-content">
      <div className="dynamic-description">
        <TypeWriter
          options={{
            cursor: '',
            strings: [
              "<p>It's not just Food, <br/> It's an Experience </p>",
              '<p>Where every flavor tells a story.</p>',
              '<p>A taste you’ll remember.</p>',
            ],
            autoStart: true,
            loop: true,
          }}
        ></TypeWriter>
      </div>
    </div>
  );
};

export default Description;
