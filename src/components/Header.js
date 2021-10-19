import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
function Header() {
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem("user-info"));
    // console.log(user)
    function Logout() {
        localStorage.clear();
        history.push('/register')
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">E-Comm</Navbar.Brand>
                <Nav className="mr-auto navbar-wrapper">
                    {
                        localStorage.getItem('user-info') ?
                            <>
                                <Link to="/add" >Add Product</Link>
                                {/* <Link to="/update" >Update product</Link> */}
                                <Link to="/list" >List Product</Link>
                                <Link to="/search" >Search Product</Link>
                            </>
                            :
                            <>
                                <Link to="/login" >Login</Link>
                                <Link to="/register" >Register</Link>
                            </>
                    }
                </Nav>
                {
                    localStorage.getItem('user-info') ?
                        <Nav>
                            <NavDropdown title={user && user.name}>
                                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                }
            </Navbar>
        </div>
    )
}

export default Header;