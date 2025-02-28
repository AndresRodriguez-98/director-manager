import React from 'react'
import { Header } from './landing/components/header'
import Home from './landing/components/home'

export const App = () => {
  return (
    <div className='bg-landing-bg bg-cover bg-center min-h-screen bg-opacity-50'>
      <Header />
      <Home />
    </div>
  )
}

