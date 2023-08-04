"use client"
import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image src={ src || "/image/placeholder.jpg"} className='rounded-full' alt='Avatar' height={30} width={30} />
  )
}

export default Avatar