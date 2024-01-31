import React, { useRef, useState } from 'react'
import store from '../lib/zustand';
import Button from '../components/Button';

export default function Recipe() {
  const videoRef = useRef(null);
  const [rearCamera, setRearCamera] = useState(true);
  const {backend_url} = store()
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
    canvas.toBlob(async(blob) => {
      // Handle the captured blob as needed (e.g., upload to server)
      const formData = new FormData();
      formData.append('image', blob);
      const res = await fetch(`http://127.0.0.1:5000/ingredientsfetch`,{
        method: "POST",
        body: formData
      })
      const data = await res.json()
      console.log(data);
    }, 'image/jpeg');
  };

  // Initialize camera on component mount
  React.useEffect(() => {
    getMedia();
  }, []);

  return (
    <div className=' flex w-full flex-col py-12'>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className="flex flex-col gap-5 px-8">
      <video ref={videoRef} autoPlay playsInline />
      <div className="flex flex-row w-full justify-between items-center">
      <Button color='secondary' onClick={switchCamera}>Switch Camera</Button>
      <Button color='primary' onClick={captureFrame}>Capture Frame</Button>
      </div>
      </div>
    </div>
    </div>
  )
}
