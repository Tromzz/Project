import React from 'react';

function Content() {
  return (
    <div className="wrap">
      <div className="content">
        <div className="section group">
          <div className="slider">
            <video autoPlay width="100%">
              <source src="images/main_video.mp4" type="video/mp4" />
           
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
