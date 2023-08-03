"use client"
import React from 'react'
import Image from 'next/image'

type Props = {}

const Avatar = (props: Props) => {
  return (
    <Image src="/image/placeholder.jpg" className='rounded-full' alt='Avatar' height={30} width={30} />
  )
}

export default Avatar