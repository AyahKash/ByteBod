import os
import subprocess
import requests


# update_firebase_api_key.py

def update_firebase_api_key(api_key):
    # Read the content of the firebase_config.js file
    cwd = os.getcwd()
    firebase_config = os.path.join(cwd, 'src', 'firebase.js')

    # with open(firebase_config, "r") as file:
    #     content = file.read()
    
    long_str = r'''
    const firebaseConfig = {
    apiKey: "%s",
    authDomain: "bytebod-9d1cf.firebaseapp.com",
    projectId: "bytebod-9d1cf",
    storageBucket: "bytebod-9d1cf.appspot.com",
    messagingSenderId: "545880527544",
    appId: "1:545880527544:web:9d4e618b4e5f017da09a4d"
    };
    ''' % api_key
    
    f = open(firebase_config, "a")
    f.write(long_str)
    f.close()

    js_code = '''
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const storage = getStorage();
    export const db = getFirestore();  //get database
    '''

    f = open(firebase_config, "a")
    f.write(js_code)
    f.close()

    print("Firebase API key updated successfully.")

if __name__ == "__main__":
    cwd = os.getcwd()
    firebase_config = os.path.join(cwd, 'src', 'firebase.js')

    with open(firebase_config, 'r') as file:
        # Read the entire content of the file
        file_content = file.read()
        # Check if the target word is present in the file content
        if "firebaseConfig" in file_content:
            command = "npm start"
            result = subprocess.run(command, shell=True, capture_output=True, text=True)


    user_api_key = input("Enter your Firebase API key: ")
    update_firebase_api_key(user_api_key)
    
    firestore_base_url = "https://firestore.googleapis.com/v1/projects/bytebod-9d1cf/databases/(default)/documents"
    collection_path = "users"
    document_id = "1GzrZkGGXofKao6vrj7FLdy4Ln53"
    api_key = user_api_key

    # Construct the URL for accessing a Firestore document
    firestore_url = f"{firestore_base_url}/{collection_path}/{document_id}?key={api_key}"

    # Make a GET request to the Firestore document
    response = requests.get(firestore_url)

    # Check the response status code
    if response.status_code == 200:
        print("API key is valid.")
        command = "npm start"
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
    else:
        print(f"API key verification failed. Status code: {response.status_code}")
        print("Error response:", response.json())

