import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../../firebase';
import LinkBlock from "../LinkBlock/LinkBlock.js";
import { Container, Row, Col } from "../Grid";
import anchor from '../../img/anchor.png';

const HomeWrap = (props, { authUser }) =>
  <div>
    <HomePage auth={authUser}/>
  </div>

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      view: "Home",
      groups: [],
      search: ""
    };
  }

  updateLinks = () => {
    db.onceGetUsers().then(snapshot => {
      for (var key in snapshot.val()) {
        var value = snapshot.val()[key];
        if (typeof value === "object") {
          this.setState({
            users: value
          })
        }
      }
    }).then(() => {
      if (this.state.users) {
        var tmpCats = [];
        Object.keys(this.state.users.cats).forEach(key => {
          tmpCats.push(this.state.users.cats[key])
        })
        this.setState({
          groups: tmpCats
        })
      }
    })
  }

  componentWillMount() {
    this.updateLinks();
  }

  deleteLink = event => {
    var link = event.target.getAttribute("data-key");
    db.delLink(this.props.auth.uid, "links", link)
      .then(this.updateLinks())
  }

  renderLinks = () => {
    if (this.state.users.links) {  
      return (
        <Row>
            {Object.keys(this.state.users.links).filter(obj => this.state.users.links[obj].url.includes(this.state.search)).map(key => 
               this.state.users.links[key].cat === this.state.view
                ?  (<Col size="md-3" key={key}> 
                    <LinkBlock delKey={key} del={this.deleteLink} link={this.state.users.links[key].url} key={key} />
                  </Col>)
                : console.log(null)
            )}
        </Row>
      )
    }
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      search: value
    })
  }

  clearSearch = () => {
    document.querySelector("#searchInput").value = "";
    this.setState({
      search: ""
    })
  }

  switchPage = event => {
    console.log(event.target.innerHTML);
    this.setState({
      view: event.target.innerHTML
    });
  }

  render() {

    return (
      <div className="view-wrapper">
        <div className='view-nav-wrapper'>  
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand">  
              <div className="dropdown-show">
                <img src={anchor} className="dropdown-toggle" id="dropdownAnchorLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" height="80" width="80" alt="anchor"/>
                <div className="dropdown-menu" aria-labelledby="dropdownAnchorLink">
                  { this.state.groups.filter(name => name !== this.state.view).map(key => (
                    <button onClick={this.switchPage} type="button" key={key} className="dropdown-item">{key}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="collapse navbar-collapse" id ="navbarNavAlt">
              <div className="navbar-nav">
                <h2 className="nav-item">
                  {this.state.view}
                </h2>
              </div>
            </div>
            { this.state.view !== "Cast Off"
              ? <SearchLinks search={this.handleInputChange.bind(this)} clear={this.clearSearch.bind(this)}/>
              : <div />
            }
          </nav>
        </div>
        <Container fluid>  
          { !this.state.users
            ? console.log("no state")
            : this.renderLinks()
          }
        </Container>
      </div>
    );
  }
}

const SearchLinks = props => 
  <div className="google-search navbar-form navbar-right">
        <div className="form-group">
          <form method="get" action="https://www.google.com/search">
            <table>
              <tbody>
                <tr>
                  <td>
                    <input 
                      className="form-control" 
                      id="searchInput" 
                      type="text" 
                      name="q"
                      autoComplete="on"
                      placeholder="Find Links"
                      onChange={props.search}
                    />
                  </td>
                  <td>
                    <button 
                      id="link-search-btn" 
                      className="btn btn-danger"
                      type="button" 
                      onClick={props.clear}
                    >
                    X
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
     </div>

HomeWrap.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomeWrap);