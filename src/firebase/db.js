import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
		username,
		email
	}).then(() => {
		db.ref(`users/${id}/cats`).push("Home");
	});

export const onceGetUsers = () =>
	db.ref('users').once('value');

export const addSite = (id, url) => 
	db.ref(`users/${id}/links`).push(url);

export const grabSites = (id) =>
	db.ref(`users/${id}`).once('value');

export const addCat = (id, cat) =>
	db.ref(`users/${id}/cats`).push(cat);

export const delLink = (id, type, linkId, catName) => 
	db.ref(`users/${id}/${type}/${linkId}`).remove()

export const updateCat = (id, newCat, catId) =>
	db.ref(`users/${id}/links/${catId}`).update({
		cat: newCat
	});

export const reassign = (id, catName) =>
	db.ref(`users/${id}/links`).once("value")
		.then(snapshot => {
			Object.keys(snapshot.val()).forEach(key => {
				if (snapshot.val()[key].cat === catName) {
					db.ref(`users/${id}/links/${key}`).update({
						cat: "Home"
					})
				}
			})
		})