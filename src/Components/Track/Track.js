import React from 'react'
import './Track.css'


export default class Track extends React.Component {
    constructor(props){
        super(props)
        this.addTrack = this.addTrack.bind(this)
    }

    renderAction(){
        return this.props.isRemoval
            ? <button className="Track-action">-</button>
            : <button className="Track-action" onClick={this.addTrack}>+</button>
    }

    addTrack() {
        this.props.onAdd(this.props.track)
    }

    render() {
        const {track} =this.props
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>

                {this.renderAction()}
            </div>
        )
    }
}