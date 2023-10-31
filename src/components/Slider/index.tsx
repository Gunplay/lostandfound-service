import { Button, Carousel } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './Slider.css'

export const Slider: React.FC = () => (
	<div style={{ backgroundColor: 'white' }}>
		<Carousel
			autoplay
			className='SliderStyle'
			dotPosition='bottom'
			dots
			vertical
			speed={20}
		>
			<div>
				<h4 className='ContentStyle'>ARE YOU LOST OR FOUND YOURSELF THING?</h4>
			</div>
			<div>
				<h3 className='ContentStyle'>
					DON'T WORRY! YOU CAN FILL OUR FORM WITH SEVERAL STEPS
				</h3>
			</div>
			<div>
				<h3 className='ContentStyle'>WE CAN HELP YOU!</h3>
			</div>
			<div>
				<h4 className='ContentStyle'>PRESS ON FORM!</h4>
			</div>
		</Carousel>
		<div>
			<Button
				type='primary'
				size='large'
				ghost
				style={{ marginBottom: '15px' }}
			>
				{' '}
				<Link to='/formlostandfound'>FILL IN FORM </Link>
			</Button>
		</div>
	</div>
)
