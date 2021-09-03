const input = document.getElementById("infix");
let output = document.getElementById("output");
let prefix_button = document.querySelector(".prefix_button");
let postfix_button = document.querySelector(".postfix_button");
let error = document.querySelector(".err");
let error_div = document.querySelector(".error");
let table = document.getElementById("table");
let tbody = document.getElementById("tbody");
let thead = document.getElementById("thead");
let choice = document.querySelector(".choice");

let active = 1;

input.onkeypress = function(e){

    if(e.keyCode == 13){
        if(active == 1){
            postfix_button.click();
        }
        else{
            prefix_button.click();
        }
    }

}

const check = () => {
    if(input.value == ""){
        error.innerHTML = `Infix is Empty ! `;
        error_div.style.display="block";
    }
    else{

        let digit = 0;
        let val = input.value;
        for(let i = 0;i<=val.length;i++){
            if(val[i]>='0' && val[i]<='9' ){
                digit++;
            }
        }

        // alert(digit);
        if(digit>0){
            error.innerHTML = "Digits Are Not Allowed ! ";
            error_div.style.display = "block";
        }
        else{
            error_div.style.display = "none";
            return 1;
        }

    }
}

prefix_button.onclick = function(){

   
    active = 2;
    choice.innerHTML = "PreFix";
    prefix_button.classList.add("bg-warning");
    postfix_button.classList.remove("bg-warning");
    // postfix_button.classList.add("bg-white");
    let isDigit = check();
    
    if(isDigit == 1){
        
        table.style.visibility = "visible";
        tbody.innerHTML = "";
        thead.innerHTML = `
            <tr>
                <th>Character Scanned From Infix</th>
                <th>Stack</th>
                <th>PreFix</th>
            </tr>
        `;
       

        let t = -1;
        let j = 0;

        let s = new Array();
        let  p = new Array();
        let l = Array.from(input.value);
     
        function pop(){
            let ch;
            ch = s[t];
            t--;
            return ch;
        }
        function push(value){
            t++;
            s[t] = value;
        }
        for(let i = l.length-1;i>=0;i--){
            let c = l[i];
            switch(c){
                case ' ':

                    continue;
                    break;

                case '(':
                   
                    while(s[t] != ')'){
                        p[j] = pop();
                        j++;
                    }
                    s = s.slice(0,t);
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;

                    t--;
                    break;

                case ')':
                    
                    push(')');

                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;
                    break;

                case '^':
                   
                    push(c);
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;
                    break;

                case '*':
                case '/':
                    
                    while(s[t] == '^'){
                        p[j] = pop();
                        j++;
                    }
                    // s.pop();
                    push(c);
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;
                    break;

                case '+':
                case '-':

                    while(s[t] == '^' || s[t] == '*' || s[t] == '/'){
                        p[j] = pop();
                        j++;
                        
                    }
                    push(c);
                    s = s.slice(0,t+1);
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;
                    break;
                
                default:
                    
                    p[j] = c;
                    j++;
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `; 
            }   
        }

        while(t!=-1){
            p[j] = pop();
            j++;
        }

        tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>Beginning</td>
                        <td>Empty</td>
                        <td>${p.join("")}</td>
                    </tr>
        `;

        p.reverse();
        output.innerHTML =  p.join("");

    }

}

postfix_button.onclick = function(){

    
    active = 1;
    choice.innerHTML = "PostFix";
    postfix_button.classList.add("bg-warning");
    prefix_button.classList.remove("bg-warning");

    let isDigit = check();
    if(isDigit==1){

        table.style.visibility = "visible";
        tbody.innerHTML = "";
         thead.innerHTML = `
        <tr>
            <th>Character Scanned From Infix</th>
            <th>Stack</th>
            <th>PostFix</th>
        </tr>
        `;
        
        let t = -1;
        let j = 0;

        let s = new Array();
        let  p = new Array();
        let l = Array.from(input.value);
        // alert(l);
        // alert(l.length);

        function pop(){
            let ch;
            ch = s[t];
            t--;
            return ch;
        }
        function push(value){
            t++;
            s[t] = value;
        }
        for(let i = 0;i<l.length;i++){
            let c = l[i];
            switch(c){
                case ' ':
                    continue;
                    break;
                case ')':
                   
                    while(s[t] != '('){
                        p[j] = pop();
                        j++;
                    }
                    // t--;
                    
                    s = s.slice(0,t);
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;

                    t--;
                    
                    break;

                case '(':
                    
               
                    push('(');

                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                    `;

                    break;
                case '^':
                   
                    while(s[t] == '^'){
                        p[j] = pop();
                        j++;
                    }
                    
                    push(c);
                    
                    tbody.innerHTML = tbody.innerHTML +  `
                        <tr>
                            <td>${c}</td>
                            <td>${s.join("")}</td>
                            <td>${p.join("")}</td>
                        </tr>
                    `;

                    
                   
                    break;
                case '*':
                case '/':
                    
                    while(s[t] == '^' || s[t] == '*' || s[t] == '/'){
                        p[j] = pop();
                        j++;
                    }
                    push(c);
                    s = s.slice(0,t+1);
                    tbody.innerHTML = tbody.innerHTML +  `
                    <tr>
                        <td>${c}</td>
                        <td>${s.join("")}</td>
                        <td>${p.join("")}</td>
                    </tr>
                `;

                   
                    break;
                case '+':
                case '-':
                    

                    while(s[t] == '^' || s[t] == '*' || s[t] == '/' || s[t] == '+' || s[t] == '-'){
                        p[j] = pop();
                        j++;
                    }
                    push(c);

                    tbody.innerHTML = tbody.innerHTML +  `
                        <tr>
                            <td>${c}</td>
                            <td>${s.join("")}</td>
                            <td>${p.join("")}</td>
                        </tr>
                    `;
                   
                    break;
                
                default:
                    
                    p[j] = c;
                    j++;

                    tbody.innerHTML = tbody.innerHTML +  `
                        <tr>
                            <td>${c}</td>
                            <td>${s.join("")}</td>
                            <td>${p.join("")}</td>
                        </tr>
                    `;
                    
            }

            
        }
    
        while(t!=-1){
            p[j] = pop();
            j++;
        }

        tbody.innerHTML = tbody.innerHTML +  `
        <tr>
            <td>End OF Expression </td>
            <td>Empty</td>
            <td>${p.join("")}</td>
        </tr>
        `;
        

        output.innerHTML =  p.join("");
    }

}