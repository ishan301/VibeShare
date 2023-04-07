import React from 'react';
import shareVideo from '../assets/share.mp4';

const Login = () => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className='relative w-full h-full'>
        <video
        src={shareVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
      </div>
    </div>
  )
}

export default Login