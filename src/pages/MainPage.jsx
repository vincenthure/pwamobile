import React, { Component } from 'react'
import { post }  from 'axios'
import { toast } from 'react-toastify'
import Resizer   from "react-image-file-resizer"

import AuthContext from '../contexts/AuthContext'
import Spinner     from '../components/Spinner'
import Main        from '../components/Main'
import More        from '../components/More'
import Login       from '../components/Login'

import { URL_UPLOAD, API_MARKERS, API_WAYPOINTS } from "../services/config"

const MAIN  = 1
const MORE  = 2
const LOGIN = 3

const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  };

const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        800,
        "JPEG",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

export default class MainPage extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)

        this.setTitre         = this.setTitre.bind(this)
        this.setCommentaire   = this.setCommentaire.bind(this)
        this.setPhoto         = this.setPhoto.bind(this)
        this.setGPS           = this.setGPS.bind(this)

        this.createMarker     = this.createMarker.bind(this)
        this.sendMarker       = this.sendMarker.bind(this)
        this.sendPhoto        = this.sendPhoto.bind(this)
        this.uploadPhoto      = this.uploadPhoto.bind(this)
        this.retunToMain      = this.retunToMain.bind(this)

        this.state = { 
            title   : "nouveau",
            text    : "commentaire",
            photo   : false,
            page    : MAIN,
            spinner : false,
            lat     : null,
            lng     : null,
            date    : null
          }
        }

    setTitre(title)
        {
        this.setState({ title : title })
        }

    setCommentaire(text)
        {
        this.setState({ text : text })
        }

    setPhoto(file)
        {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ')

        this.setState({ file :file,
                        date : date })

        if(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(this.setGPS)
        }

    setGPS(pos)
        {
        this.setState(
            {
            lat   : pos.coords.latitude,
            lng   : pos.coords.longitude,
            photo : true
            }) 
        }

    createMarker()
        {
        console.warn("createMarker")

        if(this.state.lat===null)
            { toast.error("position inconnu!!!"); return }

        if(!this.state.photo) 
            { toast.error( "Vous devez choisir une photo!"); return  }

        if(this.context.isAuthenticated)        this.sendMarker()
        else                                    this.setState({ page : LOGIN })
        }

    sendMarker()
        {
        this.setState({ spinner :true })

        // upload route to server
        let newWaypoint =   
                {
                lat : this.state.lat,
                lng : this.state.lng
                }

        post(API_WAYPOINTS , newWaypoint).then(resp =>
                {
                console.warn("waypoint saved")
                })

        // upload Marker to server
        let newMarker =  
                { 
                lat   : this.state.lat,
                lng   : this.state.lng,
                title : this.state.title,
                text  : this.state.text,
                date  : this.state.date,
                type  : 1
                }

        post(API_MARKERS,newMarker)
                .then((resp) =>
                        {
                        // upload photo to server
                        console.warn("Marker saved")
                        this.setState({ id : resp.data.id })
                        this.uploadPhoto( this.state.file, resp.data.id)
                        },
                    (error) =>
                        {
                        toast.error( "Une erreur est survenu")
                        this.setState({ spinner : false })
                        })
        }

    sendPhoto(file)
        {
        this.setState( {  spinner : true })
        this.uploadPhoto(file, this.state.id)   
        }
    
    uploadPhoto(file,id)
        {
        resizeFile(file)
        .then( image =>
            {
            const newFile = dataURIToBlob(image)
            const formData = new FormData();
            formData.append('file', newFile, id)
            post( URL_UPLOAD, formData,  { headers: {'content-type': 'multipart/form-data'} })  
                .then(  (response)=>
                            {
                            console.warn("Photo transfered")
                            this.setState(
                                    { 
                                    page    : MORE,
                                    spinner : false,
                                    photo   : false,
                                    title   : "nouveau",
                                    text    : "commentaire" ,
                                    date : null,
                                    lat : null,
                                    lng : null
                                    })    
                            },
                        (error)=>
                            {
                            toast.error( "Une erreur est survenu")
                            this.setState({ photo   : false,
                                            spinner : false })    
                            })
                        }
            )
        }

    retunToMain()
        {
        this.setState({ page : MAIN })
        }

    render()
        {
        if(this.state.spinner)   
            return( <Spinner text={"Transfert en cours..."}/>  )
        else  
            switch(this.state.page) 
                {
                case MAIN : return( <Main 
                                        createMarker   = {this.createMarker}
                                        setPhoto       = {this.setPhoto}
                                        setTitre       = {this.setTitre}
                                        setCommentaire = {this.setCommentaire}
                                        lat            = {this.state.lat}
                                        lng            = {this.state.lng}
                                        date           = {this.state.date}
                                        /> )               
                
                case MORE : return( <More
                                        retunToMain  = {this.retunToMain}
                                        sendPhoto    = {this.sendPhoto}
                                        /> )

                case LOGIN : return( <Login 
                                        callback = {this.sendMarker}
                                        /> )
                
                default :   return( <h1>Erreur ...</h1>)
                    
                }
        }
    }