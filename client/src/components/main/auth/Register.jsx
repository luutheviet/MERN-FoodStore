import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
    })

    const onChange=e=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }

    const registerSubmit=async e=>{
        e.preventDefault();
        try {
            await axios.post('user/register',{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    function Validator(options) {
        const formElament = document.querySelector(options.form)
        let selectorRules = {};
    
        function validate(inputElement, rule) {
            const formMessage = inputElement.parentElement.querySelector(options.formMessage)
            const label = inputElement.parentElement.querySelector(options.label)
            let message;
            let rules = selectorRules[rule.selector];

            for(let i=0;i<rules.length;i++){
                message=rules[i](inputElement.value)
                if(message) break;
            }

            if (message === undefined) {
                formMessage.innerText = ""
                inputElement.classList.remove("invalid")
                inputElement.classList.add("valid")
                label.classList.remove("label-invalid")
                label.classList.add("label-valid")
            } else {
                formMessage.innerText = message
                inputElement.classList.add("invalid")
                inputElement.classList.remove("valid")
                label.classList.remove("label-valid")
                label.classList.add("label-invalid")
            }
            return !message;
        }
        if (formElament) {
            options.rules.forEach(rule => {
                if(Array.isArray(selectorRules[rule.selector])){
                    selectorRules[rule.selector].push(rule.test)
                }
                else{
                    selectorRules[rule.selector]=[rule.test]
                }
                const inputElement = formElament.querySelector(rule.selector)
                if (inputElement) {
                    inputElement.onblur = () => {
                        validate(inputElement, rule)
                    }
                    inputElement.oninput = () => {
                        const formMessage = inputElement.parentElement.querySelector(options.formMessage)
                        const label = inputElement.parentElement.querySelector(options.label)
                        formMessage.innerText = ""
                        inputElement.classList.remove("invalid")
                        inputElement.classList.add("valid")
                        label.classList.remove("label-invalid")
                        label.classList.add("label-valid")
                    }
                }
            })

        }
    }
    
    Validator.isRequired = function(selector) {
        return {
            selector,
            test: function(value) {
                return value.trim() ? undefined : "Vui l??ng nh???p tr?????ng n??y!"
            }
        }
    }
    
    Validator.isEmail = function(selector) {
        return {
            selector,
            test: function(value) {
                const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(value) ? undefined : "Tr?????ng n??y ph???i l?? email!"
            }
        }
    }
    
    Validator.isPassword = function(selector) {
        return {
            selector,
            test: function(value) {
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                const regexOneDigit = /(?=.*\d)/
                const oneLowerCase = /(?=.*[a-z])/
                const oneUpperCase = /(?=.*[A-Z])/
                const minCharater = /[a-zA-Z0-9]{8,}/;
                if (!regexOneDigit.test(value)) return "M???t kh???u ph???i c?? ??t nh???t 1 s???!";
                if (!oneLowerCase.test(value)) return "M???t kh???u ph???i c?? ??t nh???t 1 ch??? th?????ng!";
                if (!oneUpperCase.test(value)) return "M???t kh???u ph???i c?? ??t nh???t 1 ch??? hoa!";
                if (!minCharater.test(value)) return "M???t kh???u ph???i l???n h??n 8 k?? t???!";
                return regex.test(value) ? undefined : "M???t kh???u kh??ng h???p l???!"
            }
        }
    }

    Validator.isConfirmed = function (selector, getConfirmValue, message) {
        return {
            selector: selector,
            test: function (value) {
                return value === getConfirmValue() ? undefined : message || 'Gi?? tr??? nh???p v??o kh??ng ch??nh x??c';
            }
        }
    }
    
    Validator({
        formMessage: ".form-message",
        label:".lable-input",
        form: "#form-1",
        rules: [
            Validator.isRequired('#name'),
            Validator.isRequired('#email'),
            Validator.isEmail("#email"),
            Validator.isRequired('#password'),
            Validator.isPassword('#password'),
            Validator.isPassword('#password_confirmation'),
            Validator.isConfirmed('#password_confirmation',function(){
                return document.querySelector('#form-1 #password').value;
            }),
        ]
    })

    return (
        <div className="login">
            <h2>????ng k??</h2>
            <form id="form-1" onSubmit={registerSubmit}>
                <div className="input-field">
                    <input id="name" type="text" required placeholder=" " value={user.name} name="name" onChange={onChange}/>
                    <label className="lable-input" htmlFor="name">H??? v?? t??n</label>
                    <span className="form-message"></span>
                </div>
                <div className="input-field">
                    <input id="email" type="email" required placeholder=" " value={user.email} name="email" onChange={onChange}/>
                    <label className="lable-input" htmlFor="email">Email</label>
                    <span className="form-message"></span>
                </div>
                <div className="input-field">
                    <input id="password" type="password" required placeholder=" " name="password"/>
                    <label className="lable-input" htmlFor="password">M???t kh???u</label>
                    <span className="form-message"></span>
                </div>
                <div className="input-field">
                    <input id="password_confirmation" type="password" required placeholder=" " value={user.password} name="password" onChange={onChange}/>
                    <label className="lable-input" htmlFor="password">X??c nh???n m???t kh???u</label>
                    <span className="form-message"></span>
                </div>
                <div className="btn-login-register">
                    <button type="submit">????ng k??</button>
                    <Link to="/login">????ng nh???p</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;