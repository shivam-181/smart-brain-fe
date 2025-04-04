import React from 'react';

const Rank = ({ name,entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, your current rank is...`}
      </div>
      <div className='white f1'>
        {`#${entries}`}  {/* Dynamically display the rank */}
      </div>
    </div>
  );
}

export default Rank;
