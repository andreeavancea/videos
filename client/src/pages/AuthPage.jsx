import {Button, Card, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Context from "../Context";

function AuthPage() {
    const {isLoggedIn, setIsLoggedIn} = useContext(Context);

    const [isLogin, setIsLogin] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [firstNameRegister, setFirstNameRegister] = useState('')
    const [lastNameRegister, setLastNameRegister] = useState('')
    const navigate = useNavigate();

    function executeRegister() {
        axios.post(`/api/register`, {
            firstName: firstNameRegister,
            lastName: lastNameRegister,
            email: emailRegister,
            password: passwordRegister
        })
            .then(res => {
                toast.success(res.data.message)
                setIsLogin(true)
            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )


    }

    function executeLogin() {
        axios.post(`/api/login`, {

            email,
            password
        })
            .then(res => {
                toast.success(`Welcome ${res.data.firstName} ${res.data.lastName}`)
                setIsLoggedIn(true)
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate("/");

            })
            .catch(e => toast.error(e.response.data.message))


    }

    return (
        <div className="Login w-100 "
             style={{display: 'flex', alignItems: "center", justifyContent: 'center', height: "100vh"}}>
            {isLogin ? <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email}
                                              onChange={(e) => setEmail(e.target.value)}/>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="primary" type="button" onClick={() => executeLogin()}>
                                    Login
                                </Button>
                                <Button variant="secondary" type="button" onClick={() => setIsLogin(false)}>
                                    Register
                                </Button>
                            </div>
                        </Form>

                    </Card.Body>
                </Card> :
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Enter First Name" value={firstNameRegister}
                                              onChange={(e) => setFirstNameRegister(e.target.value)}/>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" value={lastNameRegister}
                                              onChange={(e) => setLastNameRegister(e.target.value)}/>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmailRegister">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={emailRegister}
                                              onChange={(e) => setEmailRegister(e.target.value)}/>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={passwordRegister}
                                              onChange={(e) => setPasswordRegister(e.target.value)}/>
                            </Form.Group>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="primary" type="button" onClick={() => executeRegister()}>
                                    Register
                                </Button>
                                <Button variant="secondary" onClick={() => setIsLogin(true)}>
                                    Back
                                </Button>
                            </div>
                        </Form>

                    </Card.Body>
                </Card>}
        </div>);
}

export default AuthPage;
