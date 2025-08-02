// tìm kiếm//
const searchIcon = document.getElementById('search-icon');
const searchBox = document.getElementById('search-box');
searchIcon.addEventListener('click', function() {
  if (searchBox.style.display === 'none' || searchBox.style.display === '') {
    searchBox.style.display = 'inline-block';
    searchBox.focus();
  } else {
    searchBox.style.display = 'none';
  }
});

// phần login/register//
const LogReg = document.querySelector('.LogReg');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link')

registerLink.addEventListener('click', ()=>{
  LogReg.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
  LogReg.classList.remove('active');
});
