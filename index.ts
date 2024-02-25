import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';

//   User data

interface User {
    id: number;
    pin: number;
    name: string;
    accountNumber: number;
    balance: number;
}

const createUser = ()=>{
    let Users: User[] = []

    for(let i = 0; i < 5; i++){
        let user: User = {
            id: i,
            pin: 1234 + i,
            name: faker.internet.userName(),
            accountNumber: Math.floor (1000000 * Math.random() * 9000000),
            balance: 10000000,
        }
        Users.push(user)
    }
    return Users 
};

//    ATM Machine

const AtmMachine = async(Users:User[]) => {
    let res = await inquirer.prompt({
        type: "number",
        message: "Enter your pin",
        name: "pin",
    });

    const user = Users.find (val => val.pin == res.pin);

    if(user){
        console.log(`Welcome ${user.name}`);
        AtmFunction(user)
        return
     }
        console.log("invalid user pin"); 

    console.log(res);
    };

    //  ATM functions

    const AtmFunction = async(user: User)=>{
        const ans = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "what you want?",
            choices: ["withdraw", "balance", "deposit", "exit"],
        });
        
        if(ans.select == "withdraw"){
            const amount = await inquirer.prompt({
                type: "number",
                message: "enter amount",
                name: "rupee",
            });
            if(amount.rupee > user.balance){
               return console.log("incuficent balance");
            }  
                console.log(`withdraw ${amount.rupee}`);
                console.log(`balance ${user.balance-amount.rupee}`);
            }
            if(ans.select == "balance"){
                console.log(`your current balance ${user.balance}`);
                return
            }
            if(ans.select == "deposit"){
                const Deposit = await inquirer.prompt({
                    type: "number",
                    message: "enter deposit amount",
                    name: "rupee",
                });
                console.log(`Deposit Amount: ${Deposit.rupee}`);
                console.log(`Deposit Amount: ${Deposit.rupee + user.balance}`);
            }
            if(ans.select == "exit"){
                console.log("back home page");
            }
        };
     


const Users = createUser();

AtmMachine(Users)
