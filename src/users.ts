import fetch from 'node-fetch';
import fs from 'fs';

const API_URL = "https://challenge.sunvoy.com/api/users";

const fetchUsers = async() => {
    try {
        const response = await fetch(API_URL, {
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

fetchUsers();