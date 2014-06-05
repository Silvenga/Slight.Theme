# Slight 
Version 1.02

Ghost 0.4.2 compatibility

[Theme Download](http://store.silvenga.com/external/Slight.zip)


A minimal theme, powered by Ghost. Live Demo: (https://silvenga.com)

Created from scratch with inspiration from Ms. Qian’s Crisp theme (http://kathyqian.com/) and Roryg’s Ghostwriter theme (https://github.com/roryg/ghostwriter). 

## Features

* Minimal design to showcase content.
* Responsive design written in HTML5/LESS.
* Menu system.
* Full Ajax transitions between posts.
* Built in GitHub’s Gist beautifier.
* Disqus comment support.
* MIT license to customize and distribute.

## Screenshots

![](https://store.silvenga.com/slight-screenshot.png)

## Install
* Run `npm install` to ensure that the development environment is ready. 
* Run `grunt watch` to automatically compile code the the `/Slight` directory. 
* Modify header and footer links in `./src/default.hbs`.
* Modify disqus_shortname to your own on line 31 of `./src/js/master.js`.
* Modify links for the menu system in `./src/html/partials/menu.hbs`.
* Add the Slight folder to `./content/themes` of your Ghost installation
* Restart Ghost
* Select theme under that administration tools within Ghost
* Check out (https://github.com/Silvenga/gist-embed) for tips on using the Gist beautifier.

## License

Slight is under the MIT license.  