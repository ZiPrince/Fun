import { useSpring, animated, useScroll } from '@react-spring/web';
import { useState } from 'react';
import cloud from './assets/cloud.png';
import './App.css';
export default function App() {

//api controls animations~ many methods, including start, stop, set, etc
	const [springs, api] = useSpring(() => ({
    	from: { x: 100, y: 90 },
	}))

	const handleClick = () => { 
		api.start({
			to: {x:300, y: 100}, 
		})
	}

	//!lerp function: see notes in lerp
	const lerp = (x: number, y: number, a:number) => 
		(x * (1 - a) + y * a);
	// a: % scrolled. x: top of page:0, y: bottom 

	//!for clamping to keep scrollY within 0.5-1 only

	const clamp = (min:number, max:number, value:number) => {
		if (value<min) {
			value= min; 
		} else if(value > max) {
			value=max;
		}
		return value;
	}


	//! for scrollPosition

	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollYPercent, setScrollYPercent] = useState(0);

	useScroll({
		onChange: ({ value: scrollY }) => {
				setScrollYPercent(scrollY.scrollYProgress);
				setScrollPosition(scrollY.scrollY)	
		}
	});

	//! scrollPosition ends!
	
	//!returns the SCROLL PIXEL RANGE to RANGE BETWEEN 0 to 1 for CLAMPING later

	const movement = (start: number, finish: number) => { 

		const convertStartingPixelPositiontoZeroPercent = scrollPosition-start; 
		const convertEndingPixelPositiontoHundredPercent = finish-start; 
		return convertStartingPixelPositiontoZeroPercent/convertEndingPixelPositiontoHundredPercent;
	}

	const moving = clamp(0, 1, movement(200, 600));
	//!returns a % between 0 and 1

	//~ easing
	function easeInOutCubic(x: number): number {
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
		}

	

	return (
		<>
		<div className="containerFixed">
			Scroll position: {scrollPosition} <br/>
			Scroll %: {scrollYPercent} <br/>
			Moving % but clamped: {moving} <br/>
		</div>
		<div className="title">
			Learning React Spring~
		</div>
		{/* //~ click on cloud to play animation no loop only once */}
		<div className="container">
			<div className="description">
				This cloud: Basic useSpring hook where only elements in animated.div moves due to argument of api.start...
			</div>
			<animated.div
				onClick={handleClick}
				style={{
				width: 280,
				height: 280,
				borderRadius: 8,
				...springs
			}}>
			<div>
				<img src={cloud} /><br/>
				Click me!
			</div>
			</animated.div>
		</div>
{/* //~ cat moving after 50% scroll */}
		<div className="container"> 
			<animated.div> 
				<img style={{
					width: "200px", 
					opacity: 1
				}} 
src="https://img.freepik.com/premium-psd/portrait-british-shorthair-cat-isolated-transparent-background-png_1075135-347.jpg"/>
			</animated.div> 
		</div>

		<div className="container">
			<div className="description">
				Fancier stuff... using useScroll() inside an onChange function to get scroll position and percentage, and then using that number in a lerp function to animate my cat~
			</div>
			<animated.div> 
				<img style={{
					left:lerp(window.screen.width-300, window.screen.width-100, moving),
					top:lerp(200, 300, easeInOutCubic(moving)),
					position: "fixed",
				}} src="https://www.petplan.co.uk/images/breeds/british-shorthair.png" />
			</animated.div> 
		</div>



		<div className="container"> 
			I had some trouble figuring out how to destruct the scroll position from the useScroll function....
			After logging the values, I noticed that ScrollY is an object that contains the following:<br/><br/>
			<i>ScrollX, scrollY, ScrollXProgress, and ScrollYProgress. </i><br/><br/>
			ScrollY was what I needed - the value in pixels of the position on the page.ScrollYPercent was helpful to, since I would use it in the lerp function for 
			the value of 'a' for my animation later. 

		</div>

	

	

		</>
	)
}


