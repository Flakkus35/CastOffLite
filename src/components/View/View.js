import React, { Component } from 'react';
import './View.css';
import anchor from '../../img/anchor.png';

class View extends Component {
  state = {
    view: this.props.view
  }

  render() {
    return (
      <div className='view-nav-wrapper'>  
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand">  
            <div className="dropdown-show">
              <img src={anchor} height="80" width="80" alt="anchor"/>
            </div>
          </div>
          <div className="collapse navbar-collapse" id ="navbarNavAlt">
            <div className="navbar-nav">
              <h2 className="nav-item">
                {this.state.view}
              </h2>
            </div>
          </div>
        </nav>
      </div>     
    )
  }
}

export default View;