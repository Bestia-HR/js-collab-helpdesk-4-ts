type Ticket = 
{
    id:string,
    temat:string,
    client:string,
    status:"open" | "inWork" | "solved",
    priority:"hight" | "medium" | "low",
    actions:boolean,
    
}

