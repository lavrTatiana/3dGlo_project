'use strict';

import "@babel/polyfill";
import 'es6-promise';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhotos from './modules/commandPhotos';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


// Timer
countTimer('14 may 2020');
// Menu 
toggleMenu();
// Popup
togglePopUp();
// Tabs
tabs();
// Slider
slider();
// Сommand photo
commandPhotos();
// Calculator
calc(100);
// send-ajax-form
sendForm();
