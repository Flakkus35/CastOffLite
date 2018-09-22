import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './NavBar.css';
import castOffIcon from "../../img/castoff-favicon.png";
import searchIcon from '../../img/search-icon.png';

class NavBar extends Component {
	state = {
		googleInput: ""
	}

	handleInputChange = event => {
	    const { id, value } = event.target;
	    this.setState({
	    	[id]: value
	    });
	};

	render() {
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-top">
					<Link className="navbar-brand" to={routes.LANDING}>
						<img src={castOffIcon} width="80" height="80" className="d-inline-block align-top"/>
						Cast Off
					</Link>
					<div className="google-search navbar-form navbar-right">
		                <div className="form-group">
		                  <form method="get" action="https://www.google.com/search">
		                    <table>
		                      <tbody>
		                        <tr>
		                          <td>
		                            <input 
		                              className="form-control" 
		                              id="googleInput" 
		                              type="text" 
		                              value={this.state.googleInput} 
		                              name="q"
		                              autoComplete="on"
		                              onChange={this.handleInputChange}
		                              placeholder="Google"
		                            />
		                          </td>
		                          <td>
		                          	<button 
		                              id="google-search-btn" 
		                              className="btn"
		                              type="submit" 
		                            >
		                            	<img src={searchIcon} id="search-icon" height="25" width="25" alt="search" />
		                              	Search 
		                            </button>
		                          </td>
		                        </tr>
		                      </tbody>
		                    </table>
		                  </form>
		                </div>
		             </div>
		             <div className="navbar-right user-bar">
						<Navigation />
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;