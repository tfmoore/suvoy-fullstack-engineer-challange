import fetch from 'node-fetch';
import fs from 'fs';
require('dotenv').config();

const API_URL_USERS = `${process.env.API_URL}/users`;
const API_URL_USER_DETAILS = `${process.env.API_URL}/settings`;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

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
                "Authorization": `Bearer ${ACCESS_TOKEN}`
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