# Slight 2.3.0

[![Build Status](https://jenkins.silvenga.com/job/Blog/badge/icon)](https://jenkins.silvenga.com/job/Blog/)

## Introduction

A minimal theme, powered by Ghost. Live demo: (https://silvenga.com) (using the `master` branch).

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

## Change Log

2.3.0 - 4/13/2015

* Updated for Ghost 0.6.0
* Updated for Ghost 0.5.9
* Added navigation compatibility with Ghost 0.5.9.
* Added basic build unit tests. 
* Improved love.
* Improved rendering speed by async loading CSS. 
* Improved styling of block quotes. 
* Fixed flashing quotes. 
* Fixed styling covering title link. 
* Fixed race condition resulting in a white page on 4XX errors. 

2.1.0 - 12/24/2014

* Updated for Ghost 0.5.7
* Added string dictionary (data is injected during preprocessing) - no more need to edit any of the hbs files.
* Added edit button on posts when logged in. 
* Improved allow LESS to do more of the heavy lifting.
* Improved size of visual assets.
* Improved grunt tasks (a lot faster).
* Improved normalize upgraded to v3.
* Improved style across all pages.
* Improved using grunt's less plug-in.
* Improved comment system can easily be disabled.
* Fixed race condition if Ajax takes longer than 400ms to return.
* Fixed flashing/blinking in Chrome.
* Fixed Social icons being light boxed.
* Fixed footer to stay at bottom.
* Fixed images breaking code blocks.
* Fixed light box sizing issues.

2.0.0 - 9/18/2014

* Updated for Ghost 0.5.2.
* Added Fluidbox by Terry Mun (http://terrymun.com) to provide seamless lightbox transitions.  
* Added complete code rewrite (CSS, HTML, JavaScript).
* Improved grunt processing speed.
* Improved significant size reductions. 
* Fixed dozens of bugs. 

1.0.5 - 6/21/2014

* Added jquery.lazyView (https://github.com/Silvenga/jquery-lazyView).
* Improved Ajax loading.
* Improved grunt building.
* Fixed comment issues when loading via Ajax.
* Fixes issues with mobile devices (iPhone).
* Fixed IE11 issues.
* Fixed Webkit CSS issues.
* Fixed style bugs.

1.0.2 - 6/5/2014

* Added simple light box for images. 
* Improved image handling.
* Improved page loading is faster now.
* Improved size.
* Fixed styles when view with different resolutions.
* Fixed menu issues.
* Fixed issues with the scripting.

1.0.0

* First release. 

## Download

Ghost 0.6.0 compatibility

[Latest Stable Theme Download](http://yourls.silvenga.com/slightdownload)

[Latest Dev Theme Download](http://yourls.silvenga.com/silvengadownloaddev)

## License

Slight is under the MIT license.  

## Screenshots

![](https://i.imgur.com/C35HBSb.png)

![](https://i.imgur.com/3Lt5PNg.png)