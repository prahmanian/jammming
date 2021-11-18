import React from 'react'
import {AiOutlineDelete, AiFillDelete} from 'react-icons/ai'
import './DeleteButton.css'


export default class DeleteButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHovered: false
        }
        this.toggleHover = this.toggleHover.bind(this)
        this.removePlaylist = this.removePlaylist.bind(this)
    }

    toggleHover(e) {
        e.preventDefault()
        this.setState(previousState => ({isHovered: !previousState.isHovered}))
    }

    removePlaylist() {
        this.props.removePlaylist(this.props.id)
    }

    render() {
        return (
            <div 
                className='Delete'
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
                onClick={this.removePlaylist}
                
            >
                {/* <button  className='DeleteButton'>
                    {this.state.isHovered ? <AiFillDelete className="icon fill"/> : <AiOutlineDelete className="icon"/>}
                </button> */}
                {this.state.isHovered ? <AiFillDelete className="icon fill"/> : <AiOutlineDelete className="icon"/>}
            </div>
        )
    }
}