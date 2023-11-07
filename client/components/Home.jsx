import React from 'react';

// component imports


// MUI imports
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import Box from '@mui/material/Box';

import "react-responsive-carousel/lib/styles/carousel.min.css";

class App extends React.Component {
  render() {
    return (
      <div>
      <Paper style={{margin: 10}} elevation={3}>

      <Carousel 
      autoPlay
      showArrows={true}
      showStatus={true}
      width={960}
      stopOnHover={false}
      interval={1000}
      >
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
    <p className="legend">Legend 1</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
    <p className="legend">Legend 2</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
    <p className="legend">Legend 3</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
    <p className="legend">Legend 4</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg" />
    <p className="legend">Legend 5</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" />
    <p className="legend">Legend 6</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-7.jpg" />
    <p className="legend">Legend 7</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-8.jpg" />
    <p className="legend">Legend 8</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-9.jpg" />
    <p className="legend">Legend 9</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-10.jpg" />
    <p className="legend">Legend 10</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-11.jpg" />
    <p className="legend">Legend 11</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-12.jpg" />
    <p className="legend">Legend 12</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-13.jpg" />
    <p className="legend">Legend 13</p>
  </div>
  <div>
    <img src="http://lorempixel.com/output/cats-q-c-640-480-14.jpg" />
    <p className="legend">Legend 14</p>
  </div>
</Carousel>
      
    </Paper>
        
      </div>
    );
  }
}

export default App;










// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home