import { animated, useSpring } from "@react-spring/web"
import { useState } from "react";
import '../App.css';

const MovingTexts = () => {

//for animations of text across screen - only start @ 50% before it loops. 
const [startAtHalf1, setStartAtHalf1] = useState(true); 
const [startAtHalf2, setStartAtHalf2] = useState(true); 

	const props = useSpring({
		from: { x: -600 },
		to: {x: window.innerWidth+600},
		loop: true,
		config: { 
			duration: 14000,
		 },
	});

	const propsSecondSet = useSpring({
		from: { x: -600, y:-80},
		to: {x: window.innerWidth+600, y:-80},
		loop: true,
		config: { 
			duration: 14000,
			progress: startAtHalf1? 0.5 : 0, 
		 },
		 onRest: () => setStartAtHalf1(false),
	});

	const propsBackwards = useSpring({
		from: {x: window.innerWidth+600},
		to: {x: -800},
		loop: true,
		config: { 
			duration: 14000,
		 },
	});	

	const propsBackwardsSecondSet = useSpring({
		from: {x: window.innerWidth+600, y:-80},
		to: {x: -800, y:-80},
		loop: true,
		config: { 
			duration: 14000,
			progress: startAtHalf2? 0.5 : 0, 
		 },
		 onRest: () => setStartAtHalf2(false),
	});	
  return (
	<> 
		<div className="movingText">
			<animated.div style={props}> 
				<b>DOGS ARE AWESOME</b>
			</animated.div>	
			<animated.div style={propsSecondSet}> 
				<span className="whiteText">DOGS ARE AWESOME</span>
			</animated.div>	

			{/* //OTHER WAY */}
			<animated.div style={propsBackwards}> 
				<b>DOGS ARE AWESOME</b>
			</animated.div>	
			<animated.div style={propsBackwardsSecondSet}> 
				<span className="whiteText">DOGS ARE AWESOME</span>
			</animated.div>	


			<animated.div style={props}> 
				<b>BETTER THAN HUMANS</b>
			</animated.div>	
			<animated.div style={propsSecondSet}> 
				<span className="whiteText">BETTER THAN HUMANS</span>
			</animated.div>	
		</div>
	</>
  )
}

export default MovingTexts
	
	