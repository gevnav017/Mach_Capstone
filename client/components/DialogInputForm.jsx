import React from 'react'

export default function DialogInputForm() {
  return (
<form>
    <input type='email' name='email' id='' placeholder='Email'
    style={{
        width: '300px',
        height: '30px',
        fontSize: '15px',
        maxWidth:'auto'
    }}/>
    <button type='submit' style={{
       color: 'white',
       backgroundColor: '#0092CA',
       fontSize: '18px',
       padding: '8px',
       borderRadius: '5px' 
    }}>Subscribe</button>
</form>
  )
}



  