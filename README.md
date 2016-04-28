# Textup Site

The TextUp website

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* Some simple web server for development, perhaps [Python](https://www.python.org/)

## Installation

* Clone the repository. Since this repository uses [`git subtree`](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) to share core styles with other repositories, this repository and its subtree can be cloned in one of the two following ways.
 1. `git clone --recursive <repository-url>`
 2. `git fetch` + `git submodule sync --recursive` + `git submodule update --init --recursive`
* Change into the new directory
* For ease of use, create a remote to the core styles repository with `git remote add styles git@github.com:TextUp/textup-site.git`
* `npm install`

## Pulling / Pushing

Separate changes to the subtree application from changes to the [core styles](https://github.com/TextUp/textup-styles). When pushing or pulling from this repository, use the standard methods. When working with changes that pertain to the core styles, you must first use the following commands to update your copy of the core styles

* `git subtree pull  --prefix=styles/core --squash styles master`

When you need to backport any changes to the core styles repository, the simplest way to do so is by using this command

* `git subtree push  --prefix=styles/core --squash styles master`

However, the main drawback of this command is that all commits that touched the subtree and used. If we need more control, we can cherry pick the commits we want to push to the subtree.

[More details about this and about all git-subtree related commands can be found at this tutorial](https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec#.s0lfst7jk)

## Running / Development

* Change directories to the root of this project
* If Python 2, `python -m SimpleHTTPServer`
*
* Visit your app at [http://localhost:8000](http://localhost:800).