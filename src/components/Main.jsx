import React     from 'react'
import Button    from 'react-bootstrap/Button'
import Form      from 'react-bootstrap/Form'
import { Offline, Online } from "react-detect-offline"
import speedTest from '../services/speedTest'

const Main = (props) => {

  return (

    <div className="container p-4">
          <Form>
              <Form.Group controlId="formTitle">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control   
                      type="text" 
                      placeholder="Entrer un titre"
                      onChange={(e) => 
                          props.setTitre(e.target.value) } />
              </Form.Group>

          <Form.Group controlId="formCommentaire">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control   
                  as="textarea" 
                  rows={3}
                  onChange={(e) =>  
                      props.setCommentaire(e.target.value) } 
                  />
          </Form.Group>

          <Form.Group>
              <Form.File      
                  id="formPhoto" 
                  label="Selectionner une photo"
                  accept="image/*;capture=camera" 
                  onChange={(e) => props.setPhoto( e.target.files[0] ) } 
                  />
          </Form.Group>
          </Form>
          <p> latitude : {props.lat ? Math.round(props.lat*100)/100 : null} 
              <br></br>
              longitude : {props.lng ? Math.round(props.lng*100)/100 : null}
              <br></br>
              date : {props.date} 
          </p>
          <Online>                          
                <Button 
                        variant="primary" 
                        block
                        size="lg"
                        onClick={props.createMarker} 
                        >
                    Créer un nouveau Marqueur
                </Button>
                <br></br>
                <Button 
                        variant="ligh" 

                        onClick={speedTest} 
                        >
                    Tester la Connexion Internet
                </Button>
          </Online> 
          <Offline>
              <p>
                  Vous ne pouvez pas envoyer vos données car vous n'êtes pas connecté à internet!
              </p>
          </Offline>
                  
      </div> 

  )
}

export default Main