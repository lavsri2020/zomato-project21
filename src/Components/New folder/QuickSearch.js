import React from 'react';
import QuickSearchItem from './QuickSearchItem';
class QuickSearch extends React.Component{
    render()
    {
        const { mealTypesData } = this.props;
        return(
            <div>
<div className="container">
 <div className="head">Quick Searches</div>
 <div className="subhead-home">Discover restaurants by type of meal</div>
 <br></br>
 
     <div className="row">
     {mealTypesData.map((item) => {
           return <QuickSearchItem quickSearchItemData={item} />
                            })}
          
     </div>
 </div>
 <br></br>
 
   </div>
        )
    }
}
export default QuickSearch;