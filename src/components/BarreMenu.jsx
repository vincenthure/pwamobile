import React , { Component } from 'react'
import  { Navbar, Nav  } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'



export default class BarreMenu extends Component {

  static contextType = AuthContext


  render()
      {
      return(
            <Navbar bg="dark" variant="dark">

                  <Navbar.Brand >Odysséea</Navbar.Brand>
                  <Nav className="mr-auto">
                        <Nav.Link href="/">Reset</Nav.Link>
                  </Nav>
                  <Navbar.Text>
                          {this.context.isAuthenticated ? "Connecté" : "" }
                  </Navbar.Text>

            </Navbar>
            )
  }
}
