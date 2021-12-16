import React from 'react';
import {withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component{
    handleNavigate = (mealTypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId) {
            this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${locationId}`);
        } else {
            this.props.history.push(`/filter?mealtype=${mealTypeId}`);
        }
    }
    render()
    {
        const { quickSearchItemData }=this.props;
        return(
            
                <div className="col-lg-4 col-md-12 col-sm-12"onClick={()=>this.handleNavigate(quickSearchItemData.meal_type)}>
                <div className="rectangle">
            <div className="left-home">
                <img src={`./${quickSearchItemData.image}`} height="145px"width="100%" alt=""/>
              </div>
             <div className="right-home"> 
             <div className="break"> {quickSearchItemData.name}</div>
             <div> {quickSearchItemData.content} </div>
             </div>
         </div>
         </div>
                
        )
    }
}
export default withRouter(QuickSearchItem);