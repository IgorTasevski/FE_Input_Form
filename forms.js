let UsersArray = [];
const FileInput = document.querySelector('input[type="file"]');

let isEdit = false;

let form = document.forms["CheckForm"];
let id = form["Id"];
let name = form["Name"];    
let surname = form["Surname"];            
let email = form["Email"];  
let image = form["Image"];
let next_user_id = 1;

// Error for empty/incorrect validation 

const ValidateForm = () => {

        if (name.value == "")                                  
        { 
            window.alert("Please enter your name."); 
            name.focus(); 
            return false; 
        } 
    
        if (surname.value == "")                               
        { 
            window.alert("Please enter your surname."); 
            name.focus(); 
            return false; 
        } 
        
        if (email.value == "")                                   
        { 
            window.alert("Please enter a valid e-mail address."); 
            email.focus(); 
            return false; 
        } 
    
        if (email.value.indexOf("@", 0) < 0)                 
        { 
            window.alert("Please enter a valid e-mail address."); 
            email.focus(); 
            return false; 
        } 
    
        if (email.value.indexOf(".", 0) < 0)                 
        { 
            window.alert("Please enter a valid e-mail address."); 
            email.focus(); 
            return false; 
        } 
    
        if (image.value == "")                           
        { 
            window.alert("Please upload your image."); 
            image.focus(); 
            return false; 
        } 



        let User = {};
    
        User["Name"] = form["Name"].value + ' ' + form["Surname"].value;
        User["Email"] = form["Email"].value;
        User["Id"] = next_user_id;
        User["Picture"] = generateImageUrl();    
      
        if (isEdit) {
            // Edits the user in the usersarray

            //Sets the user id to the one being editted
            User["Id"] = Number(id.value);

            //finds the user to be edited
            user_for_edit = UsersArray.find(obj => {
                return obj.Id === User["Id"];
              });

            //edits the user
            user_for_edit["Name"] = User["Name"];
            user_for_edit["Email"] = User["Email"];
            user_for_edit["Picture"] = User["Picture"];
        } else {
            UsersArray.push(User);
            next_user_id++;
        }
        
        displayAlert();
        hideAlert();

        updateUserList();
        updateTable();

        isEdit = false;

        emptyForm();

        return true;
};

const UserContainer = document.getElementById('users-container');
const UserTable = document.getElementById('users-table');

let deleteUser = (user_id) => {
    //deletes user from usersarray and refreshes the users list and users table
    UsersArray = UsersArray.filter(user => {
        return user.Id != user_id
    });

    updateUserList();
    updateTable();
};

let editUser = (user_id) => {
    // repopulates the form, sets isEdit to true
    isEdit = true;
    PopulateForm(user_id);

};

const PopulateForm = (user_id) => {
    let UserById = UsersArray.find(obj => {
      return obj.Id === user_id
    });

    id.value = UserById.Id;
    name.value = UserById.Name.split(' ')[0];
    surname.value = UserById.Name.split(' ')[1];
    email.value = UserById.Email;
    image.value = ''; //must be set to empty string, as anything else generates error
}

let updateTable = () => {
    let string = '';
    UsersArray.forEach((user) => {
        string = string + '<tr>' + 
          '<td>' + user.Id + '</td>' +
          '<td>' + user.Name + '</td>' + 
          '<td>' + user.Email + '</td>' +
          '<td><input type="button" value="Edit" onclick="editUser(' + user.Id + ')"></button>' +
          '<input type="button" value="Delete" onclick="deleteUser(' + user.Id + ')">' +
          '</td></tr>';
    });
    UserTable.innerHTML = string;
};

let updateUserList = () => {
    let string = '';
    UsersArray.forEach((user) => {
        string = string + 
        '<div class="User" id="welcomeDiv">' +
        '<img class="ImageUpload" src="' + user.Picture + '">' +
        '<p id="NameInput" class="text">' + user.Name + '</p>' + 
        '<p id="EmailInput">' + user.Email + '</p>' +
        '</div>';
    });
    UserContainer.innerHTML = string;
}

let emptyForm = () => {
    id.value = null;
    name.value = null;
    surname.value = null;
    email.value = null;
    image.value = null;
}

function displayAlert() {
    document.querySelector('#hidden-alert').style.display = 'block';
}

function hideAlert() {
	setTimeout(() => {
		document.querySelector('#hidden-alert').style.display = 'none';
	}, 3000)
}

function generateImageUrl() {
    if(FileInput.files && FileInput.files[0]){
        return URL.createObjectURL(FileInput.files[0]);
    } else {
        return '';
    }
};
