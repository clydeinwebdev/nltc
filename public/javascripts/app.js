class App{
	constructor(){
		this.state = {};
	}

	render(html, component){
		component.innerHTML += html;
	}

	reRender(html, component){
		component.innerHTML = html;
	}

	showLoadingScreen(){
		$('.azurey').removeClass('hide');
		$('.azurey').show();
	}

	hideLoadingScreen(){
		$('.azurey').hide();
		$('.azurey').addClass('hide');
	}

	ucFirst(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	}	
}

class Component extends App{
	constructor(){

		super();
	}

	landingPage(){
		let html = `
		<div>
			<nav>
				<!--<a id="menu" href="#" data-activates="slide-out" class="button-collapse hide"><i class="material-icons">menu</i></a>-->
				<div class="nav-wrapper">
					<a href="#" class="brand-logo center" style="font-size: 1.0em;">New Lian Tai Commercial</a>
				</div>
			</nav>
			<div class="row" id="content">
				<div class="col s12 m6">
					<div class="card blue-grey darken-1 hoverable">
						<div class="card-content white-text">
							<span class="card-title">Register</span>
							<div class="row">
								<form class="col s12">
									<div class="row">
										<div class="input-field col s6">
											<input id="reg_firstname" type="text" class="validate">
											<label for="reg_firstname">First Name</label>
										</div>
										<div class="input-field col s6">
											<input id="reg_lastname" type="text" class="validate">
											<label for="reg_lastname">Last Name</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s12">
											<input id="reg_contactnumber" type="text" class="validate">
											<label for="reg_contactnumber">Contact Number</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s12">
											<input id="reg_username" type="text" class="validate">
											<label for="reg_username">Username</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s6">
											<input id="reg_password" type="password" class="validate">
											<label for="reg_password">Password</label>
										</div>

										<div class="input-field col s6">
											<input id="reg_cpassword" type="password" class="validate">
											<label for="reg_cpassword">Confirm Password</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s12">
											<select id="reg_type">
												<!--<option value="" disabled selected>Choose your option</option>-->
												<option value="customer" selected>customer</option>
												<option value="supplier">supplier</option>
												<option value="manager">manager</option>
											</select>
											<label>Account Type</label>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="card-action">
							<button class="btn btn-primary pink right" onclick="component.register()">Register</button>
							<div>&nbsp;</div><div>&nbsp;</div>
						</div>
					</div>
				</div>
				<div class="col s12 m6">
					<div class="card blue-grey darken-1 hoverable">
						<div class="card-content white-text">
							<span class="card-title">Login</span>
							<div class="row">
								<form class="col s12">
									<div class="row">
										<div class="input-field col s12">
											<input id="login_username" type="text" class="validate">
											<label for="login_username">Username</label>
										</div>
									</div>
									<div class="row">
										<div class="input-field col s12">
											<input id="login_password" type="password" class="validate">
											<label for="login_password">Password</label>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div class="card-action">
							<button class="btn btn-primary blue right" onclick="component.login()">Login</button>
							<div>&nbsp;</div><div>&nbsp;</div>
						</div>
					</div>
				</div>
			</div>
		</div>		
		`;
		this.reRender(html, document.querySelector('#app'));
		$('select').material_select();		
	}

