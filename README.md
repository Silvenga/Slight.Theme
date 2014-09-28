# Slight 

## Introduction

A minimal theme, powered by Ghost. Live demo: (https://silvenga.com) (using the dev branch).

Created from scratch with inspiration from Ms. Qian’s Crisp theme (http://kathyqian.com/) and Roryg’s Ghostwriter theme (https://github.com/roryg/ghostwriter). 

## Features

* Minimal design to showcase content.
* Responsive design written in HTML5/LESS.
* Full Ajax transitions between posts.
* Built in GitHub’s Gist beautifier.
* Disqus comment support.
* MIT license to customize and distribute.

## Screenshots

![](https://i.imgur.com/C35HBSb.png)

![](https://i.imgur.com/3Lt5PNg.png)

## Change Log

2.0.0 - 9/18/2014
* Updated for Ghost 0.5.2.
* Complete code rewrite (CSS, HTML, Javascript).
* Uses Fluidbox by Terry Mun (http://terrymun.com) to provide seamless lightbox transitions.  
* Streamlined grunt processing.
* Significant speed improvements.
* Source minification improvements.  
* Squashed dozens of bugs. 

1.0.5 - 6/21/2014
* Fixed comment issues with loading via ajax.
* Streamlined ajax loading.
* Using jquery.lazyView (https://github.com/Silvenga/jquery-lazyView).
* Fixes issues with mobile devices (iPhone).
* Fixed IE11 issues.
* Fixed Webkit CSS issues.
* Streamlined grunt building.
* Javascript fixes.
* Style fixes.

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
* Modify disqus_shortname to your own on line 3 of `./src/js/blob.07.master.js` (or disable Disques with `enable_disques`).
* Modify links for the menu system in `./src/html/partials/menu.hbs`.
* If needed run `grunt` or `compile.bat` to force the compiling of all the assets. 
* Add the Slight folder to `./content/themes` of your Ghost installation
* Restart Ghost
* Select theme under that administration tools within Ghost
* Check out (https://github.com/Silvenga/gist-embed) for tips on using the Gist beautifier.

## Download

Ghost 0.5.2 compatibility

[Latest Stable Theme Download](http://r.silvenga.com/slightdownload)

[Latest Dev Theme Download](http://r.silvenga.com/silvengadownloaddev)


## License

Slight is under the MIT license.  