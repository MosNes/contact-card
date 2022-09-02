//import modules
import './form';
import './submit';
import { initdb, getDb, postDb } from './database';

//import static images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

//import css
import '../css/index.css';
//import Bootstrap
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { initDb } from './database';

window.addEventListener('load', function () {
    initdb();

    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});