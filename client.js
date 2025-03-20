document.addEventListener('DOMContentLoaded', function() {

    const API_URL = 'http://localhost:3000/api';
    
    const tableSelector = document.getElementById('tableSelector');
    const usersSection = document.getElementById('usersSection');
    const companiesSection = document.getElementById('companiesSection');
    
    const userForm = document.getElementById('userForm');
    const userId = document.getElementById('userId');
    const userName = document.getElementById('name');
    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('password');
    const cancelUserEdit = document.getElementById('cancelUserEdit');
    
    const companyForm = document.getElementById('companyForm');
    const companyId = document.getElementById('companyId');
    const cegnev = document.getElementById('cegnev');
    const telefon = document.getElementById('telefon');
    const ceg_email = document.getElementById('ceg_email');
    const jelszo = document.getElementById('jelszo');
    const telepules = document.getElementById('telepules');
    const megye = document.getElementById('megye');
    const ceges_szamla = document.getElementById('ceges_szamla');
    const hitelkartya = document.getElementById('hitelkartya');
    const adoszam = document.getElementById('adoszam');
    const cegjegyzek = document.getElementById('cegjegyzek');
    const helyrajziszam = document.getElementById('helyrajziszam');
    const cancelCompanyEdit = document.getElementById('cancelCompanyEdit');
    
    const usersTableBody = document.getElementById('usersTableBody');
    const companiesTableBody = document.getElementById('companiesTableBody');
    
    tableSelector.addEventListener('change', function() {
        if (this.value === 'users') {
            usersSection.style.display = 'block';
            companiesSection.style.display = 'none';
            loadUsers();
        } else {
            usersSection.style.display = 'none';
            companiesSection.style.display = 'block';
            loadCompanies();
        }
    });
    
    function loadUsers() {
        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(users => {
                usersTableBody.innerHTML = '';
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td class="action-buttons">
                            <button class="btn btn-sm btn-warning edit-user" data-id="${user.id}">Edit</button>
                            <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">Delete</button>
                        </td>
                    `;
                    usersTableBody.appendChild(row);
                });
                
                document.querySelectorAll('.edit-user').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        editUser(id, users.find(user => user.id == id));
                    });
                });
                
                document.querySelectorAll('.delete-user').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        if (confirm('Are you sure you want to delete this user?')) {
                            deleteUser(id);
                        }
                    });
                });
            })
            .catch(error => console.error('Error loading users:', error));
    }
    
    function loadCompanies() {
        fetch(`${API_URL}/companies`)
            .then(response => response.json())
            .then(companies => {
                companiesTableBody.innerHTML = '';
                companies.forEach(company => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${company.id}</td>
                        <td>${company.cegnev}</td>
                        <td>${company.ceg_email}</td>
                        <td>${company.telefon}</td>
                        <td>${company.telepules}</td>
                        <td>${company.megye}</td>
                        <td class="action-buttons">
                            <button class="btn btn-sm btn-warning edit-company" data-id="${company.id}">Edit</button>
                            <button class="btn btn-sm btn-danger delete-company" data-id="${company.id}">Delete</button>
                        </td>
                    `;
                    companiesTableBody.appendChild(row);
                });
                
                document.querySelectorAll('.edit-company').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        editCompany(id, companies.find(company => company.id == id));
                    });
                });
                
                document.querySelectorAll('.delete-company').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        if (confirm('Are you sure you want to delete this company?')) {
                            deleteCompany(id);
                        }
                    });
                });
            })
            .catch(error => console.error('Error loading companies:', error));
    }
    
    function editUser(id, user) {
        userId.value = id;
        userName.value = user.name;
        userEmail.value = user.email;
        userPassword.value = '';
        
        userForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    function editCompany(id, company) {
        companyId.value = id;
        cegnev.value = company.cegnev;
        telefon.value = company.telefon;
        ceg_email.value = company.ceg_email;
        jelszo.value = '';
        telepules.value = company.telepules;
        megye.value = company.megye;
        ceges_szamla.value = company.ceges_szamla;
        hitelkartya.value = company.hitelkartya;
        adoszam.value = company.adoszam;
        cegjegyzek.value = company.cegjegyzek;
        helyrajziszam.value = company.helyrajziszam;
        
        companyForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    function deleteUser(id) {
        fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadUsers();
                alert('User deleted successfully');
            } else {
                throw new Error('Failed to delete user');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting user: ' + error.message);
        });
    }
    
    function deleteCompany(id) {
        fetch(`${API_URL}/companies/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadCompanies();
                alert('Company deleted successfully');
            } else {
                throw new Error('Failed to delete company');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting company: ' + error.message);
        });
    }
    
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        };
        
        const id = userId.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users`;
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    
                    if (data.message) {
                        throw new Error(data.message);
                    }
                    throw new Error('Failed to save user');
                }
                return data;
            });
        })
        .then(() => {
            resetUserForm();
            loadUsers();
            alert(id ? 'User updated successfully' : 'User added successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Validation error: ' + error.message);
        });
    });
    
    companyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const company = {
            cegnev: cegnev.value,
            telefon: parseInt(telefon.value),
            ceg_email: ceg_email.value,
            jelszo: jelszo.value,
            telepules: telepules.value,
            megye: megye.value,
            ceges_szamla: parseInt(ceges_szamla.value),
            hitelkartya: parseInt(hitelkartya.value),
            adoszam: parseInt(adoszam.value),
            cegjegyzek: cegjegyzek.value,
            helyrajziszam: helyrajziszam.value
        };
        
        const id = companyId.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/companies/${id}` : `${API_URL}/companies`;
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(company)
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    
                    if (data.message) {
                        throw new Error(data.message);
                    }
                    throw new Error('Failed to save company');
                }
                return data;
            });
        })
        .then(() => {
            resetCompanyForm();
            loadCompanies();
            alert(id ? 'Company updated successfully' : 'Company added successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Validation error: ' + error.message);
        });
    });
    
    function resetUserForm() {
        userId.value = '';
        userForm.reset();
    }
    
    function resetCompanyForm() {
        companyId.value = '';
        companyForm.reset();
    }
    
    cancelUserEdit.addEventListener('click', resetUserForm);
    
    cancelCompanyEdit.addEventListener('click', resetCompanyForm);
    
    loadUsers();
});