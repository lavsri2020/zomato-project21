import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Wallpaper  extends React.Component {  
    constructor(){
        super();
        this.state={
            restaurantsLoc:[],
            inputText: undefined,
            suggestions: []
        }
    }
    handleLocationChange = (event) => {
        const locId = event.target.value;
        sessionStorage.setItem('location_id', locId);
    
        axios({
            url:`http://localhost:1910/api/restaurants/${locId}`,
            method:'GET',
            headers:{'Content-Type': 'application/json'},
            
        }).then(res => {
            this.setState({restaurantsLoc:res.data.restaurants })
        }).catch(err => console.log(err))
}
handleInputChange = (event) => {
    const { restaurantsLoc } = this.state;
    const inputText = event.target.value;

    let suggestions = [];

    suggestions = restaurantsLoc.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
    this.setState({ inputText, suggestions });
}
selectingRestaurant = (resObj) => {
    this.props.history.push(`/details?restaurant=${resObj._id}`);
}
showSuggestion = () => {
    const { suggestions, inputText } = this.state;

    if (suggestions.length == 0 && inputText == undefined) {
        return null;
    }
    if (suggestions.length > 0 && inputText == '') {
        return null;
    }
    if (suggestions.length == 0 && inputText) {
        return <ul >
            <li>No Search Results Found</li>
        </ul>
    }
    return (
        <ul >
            {
                suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
            }
        </ul>
    );

}
    render(){
        
        const { locationsData } = this.props;
       
        return(
            <div>
                <div class="container-fluid">
      <img src=".\Assets\homepageimg.png" height="400px" width="100%"alt=""/></div>
   
   <div className="alignment-home">
    <div className="logo-home">  <b> e!</b>  </div>
{/*--heading and search boxes*/}
 
  <div className="heading-home">
          FIND THE BEST RESTAURANTS,CAFES AND BARS !
  </div>
  <div>
      <select className="location" onChange={this.handleLocationChange}>
      <option value="city">select</option>
      {locationsData.map((item)=>{
          return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
       } )}
     
     
        </select>
       
         <div className="fasSearch" style={{display: 'inline-block'}}>
            
            <span className="fas fa-search"></span>
                   
            
      <div id="notebooks">
                                <input id="query" className="restaurantsinput" type="text"
                                    placeholder="Please Enter Restaurant Name" onChange={this.handleInputChange} />
                                {this.showSuggestion()}
                            </div>
                            </div>             

  </div>
 </div>
            </div>
        )
    }   

}                             
export default withRouter(Wallpaper);