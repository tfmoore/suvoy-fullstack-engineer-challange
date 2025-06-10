import fetch from 'node-fetch';
import fs from 'fs';

const API_URL_USERS = "https://challenge.sunvoy.com/api/users";
const API_URL_USER_DETAILS = "https://challenge.sunvoy.com/api/settings";

const fetchUsers = async() => {
    try {
        const response = await fetch(API_URL_USERS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const users = await response.json();

        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        console.log("Users fetched and saved to users.json");
    } catch(error){
        console.error("Error fetching users: ", error);
    }
}

const fetchAuthenticatedUser = async() => {
    try {
        const response = await fetch(API_URL_USER_DETAILS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ACCESS_TOKEN`// ACCESS_TOKEN is a placeholder for the token
            },
        });
        const userDetails = await response.json();
        const userData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
        userData.authenticatedUser = userData;

        fs.writeFileSync("users.json", JSON.stringify(userData, null, 2));
        console.log("Authenticated user details added to users.json");
    } catch(error){
        console.error("Error fetching authenticated user: ", error);
    }
}

const main = async()=>{
    await fetchUsers();
    await fetchAuthenticatedUser();
}

main();