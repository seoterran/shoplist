import React from 'react';
import BizDetail from './Components/BizDetail';
import Home from './Components/Home';
import katokLogo from './images/kakaotalk.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
//'border-color':'#3f51b5', 'border-width':'1px','border-style': 'outset', 
export default () => {
  alert(window.location.hostname);
  return (
    <div class='gradient-border' style={{'margin':'5%','border-radius': '25px' }} >
      <Router>
        <Switch>
          <Route exact path="/">
              <AppBar >
                <Toolbar>
                  <Typography variant="h6">숍리스트 shoplist.kr</Typography>
                </Toolbar>
              </AppBar>
              <Toolbar id="back-to-top-anchor" />
              <Home/>
              <div style={{'text-align': 'center'}}>
                 <a className="App-link" 
                    href="https://open.kakao.com/o/s2tOOVuc"
                    style={{'text-decoration': 'none'}} 
                    target="_blank">
                     <nobr>
                       <img className="Kakao-logo" 
                        src={katokLogo}/>
                        &nbsp; 
                        <Typography style={{'font-size':'80%'}} color='primary'>이용방법에 대해 궁금하신 점은 카톡으로 편하게 물어보세요!</Typography>
                      </nobr>
                  </a>
              </div>
          </Route>
          <Route path='/:id' render={props =><BizDetail {...props } />  }/>       
        </Switch>
      </Router>
       </div>
  );
}


