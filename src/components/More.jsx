import React     from 'react'
import Button    from 'react-bootstrap/Button'
import Form      from 'react-bootstrap/Form'
import { Offline, Online } from "react-detect-offline"

const More = (props) => {

  return (

        <div className="container p-4">
            <br></br>
            <Online>
                    <h4>
                        Envoyer une nouvelle photo pour ce marqueur
                    </h4>
            </Online>
            <Offline>
                    <p>
                        Vous ne pouvez pas envoyer une nouvelle photo car vous n'êtes pas connecté à internet!
                    </p>
          </Offline>
            <br></br>
            <br></br>
            <Form>
            <Form.Group>
                <Form.File      
                    id="formPhoto" 
                    accept="image/*;capture=camera" 
                    onChange={(e) =>  props.sendPhoto(e.target.files[0]) } />
            </Form.Group>
            </Form>
            
            <br></br>
            <br></br>
            <Button 
                    variant="primary" 
                    block
                    size="lg"
                    onClick={props.retunToMain} >
            terminer
            </Button>
        </div>

  )
}

export default More