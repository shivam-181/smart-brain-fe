import React from 'react';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
  return (
    <div>
      <p className='f3 white'>
        {'This Magic Brain will Detect faces in your pictures. Give it a try'}
      </p>
      <div className="center">
        <div className='center pa4 br3 shadow-5'>
          {/* Search Bar */}
          <input
            className="f4 pa2 w-50 center mb2"
            type="text"
            placeholder="Search..."
            onChange={onInputChange}
          />

          {/* Detect Button */}
          <button 
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
          onClick={onButtonSubmit}>

            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
