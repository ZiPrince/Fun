import { Link } from "react-router-dom";
function Home({homeRef, aboutRef, handleScroll} : {homeRef: any, handleScroll:any, aboutRef: any}) {
	return (
	  <div ref={homeRef}>
		<div style={{minHeight:"100vh"}}>Trying out useRef~</div>
		<img src= "https://imgflip.com/s/meme/Doge.jpg"></img>
		<div style={{minHeight:"100vh"}}> oms</div>
		{/* link to about - should be scrollable - */}
		<li><Link to="/#about" onClick={() => {
			handleScroll(aboutRef.current);
			}}>About</Link></li>
	  </div>
	);
  }

export default Home

// onClick={() => {
// 	handleScroll(aboutRef.current);
//   }}