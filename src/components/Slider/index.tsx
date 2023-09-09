import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '595px',
  width: '1000px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const SliderStyle: React.CSSProperties = {
  borderRadius: '10px', // Add border-radius
  marginLeft: '20px', // Add left margin
  marginRight: '20px',
  opacity: '0.5'
  
};

export const Slider: React.FC = () => (
  <Carousel autoplay style={SliderStyle}>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);


