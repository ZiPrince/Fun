import { animated, useSpring } from "@react-spring/web"
import { useState } from "react";
import '../App.css';

const MovingClouds = () => {

//for animations of text across screen - only start @ 50% before it loops. 
const [startAtHalf1, setStartAtHalf1] = useState(true); 
const [startAtHalf2, setStartAtHalf2] = useState(true); 

	const cloud1 = useSpring({
		from: {x: window.innerWidth+500},
		to: {x: -600},
		loop: true,
		config: { 
			duration: 14000,
		 },
	});	

	const cloud2 = useSpring({
		from: {x: window.innerWidth+500, y:-80},
		to: {x: -600, y:-80},
		loop: true,
		config: { 
			duration: 14000,
			progress: startAtHalf2? 0.5 : 0, 
		 },
		 onRest: () => setStartAtHalf2(false),
	});	
  return (
	<> 
		<div className="movingClouds">
			<animated.div style={cloud1}> 
				<img className="cloudpic" src="https://cdn-icons-png.flaticon.com/512/4188/4188714.png"/>
			</animated.div>	
			<animated.div style={cloud2}> 
				<img className="cloudpic" src="https://cdn-icons-png.flaticon.com/512/4188/4188714.png"/>
			</animated.div>	

		</div>
	</>
  )
}

export default MovingClouds
	
	