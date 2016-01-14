import React from 'react';
import store from '../store';
import {Carousel, CarouselItem} from 'react-bootstrap';

const Landing = React.createClass({
	getInitialState() {
		return {
			pictures: store.getPictureCollection(this.props.params.id),
		}
	},

	componentWillMount() {
		this.state.pictures.fetch().then(() => {this.setState({pictures: this.state.pictures})})
	},

	componentWillReceiveProps() {
		this.setState({
			pictures: store.getPictureCollection(this.props.params.id),
		})
		this.state.pictures.fetch().then(() => {this.setState({pictures: this.state.pictures})})
	},

	render() {
		let town = store.getTown(this.props.params.id).toJSON();
		let pictures = this.state.pictures

		return (
			<div className='landing-container'>
				<h1 className='landing-title'>{'Welcome to ' + town.name}</h1>
				<Carousel className='landing-carousel' controls={false} indicators={false}>
				{pictures.map((picture) => {
					return(
						<CarouselItem key={picture.get('url')}>
							<img className='landing-carousel-image' width={500} src={picture.get('url')} alt=''/>
						</CarouselItem>)
				})}
				</Carousel>
			</div>
		)
	}
})

export default Landing;