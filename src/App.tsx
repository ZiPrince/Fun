import { useSpring, animated, useScroll } from '@react-spring/web';
import { useState } from 'react';
import MovingTexts from './Components/MovingTexts';
import MovingClouds from './Components/MovingClouds';
import './App.css';
export default function App() {

	//! for storing scrollPosition (scrollY) from onChange function:

	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollYPercent, setScrollYPercent] = useState(0);

	useScroll({
		onChange: ({ value: scrollY }) => {
				setScrollYPercent(scrollY.scrollYProgress);
				setScrollPosition(scrollY.scrollY);
		}
	});

	const clamp0To1 = (value:number) => {
		if (value<0) {
			value= 0; 
		} else if(value > 1) {
			value=1;
		}
		return value;
	}

	// i want my number to start changing when scrollposition = start, and end when scrollp = finish. 
	// converting that range -> PERCENT.  
	// clamp so it does not go into negative. 

	//spits out % between when obj starts and ends moving 
	const ScrollPosToPerc = (start: number, finish: number) => { 

		const startScrollPostoZeroPerc = scrollPosition-start; 
		const endingScrollPostoHundredPercent = finish-start; 
		return clamp0To1(startScrollPostoZeroPerc/endingScrollPostoHundredPercent);
	}


	const lerp = (x: number, y: number, a:number) => 
		(x * (1 - a) + y * a);

	// //~ easing
	// function easeInOutCubic(x: number): number {
	// 	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	// 	}

//: lerp: takes a range, and a % of the range, and spits out the number within that range. 
// ie: 2,10,0.5 --> 4 
// that % will move between 0 - 1 in order to move through the range 
// useful for animations in CSS , can tie the % to scrollposition 
	

	const valueFromScroll = (startPixel: number, endPixel: number, startScrollPos: number, endScrollPos:number) => {
		const percent = ScrollPosToPerc(startScrollPos,endScrollPos);
		return lerp (startPixel, endPixel, percent );
	}

	return (<>

		<div className="dogPicContainer">
			<img style={{
				width: valueFromScroll(window.innerWidth, window.innerWidth/1.4, 0, 500), 
				height:valueFromScroll(1100, 560, 0, 500), 
				top:valueFromScroll(0,210, 0, 500)+valueFromScroll(0, -1000, 400, 1300), 
				position:"fixed",
				objectFit:"cover",
				zIndex:"-1",
				opacity: 0.97,
			}}
				src="https://img.freepik.com/premium-photo/happy-puppies-playing-together_863013-105319.jpg"/>
		</div>

		<div className="statsContainerFixed">
			Scroll position: {scrollPosition} <br/>
			Scroll %: {scrollYPercent} <br/>
		</div>

		<div className="mainTitle">
			Puppers?!
		</div>

		<MovingTexts />
	
		<div className="dogsBodyContainer">
			<div className="dogText">
				Tiny bundles of joy - <br/> sprinkling happiness wherever they go!
			</div>
			<div className="labImgContainer">
				<img style={{
					transform: `scale(${valueFromScroll(0.99, 1.5, 1100, 2300)})`,
					zIndex:"0",
					position:"relative",
				}} 
					src="https://i.pinimg.com/736x/b7/53/15/b75315b5968b6e9c8375713dfe66b680.jpg" /> 
			</div>
			<div>
				<img className="puppy2" style={{
					top: valueFromScroll(-200, -500, 1600, 2600),
				}}
					src="https://bestfriendspetcare.com/wp-content/uploads/2020/06/puppy-play-group-beagle.jpg"/>
			</div>
			<div className="dogText2">
			🐕 I wish my boyfriend would adopt a puppy with me~ <br/><br/>
				Some pls hire me as a wfh Frontend Dev so I can walk my dog 🐕
			</div>
			<div> 
				<img className="puppy3" style={{
					top:valueFromScroll(-400, -750, 1800, 2800),
				}} src="https://i.pinimg.com/736x/b7/53/15/b75315b5968b6e9c8375713dfe66b680.jpg" /> 
			</div>
		</div>

		<div className="clouds">
				<MovingClouds />
			</div>

	


		<div className="catContainer">
				<img style={{
					left: valueFromScroll(window.innerWidth, window.innerWidth-140, 1300, 1700),
					top: valueFromScroll(1000, -60, 1300, 1700),
					opacity: valueFromScroll(0, 1, 1300, 1500),
					position: "fixed",
				}} src="https://www.petplan.co.uk/images/breeds/british-shorthair.png" />
		</div>


		<div className='title' style={{marginLeft: valueFromScroll(-300, window.innerWidth-900, 900, 1400)}}>
			Some troubleshooting for this site...
		</div>
		<div className="textContainer"> 
			<div className="col"  style={{
				marginLeft: valueFromScroll(-200, window.innerWidth/26, 1300, 1400),
				opacity: valueFromScroll(0,1, 2200,2500)}}>
				I had some trouble figuring out how to destruct the scroll position from the useScroll function....
				After logging the values, I noticed that ScrollY is an object that contains the following:
				<i>ScrollX, scrollY, ScrollXProgress, and ScrollYProgress. </i>
			</div>
			<div className="col" style={{opacity: valueFromScroll(0,1, 1300,1400)}}>
				ScrollY was what I needed - the value in pixels of the position on the page.ScrollYPercent was helpful, as I needed it 
				for the % in lerp function to be used in my CSS for animations~ 
			</div>
			<div className="col" style={{opacity: valueFromScroll(0,1, 1300,1360)}}>
				The lerp function, really just spits out a number between a range, based on the percentage. It's so useful for animations! 
				You can tie it to your scrollbar position to make your objects or texts move or fade in(opacity 0-1). 
			</div>
		
		</div>

		<div className="description">
			Let's work together~
		</div>
	</>)
}
