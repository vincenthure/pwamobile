
import Loader    from "react-loader-spinner"

const Spinner = (props) => {
const style = {textAlign: 'center'};

  return (
    <>
      <div style ={style}  className="m-5" >
            <h3>{props.text}</h3>
      </div>
      <div className="spinner">
          <Loader
          type="TailSpin"
          color="#00BFFF"
          height={150}
          width={150}
          //timeout={3000} //3 secs
          />
      </div> 
    </>
  )
}

export default Spinner