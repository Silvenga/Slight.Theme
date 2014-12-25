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

## Install

To reach optimal size the user must reprocess the code after making any edits. Ensure that NPM is installed and working. 

* Run `npm install` to ensure that the development environment is ready. 
* Modify any settings in `./strings.json`. To disable a feature, set the value to `""`. 
* Run `grunt` to process the files and create the theme. 
* Add the Slight folder to `./content/themes` of your Ghost installation and restart Ghost.
* Select theme under the administration tools within Ghost.

## Screenshots

![](https://i.imgur.com/C35HBSb.png)

![](https://i.imgur.com/3Lt5PNg.png)

## Change Log

2.1.0 - 12/24/2014
* Updated for Ghost 0.5.7
* Added string dictionary (data is injected during preprocessing) - no more hard coded html strings.
* Improved to LESS's abilities a little more.
* Improved size of visual assets.
* Improved grunt tasks (a lot faster).
* Improved normalize upgraded to v3.
* Improved style across all pages.
* Improved using grunt's less plug-in.
* Improved comment system can easily be disabled.
* Fixed race condition if Ajax takes longer than 400ms to load.
* Fixed flashing/blinking in Chrome.
* Fixed Social icons being light boxed.
* Fixed footer to stay at bottom.
* Fixed images breaking code blocks.

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

## Download

Ghost 0.5.2 compatibility

[Latest Stable Theme Download](http://r.silvenga.com/slightdownload)

[Latest Dev Theme Download](http://r.silvenga.com/silvengadownloaddev)

## License

Slight is under the MIT license.  