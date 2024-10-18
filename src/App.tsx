import { useSpring, animated } from '@react-spring/web';
import cloud from './assets/cloud.png';
export default function App() {

//api controls animations~ many methods, including start, stop, set, etc
	const [springs, api] = useSpring(() => ({
    	from: { x: 600, y: 200 },
	}))

	const handleClick = () => { 
		api.start({
			from: {x: 600, y: 200},
			to: {x:800, y: 100}, 
		})
	}

	return (
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
		
	)
}
