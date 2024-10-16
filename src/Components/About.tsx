import { Link } from "react-router-dom"
export default function About({homeRef, aboutRef, handleScroll} : {homeRef: any; aboutRef: any; handleScroll: any}) {
	
	return (
	<div ref={aboutRef} style={{backgroundColor:"cornflowerblue", minHeight:"100vh"}}>
		<h2>About Section</h2>
		<li><Link to="/#" onClick = 
			{() =>{handleScroll(homeRef.current)}}
			>Scroll To Home</Link></li>
		<li>aiya</li>
	</div>
	)
}

