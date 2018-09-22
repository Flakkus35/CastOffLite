import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from '../View/View';
import { PWForgetForm } from './PWforget';
import PWChangeForm from './PWChange';
import withAuthorization from './withAuthorization';
import { db } from "../../firebase";

const ProfilePage = (props, { authUser }) =>
  <div className="view-wrapper">
  	<View view={"Profile: " + authUser.email} />

  	<LinkTable user={authUser}/>
    <PWForgetForm />
    <PWChangeForm />
  </div>

// Link list component
class LinkTable extends Component {
	state = {
		links: [],
		groups: [],
		page: "Links"
	};

	componentDidMount() {
		this.updateLinks();
	}

	updateLinks() {
		var tmpLinks = [];
		var tmpCats = [];
		db.grabSites(this.props.user.uid)
			.then(snapshot => {
				Object.keys(snapshot.val().links).forEach(key => {
					var tmpObj = {
						link: snapshot.val().links[key].url,
						cat: snapshot.val().links[key].cat,
						key: key
					}
					tmpLinks.push(tmpObj);
				})
				if (snapshot.val().cats) {	
					Object.keys(snapshot.val().cats).forEach(key => {
						var tmpObj = {
							cat: snapshot.val().cats[key],
							key: key
						}
						tmpCats.push(tmpObj);
					})
				}
			})
			.then(() => {
				this.setState({
					links: tmpLinks,
					groups: tmpCats
				})
			})
			.catch(error => {
				console.log(error);
			});
	}

	// adds a site to current user db
	addSite = () => {
		var link = document.getElementById("basic-url").value;
		if (!link) {
			return;
		}
		if (link.includes('http://') || link.includes('https://')) {
			
		} else {
			link = ("https://" + link);
		}
		if (!link.includes('.com')) {
			link = (link + '.com');
		}
		var group = {
			url: link,
			cat: "Home"
		}
		document.getElementById("basic-url").value = "";
		db.addSite(this.props.user.uid, group)
			.then(this.updateLinks());
	}

	addCat = () => {
		var cat = document.getElementById("basic-url2").value;
		if (!cat) {
			return;
		}
		document.getElementById("basic-url2").value = '';
		db.addCat(this.props.user.uid, cat)
			.then(this.updateLinks());
	}

	deleteLink = event => {
		var link = event.target.getAttribute("data-key");
		db.delLink(this.props.user.uid, "links", link)
			.then(this.updateLinks())
	}

	deleteCat = event => {
		var cat = event.target.getAttribute("data-key");
		var catName = event.target.getAttribute("data-name");
		db.delLink(this.props.user.uid, "cats", cat, catName)
			.then(db.reassign(this.props.user.uid, catName))
			.then(this.updateLinks());
	}

	switchCat = event => {
		var catId = event.target.getAttribute("data-key");
		var cat = event.target.innerHTML;
		db.updateCat(this.props.user.uid, cat, catId)
			.then(this.updateLinks());
	}

	// renders the Links setting page
	renderLinks = () => {
		return (
			<div className="card-body">
				<label htmlFor="basic-url">Add new link</label>
				<div className="input-group" style={{marginBottom: "15px"}}>
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon3">https://</span>
					</div>
					<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
					<div className="input-group-append">
						<button onClick={this.addSite} className="btn" type="button">Add</button>
					</div>
				</div>
				<ul className="list-group">
					{this.state.links.map(object => (
						<li key={object.key} className="list-group-item d-flex justify-content-between align-items-center">	
							<h1 className="url-name">{object.link}</h1>
							<div className="dropdown">
								<button className="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									{object.cat}
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									{this.state.groups.filter(catGroup => catGroup.cat !== object.cat).map(totalCats => (
										<button key={totalCats.key} data-key={object.key} onClick={this.switchCat} type="button" className="dropdown-item">{totalCats.cat}</button>
									))}
								</div>
							</div>
							<button type="button" data-key={object.key} onClick={this.deleteLink} className="btn btn-danger">X</button>
						</li>
					))}
				</ul>
			</div>
		);
	}

	// renders the Cats setting page
	renderCats = () => {
		return (
			<div className="card-body">
				<label htmlFor="">Add New Category</label>
				<div className="input-group" style={{marginBottom: "15px"}}>
					<input type="text" className="form-control" id="basic-url2" />
					<div className="input-group-append">
						<button onClick={this.addCat} className="btn" type="button">Add</button>
					</div>
				</div>
				<ul className="list-group">
					{this.state.groups.filter(name => name.cat !== "Home").map(object => (
						<li key={"key=" + object.key} className="list-group-item d-flex justify-content-between align-items-center">	
							<h1 className="cat-name">{object.cat}</h1>
							<button type="button" data-key={object.key} data-name={object.cat} onClick={this.deleteCat} className="btn btn-danger">X</button>
						</li>
					))}
				</ul>
			</div>
		);
	}

	// Switches profile date from Links to Cats vice versa
	switchPage = event => {
		if (event.target.textContent === "Links") {
			this.setState({
				page: "Links"
			});
		} else {
			this.setState({
				page: "Cats"
			});
		}
	}

	render() {

		return (
			<div className="card" style={{marginTop: "15px"}}>
				<div className="card-header" style={{padding: '0'}}>
					<ul className="pagination" style={{marginBottom: "0"}}>
						<li className="page-item"><button type="button" onClick={this.switchPage} className="btn">Links</button></li>
						<li className="page-item"><button type="button" onClick={this.switchPage} className="btn">Cats</button></li>
					</ul>
				</div>
				{ this.state.page === "Links"
					? this.renderLinks()
					: this.renderCats()
				}
			</div>
		);
	}
}


ProfilePage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ProfilePage);