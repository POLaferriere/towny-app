import React from 'react';
import {Carousel, CarouselItem, Glyphicon} from 'react-bootstrap';
import store from '../store';

const CarouselModal = React.createClass({
	propTypes: {
		startingIndex: React.PropTypes.number.isRequired,
	},

	getInitialState() {
		return {
			index: this.props.startingIndex,
			direction: null,
		}
	},

	handleSelect(index, dir) {
		this.setState({
			index: index,
			direction: dir,
		})
	},	

	like(picture) {
		picture.set('likes', picture.get('likes')+1);
		picture.save().then(() => {this.forceUpdate()});
	},

	render() {
		let pictures = store.getPictureCollection(session.getTownId());

		return (
			<Carousel 
				indicators={false} 
				interval={0} 
				activeIndex={this.state.index} 
				direction={this.state.direction}
				onSelect={this.handleSelect}>
				{pictures.map((picture) => {
					return (
						<CarouselItem>
							<img width={900} src={picture.get('url')} />
							<p className="carousel-modal-caption">{picture.get('caption')}</p>
							<div className="carousel-modal-stats">
								<Glyphicon 
									glyph='thumbs-up' 
									className='like-icon' 
									onClick={this.like.bind(this, picture)}>
									<span className='likes'>{picture.get('likes')}</span>
								</Glyphicon>
								<Glyphicon glyph='comment' className='comment-icon'/>
							</div>
						</CarouselItem>)
				})}
		  </Carousel>
		)
	}
})

export default CarouselModal;