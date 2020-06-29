import React from 'react';
import AbstractComponent from './AbstractComponent.js';
import '../css/joystick.css';
import ControlPanel from './ControlPanel.js';
/*
 *  props list :
 *
 *  disabled (default false)
 */
const maxRadius = 40;
class Joystick extends AbstractComponent
{
	constructor(props)
	{
		super(props);
		this.state = {grabbing: false,
			          isActive:true};
		this.translate = this.translate.bind(this);
		this.onJoyStickRef = this.onJoyStickRef.bind(this);
	}
	init()
	{
		this.subscribeEvent('gamepad-state', (gamepadState) =>
		{
			if(this.joystick)
			{
				this.translate(gamepadState.axes[0] * maxRadius, gamepadState.axes[1] * maxRadius, true);
			}
		});
	}
	translate(x, y, notif)
	{
		this.joystick.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
		if(this.props.onDrag && notif)
		{
			let xNorm = x / maxRadius;
			let yNorm = y / -maxRadius;
			if(xNorm > -0.1 && xNorm < 0.1)
			{
				xNorm = 0;
			}
			if(yNorm > -0.1 && yNorm < 0.1)
			{
				yNorm = 0;
			}
			this.props.onDrag(xNorm, yNorm);
		}
	}
	onJoyStickRef(joystick)
	{
		this.joystick = joystick;
		if(this.joystick)
		{
			const processMouseEvent = (e) =>
			{
				e.preventDefault();
				const x = e.clientX;
				const y = e.clientY;
				return {x, y};
			};
			const processTouchEvent = (e) =>
			{
				e.preventDefault();
				const touch = e.touches[0];
				const x = touch.clientX;
				const y = touch.clientY;
				return {x, y};
			};
			const onDragStart = (e) =>
			{
				this.draggingStart = e;
				this.setState({grabbing: true});
			};
			const onDrag = (e) =>
			{
				const dx = e.x - this.draggingStart.x;
				const dy = e.y - this.draggingStart.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if(dist < maxRadius)
				{
					this.translate(dx, dy, true);
				}
				else
				{
					const ratio = maxRadius / dist;
					this.translate(dx * ratio, dy * ratio, true);
				}
			};
			const onDragStop = () =>
			{
				if(this.draggingStart)
				{
					delete this.draggingStart;
					this.translate(0, 0, true);
					this.setState({grabbing: false});
				}
			};
			this.joystick.onmousedown = (e) => onDragStart(processMouseEvent(e));
			this.joystick.ontouchstart = (e) => onDragStart(processTouchEvent(e));
			window.onmousemove = (e) =>
			{
				if(this.draggingStart)
				{
					onDrag(processMouseEvent(e));
				}
			};
			window.ontouchmove = (e) =>
			{
				if(this.draggingStart)
				{
					onDrag(processTouchEvent(e));
				}
			};
			window.onmouseup = onDragStop;
			window.ontouchend = onDragStop;
		}
	}
	handleHide = () =>{
		this.setState({
			isActive: false
		})
	}
	handleShow = ()=>{
		this.setState({
			isActive: false
		})
	}
	render()
	{
		    if(this.state.isActive) { 
            return (
			<svg id='joystick' width='100' height='100' onClick={this.handleHide}>
			     {/* <g fill="none" stroke="black" stroke-width="2">
                   <path stroke-dasharray="5,5" d="M5 20 l215 0" />
	             </g> */}
				 <circle strokeWidth='3' fill='none' stroke="white" cx='50' cy='50' r='5' />
			<path strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' d='M -5,3 L 5,3 7,2 0,-4 -7,2 -5,3 Z M -5,3' transform='translate(50, 14)'/>
			<path strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' d='M -5,3 L 5,3 7,2 0,-4 -7,2 -5,3 Z M -5,3' transform='translate(14, 50) rotate(-90)'/>
			<path strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' d='M -5,3 L 5,3 7,2 0,-4 -7,2 -5,3 Z M -5,3' transform='translate(50, 86) rotate(-180)'/>
			<path strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='10' d='M -5,3 L 5,3 7,2 0,-4 -7,2 -5,3 Z M -5,3' transform='translate(86, 50) rotate(90)'/>
			</svg>);
        } 
		else { 
            return (<ControlPanel/>);
        } 
	}
}
export default Joystick;