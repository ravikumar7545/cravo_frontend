
const ErrorContainer = ({ error }) => {
  return (
    <div style={{
        display:"grid",
        placeItems:'center',
        height:"100vh",
        fontFamily: 'Oswald',
        fontSize:'2rem'
    }}>Oops! {error.message}
    </div>
  )
}

export default ErrorContainer