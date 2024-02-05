# To run the application, take the following steps: 

On terminal, cd to the directory you want to clone the project

clone the repository:
### `git clone https://github.com/AyahKash/ByteBod.git`
navigate to project directory:
### `cd ByteBod`
install dependencies:
### `npm install`
start react app:
### `npm start`

# Pushing changes to Git from terminal
first, navigate to the project directory
check git status to see the changes you have made on your branch:
### `git status`
Add changes:
to stage all your changes use:
### `git add .`
or, to stage specific files, you can list them individually:
### `git add file1 file2`
commit the changes, and add a comment for what you did
### `git commit -m "commit message"
push changes to remote repository
### `git push origin branch-name`
* branch-name is main when you are pushing to the main branch

To ensure your local repository is up to date, you can pull changes before starting to work on your branch
again, start by navigating to project directory
check current branch: (you want to be on the branch you want to pull from)
### `git branch`
to change the branch you are currently on:
### `git checkout branch-name`
pull changes from remote repository:
### `git pull origin main`

