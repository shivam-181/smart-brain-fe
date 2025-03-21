import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes = [] }) => {
    return (
        <div className="center ma" style={{ position: "relative" }}>
            {imageUrl ? (
                <img 
                    id="inputimage" 
                    src={imageUrl} 
                    alt="Detected Faces" 
                    style={{ width: "500px", height: "auto" }} 
                />
            ) : (
                <p>No image detected </p>
            )}

            {/* Check if boxes exist before rendering bounding boxes */}
            {boxes.length > 0 ? (
                boxes.map((box, index) => (
                    <div 
                        key={index}
                        className='bounding-box'
                        style={{
                            top: box.topRow, 
                            right: box.rightCol, 
                            bottom: box.bottomRow, 
                            left: box.leftCol, 
                            position: "absolute"
                        }}
                    ></div>
                ))
            ) : (
                <p style={{ color: "white" }}> &nbsp;||&nbsp;No faces detected</p>
            )}
        </div>
    );
};

export default FaceRecognition;
