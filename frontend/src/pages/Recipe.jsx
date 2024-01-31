import React, { useRef, useState } from 'react'

export default function Recipe() {
  const videoRef = useRef(null);
  const [rearCamera, setRearCamera] = useState(true);

  const getMedia = async () => {
    try {
      const constraints = {
        video: {
          facingMode: rearCamera ? 'environment' : 'user',
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const switchCamera = () => {
    setRearCamera(!rearCamera);
    getMedia();
  };

  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      // Handle the captured blob as needed (e.g., upload to server)
      console.log(blob);
    }, 'image/jpeg');
  };

  // Initialize camera on component mount
  React.useEffect(() => {
    getMedia();
  }, []);
  
  return (
    <div>
        <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={switchCamera}>Switch Camera</button>
      <button onClick={captureFrame}>Capture Frame</button>
    </div>
    </div>
  )
}
