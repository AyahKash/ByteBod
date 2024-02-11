#HERE ARE SOME BEGINNER INSTRUCTIONS ON HOW TO OPEN THE REACT SITE:
Before you read, if you have confusion with anyyyyy of the below steps or would like me (Ayah) to walk you through them completely or troubleshoot, please let me know (don't hesitate to ask, there are no dumb questions, and know that React project setup can be tricky).

**Step 1:** Download Github Desktop and sign in with your Github.

**Step 2:** Clone this repository. This can be done by clicking on the green "Code" button at the home page of this ByteBod repository. There are multiple options, but I recommend using the URL option. Copy the URL

**Step 3:** Navigate to Github Desktop and there should be an "Add" button somewhere. You're going to want to press some clone repository button and there will be a tab where you can paste a URL (the one you copied earlier). Click clone repository.

**Step 4:** After cloning, in Github Desktop, there should be a button somwhere on the right that says "Open in Visual Studio Code" and you want to click that button.

**Step 5:** This is very important. When you are on the project in VSCode/Visual Studio, in the src folder, go to App.js. Now you will need to open a new terminal within VSCode/Visual Studio. I have a Mac, so while I am in VScode, I navigate to the top Apple header where it has the Apple logo and like the name of the App you're currently in (VSCode). There should be a "New" button, and you're going to want to choose "New Terminal." This will open a new terminal in VSCode within this current project. Now in this new terminal, enter the command "npm i" (without quotes). This stands for npm install where npm means Node Package Manager. Basically, React relies on these packages and dependencies. When you run this command, you should see a package-lock.json and a massive folder node_modules appear in the files on your project. NOTE: You only ever need to run the npm i or npm install command ONCE, only when you first open a React project on your computer.

**Step 6:** To actually open the site, in the same terminal in VScode, enter the command "npm start" (without quotes). Make sure you run this command at a terminal prompt (press Control-C to exit whatever process is running on your terminal if you don't have a terminal/shell prompt there). Now this may ask you a question which you should reply with "y" for yes. After doing this, a new tab should open in Chrome or whatever browser you're using that will load the site. Currenly you should see some "hello world" message.

Important Note: In the future, you will be updating code and making PRs (Pull Requests). You each have been assigned a branch on this repository. You can switch to your branch (with your name) in Github desktop and this will automatically update on the lower left corner in VScode, showing what branch you're in. 
Another Important Note: When you make pull requests in GitHub Desktop, you will be shown the changes you made on your branch. PLEASEEEE uncheck any changes to package-lock.json or package.json files before making a pull request. These files are basically specific to everyone's local computer and will distrupt other people's code if you push these changes to everyone.




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

