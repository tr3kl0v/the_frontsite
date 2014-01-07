[![Build Status](https://travis-ci.org/paapster/the_frontsite.png?branch=master)](https://travis-ci.org/paapster/the_frontsite)
[![Dependency Status](https://david-dm.org/paapster/the_frontside.png)](https://david-dm.org//paapster/the_frontside)

[The FrontSite](http://paapster.nl/) - Running FE in browser or on the server
==================================================
=============

The FrontSide is a platform for creating FE applications which can run in the browser and on the server. 

What you need to build your own FrontSite
--------------------------------------

In order to build FrontSite, you need to have Node.js/npm latest and git 1.7+ or later.
(Earlier versions might work OK, but only the latest version is tested.)

For Windows you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

Mac OS users should install [Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git and Node.js, or build from source
if you swing that way. Easy-peasy.


How to build your own FrontSite
----------------------------

First, clone a copy of the main FrontSite git repo by running:

```bash
git clone https://github.com/paapster/the_frontsite.git
```

Install the [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) package if you haven't before. These should be done as global installs:

```bash
npm install -g grunt-cli
```

Make sure you have `Node.js` and `grunt` installed by testing:

```bash
Node.js -version
grunt -version
