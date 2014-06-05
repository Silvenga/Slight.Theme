# Slight 
Version 1.02

Ghost 0.4.2 compatibility

[Theme Download](http://r.silvenga.com/slightdownload)

## Introduction

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

![](http://i.imgur.com/Yib6qzO.png)

![](http://i.imgur.com/rZaPIdx.png)

![](https://store.silvenga.com/slight-screenshot.png)

## Change Log

1.0.2 - 6/5/2014
* Javascript issue fixes. 
* Page loading is much faster now.
* Reduction in size.
* Simple light box for images. 
* Better image handling.
* Many mobile style fixes.
* Many screen size fixes.
* Menu fixes.

1.0.0
* First release. 

## Install

To reach optimal size the user must recompile the code after making any edits. Ensure that NPM is installed and working. 

* Run `npm install` to ensure that the development environment is ready. 
* Run `grunt watch` to automatically compile code in the `/Slight` directory. 
* Modify header and footer links in `./src/default.hbs`.
* Modify disqus_shortname to your own on line 3 of `./src/js/master.js`.
* Modify links for the menu system in `./src/html/partials/menu.hbs`.
* Modify links for the sidebar in `./src/html/partials/sidebar.hbs`.
* Add the Slight folder to `./content/themes` of your Ghost installation
* Restart Ghost
* Select theme under that administration tools within Ghost
* Check out (https://github.com/Silvenga/gist-embed) for tips on using the Gist beautifier.

## License

Slight is under the MIT license.  