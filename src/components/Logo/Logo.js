import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

import './Logo.css';

const Logo=()=>
{
	return (
		<div className='ma4 mt0 white'>
		 <Tilt>
      <div style={{ height: '300px' }}>
        <h1>Face Recognition Brain</h1>
        <img className='white' src={brain} alt="Logo"/>
      </div>
    </Tilt>

		</div>
		);
}
export default Logo;