'use scrict';

import 'babel-polyfill';
import 'zone.js/dist/zone';

// import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
// import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {HelloApp} from './app';

bootstrap(HelloApp, []).catch(err => console.error(err));