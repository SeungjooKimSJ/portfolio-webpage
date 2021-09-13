'use strict';

const $navbar = document.querySelector('#navbar');
const $navbarHeight = $navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > $navbarHeight) {
    $navbar.classList.add('navbar--dark');
  } else {
    $navbar.classList.remove('navbar--dark');
  }
});

const $navbarMenu = document.querySelector('.navbar__menu');

$navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;

  if (link === null) {
    return;
  }

  $navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

const $navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

$navbarToggleBtn.addEventListener('click', () => {
  $navbarMenu.classList.toggle('open');
});

const $homeContactBtn = document.querySelector('.home__contact');

$homeContactBtn.addEventListener('click', event => {
  scrollIntoView('#contact');
});

const $homeContainer = document.querySelector('.home__container');
const $homeHeight = $homeContainer.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  $homeContainer.style.opacity = 1 - window.scrollY / $homeHeight;
});

const $arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
  if (window.scrollY > $homeHeight / 2) {
    $arrowUp.classList.add('visible');
  } else {
    $arrowUp.classList.remove('visible');
  }
});

$arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

const $workContainer = document.querySelector('.work__categories');
const $projectContainer = document.querySelector('.work__projects');
const $projects = document.querySelectorAll('.project');

$workContainer.addEventListener('click', event => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter === null) {
    return;
  }

  const $selected = document.querySelector('.category__btn.selected');

  $selected.classList.remove('selected');

  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;

  target.classList.add('selected');

  $projectContainer.classList.add('anim-out');

  setTimeout(() => {
    $projects.forEach(project => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });

    $projectContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);

  scrollTo.scrollIntoView({behavior: 'smooth'});
}

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
