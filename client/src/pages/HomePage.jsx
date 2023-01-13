import {Button, Card, Container, Form, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import {useContext, useState} from "react";
import Context from "../Context";
import {useNavigate} from "react-router-dom";
import VideoTable from "../components/VideoTable";
import {Star} from "react-bootstrap-icons";

function HomePage() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [section, setSection] = useState('profile')


    const {isLoggedIn, setIsLoggedIn} = useContext(Context);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [rating, setRating] = useState(1)
    const [url, setUrl] = useState('')

    const [videoAdded, setVideoAdded] = useState(false)
    const [showProfile, setShowProfile] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);

    const handleCloseVideo = () => setShowVideo(false);
    const handleShowVideo = () => setShowVideo(true);

    function executeAddVideo() {
        setVideoAdded(false)
        axios.post(`/api/videos`, {
            title,
            author,
            url, rating
        })
            .then(res => {
                toast.success(res.data.message)
                handleCloseVideo()
                setRating(1)
                setTitle('')
                setAuthor('')
                setUrl('')
                setVideoAdded(true)
            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )
    }


    function executeEditProfile() {
        axios.put(`/api/user`, {
            firstName,
            lastName,
            email
        })
            .then(res => {
                toast.success(res.data.message)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                handleCloseProfile()

            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )
    }

    function executeDeleteProfile() {
        axios.delete(`/api/user`,)
            .then(res => {
                toast.success(res.data.message)
                localStorage.removeItem('user')
                setIsLoggedIn(false)
                handleCloseProfile()
                navigate('/login')

            })
            .catch(e => e.response.data.errors.forEach((error) => toast.error(error))
            )
    }

    function logout() {
        axios.get(`/api/logout`,)
            .then(res => {
                toast.success(res.data.message)
                setIsLoggedIn(false)
                localStorage.removeItem('user')
                navigate("/");
            })
            .catch(e => toast.error(e.response.data.message))
    }


    return (
        <div className="Home">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Favorite Video Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" onClick={() => handleShowVideo()}>Add video</Nav.Link>
                            <Nav.Link href="#" onClick={() => handleShowProfile()}>Profile</Nav.Link>
                            <Nav.Link href="#" onClick={() => logout()}>Logout</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <VideoTable videoAdded={videoAdded}/>


            <Modal show={showProfile} onHide={handleCloseProfile}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter First Name" value={firstName}
                                          onChange={(e) => setFirstName(e.target.value)}/>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" value={lastName}
                                          onChange={(e) => setLastName(e.target.value)}/>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmailRegister">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                          onChange={(e) => setEmail(e.target.value)} value={email}
                            />

                        </Form.Group>


                        <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        </div>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" onClick={() => executeEditProfile()}>
                        Save changes
                    </Button>
                    <Button variant="danger" type='button' onClick={() => executeDeleteProfile()}>
                        Delete profile
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showVideo} onHide={handleCloseVideo}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new video</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter Title" value={title}
                                          onChange={(e) => setTitle(e.target.value)}/>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter Author" value={author}
                                          onChange={(e) => setAuthor(e.target.value)}/>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="url">
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="url" placeholder="Enter URL"
                                          onChange={(e) => setUrl(e.target.value)} value={url}
                            />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rating">
                            <Form.Label>Rating ({rating}) {[...Array(rating).keys()].map((item) => <Star
                                key={item}/>)}</Form.Label>
                            <Form.Range min={1} max={10} placeholder="Enter Rating" value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}/>


                        </Form.Group>


                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" onClick={() => executeAddVideo()}>
                        Add video
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default HomePage;
