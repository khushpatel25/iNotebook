import React from 'react'
import News from './News';

const Home = (props) => {

  const {showAlert}=props

  return (
    <div >
      <News showAlert={showAlert}/>
    </div>
  )
}

export default Home