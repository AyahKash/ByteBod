**BYTEBOD**
**35L Project Winter 2024**

ByteBod: A Fitness App to track your workouts and connect with fellow fitness enjoyers.  

**Features:**
- Authentication: Signing in, registering an account, forgot your password? email.
- Dynamic Homepage: View posts from the entire ByteBod community, and navigate our app with an intituitive Navbar.
- Posts: Include author's name, profile picture, and data created. Contain a title, workout type tag and description. Feel free to leave a comment or a like!
- Search bar: Search posts by workout type.
- Friend Requests: Grow your network and send friend requests to other users. Friends list displayed under Profile tab.
- Friends Feed: Only view posts of people you're friends with.
- Workout Log: Track your workouts by creating weekly logs. Weekly logs are private to the current user and can be viewed under the "Profile" Tab.
- Settings: Updated your bio, upload a profile picture, and change your password. 

Firebase is our selected backend and datastore for its organized structure in managing user information. It provides authentication, diverse APIs (authentication, Cloud Firestore, Cloud Functions, and Cloud Storage), all activated by client-side SDKs. We opted for Firebase as our datastore due to its built-in functions streamlining database processes—creation, reading, and writing. On the frontend, we employed JavaScript/HTML and CSS.

**SETUP:**

On terminal, cd to the directory you want to clone the project
clone the repository:
### `git clone https://github.com/AyahKash/ByteBod.git`
navigate to project directory:
### `cd ByteBod`
install dependencies:
### `npm install`
run website (will be prompted to input firebase API key)
### `python3 run-app.py`

Alternatively, you can run the bash script that just has all these commands in it
Download the setup.sh file and run 
### `./setup.sh`

**Contributors:**
  * Anushka Nayak as anushkanayak15
  * Ayah Kashkoul as AyahKash
  * Shilpa Bojjireddy as shilpa-bo
  * Mason Hoppe as masonamp
  * Maria Martins as maria-campo-martins