	register(){
		//show loading screen
		this.showLoadingScreen();		

		//retrieve all register form data values
		let reg_data={
			firstname : $('#reg_firstname').val(),
			lastname : $('#reg_lastname').val(),
			contactnumber : $('#reg_contactnumber').val(),
			username : $('#reg_username').val(),
			password : $('#reg_password').val(),
			type : $('#reg_type').val()
		};

		//fetch post request to server api
		if(reg_data.password==$('#reg_cpassword').val() && reg_data.firstname.length>0 && reg_data.lastname.length>0 && reg_data.contactnumber.length>0 && reg_data.username.length>0 && reg_data.password.length>0){
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const url = 'https://nltc-server.herokuapp.com/apis/users';
			fetch(proxy + url, {
				method:'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-type':'application/json'
				},
				body:JSON.stringify(reg_data)
			})
			.then((res) => res.json())
			.then((data) => {
				this.hideLoadingScreen();				
				Materialize.toast(data.message,3000);
			})
			.catch((err) => {
				this.hideLoadingScreen();				
				Materialize.toast(data.message,3000);				
			});
		}
		else{
			this.hideLoadingScreen();
			Materialize.toast("Fill up the registration form correctly!",3000);
		}

	}

	login(){
		//show loading screen
		this.showLoadingScreen();	

		//retrieve all login form data values
		let login_data={
			username : $('#login_username').val(),
			password : $('#login_password').val()
		};	

		//fetch get request to server api
		if(login_data.username.length>0 && login_data.password.length>0){
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const url = 'https://nltc-server.herokuapp.com/apis/users/login';
			fetch(proxy + url, {
				method:'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-type':'application/json'
				},
				body:JSON.stringify(login_data)
			})
			.then((res) => res.json())
			.then((data) => {
				this.hideLoadingScreen();			
				component.state.user = data.data[0];	
				Materialize.toast(data.message,3000);
				component.dashboard();				
			})
			.catch((err) => {
				this.hideLoadingScreen();				
				Materialize.toast(data.message,3000);				
			});
		}
		else{
			this.hideLoadingScreen();
			Materialize.toast("Fill up the login form correctly!",3000);
		}					
	}

	dashboard(){
		let current_user = component.state.user;
		current_user.username = component.ucFirst(current_user.username);
		current_user.firstname = component.ucFirst(current_user.firstname);
		current_user.lastname = component.ucFirst(current_user.lastname);
		current_user.type = component.ucFirst(current_user.type);

		let html = `
			<ul id="slide-out" class="side-nav">
				<li><div class="user-view">
					<div class="background">
						<img src="http://materializecss.com/images/office.jpg">
					</div>
					<!--<a href="#!user"><img class="circle" src="http://materializecss.com/images/yuna.jpg"></a>-->
					<a href="#!name"><span class="white-text name">${current_user.firstname} ${current_user.lastname}</span></a>
					<a href="#!email"><span class="white-text email">${current_user.type}</span></a>
				</div></li>
				<li><a href="#!">Profile</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.landingPage();">Logout ${current_user.username}</a></li>
				<li><div class="divider"></div></li>
				<li><a class="subheader">Navigation</a></li>
				<li><a class="waves-effect" href="#!">Dashboard</a></li>
			</ul>

			<div class="row">
				<div class="col s12">
					<div>&nbsp;</div>
					<a style="position:absolute; top:20px; left:15px;" id="menu" href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons white-text small">menu</i></a>
					<div class="card grey lighten-2">
						<div class="card-content black-text">
							<span class="card-title">Users</span>

							<table class="bordered">
								<thead>
									<tr>
										<th>Username</th>
										<th>Name</th>
										<th>Type</th>
									</tr>
								</thead>

								<tbody id="userList"></tbody>
							</table>

							<ul class="pagination center-align">
								<li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
								<li class="active"><a href="#!">1</a></li>
								<!--<li class="waves-effect"><a href="#!">2</a></li>
								<li class="waves-effect"><a href="#!">3</a></li>
								<li class="waves-effect"><a href="#!">4</a></li>
								<li class="waves-effect"><a href="#!">5</a></li>-->
								<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
							</ul>

						</div>
						<div class="card-action right-align totalUsers">
							List of users.
						</div>
					</div>
				</div>
			</div>			
		`;
		this.reRender(html, document.querySelector('#content'));
		this.userList();
		$('#menu').removeClass('hide');
		$(".button-collapse").sideNav();
	}

	userList(){
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const url = 'https://nltc-server.herokuapp.com/apis/users';
		fetch(proxy + url)
		.then((res) => res.json())
		.then((data) => {
			let html = ``;
			data.data.forEach(function(user){
				html += `
					<tr>
						<td>${user.username.toUpperCase()}</td>
						<td>${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}</td>
						<td>${user.type.toUpperCase()}</td>
					</tr>
				`;
			});
			this.reRender(html, document.querySelector('#userList'));
			this.reRender(`A total of ${data.data.length} users.`, document.querySelector('.totalUsers'));
		});		
	}

}

let component = new Component();
component.landingPage();

/*component.reRender(`<div id="content"></div>`, document.querySelector('#app'));
component.state.user = {
	id: 1,
	username: "clyde",
	firstname: "clyde",
	lastname: "balaman",
	type: "supplier"
};
component.dashboard();*/